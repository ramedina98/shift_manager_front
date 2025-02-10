import { app as e, ipcMain as s, BrowserWindow as o } from "electron";
import t from "path";
process.env.DIST = t.join(e.getAppPath(), "dist");
process.env.VITE_PUBLIC = e.isPackaged ? process.env.DIST : t.join(process.env.DIST, "../public");
let n;
function i() {
  n = new o({
    minWidth: 850,
    minHeight: 850,
    webPreferences: {
      contextIsolation: !0,
      nodeIntegration: !0,
      nodeIntegrationInWorker: !0,
      nodeIntegrationInSubFrames: !0,
      preload: t.join(e.getAppPath(), "dist-electron/preload.mjs"),
      webSecurity: !0
    }
  }), n.webContents.on("did-finish-load", () => {
    n == null || n.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), n.loadURL("file://" + t.join(e.getAppPath(), "dist/index.html"));
}
s.handle("print", (a, r) => {
  console.log("Print: " + r);
});
e.on("window-all-closed", () => {
  process.platform !== "darwin" && (e.quit(), n = null);
});
e.on("activate", () => {
  o.getAllWindows().length === 0 && i();
});
e.whenReady().then(i);
