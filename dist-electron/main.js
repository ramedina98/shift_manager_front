import { app, ipcMain, BrowserWindow } from "electron";
import path from "path";
process.env.DIST = path.join(app.getAppPath(), "dist");
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");
let win;
function createWindow() {
  win = new BrowserWindow({
    minWidth: 850,
    minHeight: 850,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      preload: path.join(app.getAppPath(), "dist-electron/preload.mjs"),
      webSecurity: true
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.loadURL("file://" + path.join(app.getAppPath(), "dist/index.html"));
}
ipcMain.handle("print", (_event, content) => {
  console.log("Print: " + content);
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.whenReady().then(createWindow);
