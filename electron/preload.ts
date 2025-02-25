import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))

function printTicket(): void{
    console.log('Hola print');
}

contextBridge.exposeInMainWorld('electronAPI', {
    print: printTicket,
});

function withPrototype(obj: Record<string, any>) {
    const protos = Object.getPrototypeOf(obj)

    for (const [key, value] of Object.entries(protos)) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) continue

        if (typeof value === 'function') {

        obj[key] = function (...args: any) {
            return value.call(obj, ...args)
        }
        } else {
        obj[key] = value
        }
    }
    return obj
}

function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
    return new Promise(resolve => {
        if (condition.includes(document.readyState)) {
        resolve(true)
        } else {
        document.addEventListener('readystatechange', () => {
            if (condition.includes(document.readyState)) {
            resolve(true)
            }
        })
        }
    })
}

const safeDOM = {
    append(parent: HTMLElement, child: HTMLElement) {
        if (!Array.from(parent.children).find(e => e === child)) {
        parent.appendChild(child)
        }
    },
    remove(parent: HTMLElement, child: HTMLElement) {
        if (Array.from(parent.children).find(e => e === child)) {
            parent.removeChild(child)
        }
    },
}

function useLoading() {
    const className = `loaders-css__square-spin`
    const styleContent = `
@keyframes square-spin {
    25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
    50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
    75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
    100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
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
    `
    const oStyle = document.createElement('style')
    const oDiv = document.createElement('div')

    oStyle.id = 'app-loading-style'
    oStyle.innerHTML = styleContent
    oDiv.className = 'app-loading-wrap'
    oDiv.innerHTML = `<div class="${className}"><div></div></div>`

    return {
        appendLoading() {
            safeDOM.append(document.head, oStyle)
            safeDOM.append(document.body, oDiv)
        },
        removeLoading() {
            safeDOM.remove(document.head, oStyle)
            safeDOM.remove(document.body, oDiv)
        },
    }
}

const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = ev => {
    ev.data.payload === 'removeLoading' && removeLoading()
}

setTimeout(removeLoading, 3000)