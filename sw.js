if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let o={};const t=e=>i(e,l),u={module:{uri:l},exports:o,require:t};s[l]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/_plugin-vue_export-helper-c27b6911.js",revision:null},{url:"assets/AddDrink-734b37f7.js",revision:null},{url:"assets/browser-69d2585b.js",revision:null},{url:"assets/Drink-1c8056e5.js",revision:null},{url:"assets/Home-78122a03.js",revision:null},{url:"assets/index-8c08128b.css",revision:null},{url:"assets/index-9d8f7865.js",revision:null},{url:"index.html",revision:"0e49ae3d4a18ac174f2de340554b6657"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icons/logo_192.png",revision:"989764b3b7c48ad5e78201ee06209338"},{url:"icons/logo_512.png",revision:"0a4fd339d0b294c7f48ec2130fb4d14b"},{url:"manifest.webmanifest",revision:"01acb39ebdab7effaed92724876aaa82"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));