import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');


let win: BrowserWindow | null;

function createWindow() {
    win = new BrowserWindow({
        minWidth: 850,
        minHeight: 850,
        icon: path.join(__dirname, '../public/assets/icon.ico'),
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            preload: path.join(__dirname, 'preload.mjs'),
            webSecurity: false,
        },
    })

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    });

    win.loadFile(path.join(app.getAppPath(), 'dist', 'index.html'));
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