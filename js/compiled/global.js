(function(a){function b(e){var a=f["$"+e]||window[e];if(!a)throw Error("Ender Error: Requested module '"+e+"' has not been defined.");return a}function d(e,a){return f["$"+e]=a}function c(e,a){var b,c;this.selector=e;"undefined"==typeof e?(b=[],this.selector=""):b="string"==typeof e||e.nodeName||e.length&&"item"in e||e==window?g._select(e,a):isFinite(e.length)?e:[e];for(c=this.length=b.length;c--;)this[c]=b[c]}function g(e,a){return new c(e,a)}a.global=a;var f={},k=a.$,h=a.ender,i=a.require,j=a.provide;
a.provide=d;a.require=b;c.prototype.forEach=function(a,b){var c,g;c=0;for(g=this.length;c<g;++c)c in this&&a.call(b||this[c],this[c],c,this);return this};c.prototype.$=g;g._VERSION="0.4.3-dev";g.fn=c.prototype;g.ender=function(a,b){var d=b?c.prototype:g,f;for(f in a)"noConflict"!=f&&"_VERSION"!=f&&(d[f]=a[f])};g._select=function(a,c){return"string"==typeof a?(c||document).querySelectorAll(a):a.nodeName?[a]:a};g.noConflict=function(c){a.$=k;c&&(a.provide=j,a.require=i,a.ender=h,"function"==typeof c&&
c(b,d,this));return this};"undefined"!==typeof module&&module.exports&&(module.exports=g);a.ender=a.$=g})(this);(function(){var a=ender;a.ender({fitText:function(b){var d=b||1;return this.forEach(function(){var c=a(this)[0],b=parseFloat(window.getComputedStyle(c).getPropertyValue("font-size")),f=function(){c.style.fontSize=Math.min(c.offsetWidth/(10*d),b)+"px"};f();window.addEventListener("resize",f,!1)})}},!0);!0;provide("ender-fittext",{})})();
(function(){var a={exports:{}};!function(c,b){"undefined"!=typeof a?a.exports=b():"function"==typeof define&&"object"==typeof define.amd?define(b):this[c]=b()}("domready",function(a){function b(a){for(e=1;a=f.shift();)a()}var f=[],d,h=document,i=h.documentElement,j=i.doScroll,e=/^loade|c/.test(h.readyState);h.addEventListener&&h.addEventListener("DOMContentLoaded",d=function(){h.removeEventListener("DOMContentLoaded",d,!1);b()},!1);j&&h.attachEvent("onreadystatechange",d=function(){/^c/.test(h.readyState)&&
(h.detachEvent("onreadystatechange",d),b())});return a=j?function(b){if(self!=top)e?b():f.push(b);else a:{try{i.doScroll("left")}catch(d){setTimeout(function(){a(b)},50);break a}b()}}:function(a){e?a():f.push(a)}});provide("domready",a.exports);var b=ender,d=require("domready");b.ender({domReady:d});b.ender({ready:function(a){d(a);return this}},!0);!0})();var clic,id;
clic=function(a,b,d){null==b&&(b=500);null==d&&(d=300);return a.onclick=function(){window.open(a.href,"","width="+b+", height="+d);return!1}};id=function(a){return document.getElementById(a)};window.getComputedStyle||(window.getComputedStyle=function(a){this.el=a;this.getPropertyValue=function(b){var d=/(\-([a-z]){1})/g;"float"==b&&(b="styleFloat");d.test(b)&&(b=b.replace(d,function(a,b,d){return d.toUpperCase()}));return a.currentStyle[b]?a.currentStyle[b]:null};return this});

$.domReady(function () {
  $('.fullsizestuff').fitText(0.65);

  var facebook_id, tweet_id;
  tweet_id = id("tweet");
  facebook_id = id("facebook");
  if (tweet_id) {

    clic(tweet_id);
  }
  if (facebook_id) {
    return clic(facebook_id, 640, 280);
  }
});