const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let s=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=r.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&r.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const r=1===t.length?t[0]:e.reduce((e,i,r)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[r+1],t[0]);return new s(r,t,i)},n=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new s("string"==typeof t?t:t+"",void 0,i))(e)})(t):t,{is:a,defineProperty:l,getOwnPropertyDescriptor:c,getOwnPropertyNames:h,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,g=f?f.emptyScript:"",m=p.reactiveElementPolyfillSupport,_=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},$=(t,e)=>!a(t,e),v={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);void 0!==r&&l(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:s}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:r,set(e){const o=r?.call(this);s?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...h(t),...d(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(e)i.adoptedStyleSheets=r.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of r){const r=document.createElement("style"),s=t.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=e.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(void 0!==r&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==s?this.removeAttribute(r):this.setAttribute(r,s),this._$Em=null}}_$AK(t,e){const i=this.constructor,r=i._$Eh.get(t);if(void 0!==r&&this._$Em!==r){const t=i.getPropertyOptions(r),s="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=r;const o=s.fromAttribute(e,t.type);this[r]=o??this._$Ej?.get(r)??o,this._$Em=null}}requestUpdate(t,e,i,r=!1,s){if(void 0!==t){const o=this.constructor;if(!1===r&&(s=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??$)(s,e)||i.useDefault&&i.reflect&&s===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:r,wrapped:s},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==s||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===r&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,r=this[e];!0!==t||this._$AL.has(e)||void 0===r||this.C(e,void 0,i,r)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[_("elementProperties")]=new Map,w[_("finalized")]=new Map,m?.({ReactiveElement:w}),(p.reactiveElementVersions??=[]).push("2.1.2");const b=globalThis,x=t=>t,A=b.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:t=>t}):void 0,k="$lit$",S=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+S,N=`<${C}>`,P=document,T=()=>P.createComment(""),H=t=>null===t||"object"!=typeof t&&"function"!=typeof t,U=Array.isArray,z="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,V=/>/g,L=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,D=/"/g,I=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),j=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),W=new WeakMap,q=P.createTreeWalker(P,129);function K(t,e){if(!U(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(e):e}const G=(t,e)=>{const i=t.length-1,r=[];let s,o=2===e?"<svg>":3===e?"<math>":"",n=O;for(let e=0;e<i;e++){const i=t[e];let a,l,c=-1,h=0;for(;h<i.length&&(n.lastIndex=h,l=n.exec(i),null!==l);)h=n.lastIndex,n===O?"!--"===l[1]?n=M:void 0!==l[1]?n=V:void 0!==l[2]?(I.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=L):void 0!==l[3]&&(n=L):n===L?">"===l[0]?(n=s??O,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?L:'"'===l[3]?D:R):n===D||n===R?n=L:n===M||n===V?n=O:(n=L,s=void 0);const d=n===L&&t[e+1].startsWith("/>")?" ":"";o+=n===O?i+N:c>=0?(r.push(a),i.slice(0,c)+k+i.slice(c)+S+d):i+S+(-2===c?e:d)}return[K(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),r]};class J{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let s=0,o=0;const n=t.length-1,a=this.parts,[l,c]=G(t,e);if(this.el=J.createElement(l,i),q.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=q.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(k)){const e=c[o++],i=r.getAttribute(t).split(S),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:s,name:n[2],strings:i,ctor:"."===n[1]?tt:"?"===n[1]?et:"@"===n[1]?it:X}),r.removeAttribute(t)}else t.startsWith(S)&&(a.push({type:6,index:s}),r.removeAttribute(t));if(I.test(r.tagName)){const t=r.textContent.split(S),e=t.length-1;if(e>0){r.textContent=A?A.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],T()),q.nextNode(),a.push({type:2,index:++s});r.append(t[e],T())}}}else if(8===r.nodeType)if(r.data===C)a.push({type:2,index:s});else{let t=-1;for(;-1!==(t=r.data.indexOf(S,t+1));)a.push({type:7,index:s}),t+=S.length-1}s++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function Z(t,e,i=t,r){if(e===j)return e;let s=void 0!==r?i._$Co?.[r]:i._$Cl;const o=H(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),void 0===o?s=void 0:(s=new o(t),s._$AT(t,i,r)),void 0!==r?(i._$Co??=[])[r]=s:i._$Cl=s),void 0!==s&&(e=Z(t,s._$AS(t,e.values),s,r)),e}class Y{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=(t?.creationScope??P).importNode(e,!0);q.currentNode=r;let s=q.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new Q(s,s.nextSibling,this,t):1===a.type?e=new a.ctor(s,a.name,a.strings,this,t):6===a.type&&(e=new rt(s,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(s=q.nextNode(),o++)}return q.currentNode=P,r}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Q{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Z(this,t,e),H(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==j&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>U(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==B&&H(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,r="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=J.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(e);else{const t=new Y(r,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new J(t)),e}k(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const s of t)r===e.length?e.push(i=new Q(this.O(T()),this.O(T()),this,this.options)):i=e[r],i._$AI(s),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=x(t).nextSibling;x(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class X{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,s){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=B}_$AI(t,e=this,i,r){const s=this.strings;let o=!1;if(void 0===s)t=Z(this,t,e,0),o=!H(t)||t!==this._$AH&&t!==j,o&&(this._$AH=t);else{const r=t;let n,a;for(t=s[0],n=0;n<s.length-1;n++)a=Z(this,r[i+n],e,n),a===j&&(a=this._$AH[n]),o||=!H(a)||a!==this._$AH[n],a===B?t=B:t!==B&&(t+=(a??"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(t)}j(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends X{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===B?void 0:t}}class et extends X{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class it extends X{constructor(t,e,i,r,s){super(t,e,i,r,s),this.type=5}_$AI(t,e=this){if((t=Z(this,t,e,0)??B)===j)return;const i=this._$AH,r=t===B&&i!==B||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,s=t!==B&&(i===B||r);r&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class rt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Z(this,t)}}const st=b.litHtmlPolyfillSupport;st?.(J,Q),(b.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;class nt extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const r=i?.renderBefore??e;let s=r._$litPart$;if(void 0===s){const t=i?.renderBefore??null;r._$litPart$=s=new Q(e.insertBefore(T(),t),t,void 0,i??{})}return s._$AI(t),s})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return j}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const at=ot.litElementPolyfillSupport;at?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");const lt={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},ct={en:{"clear-night":"Clear night",cloudy:"Cloudy",exceptional:"Exceptional",fog:"Fog",hail:"Hail",lightning:"Lightning","lightning-rainy":"Lightning rainy",partlycloudy:"Partly cloudy",pouring:"Pouring",rainy:"Rain",snowy:"Snow","snowy-rainy":"Snowy rainy",sunny:"Sunny",windy:"Windy","windy-variant":"Windy"},no:{"clear-night":"Klar natt",cloudy:"Overskyet",exceptional:"Ekstrem",fog:"Tåke",hail:"Hagl",lightning:"Lyn","lightning-rainy":"Tordenregn",partlycloudy:"Delvis skyet",pouring:"Pøsregn",rainy:"Regn",snowy:"Snø","snowy-rainy":"Sludd",sunny:"Sol",windy:"Vind","windy-variant":"Vind"},de:{"clear-night":"Klare Nacht",cloudy:"Bewölkt",exceptional:"Extrem",fog:"Nebel",hail:"Hagel",lightning:"Gewitter","lightning-rainy":"Gewitterregen",partlycloudy:"Teilweise bewölkt",pouring:"Starkregen",rainy:"Regen",snowy:"Schnee","snowy-rainy":"Schneeregen",sunny:"Sonnig",windy:"Windig","windy-variant":"Windig"}};class ht extends nt{static get properties(){return{hass:{},config:{},_forecast:{state:!0},_loading:{state:!0},_error:{state:!0}}}constructor(){super(),this._forecast=[],this._loading=!1,this._error="",this._lastFetchAt=0,this._lastEntityVersion="",this._requestToken=0}setConfig(t){if(!t.entity)throw new Error("You need to define a weather entity");this.config={mode:"hourly",title:"",show_title:!0,language:"en",hours_to_show:24,hourly_width_offset:0,skip_first:!1,background_color:"",icon_path:"",icon_extension:"svg",...t}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"mode",selector:{select:{mode:"dropdown",options:[{value:"hourly",label:"Hourly"},{value:"current",label:"Current"},{value:"daily",label:"Daily"}]}}},{name:"title",selector:{text:{}}},{name:"show_title",selector:{boolean:{}}},{name:"language",selector:{select:{mode:"dropdown",options:[{value:"en",label:"English"},{value:"no",label:"Norwegian"},{value:"de",label:"German"}]}}},{name:"hours_to_show",selector:{number:{min:1,max:240,mode:"box"}}},{name:"hourly_width_offset",selector:{number:{min:0,max:200,mode:"box"}}},{name:"skip_first",selector:{boolean:{}}},{name:"background_color",selector:{text:{}}},{name:"card_background",selector:{text:{}}},{name:"icon_path",selector:{text:{}}}],computeHelper:t=>"entity"===t.name?"The weather entity used for weather.get_forecasts.":"mode"===t.name?"Choose whether the card renders hourly, current, or daily forecast data.":"hours_to_show"===t.name?"How many forecast hours to show in the horizontal strip.":"language"===t.name?"Condition label language for current and daily mode.":"hourly_width_offset"===t.name?"Optional extra width in pixels for hourly mode, useful in popups where the row gets clipped.":"skip_first"===t.name?"Skip the first forecast entry. Useful for daily mode when the first item overlaps with current conditions.":"background_color"===t.name?"Background color for the hourly forecast boxes, for example red, #2f2f2f, or var(--gray200).":"card_background"===t.name?"Optional background color for the outer ha-card shell.":"icon_path"===t.name?"Optional base path for local icon files. If empty, built-in Home Assistant icons are used.":void 0}}static getStubConfig(){return{entity:"weather.home"}}static async getConfigElement(){return document.createElement("mysmart-weather-card-editor")}getCardSize(){return 8}getGridOptions(){return{columns:12,min_columns:6,rows:8,min_rows:6}}updated(t){super.updated(t),this.hass&&this.config?.entity&&(t.has("hass")||t.has("config"))&&this._refreshForecast()}async _refreshForecast(){const t=this.hass?.states?.[this.config.entity];if(!t)return this._forecast=[],void(this._error=`Entity not found: ${this.config.entity}`);const e=`${this.config.entity}|${this.config.mode}|${t.last_updated||t.last_changed||""}`,i=Date.now();if(!(!this._forecast.length||e!==this._lastEntityVersion||i-this._lastFetchAt>18e5)||this._loading)return;this._loading=!0,this._error="";const r=++this._requestToken;try{const t="daily"===this.config.mode?"daily":"hourly",s=await this.hass.callApi("post","services/weather/get_forecasts?return_response",{entity_id:this.config.entity,type:t});if(r!==this._requestToken)return;const o=s?.service_response||s||{},n=o?.[this.config.entity]?.forecast;if(!Array.isArray(n))throw new Error("No hourly forecast data returned from weather.get_forecasts");this._forecast=n,this._lastFetchAt=i,this._lastEntityVersion=e}catch(t){if(r!==this._requestToken)return;console.error("[MySmart Weather Card] Failed to load forecast",t),this._forecast=[],this._error=t?.message||"Unable to load hourly forecast"}finally{r===this._requestToken&&(this._loading=!1)}}_chunkForecast(t,e){const i=[];for(let r=0;r<t.length;r+=e)i.push(t.slice(r,r+e));return i}_formatTime(t){const e=new Date(t);return new Intl.DateTimeFormat(this.hass?.locale?.language||void 0,{hour:"2-digit",minute:"2-digit",hour12:!1}).format(e)}_localeForLanguage(){const t=this.config?.language||"en";return"no"===t?"nb-NO":"de"===t?"de-DE":"en-US"}_formatGroupTitle(t){if(!t.length)return"";const e=new Date(t[0].datetime);return new Intl.DateTimeFormat(this._localeForLanguage(),{weekday:"short",month:"short",day:"numeric"}).format(e)}_formatValue(t,e=1){if(null==t||Number.isNaN(Number(t)))return"-";const i=Number(t);return Number.isInteger(i)?`${i}`:i.toFixed(e)}_formatTemperatureUnit(t){return t&&t.replace(/[CFK]$/i,"").trim()||"°"}_formatConditionLabel(t){if(!t)return"";const e=this.config?.language||"en",i=ct[e]?.[t]||ct.en?.[t];return i||t.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ")}_formatDayLabel(t){return new Intl.DateTimeFormat(this._localeForLanguage(),{weekday:"long"}).format(new Date(t))}_windSpeedInKmh(t,e){if(null==t||Number.isNaN(Number(t)))return null;const i=Number(t),r=(e||"").toLowerCase();return r.includes("m/s")?3.6*i:r.includes("mph")?1.60934*i:i}_calculateFeelsLike(t,e){const i=Number(t.temperature??t.templow),r=this._windSpeedInKmh(t.wind_speed,e.wind);if(Number.isNaN(i)||null===r)return null;return 13.12+.6215*i-11.37*r**.16+.3965*i*r**.16}_iconForCondition(t){return lt[t]||"mdi:weather-partly-cloudy"}_renderIcon(t){if(this.config.icon_path){const e=this.config.icon_path.replace(/\/$/,""),i=this.config.icon_extension||"svg",r=t.condition||"cloudy";return F`
        <div class="hour-icon-wrap">
          <img
            class="hour-icon-image"
            src=${`${e}/${r}.${i}`}
            data-fallback-src=${`${e}/${r}.png`}
            data-mdi-fallback=${this._iconForCondition(t.condition)}
            alt=${t.condition||"weather"}
            loading="lazy"
            @error=${this._handleIconError}
          />
          <ha-icon class="hour-icon hour-icon-fallback" .icon=${this._iconForCondition(t.condition)}></ha-icon>
        </div>
      `}return F`
      <ha-icon class="hour-icon" .icon=${this._iconForCondition(t.condition)}></ha-icon>
    `}_handleIconError(t){const e=t.currentTarget,i=e.dataset.fallbackSrc;if(i&&e.src!==i)return void(e.src=i);e.style.display="none";const r=e.closest(".hour-icon-wrap"),s=r?.querySelector(".hour-icon-fallback");s&&(s.style.display="block"),console.warn("[MySmart Weather Card] Icon not found for condition:",e.alt,e.src)}_renderHour(t,e){const i=t.temperature??t.templow,r=t.precipitation??0;return F`
      <div class="hour-card">
        <div class="hour-time">${this._formatTime(t.datetime)}</div>
        ${this._renderIcon(t)}
        <div class="hour-temp">
          ${this._formatValue(i)}${e.temperature}
        </div>
        <div class="hour-meta">
          ${this._formatValue(t.wind_speed)}${e.wind}
        </div>
        <div class="hour-meta">
          ${this._formatValue(r)}${e.precipitation}
        </div>
      </div>
    `}_renderCurrent(t,e){const i=t.temperature??t.templow,r=this._calculateFeelsLike(t,e),s=t.precipitation??0,o=!1!==this.config.show_title;return F`
      <div class="current-card">
        <div class="current-main">
          ${o?F`<div class="current-title">${this.config.title||"Current weather"}</div>`:""}
          <div class="current-temp-row">
            <div class="current-temp">${this._formatValue(i)}${e.temperature}</div>
            ${null!==r?F`<div class="current-feels">${this._formatValue(r)}${e.temperature}</div>`:""}
          </div>
          <div class="current-meta-row">
            <span class="current-condition">${this._formatConditionLabel(t.condition)}</span>
            <span class="current-meta">${this._formatValue(t.wind_speed)}${e.wind}</span>
            <span class="current-meta">${this._formatValue(s)}${e.precipitation}</span>
          </div>
        </div>
        <div class="current-icon-block">
          ${this._renderIcon(t)}
        </div>
      </div>
    `}_renderDaily(t,e){const i=this._calculateFeelsLike(t,e),r=t.precipitation??0;return F`
      <div class="daily-card">
        <div class="daily-main">
          <div class="daily-day">${this._formatDayLabel(t.datetime)}</div>
          <div class="daily-temp-row">
            <div class="daily-temp">${this._formatValue(t.temperature)}${e.temperature}</div>
            ${null!==i?F`<div class="daily-feels">${this._formatValue(i)}${e.temperature}</div>`:""}
          </div>
          <div class="daily-meta-row">
            <span class="daily-condition">${this._formatConditionLabel(t.condition)}</span>
            <span class="daily-meta">${this._formatValue(r)}${e.precipitation}</span>
          </div>
        </div>
        <div class="daily-icon-block">
          ${this._renderIcon(t)}
        </div>
      </div>
    `}render(){if(!this.config||!this.hass)return F``;const t=this.hass.states[this.config.entity];if(!t)return F`
        <ha-card>
          <div class="message">Entity not found: ${this.config.entity}</div>
        </ha-card>
      `;const e=this._forecast.slice(0,this.config.hours_to_show||24),i={temperature:this._formatTemperatureUnit(t.attributes.temperature_unit||"°"),wind:t.attributes.wind_speed_unit||"",precipitation:t.attributes.precipitation_unit||"mm"},r=this.config.title||t.attributes.friendly_name||"Hourly forecast",s=!1!==this.config.show_title,o="current"===this.config.mode,n="daily"===this.config.mode,a="hourly"===this.config.mode,l=this._forecast[0],c=n&&this.config.skip_first?this._forecast.slice(1):this._forecast,h=o||n?"none":this.config.card_background,d=Math.max(0,Number(this.config.hourly_width_offset)||0),u=a&&d?Math.round(d/2):0,p=[h?`background: ${h};`:"",a&&d?`margin: 0 0 0 ${-u}px;`:"",a&&d?`width: calc(100% + ${d}px);`:"",a&&d?"--ha-card-border-radius: 0px;":""].filter(Boolean).join(" "),f=[this.config.background_color?`--forecast-surface: ${this.config.background_color};`:"","none"===h?"--card-shell-padding: 12px 0;":"",a&&d?`--hourly-end-padding: ${u}px;`:"",a&&d?`--hourly-start-padding: ${12+u}px;`:""].filter(Boolean).join(" ");return F`
      <ha-card style=${p}>
        <div
          class="card-shell"
          style=${f}
        >
          ${s&&!o?F`<div class="card-header">${r}</div>`:""}

          ${this._error?F`<div class="message error">${this._error}</div>`:""}

          ${this._loading&&!this._forecast.length?F`<div class="message">Loading forecast...</div>`:o&&!l?F`<div class="message">No current forecast data available.</div>`:n&&!c.length?F`<div class="message">No daily forecast data available.</div>`:o||this._forecast.length?o?F`
                ${this._renderCurrent(l,i)}
              `:n?F`
                <div class="daily-list">
                  ${c.map(t=>this._renderDaily(t,i))}
                </div>
              `:F`
                <div class="hours-scroll">
                  <div class="hours-row">
                    ${e.map(t=>this._renderHour(t,i))}
                  </div>
                </div>
              `:F`<div class="message">No forecast data available.</div>`}
        </div>
      </ha-card>
    `}static get styles(){return o`
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
      }

      .hours-scroll::-webkit-scrollbar {
        display: none;
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
    `}}customElements.get("mysmart-weather-card")||customElements.define("mysmart-weather-card",ht),window.customCards=window.customCards||[],window.customCards.push({type:"mysmart-weather-card",name:"MySmart Weather Card",preview:!0,description:"A multi-mode weather card powered by weather.get_forecasts."});class dt extends nt{static get properties(){return{hass:{},_config:{state:!0}}}setConfig(t){this._config={...t}}_valueChanged(t){if(!this._config)return;const e=t.target,i=e.configValue;let r=t.detail?.value??e.value;if("show_title"===i&&(r=e.checked),"skip_first"===i&&(r=e.checked),"mode"===i&&(r=t.target.value),"language"===i&&(r=t.target.value),"hours_to_show"!==i&&"hourly_width_offset"!==i||(r=Number.parseInt(r,10),Number.isNaN(r)&&(r="hours_to_show"===i?24:0)),!i||this._config[i]===r)return;const s={...this._config};""===r||null==r?delete s[i]:s[i]=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:s},bubbles:!0,composed:!0}))}render(){return this.hass?F`
      <div class="editor">
        <ha-entity-picker
          .hass=${this.hass}
          .value=${this._config?.entity||""}
          .configValue=${"entity"}
          label="Weather entity"
          allow-custom-entity
          @value-changed=${this._valueChanged}
        ></ha-entity-picker>

        <ha-textfield
          .value=${this._config?.title||""}
          .configValue=${"title"}
          label="Title (optional)"
          @input=${this._valueChanged}
        ></ha-textfield>

        <label class="select-field">
          <span class="select-label">Mode</span>
          <select
            .value=${this._config?.mode||"hourly"}
            .configValue=${"mode"}
            @change=${this._valueChanged}
          >
            <option value="hourly">Hourly</option>
            <option value="current">Current</option>
            <option value="daily">Daily</option>
          </select>
        </label>

        <ha-formfield label="Show title">
          <ha-switch
            .checked=${!1!==this._config?.show_title}
            .configValue=${"show_title"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <label class="select-field">
          <span class="select-label">Language</span>
          <select
            .value=${this._config?.language||"en"}
            .configValue=${"language"}
            @change=${this._valueChanged}
          >
            <option value="en">English</option>
            <option value="no">Norwegian</option>
            <option value="de">German</option>
          </select>
        </label>

        <ha-textfield
          .value=${String(this._config?.hours_to_show||24)}
          .configValue=${"hours_to_show"}
          label="Hours to show"
          type="number"
          min="1"
          max="240"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-textfield
          .value=${String(this._config?.hourly_width_offset||0)}
          .configValue=${"hourly_width_offset"}
          label="Hourly width offset"
          type="number"
          min="0"
          max="200"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-formfield label="Skip first (daily)">
          <ha-switch
            .checked=${!0===this._config?.skip_first}
            .configValue=${"skip_first"}
            @change=${this._valueChanged}
          ></ha-switch>
        </ha-formfield>

        <ha-textfield
          .value=${this._config?.background_color||""}
          .configValue=${"background_color"}
          label="Background color"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-textfield
          .value=${this._config?.card_background||""}
          .configValue=${"card_background"}
          label="Card background"
          @input=${this._valueChanged}
        ></ha-textfield>

        <ha-textfield
          .value=${this._config?.icon_path||""}
          .configValue=${"icon_path"}
          label="Local icon path"
          @input=${this._valueChanged}
        ></ha-textfield>
      </div>
    `:F``}static get styles(){return o`
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
    `}}customElements.get("mysmart-weather-card-editor")||customElements.define("mysmart-weather-card-editor",dt);
//# sourceMappingURL=mysmart-weather-card.js.map
