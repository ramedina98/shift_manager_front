import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public')


let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        // TODO: icon: path.join(__dirname, '../public/folder.icns'),
        minWidth: 750,
        minHeight: 750,
        webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        nodeIntegrationInWorker: true,
        nodeIntegrationInSubFrames: true,
        preload: path.join(__dirname, 'preload.mjs'),
        webSecurity: true,
        },
    })

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    });


    // TODO: cuando ya este por lanzar, hay que cambiar esto para que lea el index.html
    win.loadURL('http://localhost:5173/');
    // win.loadFile(path.join(process.env.DIST, 'index.html'));

    win.webContents.openDevTools();

}

ipcMain.handle('print', (_event, content: string)=> {
    console.log('Print: ' + content);
})

app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.on('activate', () => {

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

app.whenReady().then(createWindow);