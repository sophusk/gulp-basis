!function(t,e){"function"==typeof define&&define.amd?define([],function(){return t.objectFitPolyfill=e()}):"object"==typeof module&&module.exports?module.exports=e():t.objectFitPolyfill=e()}(this,function(){"use strict";if("objectFit"in document.documentElement.style==!1){var t=function(t){var e=window.getComputedStyle(t,null),i=e.getPropertyValue("position"),o=e.getPropertyValue("overflow"),n=e.getPropertyValue("display");i&&"static"!==i||(t.style.position="relative"),"hidden"!==o&&(t.style.overflow="hidden"),n&&"inline"!==n||(t.style.display="block"),0===t.clientHeight&&(t.style.height="100%"),t.className=t.className+" object-fit-polyfill"},e=function(t){var e=window.getComputedStyle(t,null),i={"max-width":"none","max-height":"none","min-width":"0px","min-height":"0px"};for(var o in i){var n=e.getPropertyValue(o);n!==i[o]&&(t.style[o]=i[o])}},i=function(t,e,i){i=i.split(" ");var o,n,l,a,d;if("x"===t)o=i[0],n=i[1],l="left",a="right",d=e.clientWidth;else{if("y"!==t)return;o=i[1],n=i[0],l="top",a="bottom",d=e.clientHeight}return o===l||n===l?void(e.style[l]="0"):o===a||n===a?void(e.style[a]="0"):"center"===o||"50%"===o?(e.style[l]="50%",void(e.style["margin-"+l]=d/-2+"px")):o.indexOf("%")>=0?(o=parseInt(o),void(o<50?(e.style[l]=o+"%",e.style["margin-"+l]=d*(o/-100)+"px"):(o=100-o,e.style[a]=o+"%",e.style["margin-"+a]=d*(o/-100)+"px"))):void(e.style[l]=o)},o=function(o){var n=o.dataset?o.dataset.objectFit:o.getAttribute("data-object-fit"),l=o.dataset?o.dataset.objectPosition:o.getAttribute("data-object-position");n=n||"cover",l=l||"50% 50%";var a=o.parentNode;t(a),e(o),o.style.position="absolute",o.style.height="100%",o.style.width="auto","scale-down"===n&&(o.style.height="auto",o.clientWidth<a.clientWidth&&o.clientHeight<a.clientHeight?(i("x",o,l),i("y",o,l)):(n="contain",o.style.height="100%")),"none"===n?(o.style.width="auto",o.style.height="auto",i("x",o,l),i("y",o,l)):"cover"===n&&o.clientWidth>a.clientWidth||"contain"===n&&o.clientWidth<a.clientWidth?(o.style.top="0",o.style.marginTop="0",i("x",o,l)):"scale-down"!==n&&(o.style.width="100%",o.style.height="auto",o.style.left="0",o.style.marginLeft="0",i("y",o,l))},n=function(){for(var t=document.querySelectorAll("[data-object-fit]"),e=0;e<t.length;e++){var i=t[e].nodeName.toLowerCase();"img"===i?t[e].complete?o(t[e]):t[e].addEventListener("load",function(){o(this)}):"video"===i&&(t[e].readyState>0?o(t[e]):t[e].addEventListener("loadedmetadata",function(){o(this)}))}};return n}}),"function"==typeof objectFitPolyfill&&(document.addEventListener("DOMContentLoaded",function(){objectFitPolyfill()}),window.addEventListener("resize",function(){objectFitPolyfill()}));
document.addEventListener("DOMContentLoaded", function () {
    'use strict';
    
    var components = document.querySelectorAll("[data-js-init]");
    
    console.log("initializing components");
    
    [].forEach.call(components, function (component) {
        var
            initCommandStr = component.dataset.jsInit,
            tmp, 
            command,
            initArgNamesStr = component.dataset.jsArgNames,
            initArgNames = initArgNamesStr ? initArgNamesStr.split(',') : [],
            initArgs = [];
        
        try {
            tmp = eval(initCommandStr);
        } catch (e) {
            console.debug("Failed to initialize ", initCommandStr);
            console.debug(e);
            return;
        }

        initArgNames.forEach(function (argName) {
           initArgs.push(component.dataset[argName]); 
        });
        
        if (typeof(tmp) === "function") {
            command = tmp;
        } else if (tmp["initialize"] && typeof(tmp["initialize"]) === "function") {
            command = tmp["initialize"];
        }
        
        if (command) {
            command.apply(component, [component].concat(initArgs));
        }
    });
});

(function () {
    'use strict';
    
    var links = Array.prototype.slice.call(document.querySelectorAll('.main-nav__link'));
    var pathRegex = new RegExp(location.pathname + '$', 'i');
    links.forEach(function (link) {
        if (pathRegex.test(link.href)) {
            link.classList.add('selected');
        } 
    });
})();

(function () {
    'use strict';
    
    window.utils = window.utils || {};
    window.utils.getSelectedOptionValues = function (name) {
        // Pass the checkbox name to the function
        var options = Array.prototype.slice.call(document.getElementsByName(name));
        var values = [];
        // loop over them all
        options.forEach(function (option, i) {
            if (option.checked && option.dataset.value) {
                values.push(option.dataset.value);
            } 
        });
        // Return the array if it is non-empty, or null
        return values.length > 0 ? values : null;
    };
    
})();
//# sourceMappingURL=bundle.js.map
