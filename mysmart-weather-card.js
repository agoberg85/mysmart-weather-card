const e=globalThis,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}};const s=(e,...t)=>{const r=1===e.length?e[0]:t.reduce((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1],e[0]);return new n(r,e,i)},o=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:a,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:c,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,p=globalThis,g=p.trustedTypes,_=g?g.emptyScript:"",f=p.reactiveElementPolyfillSupport,m=(e,t)=>e,y={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!a(e,t),$={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(e,i,t);void 0!==r&&l(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){const{get:r,set:n}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){const s=r?.call(this);n?.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...c(e),...h(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{if(t)i.adoptedStyleSheets=r.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const t of r){const r=document.createElement("style"),n=e.litNonce;void 0!==n&&r.setAttribute("nonce",n),r.textContent=t.cssText,i.appendChild(r)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(t,i.type);this._$Em=e,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(e,t){const i=this.constructor,r=i._$Eh.get(e);if(void 0!==r&&this._$Em!==r){const e=i.getPropertyOptions(r),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:y;this._$Em=r;const s=n.fromAttribute(t,e.type);this[r]=s??this._$Ej?.get(r)??s,this._$Em=null}}requestUpdate(e,t,i,r=!1,n){if(void 0!==e){const s=this.constructor;if(!1===r&&(n=this[e]),i??=s.getPropertyOptions(e),!((i.hasChanged??v)(n,t)||i.useDefault&&i.reflect&&n===this._$Ej?.get(e)&&!this.hasAttribute(s._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:r,wrapped:n},s){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,s??t??this[e]),!0!==n||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,r=this[t];!0!==e||this._$AL.has(t)||void 0===r||this.C(t,void 0,i,r)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[m("elementProperties")]=new Map,w[m("finalized")]=new Map,f?.({ReactiveElement:w}),(p.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,b=e=>e,S=x.trustedTypes,A=S?S.createPolicy("lit-html",{createHTML:e=>e}):void 0,k="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+C,D=`<${E}>`,N=document,z=()=>N.createComment(""),L=e=>null===e||"object"!=typeof e&&"function"!=typeof e,H=Array.isArray,M="[ \t\n\f\r]",P=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,T=/>/g,I=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),V=/'/g,W=/"/g,O=/^(?:script|style|textarea|title)$/i,F=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),R=Symbol.for("lit-noChange"),K=Symbol.for("lit-nothing"),j=new WeakMap,B=N.createTreeWalker(N,129);function q(e,t){if(!H(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const G=(e,t)=>{const i=e.length-1,r=[];let n,s=2===t?"<svg>":3===t?"<math>":"",o=P;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===P?"!--"===l[1]?o=U:void 0!==l[1]?o=T:void 0!==l[2]?(O.test(l[2])&&(n=RegExp("</"+l[2],"g")),o=I):void 0!==l[3]&&(o=I):o===I?">"===l[0]?(o=n??P,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?I:'"'===l[3]?W:V):o===W||o===V?o=I:o===U||o===T?o=P:(o=I,n=void 0);const h=o===I&&e[t+1].startsWith("/>")?" ":"";s+=o===P?i+D:d>=0?(r.push(a),i.slice(0,d)+k+i.slice(d)+C+h):i+C+(-2===d?t:h)}return[q(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),r]};class Y{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let n=0,s=0;const o=e.length-1,a=this.parts,[l,d]=G(e,t);if(this.el=Y.createElement(l,i),B.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=B.nextNode())&&a.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(k)){const t=d[s++],i=r.getAttribute(e).split(C),o=/([.?@])?(.*)/.exec(t);a.push({type:1,index:n,name:o[2],strings:i,ctor:"."===o[1]?ee:"?"===o[1]?te:"@"===o[1]?ie:Q}),r.removeAttribute(e)}else e.startsWith(C)&&(a.push({type:6,index:n}),r.removeAttribute(e));if(O.test(r.tagName)){const e=r.textContent.split(C),t=e.length-1;if(t>0){r.textContent=S?S.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],z()),B.nextNode(),a.push({type:2,index:++n});r.append(e[t],z())}}}else if(8===r.nodeType)if(r.data===E)a.push({type:2,index:n});else{let e=-1;for(;-1!==(e=r.data.indexOf(C,e+1));)a.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const i=N.createElement("template");return i.innerHTML=e,i}}function X(e,t,i=e,r){if(t===R)return t;let n=void 0!==r?i._$Co?.[r]:i._$Cl;const s=L(t)?void 0:t._$litDirective$;return n?.constructor!==s&&(n?._$AO?.(!1),void 0===s?n=void 0:(n=new s(e),n._$AT(e,i,r)),void 0!==r?(i._$Co??=[])[r]=n:i._$Cl=n),void 0!==n&&(t=X(e,n._$AS(e,t.values),n,r)),t}class Z{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,r=(e?.creationScope??N).importNode(t,!0);B.currentNode=r;let n=B.nextNode(),s=0,o=0,a=i[0];for(;void 0!==a;){if(s===a.index){let t;2===a.type?t=new J(n,n.nextSibling,this,e):1===a.type?t=new a.ctor(n,a.name,a.strings,this,e):6===a.type&&(t=new re(n,this,e)),this._$AV.push(t),a=i[++o]}s!==a?.index&&(n=B.nextNode(),s++)}return B.currentNode=N,r}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class J{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,r){this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=X(this,e,t),L(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==R&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>H(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==K&&L(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,r="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Y.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===r)this._$AH.p(t);else{const e=new Z(r,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=j.get(e.strings);return void 0===t&&j.set(e.strings,t=new Y(e)),t}k(e){H(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const n of e)r===t.length?t.push(i=new J(this.O(z()),this.O(z()),this,this.options)):i=t[r],i._$AI(n),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=b(e).nextSibling;b(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,r,n){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=K}_$AI(e,t=this,i,r){const n=this.strings;let s=!1;if(void 0===n)e=X(this,e,t,0),s=!L(e)||e!==this._$AH&&e!==R,s&&(this._$AH=e);else{const r=e;let o,a;for(e=n[0],o=0;o<n.length-1;o++)a=X(this,r[i+o],t,o),a===R&&(a=this._$AH[o]),s||=!L(a)||a!==this._$AH[o],a===K?e=K:e!==K&&(e+=(a??"")+n[o+1]),this._$AH[o]=a}s&&!r&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Q{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}class te extends Q{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==K)}}class ie extends Q{constructor(e,t,i,r,n){super(e,t,i,r,n),this.type=5}_$AI(e,t=this){if((e=X(this,e,t,0)??K)===R)return;const i=this._$AH,r=e===K&&i!==K||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,n=e!==K&&(i===K||r);r&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class re{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){X(this,e)}}const ne=x.litHtmlPolyfillSupport;ne?.(Y,J),(x.litHtmlVersions??=[]).push("3.3.2");const se=globalThis;class oe extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const r=i?.renderBefore??t;let n=r._$litPart$;if(void 0===n){const e=i?.renderBefore??null;r._$litPart$=n=new J(t.insertBefore(z(),e),e,void 0,i??{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return R}}oe._$litElement$=!0,oe.finalized=!0,se.litElementHydrateSupport?.({LitElement:oe});const ae=se.litElementPolyfillSupport;ae?.({LitElement:oe}),(se.litElementVersions??=[]).push("4.2.2");const le={en:{conditions:{"clear-night":"Clear night",cloudy:"Cloudy",exceptional:"Exceptional",fog:"Fog",hail:"Hail",lightning:"Lightning","lightning-rainy":"Lightning rainy",partlycloudy:"Partly cloudy",pouring:"Pouring",rainy:"Rain",snowy:"Snow","snowy-rainy":"Snowy rainy",sunny:"Sunny",windy:"Windy","windy-variant":"Windy"},wind_strength:[[0,.99,"Calm"],[1,6.99,"Light air"],[7,11.99,"Light breeze"],[12,19.99,"Gentle breeze"],[20,29.99,"Moderate breeze"],[30,39.99,"Fresh breeze"],[40,50.99,"Strong breeze"],[51,62.99,"Near gale"],[63,75.99,"Gale"],[76,87.99,"Strong gale"],[88,102.99,"Storm"],[103,117.99,"Violent storm"]],wind_direction:["North","North East","East","South East","South","South West","West","North West"],current_details:{rain:"Rain",wind_direction:"Wind direction",wind_speed:"Wind",humidity:"Humidity",uv_index:"UV index",cloud_coverage:"Clouds"},ui:{current_weather:"Current weather",loading_forecast:"Loading forecast...",no_current_data:"No current forecast data available.",no_daily_data:"No daily forecast data available.",no_forecast_data:"No forecast data available.",entity_not_found:"Entity not found"}},no:{conditions:{"clear-night":"Klar natt",cloudy:"Overskyet",exceptional:"Ekstrem",fog:"Tåke",hail:"Hagl",lightning:"Lyn","lightning-rainy":"Tordenregn",partlycloudy:"Delvis skyet",pouring:"Pøsregn",rainy:"Regn",snowy:"Snø","snowy-rainy":"Sludd",sunny:"Sol",windy:"Vind","windy-variant":"Vind"},wind_strength:[[0,.99,"Stille"],[1,6.99,"Lett luft"],[7,11.99,"Svak bris"],[12,19.99,"Svak vind"],[20,29.99,"Moderat bris"],[30,39.99,"Frisk bris"],[40,50.99,"Sterk bris"],[51,62.99,"Nesten kuling"],[63,75.99,"Kuling"],[76,87.99,"Sterk kuling"],[88,102.99,"Storm"],[103,117.99,"Voldsom storm"]],wind_direction:["Nord","Nordøst","Øst","Sørøst","Sør","Sørvest","Vest","Nordvest"],current_details:{rain:"Nedbør",wind_direction:"Vindretning",wind_speed:"Vind",humidity:"Luftfuktighet",uv_index:"UV-indeks",cloud_coverage:"Skydekke"},ui:{current_weather:"Været nå",loading_forecast:"Laster værvarsel...",no_current_data:"Ingen gjeldende værdata tilgjengelig.",no_daily_data:"Ingen dagsvarsel tilgjengelig.",no_forecast_data:"Ingen værdata tilgjengelig.",entity_not_found:"Fant ikke entitet"}},de:{conditions:{"clear-night":"Klare Nacht",cloudy:"Bewölkt",exceptional:"Extrem",fog:"Nebel",hail:"Hagel",lightning:"Gewitter","lightning-rainy":"Gewitterregen",partlycloudy:"Teilweise bewölkt",pouring:"Starkregen",rainy:"Regen",snowy:"Schnee","snowy-rainy":"Schneeregen",sunny:"Sonnig",windy:"Windig","windy-variant":"Windig"},wind_strength:[[0,.99,"Windstill"],[1,6.99,"Leiser Zug"],[7,11.99,"Leichte Brise"],[12,19.99,"Schwache Brise"],[20,29.99,"Mäßige Brise"],[30,39.99,"Frische Brise"],[40,50.99,"Starker Wind"],[51,62.99,"Fast stürmisch"],[63,75.99,"Stürmisch"],[76,87.99,"Starker Sturm"],[88,102.99,"Sturm"],[103,117.99,"Orkanartiger Sturm"]],wind_direction:["Nord","Nordost","Ost","Südost","Süd","Südwest","West","Nordwest"],current_details:{rain:"Niederschlag",wind_direction:"Windrichtung",wind_speed:"Wind",humidity:"Luftfeuchtigkeit",uv_index:"UV-Index",cloud_coverage:"Bewölkung"},ui:{current_weather:"Aktuelles Wetter",loading_forecast:"Wetterdaten werden geladen...",no_current_data:"Keine aktuellen Wetterdaten verfügbar.",no_daily_data:"Keine Tagesvorhersage verfügbar.",no_forecast_data:"Keine Wetterdaten verfügbar.",entity_not_found:"Entität nicht gefunden"}}};const de={"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",exceptional:"mdi:alert-circle-outline",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},ce=["mdi:arrow-up","mdi:arrow-top-right","mdi:arrow-right","mdi:arrow-bottom-right","mdi:arrow-down","mdi:arrow-bottom-left","mdi:arrow-left","mdi:arrow-top-left"];class he extends oe{static get properties(){return{hass:{},config:{},_forecast:{state:!0},_dailyHourlyForecast:{state:!0},_loading:{state:!0},_error:{state:!0},_currentExpanded:{state:!0},_expandedDailyKey:{state:!0}}}constructor(){super(),this._forecast=[],this._dailyHourlyForecast=[],this._loading=!1,this._error="",this._lastFetchAt=0,this._lastEntityVersion="",this._requestToken=0,this._currentExpanded=!1,this._expandedDailyKey="",this._dragScrollActive=!1,this._dragScrollMoved=!1,this._dragPointerId=null,this._dragStartX=0,this._dragStartScrollLeft=0,this._dragThreshold=6,this._suppressClickUntil=0}disconnectedCallback(){super.disconnectedCallback(),this._endDragScroll()}setConfig(e){if(!e.entity)throw new Error("You need to define a weather entity");this.config={mode:"hourly",title:"",show_title:!0,language:"",hours_to_show:24,hourly_width_offset:0,skip_first:!1,background_color:"",icon_path:"",icon_extension:"svg",...e}}static getConfigForm(){return{schema:[{name:"entity",required:!0,selector:{entity:{domain:"weather"}}},{name:"mode",selector:{select:{mode:"dropdown",options:[{value:"hourly",label:"Hourly"},{value:"current",label:"Current"},{value:"daily",label:"Daily"}]}}},{name:"title",selector:{text:{}}},{name:"show_title",selector:{boolean:{}}},{name:"language",selector:{select:{mode:"dropdown",options:[{value:"",label:"Auto (Home Assistant locale)"},{value:"en",label:"English"},{value:"no",label:"Norwegian"},{value:"de",label:"German"}]}}},{name:"hours_to_show",selector:{number:{min:1,max:240,mode:"box"}}},{name:"hourly_width_offset",selector:{number:{min:0,max:200,mode:"box"}}},{name:"skip_first",selector:{boolean:{}}},{name:"background_color",selector:{text:{}}},{name:"card_background",selector:{text:{}}},{name:"icon_path",selector:{text:{}}}],computeHelper:e=>"entity"===e.name?"The weather entity used for weather.get_forecasts.":"mode"===e.name?"Choose whether the card renders hourly, current, or daily forecast data.":"hours_to_show"===e.name?"How many forecast hours to show in the horizontal strip.":"language"===e.name?"Optional language override. Leave on Auto to follow the Home Assistant frontend locale.":"hourly_width_offset"===e.name?"Optional extra width in pixels for hourly mode, useful in popups where the row gets clipped.":"skip_first"===e.name?"Skip the first forecast entry. Useful for daily mode when the first item overlaps with current conditions.":"background_color"===e.name?"Background color for the hourly forecast boxes, for example red, #2f2f2f, or var(--gray200).":"card_background"===e.name?"Optional background color for the outer ha-card shell.":"icon_path"===e.name?"Optional base path for local icon files. If empty, built-in Home Assistant icons are used.":void 0}}static getStubConfig(){return{entity:"weather.home"}}static async getConfigElement(){return document.createElement("mysmart-weather-card-editor")}getCardSize(){return 8}getGridOptions(){return{columns:12,min_columns:6,rows:8,min_rows:6}}updated(e){super.updated(e),this.hass&&this.config?.entity&&(e.has("hass")||e.has("config"))&&this._refreshForecast()}async _refreshForecast(){const e=this.hass?.states?.[this.config.entity];if(!e)return this._forecast=[],this._dailyHourlyForecast=[],this._expandedDailyKey="",void(this._error=`${this._localizeUi("entity_not_found","Entity not found")}: ${this.config.entity}`);const t=`${this.config.entity}|${this.config.mode}|${e.last_updated||e.last_changed||""}`,i=Date.now();if(!(!this._forecast.length||t!==this._lastEntityVersion||i-this._lastFetchAt>18e5)||this._loading)return;this._loading=!0,this._error="";const r=++this._requestToken;try{if("daily"===this.config.mode){const[e,t]=await Promise.allSettled([this._fetchForecastByType("daily"),this._fetchForecastByType("hourly")]);if(r!==this._requestToken)return;if("fulfilled"!==e.status)throw e.reason;this._forecast=e.value,this._dailyHourlyForecast="fulfilled"===t.status?t.value:[],"fulfilled"!==t.status&&console.warn("[MySmart Weather Card] Failed to load nested daily hourly forecast",t.reason)}else{const e=await this._fetchForecastByType("hourly");if(r!==this._requestToken)return;this._forecast=e,this._dailyHourlyForecast=[],this._expandedDailyKey=""}this._lastFetchAt=i,this._lastEntityVersion=t}catch(e){if(r!==this._requestToken)return;console.error("[MySmart Weather Card] Failed to load forecast",e),this._forecast=[],this._dailyHourlyForecast=[],this._expandedDailyKey="",this._error=e?.message||"Unable to load hourly forecast"}finally{r===this._requestToken&&(this._loading=!1)}}async _fetchForecastByType(e){const t=await this.hass.callApi("post","services/weather/get_forecasts?return_response",{entity_id:this.config.entity,type:e}),i=t?.service_response||t||{},r=i?.[this.config.entity]?.forecast;if(!Array.isArray(r))throw new Error(`No ${e} forecast data returned from weather.get_forecasts`);return r}_formatTime(e){const t=new Date(e);return new Intl.DateTimeFormat(this._localeForLanguage(),{hour:"2-digit",minute:"2-digit",hour12:!1}).format(t)}_localeForLanguage(){const e=this._getResolvedLanguageKey();return"no"===e?"nb-NO":"de"===e?"de-DE":"en-US"}_formatValue(e,t=1){if(null==e||Number.isNaN(Number(e)))return"-";const i=Number(e);return Number.isInteger(i)?`${i}`:i.toFixed(t)}_formatTemperatureUnit(e){return e&&e.replace(/[CFK]$/i,"").trim()||"°"}_formatConditionLabel(e){if(!e)return"";const t=this._getLocaleData().conditions?.[e]||le.en.conditions?.[e];return t||e.split("-").map(e=>e.charAt(0).toUpperCase()+e.slice(1)).join(" ")}_formatDayLabel(e){return new Intl.DateTimeFormat(this._localeForLanguage(),{weekday:"long"}).format(new Date(e))}_windSpeedInKmh(e,t){if(null==e||Number.isNaN(Number(e)))return null;const i=Number(e),r=(t||"").toLowerCase();return r.includes("m/s")?3.6*i:r.includes("mph")?1.60934*i:i}_windSpeedInMetersPerSecond(e,t){if(null==e||Number.isNaN(Number(e)))return null;const i=Number(e),r=(t||"").toLowerCase();return r.includes("km/h")?i/3.6:r.includes("mph")?.44704*i:i}_getWindStrengthLabel(e,t){const i=this._windSpeedInKmh(e,t);if(null===i)return"-";const r=this._getLocaleData().wind_strength||le.en.wind_strength,n=r.find(([e,t])=>i>=e&&i<=t);return n?.[2]||r[r.length-1]?.[2]||"-"}_getWindDirectionLabel(e){if(null==e||Number.isNaN(Number(e)))return"-";return(this._getLocaleData().wind_direction||le.en.wind_direction)[this._getWindDirectionIndex(e)]||"-"}_getWindDirectionIndex(e){if(null==e||Number.isNaN(Number(e)))return null;const t=(Number(e)%360+360)%360;return Math.round(t/45)%8}_renderWindDirectionValue(e){const t=this._getWindDirectionIndex(e),i=this._getWindDirectionLabel(e);return null===t?i:F`
      <span class="current-direction-value">
        <ha-icon class="current-direction-icon" .icon=${ce[t]}></ha-icon>
        <span>${i}</span>
      </span>
    `}_getDetailLabel(e){return(this._getLocaleData().current_details||le.en.current_details)[e]||e}_getResolvedLanguageKey(){return function(e,t){const i=(e||t||"en").toLowerCase();return"no"===i||i.startsWith("nb")||i.startsWith("nn")||i.startsWith("no-")?"no":"de"===i||i.startsWith("de-")?"de":"en"}(this.config?.language,this.hass?.locale?.language)}_getLocaleData(){return le[this._getResolvedLanguageKey()]||le.en}_localizeUi(e,t=""){return this._getLocaleData().ui?.[e]||le.en.ui?.[e]||t}_formatWindDisplay(e,t){const i=this._windSpeedInMetersPerSecond(e,t);return null===i?"-":`${this._formatValue(i)}m/s`}_calculateFeelsLike(e,t){const i=Number(e.temperature??e.templow),r=this._windSpeedInKmh(e.wind_speed,t.wind);if(Number.isNaN(i)||null===r)return null;return 13.12+.6215*i-11.37*r**.16+.3965*i*r**.16}_iconForCondition(e){return de[e]||"mdi:weather-partly-cloudy"}_renderIcon(e){if(this.config.icon_path){const t=this.config.icon_path.replace(/\/$/,""),i=this.config.icon_extension||"svg",r=e.condition||"cloudy";return F`
        <div class="hour-icon-wrap">
          <img
            class="hour-icon-image"
            src=${`${t}/${r}.${i}`}
            data-fallback-src=${`${t}/${r}.png`}
            data-mdi-fallback=${this._iconForCondition(e.condition)}
            alt=${e.condition||"weather"}
            loading="lazy"
            @error=${this._handleIconError}
          />
          <ha-icon class="hour-icon hour-icon-fallback" .icon=${this._iconForCondition(e.condition)}></ha-icon>
        </div>
      `}return F`
      <ha-icon class="hour-icon" .icon=${this._iconForCondition(e.condition)}></ha-icon>
    `}_handleIconError(e){const t=e.currentTarget,i=t.dataset.fallbackSrc;if(i&&t.src!==i)return void(t.src=i);t.style.display="none";const r=t.closest(".hour-icon-wrap"),n=r?.querySelector(".hour-icon-fallback");n&&(n.style.display="block"),console.warn("[MySmart Weather Card] Icon not found for condition:",t.alt,t.src)}_renderHour(e,t,i={}){const r=e.temperature??e.templow,n=e.precipitation??0,s=i.nested?"hour-card hour-card--nested":"hour-card";return F`
      <div class=${s}>
        <div class="hour-time">${this._formatTime(e.datetime)}</div>
        ${this._renderIcon(e)}
        <div class="hour-temp">
          ${this._formatValue(r)}${t.temperature}
        </div>
        <div class="hour-meta">
          ${this._formatWindDisplay(e.wind_speed,t.wind)}
        </div>
        <div class="hour-meta">
          ${this._formatValue(n)}${t.precipitation}
        </div>
      </div>
    `}_renderCurrent(e,t){const i=e.temperature??e.templow,r=this._calculateFeelsLike(e,t),n=!1!==this.config.show_title,s=this._currentExpanded,o=e.wind_gust_speed??null,a=null!=o?F`
          ${this._formatWindDisplay(e.wind_speed,t.wind)}
          <span class="current-detail-secondary">(${this._formatWindDisplay(o,t.wind)})</span>
        `:this._formatWindDisplay(e.wind_speed,t.wind),l=[{key:"rain",value:F`
      ${this._formatValue(e.precipitation??0)}${t.precipitation}
      <span class="current-detail-secondary">(${this._formatValue(e.precipitation_probability??0)}%)</span>
    `},{key:"wind_direction",value:this._renderWindDirectionValue(e.wind_bearing)},{key:"wind_speed",value:a},{key:"humidity",value:`${this._formatValue(e.humidity??0)}%`},{key:"uv_index",value:this._formatValue(e.uv_index??0)},{key:"cloud_coverage",value:`${this._formatValue(e.cloud_coverage??0)}%`}];return F`
      <div
        class="current-card ${s?"expanded":""}"
        role="button"
        tabindex="0"
        aria-expanded=${String(s)}
        @click=${this._toggleCurrentExpanded}
        @keydown=${this._handleCurrentKeydown}
      >
        <div class="current-summary">
          <div class="current-main">
            ${n?F`<div class="current-title">${this.config.title||this._localizeUi("current_weather","Current weather")}</div>`:""}
            <div class="current-temp-row">
              <div class="current-temp">${this._formatValue(i)}${t.temperature}</div>
              ${null!==r?F`<div class="current-feels">${this._formatValue(r)}${t.temperature}</div>`:""}
            </div>
            <div class="current-meta-row">
              <span class="current-condition">${this._formatConditionLabel(e.condition)}</span>
              <span class="current-meta">${this._getWindStrengthLabel(e.wind_speed,t.wind)}</span>
            </div>
          </div>
          <div class="current-icon-block">
            ${this._renderIcon(e)}
          </div>
        </div>
        <div class="current-details-shell ${s?"expanded":""}">
          <div class="current-details-grid">
            ${l.map(e=>F`
              <div class="current-detail-item">
                <div class="current-detail-label">${this._getDetailLabel(e.key)}</div>
                <div class="current-detail-value">${e.value}</div>
              </div>
            `)}
          </div>
        </div>
        <div class="current-expand-indicator" aria-hidden="true">
          <ha-icon
            class="current-expand-icon"
            .icon=${"mdi:chevron-down"}
          ></ha-icon>
        </div>
      </div>
    `}_toggleCurrentExpanded(){this._currentExpanded=!this._currentExpanded}_handleCurrentKeydown(e){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleCurrentExpanded())}_getDayKey(e){const t=new Date(e);return`${t.getFullYear()}-${`${t.getMonth()+1}`.padStart(2,"0")}-${`${t.getDate()}`.padStart(2,"0")}`}_getDailyHourlyItems(e){const t=this._getDayKey(e.datetime);return this._dailyHourlyForecast.filter(e=>this._getDayKey(e.datetime)===t)}_toggleDailyExpanded(e){this._expandedDailyKey=this._expandedDailyKey===e?"":e}_handleDailyKeydown(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._toggleDailyExpanded(t))}_renderDaily(e,t){const i=this._calculateFeelsLike(e,t),r=e.precipitation??0,n=this._getDayKey(e.datetime),s=this._getDailyHourlyItems(e),o=s.length>0,a=o&&this._expandedDailyKey===n;return F`
      <div class="daily-card ${a?"expanded":""}">
        <div
          class="daily-summary ${o?"expandable":""}"
          role=${o?"button":K}
          tabindex=${o?"0":"-1"}
          aria-expanded=${o?String(a):K}
          @click=${o?()=>this._toggleDailyExpanded(n):null}
          @keydown=${o?e=>this._handleDailyKeydown(e,n):null}
        >
          <div class="daily-icon-block">
            ${this._renderIcon(e)}
          </div>
          <div class="daily-main">
            <div class="daily-day">${this._formatDayLabel(e.datetime)}</div>
            <div class="daily-meta-row">
              <span class="daily-condition">${this._formatConditionLabel(e.condition)}</span>
              <span class="daily-meta">${this._formatValue(r)}${t.precipitation}</span>
            </div>
          </div>
          <div class="daily-temp-block">
            <div class="daily-temp-row">
              <div class="daily-temp">${this._formatValue(e.temperature)}${t.temperature}</div>
              ${null!==i?F`<div class="daily-feels">${this._formatValue(i)}${t.temperature}</div>`:""}
            </div>
          </div>
        </div>
        ${o?F`
          <div class="daily-hours-shell ${a?"expanded":""}">
            ${this._renderHourlyContent(s,t,{nested:!0})}
          </div>
        `:""}
        ${o?F`
          <div class="daily-expand-indicator" aria-hidden="true">
            <ha-icon
              class="current-expand-icon"
              .icon=${"mdi:chevron-down"}
            ></ha-icon>
          </div>
        `:""}
      </div>
    `}_startDragScroll(e){if("mouse"!==e.pointerType||0!==e.button)return;const t=e.currentTarget;this._dragScrollActive=!0,this._dragScrollMoved=!1,this._dragPointerId=e.pointerId,this._dragStartX=e.clientX,this._dragStartScrollLeft=t.scrollLeft,t.classList.add("drag-ready"),t.setPointerCapture?.(e.pointerId)}_moveDragScroll(e){if(!this._dragScrollActive||e.pointerId!==this._dragPointerId)return;const t=e.currentTarget,i=e.clientX-this._dragStartX;!this._dragScrollMoved&&Math.abs(i)<this._dragThreshold||(this._dragScrollMoved||(this._dragScrollMoved=!0,t.classList.remove("drag-ready"),t.classList.add("dragging")),t.scrollLeft=this._dragStartScrollLeft-i,e.preventDefault())}_handleDragClick(e){Date.now()<this._suppressClickUntil&&(e.preventDefault(),e.stopPropagation())}_endDragScroll(e){if(e&&null!==this._dragPointerId&&e.pointerId!==this._dragPointerId)return;const t=e?.currentTarget||this.renderRoot?.querySelector(".hours-scroll.dragging, .hours-scroll.drag-ready");t&&(this._dragScrollMoved&&(this._suppressClickUntil=Date.now()+150),t.classList.remove("dragging"),t.classList.remove("drag-ready"),e&&t.hasPointerCapture?.(e.pointerId)&&t.releasePointerCapture(e.pointerId)),this._dragScrollActive=!1,this._dragScrollMoved=!1,this._dragPointerId=null}_renderHourlyContent(e,t,i={}){const r=i.nested?"hours-scroll hours-scroll--nested":"hours-scroll",n=i.nested?"hours-row hours-row--nested":"hours-row";return F`
      <div
        class=${r}
        @pointerdown=${this._startDragScroll}
        @pointermove=${this._moveDragScroll}
        @pointerup=${this._endDragScroll}
        @pointercancel=${this._endDragScroll}
        @pointerleave=${this._endDragScroll}
        @click=${this._handleDragClick}
      >
        <div class=${n}>
          ${e.map(e=>this._renderHour(e,t,i))}
        </div>
      </div>
    `}_getDisplayUnits(e){return{temperature:this._formatTemperatureUnit(e.attributes.temperature_unit||"°"),wind:e.attributes.wind_speed_unit||"",precipitation:e.attributes.precipitation_unit||"mm"}}_getModeState(){return{isCurrent:"current"===this.config.mode,isDaily:"daily"===this.config.mode,isHourly:"hourly"===this.config.mode}}_getHourlyItems(){return this._forecast.slice(0,this.config.hours_to_show||24)}_getDailyItems(){return this.config.skip_first?this._forecast.slice(1):this._forecast}_getCardStyle(e){const{isCurrent:t,isDaily:i,isHourly:r}=e,n=t||i?"none":this.config.card_background,s=Math.max(0,Number(this.config.hourly_width_offset)||0),o=r&&s?Math.round(s/2):0;return[n?`background: ${n};`:"",r&&s?`margin: 0 0 0 ${-o}px;`:"",r&&s?`width: calc(100% + ${s}px);`:"",r&&s?"--ha-card-border-radius: 0px;":""].filter(Boolean).join(" ")}_getShellStyle(e){const{isCurrent:t,isDaily:i,isHourly:r}=e,n=t||i?"none":this.config.card_background,s=Math.max(0,Number(this.config.hourly_width_offset)||0),o=r&&s?Math.round(s/2):0;return[this.config.background_color?`--forecast-surface: ${this.config.background_color};`:"","none"===n?"--card-shell-padding: 12px 0;":"",r&&s?`--hourly-end-padding: ${o}px;`:"",r&&s?`--hourly-start-padding: ${12+o}px;`:""].filter(Boolean).join(" ")}_renderStatusMessage(e,t=!1){return F`<div class="message ${t?"error":""}">${e}</div>`}_renderDailyContent(e,t){return F`
      <div class="daily-list">
        ${e.map(e=>this._renderDaily(e,t))}
      </div>
    `}_renderModeContent(e,t){const{isCurrent:i,isDaily:r}=e,n=this._getHourlyItems(),s=this._getDailyItems(),o=this._forecast[0];return this._loading&&!this._forecast.length?this._renderStatusMessage(this._localizeUi("loading_forecast","Loading forecast...")):i?o?this._renderCurrent(o,t):this._renderStatusMessage(this._localizeUi("no_current_data","No current forecast data available.")):r?s.length?this._renderDailyContent(s,t):this._renderStatusMessage(this._localizeUi("no_daily_data","No daily forecast data available.")):n.length?this._renderHourlyContent(n,t):this._renderStatusMessage(this._localizeUi("no_forecast_data","No forecast data available."))}render(){if(!this.config||!this.hass)return F``;const e=this.hass.states[this.config.entity];if(!e)return F`
        <ha-card>
          <div class="message">${this._localizeUi("entity_not_found","Entity not found")}: ${this.config.entity}</div>
        </ha-card>
      `;const t=this._getModeState(),i=this._getDisplayUnits(e),r=this.config.title||e.attributes.friendly_name||"Hourly forecast",n=!1!==this.config.show_title,s=this._getCardStyle(t),o=this._getShellStyle(t);return F`
      <ha-card style=${s}>
        <div
          class="card-shell"
          style=${o}
        >
          ${n&&!t.isCurrent?F`<div class="card-header">${r}</div>`:""}

          ${this._error?this._renderStatusMessage(this._error,!0):""}

          ${this._renderModeContent(t,i)}
        </div>
      </ha-card>
    `}static get styles(){return s`
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
        overflow: hidden;
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
    `}}customElements.get("mysmart-weather-card")||customElements.define("mysmart-weather-card",he),window.customCards=window.customCards||[],window.customCards.push({type:"mysmart-weather-card",name:"MySmart Weather Card",preview:!0,description:"A multi-mode weather card powered by weather.get_forecasts."});class ue extends oe{static get properties(){return{hass:{},_config:{state:!0}}}setConfig(e){this._config={...e}}_valueChanged(e){if(!this._config)return;const t=e.target,i=t.configValue;let r=e.detail?.value??t.value;if("show_title"===i&&(r=t.checked),"skip_first"===i&&(r=t.checked),"mode"===i&&(r=e.target.value),"language"===i&&(r=e.target.value),"hours_to_show"!==i&&"hourly_width_offset"!==i||(r=Number.parseInt(r,10),Number.isNaN(r)&&(r="hours_to_show"===i?24:0)),!i||this._config[i]===r)return;const n={...this._config};""===r||null==r?delete n[i]:n[i]=r,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:n},bubbles:!0,composed:!0}))}render(){return this.hass?F`
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
            .value=${this._config?.language||""}
            .configValue=${"language"}
            @change=${this._valueChanged}
          >
            <option value="">Auto (Home Assistant locale)</option>
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
    `:F``}static get styles(){return s`
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
    `}}customElements.get("mysmart-weather-card-editor")||customElements.define("mysmart-weather-card-editor",ue);
//# sourceMappingURL=mysmart-weather-card.js.map
