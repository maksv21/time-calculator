(this["webpackJsonptime-calculator"]=this["webpackJsonptime-calculator"]||[]).push([[0],{17:function(n,e,t){n.exports=t(30)},22:function(n,e,t){},30:function(n,e,t){"use strict";t.r(e);var r=t(0),a=t.n(r),i=t(7),o=t.n(i),c=(t(22),t(1)),u=t(2),l=t(5);function f(){var n=Object(c.a)(["\n  height: 30px; // height if there's no value\n  font-size: 25px; \n  overflow: auto;\n"]);return f=function(){return n},n}function s(){var n=Object(c.a)(["\n  height: 50px; // height if there's no value\n  font-size: 40px;\n  overflow: auto;\n"]);return s=function(){return n},n}function v(){var n=Object(c.a)(["\n  height: 100%;\n  display: flex;\n  justify-content: center;\n  flex-flow: column;\n  text-align: right;\n  padding: 0 10px;\n"]);return v=function(){return n},n}var d=u.a.div(v()),h=u.a.div(s()),g=u.a.div(f()),p=function(){var n=Object(l.c)((function(n){return n.mainInput})),e=n.value,t=n.preResult;return a.a.createElement(d,null,a.a.createElement(h,null,e),a.a.createElement(g,null,t))};function b(){var n=Object(c.a)(["\n  width: 100%;\n  flex-shrink: 3;\n  background-color: #26a69a;\n  display: flex;\n  flex-direction: column;\n"]);return b=function(){return n},n}function w(){var n=Object(c.a)(["\n  display: flex;\n  height: 100%;\n"]);return w=function(){return n},n}function m(){var n=Object(c.a)(["\n  background-color: #f7f7f7;\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"]);return m=function(){return n},n}function E(){var n=Object(c.a)(["\n  background-color: rgba(0,0,0,0);\n  border: none;\n  height: 100%;\n  width: 100%;\n  font-size: 14pt;\n"]);return E=function(){return n},n}function O(){var n=Object(c.a)(["\n  height: 100%;\n  display: flex;\n"]);return O=function(){return n},n}var k=[["7","8","9"],["4","5","6"],["1","2","3"],[".","0",":"],["="]],j=["C","DEL","\xf7","\xd7","-","+"],y=u.a.div(O()),x=u.a.button(E()),S=u.a.div(m()),_=u.a.div(w()),R=u.a.div(b()),D=function(n,e){return a.a.createElement(x,{key:n,onClick:function(){return e({type:"KEY_PRESSED",keyValue:n})}},n)},W=function(){var n=Object(l.b)();return a.a.createElement(y,null,a.a.createElement(S,null,k.map((function(e){return a.a.createElement(_,{key:e},e.map((function(e){return D(e,n)})))}))),a.a.createElement(R,null,j.map((function(e){return D(e,n)}))))};function C(){var n=Object(c.a)(["\n  height: 65%;\n"]);return C=function(){return n},n}function L(){var n=Object(c.a)(["\n  height: 35%;\n"]);return L=function(){return n},n}function N(){var n=Object(c.a)(["\n  height: 100%;\n  width: 100%;\n"]);return N=function(){return n},n}var T=u.a.div(N()),A=u.a.div(L()),I=u.a.div(C());var U=function(){return a.a.createElement(T,null,a.a.createElement(A,null,a.a.createElement(p,null)),a.a.createElement(I,null,a.a.createElement(W,null)))},P=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function V(n,e){navigator.serviceWorker.register(n).then((function(n){n.onupdatefound=function(){var t=n.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),e&&e.onUpdate&&e.onUpdate(n)):(console.log("Content is cached for offline use."),e&&e.onSuccess&&e.onSuccess(n)))})}})).catch((function(n){console.error("Error during service worker registration:",n)}))}var X=t(4),z=t(10),B=t(16),J={error:"Error: Bad expression"},K=function(n){if((e=n).replace(/[^0-9:.\xf7\xd7+-]/g,"").replace(/[-+\xf7\xd7.:]{2,}/g,(function(n){return n[n.length-1]}))!==e)return J;var e,t=n.replace(/[\xf7\xd7]/g,(function(n){return"\xd7"===n?"*":"/"})).replace(/^0+[1-9]/g,(function(n){return n.slice(-1)})).replace(/[^\d]0[1-9]/g,(function(n){return n.replace("0","")})).replace(/\d+:\d*/g,(function(n){var e=n.split(":");return e[1]=String(e[1]/60),(+e[0]+ +e[1]).toString()}));try{var r=new Function("return "+t)();return r===1/0?J:function(n){var e=n.toString().split("."),t=Object(B.a)(e,2),r=t[0],a=t[1];return a="0."+a,a=(a=Math.round(60*a))?("0"+a).slice(-2):"00",r+":"+a}(r)}catch(a){return J}};var M={value:"",preResult:null},Y=Object(X.b)({mainInput:function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:M,e=arguments.length>1?arguments[1]:void 0,t=e.type,r=e.keyValue;if("KEY_PRESSED"===t){var a,i;switch(r){case"=":var o=K(n.value);o.error?(a=n.value,i=o.error):(a=o,i="");break;case"DEL":a=n.value.slice(0,-1);break;case"C":a="";break;default:a="-"!==r&&"-+\xf7\xd7.:".includes(r)&&(""===n.value||"-"===n.value)||n.value.length>=3&&n.value.slice(-2).match(new RegExp("[".concat("-+\xf7\xd7.:","]{2}")))&&"-+\xf7\xd7.:".includes(r)?n.value:"-+\xf7\xd7.:".includes(r)&&"-+\xf7\xd7.:".includes(n.value.slice(-1))&&("-"===n.value.slice(-1)||"-"!==r)?n.value.slice(0,-1)+r:n.value+r}if(void 0===i){var c=K(a);i=c.error?"":c}return Object(z.a)(Object(z.a)({},n),{},{value:a,preResult:i})}return n}}),F=Object(X.c)(Y,window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(l.a,{store:F},a.a.createElement(U,null))),document.getElementById("root")),function(n){if("serviceWorker"in navigator){if(new URL("/time-calculator",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var e="".concat("/time-calculator","/service-worker.js");P?(!function(n,e){fetch(n,{headers:{"Service-Worker":"script"}}).then((function(t){var r=t.headers.get("content-type");404===t.status||null!=r&&-1===r.indexOf("javascript")?navigator.serviceWorker.ready.then((function(n){n.unregister().then((function(){window.location.reload()}))})):V(n,e)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(e,n),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):V(e,n)}))}}()}},[[17,1,2]]]);
//# sourceMappingURL=main.60ae0a04.chunk.js.map