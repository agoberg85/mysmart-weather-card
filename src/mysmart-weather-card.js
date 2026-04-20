import { LitElement, html, css, nothing } from 'lit';
import { LOCALES, resolveLanguageKey } from './locales/index.js';

const CONDITION_ICONS = {
  'clear-night': 'mdi:weather-night',
  cloudy: 'mdi:weather-cloudy',
  exceptional: 'mdi:alert-circle-outline',
  fog: 'mdi:weather-fog',
  hail: 'mdi:weather-hail',
  lightning: 'mdi:weather-lightning',
  'lightning-rainy': 'mdi:weather-lightning-rainy',
  partlycloudy: 'mdi:weather-partly-cloudy',
  pouring: 'mdi:weather-pouring',
  rainy: 'mdi:weather-rainy',
  snowy: 'mdi:weather-snowy',
  'snowy-rainy': 'mdi:weather-snowy-rainy',
  sunny: 'mdi:weather-sunny',
  windy: 'mdi:weather-windy',
  'windy-variant': 'mdi:weather-windy-variant',
};

const WIND_DIRECTION_ICONS = [
  'mdi:arrow-up',
  'mdi:arrow-top-right',
  'mdi:arrow-right',
  'mdi:arrow-bottom-right',
  'mdi:arrow-down',
  'mdi:arrow-bottom-left',
  'mdi:arrow-left',
  'mdi:arrow-top-left',
];

class MySmartWeatherCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _forecast: { state: true },
      _dailyHourlyForecast: { state: true },
      _loading: { state: true },
      _error: { state: true },
      _currentExpanded: { state: true },
      _expandedDailyKey: { state: true },
    };
  }

  constructor() {
    super();
    this._forecast = [];
    this._dailyHourlyForecast = [];
    this._loading = false;
    this._error = '';
    this._lastFetchAt = 0;
    this._lastEntityVersion = '';
    this._requestToken = 0;
    this._currentExpanded = false;
    this._expandedDailyKey = '';
    this._dragScrollActive = false;
    this._dragScrollMoved = false;
    this._dragPointerId = null;
    this._dragStartX = 0;
    this._dragStartScrollLeft = 0;
    this._dragThreshold = 6;
    this._suppressClickUntil = 0;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._endDragScroll();
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define a weather entity');
    }

    this.config = {
      mode: 'hourly',
      title: '',
      show_title: true,
      language: '',
      hours_to_show: 24,
      hourly_width_offset: 0,
      skip_first: false,
      background_color: '',
      icon_path: '',
      icon_extension: 'svg',
      ...config,
    };
  }

  static getConfigForm() {
    return {
      schema: [
        {
          name: 'entity',
          required: true,
          selector: {
            entity: {
              domain: 'weather',
            },
          },
        },
        {
          name: 'mode',
          selector: {
            select: {
              mode: 'dropdown',
              options: [
                { value: 'hourly', label: 'Hourly' },
                { value: 'current', label: 'Current' },
                { value: 'daily', label: 'Daily' },
              ],
            },
          },
        },
        {
          name: 'title',
          selector: {
            text: {},
          },
        },
        {
          name: 'show_title',
          selector: {
            boolean: {},
          },
        },
        {
          name: 'language',
          selector: {
            select: {
              mode: 'dropdown',
              options: [
                { value: '', label: 'Auto (Home Assistant locale)' },
                { value: 'en', label: 'English' },
                { value: 'no', label: 'Norwegian' },
                { value: 'de', label: 'German' },
              ],
            },
          },
        },
        {
          name: 'hours_to_show',
          selector: {
            number: {
              min: 1,
              max: 240,
              mode: 'box',
            },
          },
        },
        {
          name: 'hourly_width_offset',
          selector: {
            number: {
              min: 0,
              max: 200,
              mode: 'box',
            },
          },
        },
        {
          name: 'skip_first',
          selector: {
            boolean: {},
          },
        },
        {
          name: 'background_color',
          selector: {
            text: {},
          },
        },
        {
          name: 'card_background',
          selector: {
            text: {},
          },
        },
        {
          name: 'icon_path',
          selector: {
            text: {},
          },
        },
      ],
      computeHelper: (schema) => {
        if (schema.name === 'entity') {
          return 'The weather entity used for weather.get_forecasts.';
        }

        if (schema.name === 'mode') {
          return 'Choose whether the card renders hourly, current, or daily forecast data.';
        }

        if (schema.name === 'hours_to_show') {
          return 'How many forecast hours to show in the horizontal strip.';
        }

        if (schema.name === 'language') {
          return 'Optional language override. Leave on Auto to follow the Home Assistant frontend locale.';
        }

        if (schema.name === 'hourly_width_offset') {
          return 'Optional extra width in pixels for hourly mode, useful in popups where the row gets clipped.';
        }

        if (schema.name === 'skip_first') {
          return 'Skip the first forecast entry. Useful for daily mode when the first item overlaps with current conditions.';
        }

        if (schema.name === 'background_color') {
          return 'Background color for the hourly forecast boxes, for example red, #2f2f2f, or var(--gray200).';
        }

        if (schema.name === 'card_background') {
          return 'Optional background color for the outer ha-card shell.';
        }

        if (schema.name === 'icon_path') {
          return 'Optional base path for local icon files. If empty, built-in Home Assistant icons are used.';
        }

        return undefined;
      },
    };
  }

  static getStubConfig() {
    return {
      entity: 'weather.home',
    };
  }

  static async getConfigElement() {
    return document.createElement('mysmart-weather-card-editor');
  }

  getCardSize() {
    return 8;
  }

  getGridOptions() {
    return {
      columns: 12,
      min_columns: 6,
      rows: 8,
      min_rows: 6,
    };
  }

  updated(changedProperties) {
    super.updated(changedProperties);

    if (!this.hass || !this.config?.entity) {
      return;
    }

    if (changedProperties.has('hass') || changedProperties.has('config')) {
      this._refreshForecast();
    }
  }

  async _refreshForecast() {
    const stateObj = this.hass?.states?.[this.config.entity];

    if (!stateObj) {
      this._forecast = [];
      this._dailyHourlyForecast = [];
      this._expandedDailyKey = '';
      this._error = `${this._localizeUi('entity_not_found', 'Entity not found')}: ${this.config.entity}`;
      return;
    }

    const entityVersion = `${this.config.entity}|${this.config.mode}|${stateObj.last_updated || stateObj.last_changed || ''}`;
    const now = Date.now();
    const shouldRefresh =
      !this._forecast.length ||
      entityVersion !== this._lastEntityVersion ||
      now - this._lastFetchAt > 30 * 60 * 1000;

    if (!shouldRefresh || this._loading) {
      return;
    }

    this._loading = true;
    this._error = '';

    const token = ++this._requestToken;

    try {
      if (this.config.mode === 'daily') {
        const [dailyResult, hourlyResult] = await Promise.allSettled([
          this._fetchForecastByType('daily'),
          this._fetchForecastByType('hourly'),
        ]);

        if (token !== this._requestToken) {
          return;
        }

        if (dailyResult.status !== 'fulfilled') {
          throw dailyResult.reason;
        }

        this._forecast = dailyResult.value;
        this._dailyHourlyForecast = hourlyResult.status === 'fulfilled' ? hourlyResult.value : [];

        if (hourlyResult.status !== 'fulfilled') {
          console.warn('[MySmart Weather Card] Failed to load nested daily hourly forecast', hourlyResult.reason);
        }
      } else {
        const forecast = await this._fetchForecastByType('hourly');

        if (token !== this._requestToken) {
          return;
        }

        this._forecast = forecast;
        this._dailyHourlyForecast = [];
        this._expandedDailyKey = '';
      }

      this._lastFetchAt = now;
      this._lastEntityVersion = entityVersion;
    } catch (error) {
      if (token !== this._requestToken) {
        return;
      }

      console.error('[MySmart Weather Card] Failed to load forecast', error);
      this._forecast = [];
      this._dailyHourlyForecast = [];
      this._expandedDailyKey = '';
      this._error = error?.message || 'Unable to load hourly forecast';
    } finally {
      if (token === this._requestToken) {
        this._loading = false;
      }
    }
  }

  async _fetchForecastByType(type) {
    const response = await this.hass.callApi(
      'post',
      'services/weather/get_forecasts?return_response',
      {
        entity_id: this.config.entity,
        type,
      }
    );

    const payload = response?.service_response || response || {};
    const forecast = payload?.[this.config.entity]?.forecast;

    if (!Array.isArray(forecast)) {
      throw new Error(`No ${type} forecast data returned from weather.get_forecasts`);
    }

    return forecast;
  }

  _formatTime(value) {
    const date = new Date(value);

    return new Intl.DateTimeFormat(this._localeForLanguage(), {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  }

  _localeForLanguage() {
    const language = this._getResolvedLanguageKey();

    if (language === 'no') {
      return 'nb-NO';
    }

    if (language === 'de') {
      return 'de-DE';
    }

    return 'en-US';
  }

  _formatValue(value, digits = 1) {
    if (value === null || value === undefined || Number.isNaN(Number(value))) {
      return '-';
    }

    const numeric = Number(value);

    if (Number.isInteger(numeric)) {
      return `${numeric}`;
    }

    return numeric.toFixed(digits);
  }

  _formatTemperatureUnit(unit) {
    if (!unit) {
      return '°';
    }

    return unit.replace(/[CFK]$/i, '').trim() || '°';
  }

  _formatConditionLabel(condition) {
    if (!condition) {
      return '';
    }

    const translation = this._getLocaleData().conditions?.[condition]
      || LOCALES.en.conditions?.[condition];

    if (translation) {
      return translation;
    }

    return condition
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  _formatDayLabel(value) {
    return new Intl.DateTimeFormat(this._localeForLanguage(), {
      weekday: 'long',
    }).format(new Date(value));
  }

  _windSpeedInKmh(speed, unit) {
    if (speed === null || speed === undefined || Number.isNaN(Number(speed))) {
      return null;
    }

    const numeric = Number(speed);
    const normalizedUnit = (unit || '').toLowerCase();

    if (normalizedUnit.includes('m/s')) {
      return numeric * 3.6;
    }

    if (normalizedUnit.includes('mph')) {
      return numeric * 1.60934;
    }

    return numeric;
  }

  _windSpeedInMetersPerSecond(speed, unit) {
    if (speed === null || speed === undefined || Number.isNaN(Number(speed))) {
      return null;
    }

    const numeric = Number(speed);
    const normalizedUnit = (unit || '').toLowerCase();

    if (normalizedUnit.includes('km/h')) {
      return numeric / 3.6;
    }

    if (normalizedUnit.includes('mph')) {
      return numeric * 0.44704;
    }

    return numeric;
  }

  _getWindStrengthLabel(speed, unit) {
    const speedKmh = this._windSpeedInKmh(speed, unit);

    if (speedKmh === null) {
      return '-';
    }

    const labels = this._getLocaleData().wind_strength || LOCALES.en.wind_strength;
    const match = labels.find(([min, max]) => speedKmh >= min && speedKmh <= max);

    return match?.[2] || labels[labels.length - 1]?.[2] || '-';
  }

  _getWindDirectionLabel(bearing) {
    if (bearing === null || bearing === undefined || Number.isNaN(Number(bearing))) {
      return '-';
    }

    const directions = this._getLocaleData().wind_direction || LOCALES.en.wind_direction;
    const index = this._getWindDirectionIndex(bearing);

    return directions[index] || '-';
  }

  _getWindDirectionIndex(bearing) {
    if (bearing === null || bearing === undefined || Number.isNaN(Number(bearing))) {
      return null;
    }

    const normalizedBearing = ((Number(bearing) % 360) + 360) % 360;
    return Math.round(normalizedBearing / 45) % 8;
  }

  _renderWindDirectionValue(bearing) {
    const index = this._getWindDirectionIndex(bearing);
    const label = this._getWindDirectionLabel(bearing);

    if (index === null) {
      return label;
    }

    return html`
      <span class="current-direction-value">
        <ha-icon class="current-direction-icon" .icon=${WIND_DIRECTION_ICONS[index]}></ha-icon>
        <span>${label}</span>
      </span>
    `;
  }

  _getDetailLabel(key) {
    const labels = this._getLocaleData().current_details || LOCALES.en.current_details;
    return labels[key] || key;
  }

  _getResolvedLanguageKey() {
    return resolveLanguageKey(this.config?.language, this.hass?.locale?.language);
  }

  _getLocaleData() {
    return LOCALES[this._getResolvedLanguageKey()] || LOCALES.en;
  }

  _localizeUi(key, fallback = '') {
    return this._getLocaleData().ui?.[key] || LOCALES.en.ui?.[key] || fallback;
  }

  _formatWindDisplay(speed, unit) {
    const speedMetersPerSecond = this._windSpeedInMetersPerSecond(speed, unit);

    if (speedMetersPerSecond === null) {
      return '-';
    }

    return `${this._formatValue(speedMetersPerSecond)}m/s`;
  }

  _calculateFeelsLike(item, units) {
    const temperature = Number(item.temperature ?? item.templow);
    const windSpeedKmh = this._windSpeedInKmh(item.wind_speed, units.wind);

    if (Number.isNaN(temperature) || windSpeedKmh === null) {
      return null;
    }

    const feelsLike =
      13.12 +
      (0.6215 * temperature) -
      (11.37 * (windSpeedKmh ** 0.16)) +
      (0.3965 * temperature * (windSpeedKmh ** 0.16));

    return feelsLike;
  }

  _iconForCondition(condition) {
    return CONDITION_ICONS[condition] || 'mdi:weather-partly-cloudy';
  }

  _renderIcon(item) {
    if (this.config.icon_path) {
      const basePath = this.config.icon_path.replace(/\/$/, '');
      const extension = this.config.icon_extension || 'svg';
      const condition = item.condition || 'cloudy';
      const src = `${basePath}/${condition}.${extension}`;
      const fallbackSrc = `${basePath}/${condition}.png`;

      return html`
        <div class="hour-icon-wrap">
          <img
            class="hour-icon-image"
            src=${src}
            data-fallback-src=${fallbackSrc}
            data-mdi-fallback=${this._iconForCondition(item.condition)}
            alt=${item.condition || 'weather'}
            loading="lazy"
            @error=${this._handleIconError}
          />
          <ha-icon class="hour-icon hour-icon-fallback" .icon=${this._iconForCondition(item.condition)}></ha-icon>
        </div>
      `;
    }

    return html`
      <ha-icon class="hour-icon" .icon=${this._iconForCondition(item.condition)}></ha-icon>
    `;
  }

  _handleIconError(event) {
    const image = event.currentTarget;
    const fallbackSrc = image.dataset.fallbackSrc;

    if (fallbackSrc && image.src !== fallbackSrc) {
      image.src = fallbackSrc;
      return;
    }

    image.style.display = 'none';

    const wrapper = image.closest('.hour-icon-wrap');
    const fallbackIcon = wrapper?.querySelector('.hour-icon-fallback');

    if (fallbackIcon) {
      fallbackIcon.style.display = 'block';
    }

    console.warn('[MySmart Weather Card] Icon not found for condition:', image.alt, image.src);
  }

  _renderHour(item, units, options = {}) {
    const temperature = item.temperature ?? item.templow;
    const precipitation = item.precipitation ?? 0;
    const cardClass = options.nested ? 'hour-card hour-card--nested' : 'hour-card';

    return html`
      <div class=${cardClass}>
        <div class="hour-time">${this._formatTime(item.datetime)}</div>
        ${this._renderIcon(item)}
        <div class="hour-temp">
          ${this._formatValue(temperature)}${units.temperature}
        </div>
        <div class="hour-meta">
          ${this._formatWindDisplay(item.wind_speed, units.wind)}
        </div>
        <div class="hour-meta">
          ${this._formatValue(precipitation)}${units.precipitation}
        </div>
      </div>
    `;
  }

  _renderCurrent(item, units) {
    const temperature = item.temperature ?? item.templow;
    const feelsLike = this._calculateFeelsLike(item, units);
    const showTitle = this.config.show_title !== false;
    const isExpanded = this._currentExpanded;
    const gust = item.wind_gust_speed ?? null;
    const windValue = gust !== null && gust !== undefined
      ? html`
          ${this._formatWindDisplay(item.wind_speed, units.wind)}
          <span class="current-detail-secondary">(${this._formatWindDisplay(gust, units.wind)})</span>
        `
      : this._formatWindDisplay(item.wind_speed, units.wind);
    const rainValue = html`
      ${this._formatValue(item.precipitation ?? 0)}${units.precipitation}
      <span class="current-detail-secondary">(${this._formatValue(item.precipitation_probability ?? 0)}%)</span>
    `;
    const details = [
      { key: 'rain', value: rainValue },
      { key: 'wind_direction', value: this._renderWindDirectionValue(item.wind_bearing) },
      { key: 'wind_speed', value: windValue },
      { key: 'humidity', value: `${this._formatValue(item.humidity ?? 0)}%` },
      { key: 'uv_index', value: this._formatValue(item.uv_index ?? 0) },
      { key: 'cloud_coverage', value: `${this._formatValue(item.cloud_coverage ?? 0)}%` },
    ];

    return html`
      <div
        class="current-card ${isExpanded ? 'expanded' : ''}"
        role="button"
        tabindex="0"
        aria-expanded=${String(isExpanded)}
        @click=${this._toggleCurrentExpanded}
        @keydown=${this._handleCurrentKeydown}
      >
        <div class="current-summary">
          <div class="current-main">
            ${showTitle ? html`<div class="current-title">${this.config.title || this._localizeUi('current_weather', 'Current weather')}</div>` : ''}
            <div class="current-temp-row">
              <div class="current-temp">${this._formatValue(temperature)}${units.temperature}</div>
              ${feelsLike !== null ? html`<div class="current-feels">${this._formatValue(feelsLike)}${units.temperature}</div>` : ''}
            </div>
            <div class="current-meta-row">
              <span class="current-condition">${this._formatConditionLabel(item.condition)}</span>
              <span class="current-meta">${this._getWindStrengthLabel(item.wind_speed, units.wind)}</span>
            </div>
          </div>
          <div class="current-icon-block">
            ${this._renderIcon(item)}
          </div>
        </div>
        <div class="current-details-shell ${isExpanded ? 'expanded' : ''}">
          <div class="current-details-grid">
            ${details.map((detail) => html`
              <div class="current-detail-item">
                <div class="current-detail-label">${this._getDetailLabel(detail.key)}</div>
                <div class="current-detail-value">${detail.value}</div>
              </div>
            `)}
          </div>
        </div>
        <div class="current-expand-indicator" aria-hidden="true">
          <ha-icon
            class="current-expand-icon"
            .icon=${'mdi:chevron-down'}
          ></ha-icon>
        </div>
      </div>
    `;
  }

  _toggleCurrentExpanded() {
    this._currentExpanded = !this._currentExpanded;
  }

  _handleCurrentKeydown(event) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this._toggleCurrentExpanded();
  }

  _getDayKey(value) {
    const date = new Date(value);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  _getDailyHourlyItems(item) {
    const dayKey = this._getDayKey(item.datetime);

    return this._dailyHourlyForecast.filter((hourItem) => this._getDayKey(hourItem.datetime) === dayKey);
  }

  _toggleDailyExpanded(dayKey) {
    this._expandedDailyKey = this._expandedDailyKey === dayKey ? '' : dayKey;
  }

  _handleDailyCardClick(event, dayKey) {
    const path = event.composedPath?.() || [];
    const clickedInsideHours = path.some((node) => node instanceof HTMLElement && node.classList?.contains('daily-hours-shell'));

    if (clickedInsideHours) {
      return;
    }

    this._toggleDailyExpanded(dayKey);
  }

  _handleDailyKeydown(event, dayKey) {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event.preventDefault();
    this._toggleDailyExpanded(dayKey);
  }

  _renderDaily(item, units) {
    const feelsLike = this._calculateFeelsLike(item, units);
    const precipitation = item.precipitation ?? 0;
    const dayKey = this._getDayKey(item.datetime);
    const hourlyItems = this._getDailyHourlyItems(item);
    const isExpandable = hourlyItems.length > 0;
    const isExpanded = isExpandable && this._expandedDailyKey === dayKey;

    return html`
      <div
        class="daily-card ${isExpanded ? 'expanded' : ''}"
        @click=${isExpandable ? (event) => this._handleDailyCardClick(event, dayKey) : null}
      >
        <div
          class="daily-summary ${isExpandable ? 'expandable' : ''}"
          role=${isExpandable ? 'button' : nothing}
          tabindex=${isExpandable ? '0' : '-1'}
          aria-expanded=${isExpandable ? String(isExpanded) : nothing}
          @keydown=${isExpandable ? (event) => this._handleDailyKeydown(event, dayKey) : null}
        >
          <div class="daily-icon-block">
            ${this._renderIcon(item)}
          </div>
          <div class="daily-main">
            <div class="daily-day">${this._formatDayLabel(item.datetime)}</div>
            <div class="daily-meta-row">
              <span class="daily-condition">${this._formatConditionLabel(item.condition)}</span>
              <span class="daily-meta">${this._formatValue(precipitation)}${units.precipitation}</span>
            </div>
          </div>
          <div class="daily-temp-block">
            <div class="daily-temp-row">
              <div class="daily-temp">${this._formatValue(item.temperature)}${units.temperature}</div>
              ${feelsLike !== null ? html`<div class="daily-feels">${this._formatValue(feelsLike)}${units.temperature}</div>` : ''}
            </div>
          </div>
        </div>
        ${isExpandable ? html`
          <div class="daily-hours-shell ${isExpanded ? 'expanded' : ''}">
            ${this._renderHourlyContent(hourlyItems, units, { nested: true })}
          </div>
        ` : ''}
        ${isExpandable ? html`
          <div class="daily-expand-indicator" aria-hidden="true">
            <ha-icon
              class="current-expand-icon"
              .icon=${'mdi:chevron-down'}
            ></ha-icon>
          </div>
        ` : ''}
      </div>
    `;
  }

  _startDragScroll(event) {
    if (event.pointerType !== 'mouse' || event.button !== 0) {
      return;
    }

    const scroller = event.currentTarget;
    this._dragScrollActive = true;
    this._dragScrollMoved = false;
    this._dragPointerId = event.pointerId;
    this._dragStartX = event.clientX;
    this._dragStartScrollLeft = scroller.scrollLeft;
    scroller.classList.add('drag-ready');
    scroller.setPointerCapture?.(event.pointerId);
  }

  _moveDragScroll(event) {
    if (!this._dragScrollActive || event.pointerId !== this._dragPointerId) {
      return;
    }

    const scroller = event.currentTarget;
    const deltaX = event.clientX - this._dragStartX;

    if (!this._dragScrollMoved && Math.abs(deltaX) < this._dragThreshold) {
      return;
    }

    if (!this._dragScrollMoved) {
      this._dragScrollMoved = true;
      scroller.classList.remove('drag-ready');
      scroller.classList.add('dragging');
    }

    scroller.scrollLeft = this._dragStartScrollLeft - deltaX;
    event.preventDefault();
  }

  _handleDragClick(event) {
    if (Date.now() < this._suppressClickUntil) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  _endDragScroll(event) {
    if (event && this._dragPointerId !== null && event.pointerId !== this._dragPointerId) {
      return;
    }

    const scroller = event?.currentTarget || this.renderRoot?.querySelector('.hours-scroll.dragging, .hours-scroll.drag-ready');

    if (scroller) {
      if (this._dragScrollMoved) {
        this._suppressClickUntil = Date.now() + 150;
      }

      scroller.classList.remove('dragging');
      scroller.classList.remove('drag-ready');
      if (event && scroller.hasPointerCapture?.(event.pointerId)) {
        scroller.releasePointerCapture(event.pointerId);
      }
    }

    this._dragScrollActive = false;
    this._dragScrollMoved = false;
    this._dragPointerId = null;
  }

  _renderHourlyContent(items, units, options = {}) {
    const scrollClass = options.nested ? 'hours-scroll hours-scroll--nested' : 'hours-scroll';
    const rowClass = options.nested ? 'hours-row hours-row--nested' : 'hours-row';

    return html`
      <div
        class=${scrollClass}
        @pointerdown=${this._startDragScroll}
        @pointermove=${this._moveDragScroll}
        @pointerup=${this._endDragScroll}
        @pointercancel=${this._endDragScroll}
        @pointerleave=${this._endDragScroll}
        @click=${this._handleDragClick}
      >
        <div class=${rowClass}>
          ${items.map((item) => this._renderHour(item, units, options))}
        </div>
      </div>
    `;
  }

  _getDisplayUnits(stateObj) {
    return {
      temperature: this._formatTemperatureUnit(stateObj.attributes.temperature_unit || '°'),
      wind: stateObj.attributes.wind_speed_unit || '',
      precipitation: stateObj.attributes.precipitation_unit || 'mm',
    };
  }

  _getModeState() {
    return {
      isCurrent: this.config.mode === 'current',
      isDaily: this.config.mode === 'daily',
      isHourly: this.config.mode === 'hourly',
    };
  }

  _getHourlyItems() {
    return this._forecast.slice(0, this.config.hours_to_show || 24);
  }

  _getDailyItems() {
    return this.config.skip_first ? this._forecast.slice(1) : this._forecast;
  }

  _getCardStyle(modeState) {
    const { isCurrent, isDaily, isHourly } = modeState;
    const effectiveCardBackground = (isCurrent || isDaily) ? 'none' : this.config.card_background;
    const hourlyWidthOffset = Math.max(0, Number(this.config.hourly_width_offset) || 0);
    const hourlyLeftBleed = isHourly && hourlyWidthOffset ? Math.round(hourlyWidthOffset / 2) : 0;

    return [
      effectiveCardBackground ? `background: ${effectiveCardBackground};` : '',
      isHourly && hourlyWidthOffset ? `margin: 0 0 0 ${-hourlyLeftBleed}px;` : '',
      isHourly && hourlyWidthOffset ? `width: calc(100% + ${hourlyWidthOffset}px);` : '',
      isHourly && hourlyWidthOffset ? '--ha-card-border-radius: 0px;' : '',
    ].filter(Boolean).join(' ');
  }

  _getShellStyle(modeState) {
    const { isCurrent, isDaily, isHourly } = modeState;
    const effectiveCardBackground = (isCurrent || isDaily) ? 'none' : this.config.card_background;
    const hourlyWidthOffset = Math.max(0, Number(this.config.hourly_width_offset) || 0);
    const hourlyLeftBleed = isHourly && hourlyWidthOffset ? Math.round(hourlyWidthOffset / 2) : 0;

    return [
      this.config.background_color ? `--forecast-surface: ${this.config.background_color};` : '',
      effectiveCardBackground === 'none' ? '--card-shell-padding: 12px 0;' : '',
      isHourly && hourlyWidthOffset ? `--hourly-end-padding: ${hourlyLeftBleed}px;` : '',
      isHourly && hourlyWidthOffset ? `--hourly-start-padding: ${12 + hourlyLeftBleed}px;` : '',
    ].filter(Boolean).join(' ');
  }

  _renderStatusMessage(message, isError = false) {
    return html`<div class="message ${isError ? 'error' : ''}">${message}</div>`;
  }

  _renderDailyContent(items, units) {
    return html`
      <div class="daily-list">
        ${items.map((item) => this._renderDaily(item, units))}
      </div>
    `;
  }

  _renderModeContent(modeState, units) {
    const { isCurrent, isDaily } = modeState;
    const hourlyItems = this._getHourlyItems();
    const dailyItems = this._getDailyItems();
    const currentItem = this._forecast[0];

    if (this._loading && !this._forecast.length) {
      return this._renderStatusMessage(this._localizeUi('loading_forecast', 'Loading forecast...'));
    }

    if (isCurrent) {
      return currentItem
        ? this._renderCurrent(currentItem, units)
        : this._renderStatusMessage(this._localizeUi('no_current_data', 'No current forecast data available.'));
    }

    if (isDaily) {
      return dailyItems.length
        ? this._renderDailyContent(dailyItems, units)
        : this._renderStatusMessage(this._localizeUi('no_daily_data', 'No daily forecast data available.'));
    }

    return hourlyItems.length
      ? this._renderHourlyContent(hourlyItems, units)
      : this._renderStatusMessage(this._localizeUi('no_forecast_data', 'No forecast data available.'));
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this.config.entity];

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="message">${this._localizeUi('entity_not_found', 'Entity not found')}: ${this.config.entity}</div>
        </ha-card>
      `;
    }

    const modeState = this._getModeState();
    const units = this._getDisplayUnits(stateObj);
    const title = this.config.title || stateObj.attributes.friendly_name || 'Hourly forecast';
    const showTitle = this.config.show_title !== false;
    const haCardStyle = this._getCardStyle(modeState);
    const shellStyle = this._getShellStyle(modeState);

    return html`
      <ha-card style=${haCardStyle}>
        <div
          class="card-shell"
          style=${shellStyle}
        >
          ${showTitle && !modeState.isCurrent ? html`<div class="card-header">${title}</div>` : ''}

          ${this._error
            ? this._renderStatusMessage(this._error, true)
            : ''}

          ${this._renderModeContent(modeState, units)}
        </div>
      </ha-card>
    `;
  }

  static get styles() {
    return css`
      :host {
        --forecast-bg: var(--card-background-color, #1f1f1f);
        --forecast-surface: color-mix(in srgb, var(--forecast-bg) 78%, white 22%);
        --forecast-border: color-mix(in srgb, var(--divider-color, rgba(255, 255, 255, 0.12)) 55%, transparent);
        --forecast-text: var(--primary-text-color, #ffffff);
        --forecast-muted: var(--secondary-text-color, rgba(255, 255, 255, 0.7));
        --forecast-accent: var(--state-icon-color, #d7dce5);
        --hourly-end-padding: 0px;
        --hourly-start-padding: 12px;
        display: block;
      }

      ha-card {
        overflow: hidden;
        box-sizing: border-box;
      }

      .card-shell {
      }

      .card-header {
        color: var(--forecast-text);
        font-size: 18px;
        font-weight: 500;
        line-height: 1.2;
        margin-bottom: 14px;
      }

      .groups-scroll {
        display: none;
      }

      .hours-scroll {
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
        touch-action: pan-x;
        margin: 0 -12px -6px;
        padding: 2px 12px 6px var(--hourly-start-padding);
        scrollbar-width: none;
        box-sizing: border-box;
        cursor: grab;
        user-select: none;
      }

      .hours-scroll::-webkit-scrollbar {
        display: none;
      }

      .hours-scroll.drag-ready {
        cursor: grab;
      }

      .hours-scroll.dragging {
        cursor: grabbing;
      }

      .hours-row {
        display: flex;
        gap: 10px;
        width: max-content;
        padding-right: var(--hourly-end-padding);
        box-sizing: border-box;
      }

      .hour-card {
        width: 84px;
        min-height: 138px;
        flex: 0 0 auto;
        background: var(--forecast-surface);
        border: 1px solid var(--forecast-border);
        border-radius: 22px;
        color: var(--forecast-text);
        display: grid;
        justify-items: center;
        align-content: start;
        gap: 6px;
        padding: 14px 8px 12px;
        box-sizing: border-box;
      }

      .hour-card--nested {
        width: 64px;
        min-height: 108px;
        background: transparent;
        border-color: transparent;
        border-radius: 16px;
        gap: 4px;
        padding: 8px 4px 6px;
      }

      .current-card,
      .daily-card {
        background: var(--forecast-surface);
        border: 1px solid var(--forecast-border);
        border-radius: 26px;
        color: var(--forecast-text);
        box-sizing: border-box;
      }

      .current-card {
        min-height: 170px;
        padding: 20px 24px 12px 24px;
        display: grid;
        gap: 0;
        cursor: pointer;
        transition: border-color 220ms ease, background-color 220ms ease;
      }

      .current-card:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .current-summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
      }

      .current-card.expanded {
        gap: 18px;
      }

      .current-details-shell,
      .daily-hours-shell {
        display: grid;
        grid-template-rows: 0fr;
        opacity: 0;
        transform: translateY(-6px);
        transition:
          grid-template-rows 320ms cubic-bezier(0.22, 1, 0.36, 1),
          opacity 240ms ease,
          transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      .current-details-shell > *,
      .daily-hours-shell > * {
        min-height: 0;
      }

      .current-details-shell > * {
        overflow: hidden;
      }

      .daily-hours-shell > * {
        overflow-y: hidden;
      }

      .current-details-shell.expanded,
      .daily-hours-shell.expanded {
        grid-template-rows: 1fr;
        opacity: 1;
        transform: translateY(0);
      }

      .current-details-grid {
        opacity: 0;
        transform: translateY(-8px);
        transition:
          opacity 200ms ease,
          transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
      }

      .current-details-shell.expanded .current-details-grid {
        opacity: 1;
        transform: translateY(0);
        transition-delay: 40ms;
      }

      .daily-list {
        display: grid;
        gap: 14px;
      }

      .daily-card {
        padding: 12px 24px;
        display: grid;
      }

      .daily-card.expanded {
        padding-bottom: 8px;
      }

      .daily-summary {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        column-gap: 18px;
      }

      .daily-summary.expandable {
        cursor: pointer;
      }

      .daily-summary.expandable:focus-visible {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
      }

      .current-main,
      .daily-main {
        min-width: 0;
        display: grid;
      }

      .current-main {gap: 12px}
      .daily-main {gap: 6px}

      .current-title,
      .daily-day {
        font-size: 1em;
        font-weight: 500;
        line-height: 1.15;
      }

      .current-temp-row {
        display: flex;
        align-items: baseline;
        gap: 10px;
      }

      .daily-temp-row {
        display: flex;
        align-items: baseline;
        gap: 10px;
        justify-content: flex-end;
      }

      .daily-temp-block {
        min-width: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }

      .current-temp {
        font-size: 64px;
        font-weight: 300;
        line-height: 0.95;
      }

      .current-feels {
        color: var(--forecast-muted);
        font-size: 16px;
        font-weight: 400;
        line-height: 1;
      }

      .current-meta-row,
      .daily-meta-row {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        color: var(--forecast-text);
        font-size: 1em;
        line-height: 1.2;
      }

      .current-condition,
      .daily-condition {
        color: var(--forecast-text);
        font-weight: 500;
      }

      .current-details-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px 20px;
        padding-top: 4px;
        padding-bottom: 2px;
      }

      .current-detail-item {
        min-width: 0;
        display: grid;
        gap: 6px;
      }

      .current-detail-label {
        color: var(--forecast-muted);
        font-size: 0.72em;
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .current-detail-value {
        color: var(--forecast-text);
        font-size: 1.42em;
        font-weight: 500;
        line-height: 1.05;
        text-wrap: balance;
      }

      .current-detail-secondary {
        color: var(--forecast-muted);
        font-size: 0.68em;
        font-weight: 500;
        line-height: 1;
        white-space: nowrap;
      }

      .current-direction-value {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .current-direction-icon {
        --mdc-icon-size: 0.92em;
        color: var(--forecast-muted);
        flex: 0 0 auto;
      }

      .current-expand-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--forecast-muted);
        line-height: 1;
        min-height: 16px;
      }

      .daily-expand-indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--forecast-muted);
        line-height: 1;
        min-height: 16px;
      }

      .current-expand-icon {
        --mdc-icon-size: 18px;
        color: color-mix(in srgb, var(--forecast-text) 78%, transparent);
        transition: transform 220ms ease, color 220ms ease;
      }

      .current-card.expanded .current-expand-icon,
      .daily-card.expanded .current-expand-icon {
        transform: rotate(180deg);
      }

      .current-icon-block,
      .daily-icon-block {
        flex: 0 0 auto;
      }

      .current-icon-block .hour-icon-wrap,
      .current-icon-block .hour-icon,
      .current-icon-block .hour-icon-image {
        width: 112px;
        height: 112px;
      }

      .current-icon-block .hour-icon {
        --mdc-icon-size: 112px;
      }

      .daily-icon-block .hour-icon-wrap,
      .daily-icon-block .hour-icon,
      .daily-icon-block .hour-icon-image {
        width: 72px;
        height: 72px;
      }

      .daily-icon-block .hour-icon {
        --mdc-icon-size: 72px;
      }

      .daily-day {
        font-size: 1em;
        text-transform: capitalize;
        color: var(--forecast-muted)
      }

      .daily-main,
      .daily-meta-row,
      .daily-condition,
      .daily-meta {
        min-width: 0;
      }

      .daily-condition,
      .daily-meta {
        white-space: nowrap;
      }

      .daily-condition {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .daily-temp {
        font-size: 3em;
        font-weight: 300;
        line-height: 0.95;
        color: var(--forecast-text)
      }

      .hours-scroll--nested {
        margin: 0 -24px -6px;
        padding: 2px 12px 6px;
      }

      .hours-row--nested {
        gap: 6px;
        padding-right: 0px;
      }

      .hours-row--nested .hour-card--nested:first-child {
        margin-left: 0px;
      }

      .hour-card--nested .hour-time {
        font-size: 11px;
      }

      .hour-card--nested .hour-icon {
        --mdc-icon-size: 28px;
      }

      .hour-card--nested .hour-icon-wrap,
      .hour-card--nested .hour-icon-image {
        width: 28px;
        height: 28px;
      }

      .hour-card--nested .hour-temp {
        font-size: 22px;
      }

      .hour-card--nested .hour-meta {
        font-size: 10px;
        line-height: 1.15;
      }

      .daily-feels, .current-feels {
        color: var(--forecast-muted);
        font-size: 16px;
        font-weight: 400;
        line-height: 1;
      }   

      .hour-time {
        color: var(--forecast-muted);
        font-size: 13px;
        font-weight: 600;
      }

      .hour-icon {
        --mdc-icon-size: 34px;
        color: var(--forecast-accent);
      }

      .hour-icon-wrap {
        width: 34px;
        height: 34px;
        position: relative;
      }

      .hour-icon-image {
        width: 34px;
        height: 34px;
        object-fit: contain;
      }

      .hour-icon-fallback {
        display: none;
        position: absolute;
        inset: 0;
      }

      .hour-temp {
        font-size: 28px;
        font-weight: 300;
        line-height: 1;
      }

      .hour-meta {
        color: var(--forecast-muted);
        font-size: 12px;
        line-height: 1.2;
        text-align: center;
      }

      .message {
        color: var(--forecast-muted);
        font-size: 14px;
        padding: 8px 2px 4px;
      }

      .message.error {
        color: var(--error-color);
      }

      @media (max-width: 480px) {
        .card-shell {
        }

        .groups-scroll {
          display: none;
        }

        .hours-scroll {
          margin: 0 -16px -6px;
          padding: 2px 16px 6px var(--hourly-start-padding, 16px);
        }

        .current-card,
        .daily-card {
          padding: 18px;
          gap: 12px;
        }

        .daily-card {
          gap: 6px;
        }

        .daily-summary {
          column-gap: 14px;
        }

        .current-details-grid {
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .current-title,
        .daily-day {
          font-size: 18px;
        }

        .current-temp {
          font-size: 4.6em;
        }

        .daily-temp {
          font-size: 44px;
        }

        .daily-temp-row {
          gap: 8px;
        }

        .hours-scroll--nested {
          margin: 0 -18px -6px;
          padding: 2px 18px 6px;
        }

        .hours-row--nested {
          padding-right: 18px;
        }

        .hours-row--nested .hour-card--nested:first-child {
          margin-left: -12px;
        }

        .hour-card--nested {
          width: 60px;
          min-height: 102px;
          padding: 8px 3px 6px;
        }

        .current-feels,
        .current-meta-row,
        .daily-meta-row {
          font-size: 16px;
        }

        .current-icon-block .hour-icon-wrap,
        .current-icon-block .hour-icon,
        .current-icon-block .hour-icon-image {
          width: 80px;
          height: 80px;
        }

        .current-icon-block .hour-icon {
          --mdc-icon-size: 80px;
        }

        .daily-icon-block .hour-icon-wrap,
        .daily-icon-block .hour-icon,
        .daily-icon-block .hour-icon-image {
          width: 68px;
          height: 68px;
        }

        .daily-icon-block .hour-icon {
          --mdc-icon-size: 68px;
        }
      }
    `;
  }
}

if (!customElements.get('mysmart-weather-card')) {
  customElements.define('mysmart-weather-card', MySmartWeatherCard);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'mysmart-weather-card',
  name: 'MySmart Weather Card',
  preview: true,
  description: 'A multi-mode weather card powered by weather.get_forecasts.',
});

class MySmartWeatherCardEditor extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: { state: true },
    };
  }

  setConfig(config) {
    this._config = { ...config };
  }

  _valueChanged(event) {
    if (!this._config) {
      return;
    }

    const target = event.target;
    const key = target.configValue;
    let value = event.detail?.value ?? target.value;

    if (key === 'show_title') {
      value = target.checked;
    }

    if (key === 'skip_first') {
      value = target.checked;
    }

    if (key === 'mode') {
      value = event.target.value;
    }

    if (key === 'language') {
      value = event.target.value;
    }

    if (key === 'hours_to_show' || key === 'hourly_width_offset') {
      value = Number.parseInt(value, 10);

      if (Number.isNaN(value)) {
        value = key === 'hours_to_show' ? 24 : 0;
      }
    }

    if (!key || this._config[key] === value) {
      return;
    }

    const nextConfig = { ...this._config };

    if (value === '' || value === null || value === undefined) {
      delete nextConfig[key];
    } else {
      nextConfig[key] = value;
    }

    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: nextConfig },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    if (!this.hass) {
      return html``;
    }

    return html`
      <div class="editor">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config?.entity || ''}
          .configValue=${'entity'}
          label="Weather entity"
          allow-custom-entity
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>

        <ha-textfield
          .value=${this._config?.title || ''}
          .configValue=${'title'}
          label="Title (optional)"
          @input=${this._valueChanged}
        ></ha-textfield>

        <label class="select-field">
          <span class="select-label">Mode</span>
          <select
            .value=${this._config?.mode || 'hourly'}
            .configValue=${'mode'}
            @change=${this._valueChanged}
          >
            <option value="hourly">Hourly</option>
            <option value="current">Current</option>
            <option value="daily">Daily</option>
          </select>
        </label>

        <ha-formfield label="Show title">
          <ha-switch
            .checked=${this._config?.show_title !== false}
            .configValue=${'show_title'}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <label class="select-field">
          <span class="select-label">Language</span>
          <select
            .value=${this._config?.language || ''}
            .configValue=${'language'}
            @change=${this._valueChanged}
          >
            <option value="">Auto (Home Assistant locale)</option>
            <option value="en">English</option>
            <option value="no">Norwegian</option>
            <option value="de">German</option>
          </select>
        </label>

        <ha-textfield
          .value=${String(this._config?.hours_to_show || 24)}
          .configValue=${'hours_to_show'}
          label="Hours to show"
          type="number"
          min="1"
          max="240"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-textfield
          .value=${String(this._config?.hourly_width_offset || 0)}
          .configValue=${'hourly_width_offset'}
          label="Hourly width offset"
          type="number"
          min="0"
          max="200"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-formfield label="Skip first (daily)">
          <ha-switch
            .checked=${this._config?.skip_first === true}
            .configValue=${'skip_first'}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-textfield
          .value=${this._config?.background_color || ''}
          .configValue=${'background_color'}
          label="Background color"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-textfield
          .value=${this._config?.card_background || ''}
          .configValue=${'card_background'}
          label="Card background"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-textfield
          .value=${this._config?.icon_path || ''}
          .configValue=${'icon_path'}
          label="Local icon path"
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
    `;
  }

  static get styles() {
    return css`
      .editor {
        display: grid;
        gap: 16px;
      }

      .select-field {
        display: grid;
        gap: 8px;
        color: var(--primary-text-color);
      }

      .select-label {
        color: var(--secondary-text-color);
        font-size: 14px;
      }

      .select-field select {
        background: var(--card-background-color);
        color: var(--primary-text-color);
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        font: inherit;
        padding: 12px 14px;
        outline: none;
      }
    `;
  }
}

if (!customElements.get('mysmart-weather-card-editor')) {
  customElements.define('mysmart-weather-card-editor', MySmartWeatherCardEditor);
}
