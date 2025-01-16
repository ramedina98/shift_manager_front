import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

process.env.DIST = path.join(__dirname, '../dist');
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, '../public');


let win: BrowserWindow | null;
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];

function createWindow() {
    win = new BrowserWindow({
        minWidth: 850,
        minHeight: 850,
        icon: '../public/assets/icon.ico',
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            //preload: path.join(__dirname, 'preload.ts'),
            webSecurity: true,
        },
    })

    win.webContents.on('did-finish-load', () => {
        win?.webContents.send('main-process-message', (new Date).toLocaleString())
    });

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(VITE_DEV_SERVER_URL);
    } else {
        win.loadFile(path.join(process.env.DIST, 'index.html'));
    }

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