"use strict";const i=require("electron");i.contextBridge.exposeInMainWorld("ipcRenderer",s(i.ipcRenderer));function c(){console.log("Hola print")}i.contextBridge.exposeInMainWorld("electronAPI",{print:c});function s(e){const t=Object.getPrototypeOf(e);for(const[n,o]of Object.entries(t))Object.prototype.hasOwnProperty.call(e,n)||(typeof o=="function"?e[n]=function(...d){return o.call(e,...d)}:e[n]=o);return e}function p(e=["complete","interactive"]){return new Promise(t=>{e.includes(document.readyState)?t(!0):document.addEventListener("readystatechange",()=>{e.includes(document.readyState)&&t(!0)})})}const r={append(e,t){Array.from(e.children).find(n=>n===t)||e.appendChild(t)},remove(e,t){Array.from(e.children).find(n=>n===t)&&e.removeChild(t)}};function u(){const e="loaders-css__square-spin",t=`
@keyframes square-spin {
    25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
    50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
    75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
    100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${e} > div {
    animation-fill-mode: both;
    width: 150px;
    height: 150px;
    border-radius: 100%;
    background: #8399b0;
    background-image: url('https://lirp.cdn-website.com/a7da7508/dms3rep/multi/opt/352-147w.png');
    background-size: cover;
    background-position: center;
    animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #1d3245;
    z-index: 9;
}
    `,n=document.createElement("style"),o=document.createElement("div");return n.id="app-loading-style",n.innerHTML=t,o.className="app-loading-wrap",o.innerHTML=`<div class="${e}"><div></div></div>`,{appendLoading(){r.append(document.head,n),r.append(document.body,o)},removeLoading(){r.remove(document.head,n),r.remove(document.body,o)}}}const{appendLoading:l,removeLoading:a}=u();p().then(l);window.onmessage=e=>{e.data.payload==="removeLoading"&&a()};setTimeout(a,3e3);
