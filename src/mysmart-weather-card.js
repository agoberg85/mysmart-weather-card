import { LitElement, html, css } from 'lit';

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

const CONDITION_TRANSLATIONS = {
  en: {
    'clear-night': 'Clear night',
    cloudy: 'Cloudy',
    exceptional: 'Exceptional',
    fog: 'Fog',
    hail: 'Hail',
    lightning: 'Lightning',
    'lightning-rainy': 'Lightning rainy',
    partlycloudy: 'Partly cloudy',
    pouring: 'Pouring',
    rainy: 'Rain',
    snowy: 'Snow',
    'snowy-rainy': 'Snowy rainy',
    sunny: 'Sunny',
    windy: 'Windy',
    'windy-variant': 'Windy',
  },
  no: {
    'clear-night': 'Klar natt',
    cloudy: 'Overskyet',
    exceptional: 'Ekstrem',
    fog: 'Tåke',
    hail: 'Hagl',
    lightning: 'Lyn',
    'lightning-rainy': 'Tordenregn',
    partlycloudy: 'Delvis skyet',
    pouring: 'Pøsregn',
    rainy: 'Regn',
    snowy: 'Snø',
    'snowy-rainy': 'Sludd',
    sunny: 'Sol',
    windy: 'Vind',
    'windy-variant': 'Vind',
  },
  de: {
    'clear-night': 'Klare Nacht',
    cloudy: 'Bewölkt',
    exceptional: 'Extrem',
    fog: 'Nebel',
    hail: 'Hagel',
    lightning: 'Gewitter',
    'lightning-rainy': 'Gewitterregen',
    partlycloudy: 'Teilweise bewölkt',
    pouring: 'Starkregen',
    rainy: 'Regen',
    snowy: 'Schnee',
    'snowy-rainy': 'Schneeregen',
    sunny: 'Sonnig',
    windy: 'Windig',
    'windy-variant': 'Windig',
  },
};

class MySmartWeatherCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      _forecast: { state: true },
      _loading: { state: true },
      _error: { state: true },
    };
  }

  constructor() {
    super();
    this._forecast = [];
    this._loading = false;
    this._error = '';
    this._lastFetchAt = 0;
    this._lastEntityVersion = '';
    this._requestToken = 0;
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
      language: 'en',
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
          return 'Condition label language for current and daily mode.';
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
      this._error = `Entity not found: ${this.config.entity}`;
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
      const forecastType = this.config.mode === 'daily' ? 'daily' : 'hourly';
      const response = await this.hass.callApi(
        'post',
        'services/weather/get_forecasts?return_response',
        {
          entity_id: this.config.entity,
          type: forecastType,
        }
      );

      if (token !== this._requestToken) {
        return;
      }

      const payload = response?.service_response || response || {};
      const forecast = payload?.[this.config.entity]?.forecast;

      if (!Array.isArray(forecast)) {
        throw new Error('No hourly forecast data returned from weather.get_forecasts');
      }

      this._forecast = forecast;
      this._lastFetchAt = now;
      this._lastEntityVersion = entityVersion;
    } catch (error) {
      if (token !== this._requestToken) {
        return;
      }

      console.error('[MySmart Weather Card] Failed to load forecast', error);
      this._forecast = [];
      this._error = error?.message || 'Unable to load hourly forecast';
    } finally {
      if (token === this._requestToken) {
        this._loading = false;
      }
    }
  }

  _chunkForecast(items, size) {
    const groups = [];

    for (let index = 0; index < items.length; index += size) {
      groups.push(items.slice(index, index + size));
    }

    return groups;
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
    const language = this.config?.language || 'en';

    if (language === 'no') {
      return 'nb-NO';
    }

    if (language === 'de') {
      return 'de-DE';
    }

    return 'en-US';
  }

  _formatGroupTitle(group) {
    if (!group.length) {
      return '';
    }

    const date = new Date(group[0].datetime);

    return new Intl.DateTimeFormat(this._localeForLanguage(), {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
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

    const language = this.config?.language || 'en';
    const translation = CONDITION_TRANSLATIONS[language]?.[condition]
      || CONDITION_TRANSLATIONS.en?.[condition];

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

  _renderHour(item, units) {
    const temperature = item.temperature ?? item.templow;
    const precipitation = item.precipitation ?? 0;

    return html`
      <div class="hour-card">
        <div class="hour-time">${this._formatTime(item.datetime)}</div>
        ${this._renderIcon(item)}
        <div class="hour-temp">
          ${this._formatValue(temperature)}${units.temperature}
        </div>
        <div class="hour-meta">
          ${this._formatValue(item.wind_speed)}${units.wind}
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
    const precipitation = item.precipitation ?? 0;
    const showTitle = this.config.show_title !== false;

    return html`
      <div class="current-card">
        <div class="current-main">
          ${showTitle ? html`<div class="current-title">${this.config.title || 'Current weather'}</div>` : ''}
          <div class="current-temp-row">
            <div class="current-temp">${this._formatValue(temperature)}${units.temperature}</div>
            ${feelsLike !== null ? html`<div class="current-feels">${this._formatValue(feelsLike)}${units.temperature}</div>` : ''}
          </div>
          <div class="current-meta-row">
            <span class="current-condition">${this._formatConditionLabel(item.condition)}</span>
            <span class="current-meta">${this._formatValue(item.wind_speed)}${units.wind}</span>
            <span class="current-meta">${this._formatValue(precipitation)}${units.precipitation}</span>
          </div>
        </div>
        <div class="current-icon-block">
          ${this._renderIcon(item)}
        </div>
      </div>
    `;
  }

  _renderDaily(item, units) {
    const feelsLike = this._calculateFeelsLike(item, units);
    const precipitation = item.precipitation ?? 0;

    return html`
      <div class="daily-card">
        <div class="daily-main">
          <div class="daily-day">${this._formatDayLabel(item.datetime)}</div>
          <div class="daily-temp-row">
            <div class="daily-temp">${this._formatValue(item.temperature)}${units.temperature}</div>
            ${feelsLike !== null ? html`<div class="daily-feels">${this._formatValue(feelsLike)}${units.temperature}</div>` : ''}
          </div>
          <div class="daily-meta-row">
            <span class="daily-condition">${this._formatConditionLabel(item.condition)}</span>
            <span class="daily-meta">${this._formatValue(precipitation)}${units.precipitation}</span>
          </div>
        </div>
        <div class="daily-icon-block">
          ${this._renderIcon(item)}
        </div>
      </div>
    `;
  }

  _startDragScroll(event) {
    if (this.config.mode !== 'hourly' || event.pointerType !== 'mouse' || event.button !== 0) {
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

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }

    const stateObj = this.hass.states[this.config.entity];

    if (!stateObj) {
      return html`
        <ha-card>
          <div class="message">Entity not found: ${this.config.entity}</div>
        </ha-card>
      `;
    }

    const forecastItems = this._forecast.slice(0, this.config.hours_to_show || 24);
    const units = {
      temperature: this._formatTemperatureUnit(stateObj.attributes.temperature_unit || '°'),
      wind: stateObj.attributes.wind_speed_unit || '',
      precipitation: stateObj.attributes.precipitation_unit || 'mm',
    };
    const title = this.config.title || stateObj.attributes.friendly_name || 'Hourly forecast';
    const showTitle = this.config.show_title !== false;
    const isCurrent = this.config.mode === 'current';
    const isDaily = this.config.mode === 'daily';
    const isHourly = this.config.mode === 'hourly';
    const currentItem = this._forecast[0];
    const dailyItems = isDaily && this.config.skip_first ? this._forecast.slice(1) : this._forecast;
    const effectiveCardBackground = (isCurrent || isDaily) ? 'none' : this.config.card_background;
    const hourlyWidthOffset = Math.max(0, Number(this.config.hourly_width_offset) || 0);
    const hourlyLeftBleed = isHourly && hourlyWidthOffset ? Math.round(hourlyWidthOffset / 2) : 0;
    const haCardStyle = [
      effectiveCardBackground ? `background: ${effectiveCardBackground};` : '',
      isHourly && hourlyWidthOffset ? `margin: 0 0 0 ${-hourlyLeftBleed}px;` : '',
      isHourly && hourlyWidthOffset ? `width: calc(100% + ${hourlyWidthOffset}px);` : '',
      isHourly && hourlyWidthOffset ? '--ha-card-border-radius: 0px;' : '',
    ].filter(Boolean).join(' ');
    const shellStyle = [
      this.config.background_color ? `--forecast-surface: ${this.config.background_color};` : '',
      effectiveCardBackground === 'none' ? '--card-shell-padding: 12px 0;' : '',
      isHourly && hourlyWidthOffset ? `--hourly-end-padding: ${hourlyLeftBleed}px;` : '',
      isHourly && hourlyWidthOffset ? `--hourly-start-padding: ${12 + hourlyLeftBleed}px;` : '',
    ].filter(Boolean).join(' ');

    return html`
      <ha-card style=${haCardStyle}>
        <div
          class="card-shell"
          style=${shellStyle}
        >
          ${showTitle && !isCurrent ? html`<div class="card-header">${title}</div>` : ''}

          ${this._error
            ? html`<div class="message error">${this._error}</div>`
            : ''}

          ${this._loading && !this._forecast.length
            ? html`<div class="message">Loading forecast...</div>`
            : isCurrent && !currentItem
              ? html`<div class="message">No current forecast data available.</div>`
            : isDaily && !dailyItems.length
              ? html`<div class="message">No daily forecast data available.</div>`
            : !isCurrent && !this._forecast.length
              ? html`<div class="message">No forecast data available.</div>`
            : isCurrent ? html`
                ${this._renderCurrent(currentItem, units)}
              ` : isDaily ? html`
                <div class="daily-list">
                  ${dailyItems.map((item) => this._renderDaily(item, units))}
                </div>
              ` : html`
                <div
                  class="hours-scroll"
                  @pointerdown=${this._startDragScroll}
                  @pointermove=${this._moveDragScroll}
                  @pointerup=${this._endDragScroll}
                  @pointercancel=${this._endDragScroll}
                  @pointerleave=${this._endDragScroll}
                  @click=${this._handleDragClick}
                >
                  <div class="hours-row">
                    ${forecastItems.map((item) => this._renderHour(item, units))}
                  </div>
                </div>
              `}
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

      .current-card,
      .daily-card {
        background: var(--forecast-surface);
        border: 1px solid var(--forecast-border);
        border-radius: 26px;
        color: var(--forecast-text);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        box-sizing: border-box;
      }

      .current-card {
        min-height: 170px;
        padding: 20px 24px;
      }

      .daily-list {
        display: grid;
        gap: 14px;
      }

      .daily-card {
        min-height: 132px;
        padding: 20px 24px;
      }

      .current-main,
      .daily-main {
        min-width: 0;
        display: grid;
      }

      .current-main {gap: 12px}
      .daily-main {gap: 8px}

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
      }

      .current-temp {
        font-size: 64px;
        font-weight: 300;
        line-height: 0.95;
      }

      .current-low {
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
        color: var(--forecast-muted);
        font-size: 1em;
        line-height: 1.2;
      }

      .current-condition,
      .daily-condition {
        color: var(--forecast-text);
        font-weight: 500;
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
      }

      .daily-temp {
        font-size: 3em;
        font-weight: 300;
        line-height: 0.95;
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
            .value=${this._config?.language || 'en'}
            .configValue=${'language'}
            @change=${this._valueChanged}
          >
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
