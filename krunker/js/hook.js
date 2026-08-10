"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // hook/hooks.js
  var require_hooks = __commonJS({
    "hook/hooks.js"(exports) {
      "use strict";
      exports.doConfigHooks = function doConfigHooks(config2) {
        config2.regionNames["us-va"] = "Virginia";
        config2.regionNames["us-ny"] = "New York";
        config2.regionNames["us-nj"] = "New Jersey";
        config2.regionNames["eu-fr"] = "Frankfurt";
      };
      exports.doUTILSHooks = function doUTILSHooks(UTILS) {
        const { copyToClipboard } = UTILS;
        UTILS.copyToClipboard = function(text) {
          copyToClipboard.call(
            this,
            text.replace("https://" + location.host, location.origin)
          );
        };
      };
      exports.rewrite = function rewrite(url) {
        if (url.startsWith("/")) {
          url = url.slice(1);
        }
        {
          const p = "../";
          if (url.startsWith(p)) return url.replace(p, "");
        }
        {
          const p = "file:///";
          if (url.startsWith(p)) return url.replace(p, "");
        }
        {
          const p = "https://user-assets.krunker.io/";
          if (url.startsWith(p)) return url.replace(p, "user-assets/");
        }
        {
          const p = "https://assets.krunker.io/";
          if (url.startsWith(p)) return url.replace(p, "");
        }
        return url;
      };
      exports.rewrite_mm = function rewrite_mm(url) {
        {
          const p = "../";
          if (url.startsWith(p)) return url.replace(p, "");
        }
        {
          const p = "http://true";
          if (url.startsWith(p)) {
            url = url.replace(p, server);
          }
        }
        {
          const p = "https://krunker.io";
          if (url.startsWith(p)) return url.replace(p, server);
        }
        {
          const p = "https://social_beta.krunker.io";
          if (url.startsWith(p)) return url.replace(p, server);
        }
        {
          const p = "https://matchmaker_beta.krunker.io";
          if (url.startsWith(p)) return url.replace(p, server);
        }
        {
          const p = "https://assets.krunker.io/";
          if (url.startsWith(p)) return url.replace(p, "");
        }
        if (url.startsWith("/")) return url.slice(1);
        return url;
      };
    }
  });

  // hook/objects.js
  var require_objects = __commonJS({
    "hook/objects.js"() {
      "use strict";
      var { doConfigHooks, doUTILSHooks } = require_hooks();
      Object.defineProperty(Object.prototype, "controls", {
        set(controls2) {
          if (!controls2) return;
          delete Object.prototype.controls;
          window.game = this;
          window.controls = controls2;
          this.controls = controls2;
        },
        configurable: true
      });
      Object.defineProperty(window, "localPlayer", {
        get() {
          return game.players.list.find((p) => p.isYTMP);
        }
      });
      Object.defineProperty(Object.prototype, "Object3D", {
        set(value) {
          delete Object.prototype.Object3D;
          this.Object3D = value;
          window.THREE = this;
        },
        configurable: true
      });
      Object.defineProperty(Object.prototype, "rarityAnim", {
        set(value) {
          delete Object.prototype.rarityAnim;
          this.rarityAnim = value;
          window.RENDER = this;
        },
        configurable: true
      });
      var eventsMap = /* @__PURE__ */ new WeakMap();
      Object.defineProperty(Object.prototype, "events", {
        get() {
          if (typeof this.connect === "function") window.io = this;
          return eventsMap.get(this);
        },
        set(value) {
          eventsMap.set(this, value);
        }
      });
      Object.defineProperty(Object.prototype, "copyToClipboard", {
        set(copyToClipboard) {
          if (!copyToClipboard) return;
          delete Object.prototype.copyToClipboard;
          this.copyToClipboard = copyToClipboard;
          doUTILSHooks(this);
          window.UTILS = this;
        },
        configurable: true
      });
      Object.defineProperty(Object.prototype, "regionNames", {
        set(value) {
          delete Object.prototype.regionNames;
          this.regionNames = value;
          doConfigHooks(this);
          window.config = this;
          const isLocal = location.hostname === "127.0.0.1";
          this.socialURL = isLocal ? location.origin + "/api" : "https://api.krunker.zip";
          this.apiURL = isLocal ? location.origin + "/api" : "https://api.krunker.zip";
          this.matchmakerURL = isLocal ? location.origin + "/mm" : "https://matchmaker.krunker.zip";
        },
        configurable: true
      });
    }
  });

  // antihackkey.json
  var require_antihackkey = __commonJS({
    "antihackkey.json"(exports, module) {
      module.exports = 29819;
    }
  });

  // version.json
  var require_version = __commonJS({
    "version.json"(exports, module) {
      module.exports = "jhiLQ";
    }
  });

  // hook/devConsole.js
  var require_devConsole = __commonJS({
    "hook/devConsole.js"(exports) {
      "use strict";
      var style = document.createElement("style");
      style.textContent = `
@font-face {
  font-family: "LuconDevConsole";
  src: url("/css/fonts/lucon.ttf") format("truetype");
  font-display: block;
}
#devConsoleOverlay {
  position: fixed;
  inset: 0;
  display: none;
  z-index: 999999;
  background: transparent;
  pointer-events: none;
}
#devConsoleOverlay * {
  font-family: "LuconDevConsole", "Lucida Console", "Consolas", "Liberation Mono", "Courier New", monospace;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: never;
  text-rendering: geometricPrecision;
}
#devConsoleOverlay .modal {
  opacity: 0.95;
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 7px;
  border-radius: 5px;
  width: min(744px, calc(100vw - 16px));
  height: min(280px, calc(100vh - 16px));
  background: #7a7a7a;
  display: flex;
  flex-direction: column;
  color: #d0d0d0;
  font-size: 12px;
  pointer-events: auto;
  min-width: 280px;
  min-height: 160px;
}
#devConsoleOverlay .titlebar {
  background: #7a7a7a;
  font-family: inherit;
  font-size: 10px;
  font-weight: normal;
  padding: 3px 6px;
  user-select: none;
  cursor: move;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 18px;
  flex: 0 0 auto;
}
#devConsoleOverlay .titlebar span {
  color: #fff;
  font-weight: bold;
}
#devConsoleOverlay .titlebar .x {
  width: 18px;
  height: 16px;
  background: transparent;
  border: 0;
  color: #d0d0d0;
  font-family: inherit;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  cursor: pointer;
  user-select: none;
}
#devConsoleOverlay .titlebar .x:hover { color: #fff; }
#devConsoleOverlay .body {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 6px 6px 5px;
  gap: 2px;
  overflow: hidden;
  background: #7a7a7a;
}
#devConsoleOverlay .logs {
  flex: 1 1 auto;
  overflow-y: scroll;
  background: #6a6a6a;
  border: 1px #282828 inset;
  padding: 3px 5px;
  white-space: pre-wrap;
  word-break: break-word;
  color: #e0e0e0;
  line-height: 1.25;
  font-family: inherit;
  font-size: 12px;
}

#devConsoleOverlay .logs, #devConsoleOverlay .logs * {
  user-select: text !important;
  -webkit-user-select: text !important;
  cursor: text;
}

#devConsoleOverlay .logs ::selection,
#devConsoleOverlay .logs::selection {
  background: #f39c00;
  color: #000000;
}
#devConsoleOverlay .logs::-webkit-scrollbar { width: 14px; }
#devConsoleOverlay .logs::-webkit-scrollbar-track {
  background: #4a4a4a;
}
#devConsoleOverlay .logs::-webkit-scrollbar-thumb {
  background: #7a7a7a;
  border: 1px solid #3a3a3a;
}
#devConsoleOverlay .hints {
  position: absolute;
  left: 0;
  right: 70px;
  bottom: calc(100% + 1px);
  display: none;
  max-height: 180px;
  overflow-y: auto;
  background: #6f6f6f;
  border: 1px solid #4c4c4c;
  color: #d8d8d8;
  font-size: 11px;
  line-height: 1.2;
  white-space: nowrap;
  z-index: 2;
}
#devConsoleOverlay .hints.isOpen { display: block; }
#devConsoleOverlay .hintItem {
  padding: 2px 6px;
  cursor: default;
}
#devConsoleOverlay .hintItem.isActive {
  background: #5f5f5f;
  color: #ffffff;
}
#devConsoleOverlay .hintMeta {
  color: #b8b8b8;
}
#devConsoleOverlay .inputShell {
  position: relative;
  flex: 0 0 auto;
  margin-top: 1px;
}
#devConsoleOverlay .row {
  display: flex;
  gap: 6px;
  align-items: stretch;
}
#devConsoleOverlay .row input {
  flex: 1 1 auto;
  background: #585858;
  outline: 0;
  color: #e0e0e0;
  font-family: inherit;
  font-size: 12px;
  padding: 3px 5px;
  min-width: 0;
  border: 1px #282828 inset;
}
#devConsoleOverlay .row button[type="submit"] {
  background-color: #7a7a7a;
  width: 64px;
  border: 1px #a2a2a2 outset;
  font-size: 10px;
}

#devConsoleOverlay .row button {
  background: #7a7a7a;
  border: 1px solid #3a3a3a;
  font-family: inherit;
  font-size: 12px;
  padding: 3px 0;
  cursor: pointer;
  color: #e0e0e0;
}
#devConsoleOverlay .row button:hover { background: #8a8a8a; }
#devConsoleOverlay .row button:active { background: #6a6a6a; }
#devConsoleOverlay .grip {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 14px;
  height: 14px;
  cursor: nwse-resize;
  background:
    linear-gradient(135deg, transparent 0 6px, #9a9a9a 6px 7px, transparent 7px 9px, #9a9a9a 9px 10px, transparent 10px 12px, #9a9a9a 12px 13px, transparent 13px);
}
`;
      (document.head || document.documentElement).appendChild(style);
      var overlay = document.createElement("div");
      overlay.id = "devConsoleOverlay";
      var modal = document.createElement("div");
      modal.className = "modal";
      var header = document.createElement("div");
      header.className = "titlebar";
      var headerLabel = document.createElement("span");
      headerLabel.textContent = "Console";
      var closeBtn = document.createElement("span");
      closeBtn.className = "x";
      closeBtn.textContent = "\u2715";
      closeBtn.addEventListener("click", () => exports.toggleConsole());
      header.append(headerLabel, closeBtn);
      var body = document.createElement("div");
      body.className = "body";
      var logs = document.createElement("div");
      logs.className = "logs";
      logs.tabIndex = -1;
      logs.style.outline = "none";
      logs.addEventListener("mousedown", () => {
        setTimeout(() => logs.focus({ preventScroll: true }), 0);
      });
      logs.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === "a" || e.key === "A")) {
          e.preventDefault();
          e.stopPropagation();
          const sel = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(logs);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      });
      var hints = document.createElement("div");
      hints.className = "hints";
      var inputShell = document.createElement("div");
      inputShell.className = "inputShell";
      var inputRow = document.createElement("form");
      inputRow.className = "row";
      var input = document.createElement("input");
      input.type = "text";
      input.autocomplete = "off";
      input.spellcheck = false;
      var submitBtn = document.createElement("button");
      submitBtn.type = "submit";
      submitBtn.textContent = "Submit";
      var grip = document.createElement("div");
      grip.className = "grip";
      inputRow.append(input, submitBtn);
      inputShell.append(hints, inputRow);
      body.append(logs, inputShell);
      modal.append(header, body, grip);
      overlay.append(modal);
      var attach = () => document.body && document.body.appendChild(overlay);
      if (document.body) attach();
      else document.addEventListener("DOMContentLoaded", attach, { once: true });
      var COLORS = {
        log: "#e0e0e0",
        info: "#9ac8ff",
        warn: "#ffb84d",
        error: "#ff6a6a",
        cmd: "#ffffff",
        reply: "#9affb0",
        hint: "#b0b0b0"
      };
      function append(text, kind = "log") {
        const line = document.createElement("div");
        line.style.color = COLORS[kind] || COLORS.log;
        line.textContent = String(text);
        const atBottom = logs.scrollTop + logs.clientHeight >= logs.scrollHeight - 4;
        logs.appendChild(line);
        while (logs.childElementCount > 1e3) logs.removeChild(logs.firstChild);
        if (atBottom) logs.scrollTop = logs.scrollHeight;
      }
      exports.print = (text) => append(text, "log");
      for (const k of ["log", "info", "warn", "error"]) {
        const orig = console[k].bind(console);
        console[k] = function(...args) {
          try {
            const text = args.map((a) => {
              if (typeof a === "string") return a;
              try {
                return JSON.stringify(a);
              } catch {
                return String(a);
              }
            }).join(" ");
            append(text, k);
          } catch {
          }
          return orig(...args);
        };
      }
      var cmds = /* @__PURE__ */ Object.create(null);
      function arg(name, type = "string", optional = false) {
        return { name, type, optional };
      }
      function registerLocal(name, args, desc, run) {
        cmds[name] = { kind: "local", args, desc, run };
      }
      function registerServer(name, args, desc) {
        cmds[name] = { kind: "server", args, desc };
      }
      registerLocal("help", [arg("cmd", "string", true)], "list commands", (a) => {
        if (a[0]) {
          const c = cmds[a[0]];
          if (!c) return append(`unknown command: ${a[0]}`, "error");
          append(`${a[0]} ${fmtArgs(c.args)} \u2014 ${c.desc}`, "info");
          return;
        }
        const names = Object.keys(cmds).sort();
        append(`${names.length} commands:`, "info");
        for (const n of names) append(`  ${n.padEnd(18)} ${cmds[n].desc}`, "hint");
      });
      registerLocal("clear", [], "clear console output", () => {
        logs.innerHTML = "";
      });
      registerLocal(
        "echo",
        [arg("text", "string")],
        "print text to console",
        (a) => append(a.join(" "))
      );
      registerLocal(
        "print",
        [arg("text", "string")],
        "alias for echo",
        (a) => append(a.join(" "))
      );
      registerLocal(
        "bind",
        [arg("key", "string", true), arg("command", "string", true)],
        "bind a key to a command (session only)",
        (a) => {
          if (!a[0]) {
            const keys = Object.keys(keyBinds);
            if (!keys.length) return append("no binds", "hint");
            for (const k of keys) append(`  ${k} = ${keyBinds[k]}`, "hint");
            return;
          }
          if (!a[1]) {
            append(`${a[0]} = ${keyBinds[a[0]] || "(unbound)"}`, "info");
            return;
          }
          keyBinds[a[0]] = a.slice(1).join(" ");
          append(`bound ${a[0]} -> ${keyBinds[a[0]]}`, "info");
        }
      );
      registerLocal("unbind", [arg("key", "string")], "remove a key bind", (a) => {
        if (!a[0]) return;
        delete keyBinds[a[0]];
        append(`unbound ${a[0]}`, "info");
      });
      registerLocal(
        "alias",
        [arg("name", "string", true), arg("command", "string", true)],
        "define a command alias",
        (a) => {
          if (!a[0]) {
            const keys = Object.keys(aliases);
            if (!keys.length) return append("no aliases", "hint");
            for (const n of keys) append(`  ${n} = ${aliases[n]}`, "hint");
            return;
          }
          if (!a[1]) {
            append(`${a[0]} = ${aliases[a[0]] || "(undefined)"}`, "info");
            return;
          }
          const body2 = a.slice(1).join(" ");
          aliases[a[0]] = body2;
          registerLocal(a[0], [], `alias for: ${body2}`, () => exec(body2));
          append(`alias ${a[0]} -> ${body2}`, "info");
        }
      );
      registerLocal(
        "exec",
        [arg("commands", "string")],
        "run multiple commands separated by ;",
        (a) => {
          for (const part of a.join(" ").split(";")) {
            const t = part.trim();
            if (t) exec(t);
          }
        }
      );
      registerLocal("disconnect", [], "reload to menu", () => {
        location.href = "/";
      });
      registerLocal("quit", [], "close the window", () => {
        window.close();
      });
      registerLocal("reconnect", [], "reload the current page", () => {
        location.reload();
      });
      registerLocal("offline", [], "switch to offline mode", () => {
        const pc = window.io && window.io.events && window.io.events.pc;
        if (typeof pc !== "function") {
          append("offline unavailable", "error");
          return;
        }
        try {
          pc();
          clearPingCounter();
        } catch (err) {
          clearPingCounter();
          append("offline failed: " + (err && err.message), "error");
        }
      });
      var ahk = require_antihackkey();
      var version = require_version();
      registerLocal("ahk", [], "show current antihack key", () => {
        append(`IO AHK: ${io.ahNum} (base: ${ahk})`, "info");
      });
      registerLocal("version", [], "show current client version", () => {
        append(`Version: ${version}`, "info");
      });
      registerLocal("verison", [], "alias for version", () => {
        append(`Version: ${version}`, "info");
      });
      registerLocal(
        "toggle",
        [arg("var", "string")],
        "toggle a server boolean command (god, noclip, ...)",
        (a) => {
          const v = a[0];
          if (!v) return append("toggle <var>", "error");
          sendServer(`/${v}`);
        }
      );
      registerLocal("say", [arg("text", "string")], "say something in chat", (a) => {
        const text = a.join(" ").trim();
        if (!text) return;
        sendServer(text);
      });
      registerLocal("status", [], "show current server connection details", () => {
        printServerDetails();
      });
      registerLocal("serverinfo", [], "alias for status", () => {
        printServerDetails();
      });
      function getLocalTransformPlayer() {
        const player = window.localPlayer || null;
        if (!player) {
          append("no local player", "error");
          return null;
        }
        return player;
      }
      function formatTransformValue(value) {
        const num = Number(value);
        return Number.isFinite(num) ? num.toFixed(6) : "0.000000";
      }
      function printLocalPosition() {
        const player = getLocalTransformPlayer();
        if (!player) return;
        append(
          `position: ${formatTransformValue(player.x)} ${formatTransformValue(player.y)} ${formatTransformValue(player.z)}`,
          "info"
        );
      }
      function printLocalRotation() {
        const player = getLocalTransformPlayer();
        if (!player) return;
        append(
          `rotation: yaw=${formatTransformValue(player.yaw)} pitch=${formatTransformValue(player.pitch)} xDire=${formatTransformValue(player.xDire)}`,
          "info"
        );
      }
      registerLocal("pos", [], "show local player position", () => {
        printLocalPosition();
      });
      registerLocal("position", [], "alias for pos", () => {
        printLocalPosition();
      });
      registerLocal("rot", [], "show local player rotation", () => {
        printLocalRotation();
      });
      registerLocal("rotation", [], "alias for rot", () => {
        printLocalRotation();
      });
      registerLocal("ping", [], "show current ping", () => {
        const local = window.localPlayer || null;
        const pingSamples = Array.isArray(local && local.pings) ? local.pings : [];
        const latest = Number.isFinite(local && local.ping) ? Math.max(0, Math.round(local.ping)) : null;
        const avg = pingSamples.length ? Math.round(
          pingSamples.reduce((sum, sample) => sum + (Number(sample) || 0), 0) / pingSamples.length
        ) : null;
        const resolved = latest ?? avg ?? 0;
        append(`Ping: ${resolved}ms`, "info");
      });
      var onOff = arg("on|off", "boolean", true);
      registerServer("god", [onOff], "toggle god mode");
      registerServer("noclip", [onOff], "toggle noclip");
      registerServer("smite", [onOff], "toggle smite-on-hit");
      registerServer("forcehide", [onOff], "toggle forcehide");
      registerServer("unlimitedammo", [onOff], "toggle unlimited ammo");
      registerServer("c", [], "show connected players and menu count");
      registerServer("count", [], "alias for /c (show connected players and menu count)");
      registerServer("bhop", [arg("mode", "string", true)], "set or cycle bhop mode");
      registerServer(
        "kill",
        [arg("target", "string", true)],
        'kill yourself or a target (examples: /kill, /kill Guest_1, /kill "Wandering Ghost", /kill wanderingghost)'
      );
      registerServer("end", [], "set match timer to 3 seconds");
      registerServer("endless", [], "toggle endless match timer");
      registerServer("forcecol", [onOff], "toggle force collide");
      registerServer("server", [], "show current map/mode/player/tick info");
      registerServer("cycle", [], "cycle to the next map");
      registerServer(
        "map",
        [arg("name", "string", true)],
        "switch map (no arg = show current)"
      );
      registerServer("maps", [], "list available maps");
      registerServer("mode", [arg("alias", "string", true)], "switch game mode");
      registerServer("modes", [], "list game modes");
      registerServer("team", [arg("red|blue", "string")], "switch teams");
      registerServer("teams", [], "list teams and players");
      registerServer("players", [], "list connected players (id, name, team)");
      registerServer("ais", [], "list active AI entities (sid, name)");
      registerServer("kick", [arg("name|id", "string", true)], "kick a player");
      registerServer("ban", [arg("name|id", "string", true)], "ban a player account");
      registerServer(
        "unban",
        [arg("accountId|name|id", "string", true)],
        "unban an account"
      );
      registerServer("bans", [], "list banned account ids");
      registerServer("ip", [arg("name|id", "string", true)], "show a player's IP");
      registerServer(
        "banip",
        [arg("name|id|ip", "string", true)],
        "ban an IP in this lobby"
      );
      registerServer("unbanip", [arg("ip", "string", true)], "unban an IP");
      registerServer("ipbans", [], "list banned IPs");
      registerServer(
        "score",
        [arg("amount", "number", true)],
        "add score (default +100)"
      );
      registerServer(
        "summon",
        [arg("name", "string", true)],
        "spawn a Soul Sanctum AI by name (no arg lists summonable names)"
      );
      registerServer("game", [arg("text", "string", true)], "send a game command");
      var history = [];
      var historyIdx = -1;
      var draft = "";
      var keyBinds = /* @__PURE__ */ Object.create(null);
      var aliases = /* @__PURE__ */ Object.create(null);
      var offlineModeOverrides = /* @__PURE__ */ new WeakMap();
      function getOfflineModeOverride(game2) {
        if (!game2) return null;
        const value = offlineModeOverrides.get(game2);
        return Number.isInteger(value) && value >= 0 ? value : null;
      }
      function setOfflineModeOverride(game2, modeIndex) {
        if (!game2) return;
        if (!Number.isInteger(modeIndex) || modeIndex < 0) {
          offlineModeOverrides.delete(game2);
          return;
        }
        offlineModeOverrides.set(game2, modeIndex);
      }
      function getSocketStateLabel(socket) {
        if (!socket) return "NO_SOCKET";
        switch (socket.readyState) {
          case WebSocket.CONNECTING:
            return "CONNECTING";
          case WebSocket.OPEN:
            return "OPEN";
          case WebSocket.CLOSING:
            return "CLOSING";
          case WebSocket.CLOSED:
            return "CLOSED";
          default:
            return String(socket.readyState);
        }
      }
      function getCurrentGameId() {
        try {
          return typeof gameId !== "undefined" ? gameId : null;
        } catch {
          return null;
        }
      }
      function getCurrentMapLabel(game2) {
        const mapIndex = game2 && game2.mapIndex;
        const mapName = game2?.map?.maps?.[mapIndex]?.name || game2?.map?.name || null;
        if (mapName && Number.isInteger(mapIndex)) return `${mapName} (${mapIndex})`;
        if (mapName) return mapName;
        if (Number.isInteger(mapIndex)) return String(mapIndex);
        return "(unknown)";
      }
      function getCurrentModeLabel(game2) {
        const modeIndex = game2 && game2.modeIndex;
        const modeName = game2?.mode?.alias || game2?.mode?.name || null;
        if (modeName && Number.isInteger(modeIndex))
          return `${modeName} (${modeIndex})`;
        if (modeName) return modeName;
        if (Number.isInteger(modeIndex)) return String(modeIndex);
        return "(unknown)";
      }
      function printServerDetails() {
        const io2 = window.io || null;
        const game2 = window.game || null;
        const socket = io2 && io2.socket;
        const humans = (game2?.players?.list || []).filter(
          (player) => player && !player.dummy && !player.spectating
        );
        const activeHumans = humans.filter((player) => player.active === true);
        const status = game2.singlePlayer ? "offline" : io2?.connected ? "connected" : socket ? "disconnected" : "no-socket";
        append(
          `Connection: ${status} | socket ${io2?.socketId ?? "(none)"} | state ${getSocketStateLabel(socket)}`,
          "info"
        );
        append(`Endpoint: ${socket?.url || location.origin}`, "info");
        append(
          `Lobby: ${getCurrentGameId() || "(none)"} | map ${getCurrentMapLabel(game2)} | mode ${getCurrentModeLabel(game2)}`,
          "info"
        );
        append(
          `Players: ${activeHumans.length}/${humans.length} | host ${location.host}`,
          "info"
        );
      }
      function getOfflineGame() {
        return window.game || null;
      }
      function getOfflinePlayer() {
        return window.localPlayer || null;
      }
      function parseToggleArg(value, currentValue) {
        if (value == null || value === "") return !currentValue;
        const normalised = String(value).toLowerCase();
        if (normalised === "on" || normalised === "1" || normalised === "true") {
          return true;
        }
        if (normalised === "off" || normalised === "0" || normalised === "false") {
          return false;
        }
        return !currentValue;
      }
      function localCommandUnavailable(message) {
        append(message, "error");
      }
      function clearPingCounter() {
        const local = window.localPlayer;
        if (local) {
          local.ping = 0;
          if (Array.isArray(local.pings)) local.pings.length = 0;
        }
        const menuPingText = document.getElementById("menuPingText");
        if (menuPingText) menuPingText.textContent = "0";
        const menuPingIcon = document.getElementById("menuPingIcon");
        if (menuPingIcon) menuPingIcon.style.color = "gray";
      }
      function requireOfflinePlayer() {
        const player = getOfflinePlayer();
        if (!player || player.active !== true) {
          localCommandUnavailable("no active local player");
          return null;
        }
        return player;
      }
      function offlineBoolCommand(property, label, args, onEnable) {
        const player = requireOfflinePlayer();
        if (!player) return true;
        const next = parseToggleArg(args[0], player[property] === true);
        player[property] = next;
        if (next && typeof onEnable === "function") onEnable(player);
        append(`${label} ${next ? "ON" : "OFF"}`, "info");
        return true;
      }
      function normaliseOfflineTarget(value) {
        return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
      }
      function resolveOfflineKillTarget(query) {
        const game2 = getOfflineGame();
        if (!game2) return { kind: null, target: null, reason: "not-found" };
        const needle = normaliseOfflineTarget(query);
        if (!needle) return { kind: null, target: null, reason: "empty" };
        const playerMatches = [];
        const aiMatches = [];
        for (const candidate of game2.players?.list || []) {
          if (!candidate || candidate.dummy || candidate.active !== true) continue;
          const keys = [candidate.name, candidate.alias, candidate.id].filter(Boolean).map((value) => normaliseOfflineTarget(value));
          if (keys.includes(needle)) {
            playerMatches.push({ exact: true, target: candidate });
            continue;
          }
          if (keys.some((value) => value.startsWith(needle))) {
            playerMatches.push({ exact: false, target: candidate });
          }
        }
        for (const candidate of game2.AI?.ais || []) {
          if (!candidate || candidate.active !== true) continue;
          const keys = [candidate.name, candidate.sid].filter(Boolean).map((value) => normaliseOfflineTarget(value));
          if (keys.includes(needle)) {
            aiMatches.push({ exact: true, target: candidate });
            continue;
          }
          if (keys.some((value) => value.startsWith(needle))) {
            aiMatches.push({ exact: false, target: candidate });
          }
        }
        const exactPlayers = playerMatches.filter((match) => match.exact);
        const exactAis = aiMatches.filter((match) => match.exact);
        if (exactPlayers.length === 1 && exactAis.length === 0) {
          return { kind: "player", target: exactPlayers[0].target, reason: null };
        }
        if (exactAis.length === 1 && exactPlayers.length === 0) {
          return { kind: "ai", target: exactAis[0].target, reason: null };
        }
        if (exactPlayers.length + exactAis.length > 1) {
          return { kind: null, target: null, reason: "ambiguous" };
        }
        if (playerMatches.length === 1 && aiMatches.length === 0) {
          return { kind: "player", target: playerMatches[0].target, reason: null };
        }
        if (aiMatches.length === 1 && playerMatches.length === 0) {
          return { kind: "ai", target: aiMatches[0].target, reason: null };
        }
        if (playerMatches.length + aiMatches.length > 1) {
          return { kind: null, target: null, reason: "ambiguous" };
        }
        return { kind: null, target: null, reason: "not-found" };
      }
      function killOfflinePlayer(sourcePlayer, targetPlayer) {
        const game2 = getOfflineGame();
        if (!game2 || !targetPlayer) return false;
        const hadGod = targetPlayer.godMode === true;
        try {
          if (hadGod) targetPlayer.godMode = false;
          if (game2.players && typeof game2.players.kill === "function") {
            game2.players.kill(targetPlayer, sourcePlayer, {});
            return true;
          }
          if (game2.players && typeof game2.players.changeHealth === "function") {
            game2.players.changeHealth(targetPlayer, sourcePlayer, 1e6);
            return true;
          }
          targetPlayer.active = false;
          targetPlayer.health = 0;
          return true;
        } finally {
          if (hadGod) targetPlayer.godMode = true;
        }
      }
      function killOfflineAI(sourcePlayer, targetAI) {
        if (!targetAI || typeof targetAI.kill !== "function") return false;
        targetAI.kill(sourcePlayer || null);
        if (getOfflineGame()?.AI && typeof getOfflineGame().AI.sync === "function") {
          getOfflineGame().AI.sync();
        }
        return true;
      }
      function getOfflineModeEntries(game2) {
        const modes = game2?.map?.modes;
        if (!Array.isArray(modes)) return [];
        const entries = [];
        for (let i = 0; i < modes.length; i++) {
          const mode = modes[i];
          if (!mode) continue;
          entries.push({
            index: i,
            mode,
            alias: (mode.alias || mode.id || mode.name || `mode${i}`).toLowerCase(),
            name: String(mode.name || mode.id || mode.alias || `Mode ${i}`)
          });
        }
        return entries;
      }
      function resolveOfflineModeIndex(game2, query) {
        const entries = getOfflineModeEntries(game2);
        if (!entries.length) return { index: null, entries, reason: "no-modes" };
        const raw = String(query || "").trim();
        if (!raw) return { index: null, entries, reason: "empty" };
        const maybeIndex = Number(raw);
        if (Number.isInteger(maybeIndex)) {
          const hit = entries.find((entry) => entry.index === maybeIndex);
          if (hit) return { index: hit.index, entries, reason: null };
        }
        const needle = raw.toLowerCase();
        const exact = entries.filter((entry) => {
          const id = String(entry.mode?.id || "").toLowerCase();
          const name = String(entry.mode?.name || "").toLowerCase();
          return entry.alias === needle || id === needle || name === needle;
        });
        if (exact.length === 1) {
          return { index: exact[0].index, entries, reason: null };
        }
        if (exact.length > 1) {
          return { index: null, entries, reason: "ambiguous" };
        }
        const partial = entries.filter((entry) => {
          const id = String(entry.mode?.id || "").toLowerCase();
          const name = String(entry.mode?.name || "").toLowerCase();
          return entry.alias.startsWith(needle) || id.startsWith(needle) || name.startsWith(needle);
        });
        if (partial.length === 1) {
          return { index: partial[0].index, entries, reason: null };
        }
        if (partial.length > 1) {
          return { index: null, entries, reason: "ambiguous" };
        }
        return { index: null, entries, reason: "not-found" };
      }
      function resolveOfflineMapIndex(game2, query) {
        const maps = game2?.map?.maps;
        if (!Array.isArray(maps) || !maps.length) {
          return { index: null, reason: "no-maps" };
        }
        const raw = String(query || "").trim();
        if (!raw) return { index: null, reason: "empty" };
        const maybeIndex = Number(raw);
        if (Number.isInteger(maybeIndex) && maybeIndex >= 0 && maybeIndex < maps.length) {
          return { index: maybeIndex, reason: null };
        }
        const needle = raw.toLowerCase();
        const matches = [];
        for (let i = 0; i < maps.length; i++) {
          const map = maps[i];
          if (!map) continue;
          const names = [map.name, map.id, map.key].filter(Boolean).map((value) => String(value).toLowerCase());
          if (names.includes(needle)) {
            matches.push({ exact: true, index: i });
            continue;
          }
          if (names.some((value) => value.startsWith(needle))) {
            matches.push({ exact: false, index: i });
          }
        }
        const exact = matches.filter((match) => match.exact);
        if (exact.length === 1) return { index: exact[0].index, reason: null };
        if (exact.length > 1) return { index: null, reason: "ambiguous" };
        if (matches.length === 1) return { index: matches[0].index, reason: null };
        if (matches.length > 1) return { index: null, reason: "ambiguous" };
        return { index: null, reason: "not-found" };
      }
      function offlineInitAt(mapIndex, modeIndex) {
        const game2 = getOfflineGame();
        const io2 = window.io;
        const initEvent = io2 && io2.events && io2.events.init;
        if (!game2 || typeof game2.init !== "function" && typeof initEvent !== "function") {
          throw new Error("game is not ready");
        }
        if (typeof initEvent === "function") {
          initEvent(
            mapIndex,
            modeIndex,
            null,
            null,
            null,
            game2.config || { maps: [mapIndex] },
            null,
            0,
            null,
            null,
            null
          );
          return;
        }
        game2.init(mapIndex, modeIndex, null, false);
      }
      var offlineServerCommands = {
        server() {
          printServerDetails();
          return true;
        },
        cycle() {
          const game2 = getOfflineGame();
          if (!game2) {
            append("Offline cycle unavailable: game is not ready.", "error");
            return true;
          }
          const maps = game2?.map?.maps;
          if (!Array.isArray(maps) || maps.length <= 0) {
            append("Offline cycle unavailable: no map list.", "error");
            return true;
          }
          const currentIndex = Number.isInteger(game2.mapIndex) ? game2.mapIndex : 0;
          const nextIndex = (currentIndex + 1 + maps.length) % maps.length;
          const modeEntries = getOfflineModeEntries(game2);
          const currentMode = Number.isInteger(game2.modeIndex) ? game2.modeIndex : 0;
          const modeOverride = getOfflineModeOverride(game2);
          const modeIndex = Number.isInteger(modeOverride) && modeEntries.some((entry) => entry.index === modeOverride) ? modeOverride : currentMode;
          try {
            offlineInitAt(nextIndex, modeIndex);
            const nextMap = maps[nextIndex];
            const nextName = nextMap && typeof nextMap.name === "string" && nextMap.name || `Map ${nextIndex}`;
            const modeName = game2?.map?.modes?.[modeIndex]?.name || game2?.map?.modes?.[modeIndex]?.id || `mode ${modeIndex}`;
            append(`Cycled to ${nextName} (${nextIndex}) [${modeName}].`, "info");
          } catch (err) {
            append("Cycle failed: " + (err && err.message), "error");
          }
          return true;
        },
        map(args) {
          const game2 = getOfflineGame();
          if (!game2) {
            append("Offline map unavailable: game is not ready.", "error");
            return true;
          }
          const maps = game2?.map?.maps;
          if (!Array.isArray(maps) || !maps.length) {
            append("No built-in map list available.", "error");
            return true;
          }
          const raw = args.join(" ").trim();
          if (!raw) {
            append(`Current map: ${getCurrentMapLabel(game2)}`, "info");
            return true;
          }
          const resolved = resolveOfflineMapIndex(game2, raw);
          if (!Number.isInteger(resolved.index)) {
            if (resolved.reason === "ambiguous") {
              append(
                `Map '${raw}' is ambiguous. Use /maps to list choices.`,
                "error"
              );
            } else {
              append(`Map '${raw}' not found. Use /maps to list choices.`, "error");
            }
            return true;
          }
          const mapIndex = resolved.index;
          const modeEntries = getOfflineModeEntries(game2);
          const currentMode = Number.isInteger(game2.modeIndex) ? game2.modeIndex : 0;
          const modeOverride = getOfflineModeOverride(game2);
          const modeIndex = Number.isInteger(modeOverride) && modeEntries.some((entry) => entry.index === modeOverride) ? modeOverride : currentMode;
          try {
            offlineInitAt(mapIndex, modeIndex);
            const nextMap = maps[mapIndex];
            const nextName = nextMap && typeof nextMap.name === "string" && nextMap.name || nextMap && typeof nextMap.id === "string" && nextMap.id || `Map ${mapIndex}`;
            append(`Switched map to ${nextName} (${mapIndex}).`, "info");
          } catch (err) {
            append("Map switch failed: " + (err && err.message), "error");
          }
          return true;
        },
        mode(args) {
          const game2 = getOfflineGame();
          if (!game2) {
            append("Offline mode unavailable: game is not ready.", "error");
            return true;
          }
          const raw = args.join(" ").trim();
          if (!raw) {
            append(`Current mode: ${getCurrentModeLabel(game2)}`, "info");
            const modeOverride = getOfflineModeOverride(game2);
            if (Number.isInteger(modeOverride)) {
              append(`Cycle mode override: ${modeOverride}`, "hint");
            }
            return true;
          }
          if (raw.toLowerCase() === "default" || raw.toLowerCase() === "reset") {
            setOfflineModeOverride(game2, null);
            append("Cycle mode override cleared.", "info");
            return true;
          }
          const resolved = resolveOfflineModeIndex(game2, raw);
          if (!Number.isInteger(resolved.index)) {
            if (resolved.reason === "ambiguous") {
              append(
                `Mode '${raw}' is ambiguous. Use /modes to list choices.`,
                "error"
              );
            } else if (resolved.reason === "no-modes") {
              append("No mode list available for this map.", "error");
            } else {
              append(`Mode '${raw}' not found. Use /modes to list choices.`, "error");
            }
            return true;
          }
          const modeIndex = resolved.index;
          const mapIndex = Number.isInteger(game2.mapIndex) ? game2.mapIndex : 0;
          try {
            setOfflineModeOverride(game2, modeIndex);
            offlineInitAt(mapIndex, modeIndex);
            const modeName = game2?.map?.modes?.[modeIndex]?.name || game2?.map?.modes?.[modeIndex]?.id || `mode ${modeIndex}`;
            append(`Mode set to ${modeName} (${modeIndex}).`, "info");
          } catch (err) {
            append("Mode switch failed: " + (err && err.message), "error");
          }
          return true;
        },
        modes() {
          const game2 = getOfflineGame();
          if (!game2) {
            append("No active game.", "error");
            return true;
          }
          const entries = getOfflineModeEntries(game2);
          if (!entries.length) {
            append("No modes available.", "info");
            return true;
          }
          append(`Modes (${entries.length}):`, "info");
          for (const entry of entries) {
            const id = entry.mode?.id ? ` id:${entry.mode.id}` : "";
            const marker = entry.index === game2.modeIndex ? " *" : "";
            append(`  ${entry.index}: ${entry.name}${id}${marker}`, "hint");
          }
          const modeOverride = getOfflineModeOverride(game2);
          if (Number.isInteger(modeOverride)) {
            append(`Cycle mode override: ${modeOverride}`, "info");
          }
          return true;
        },
        maps() {
          const game2 = getOfflineGame();
          const maps = game2?.map?.maps;
          if (!Array.isArray(maps) || !maps.length) {
            append("No built-in map list available.", "error");
            return true;
          }
          append(`Built-in maps (${maps.length}):`, "info");
          append(`${maps.map((e) => e.name).join(", ")}`);
          return true;
        },
        god(args) {
          return offlineBoolCommand("godMode", "God mode", args, (player) => {
            if (Number.isFinite(player.maxHealth)) player.health = player.maxHealth;
          });
        },
        noclip(args) {
          return offlineBoolCommand("noclip", "Noclip", args);
        },
        smite(args) {
          return offlineBoolCommand("smite", "Smite", args);
        },
        forcehide(args) {
          return offlineBoolCommand("forceHide", "Forcehide", args);
        },
        unlimitedammo(args) {
          return offlineBoolCommand(
            "unlimitedAmmo",
            "Unlimited ammo",
            args,
            (player) => {
              player.canThrow = true;
            }
          );
        },
        kill(args) {
          const player = requireOfflinePlayer();
          if (!player) return true;
          const query = args.join(" ").trim();
          if (!query) {
            killOfflinePlayer(player, player);
            append("You killed yourself.", "info");
            return true;
          }
          const resolved = resolveOfflineKillTarget(query);
          if (!resolved.target) {
            append(
              resolved.reason === "ambiguous" ? `Kill target '${query}' is ambiguous.` : `Kill target '${query}' not found.`,
              "error"
            );
            return true;
          }
          if (resolved.kind === "player") {
            killOfflinePlayer(player, resolved.target);
            append(
              `Killed player ${resolved.target.name || resolved.target.alias || resolved.target.id}.`,
              "info"
            );
            return true;
          }
          if (resolved.kind === "ai") {
            killOfflineAI(player, resolved.target);
            append(
              `Killed AI ${resolved.target.name || resolved.target.sid}.`,
              "info"
            );
            return true;
          }
          return true;
        },
        score(args) {
          const player = requireOfflinePlayer();
          const game2 = getOfflineGame();
          if (!player || !game2?.players || typeof game2.players.score !== "function") {
            return true;
          }
          const amount = args.length ? Number(args[0]) : 100;
          if (!Number.isFinite(amount) || amount === 0) {
            append("Usage: score <amount> (default 100).", "error");
            return true;
          }
          game2.players.score(player, amount);
          append(
            `${amount > 0 ? "+" : ""}${amount} score (total ${player.score}).`,
            "info"
          );
          return true;
        },
        team(args) {
          const player = requireOfflinePlayer();
          const game2 = getOfflineGame();
          const mode = game2?.mode;
          if (!player || !game2) return true;
          if (!mode || !mode.teams || mode.friendly || mode.clanWar || mode.convTeam) {
            append("/team only works in team modes.", "error");
            return true;
          }
          const arg2 = (args[0] || "").toLowerCase();
          const next = arg2 === "red" || arg2 === "1" ? 1 : arg2 === "blue" || arg2 === "2" ? 2 : null;
          if (next == null) {
            append("Usage: /team red|blue", "error");
            return true;
          }
          if (player.team === next) {
            append(`Already on ${arg2}.`, "info");
            return true;
          }
          player.team = next;
          killOfflinePlayer(player, player);
          append(`Switched to ${arg2} team.`, "info");
          return true;
        },
        teams() {
          const game2 = getOfflineGame();
          const players = game2?.players?.list;
          const mode = game2?.mode;
          if (!players || !players.length) {
            append("No players.", "info");
            return true;
          }
          if (!mode || !mode.teams || mode.convTeam) {
            append("Not a team mode.", "info");
            return true;
          }
          const groups = /* @__PURE__ */ new Map();
          for (const p of players) {
            if (!p || p.spectating) continue;
            const team = p.team || 0;
            if (!groups.has(team)) groups.set(team, []);
            groups.get(team).push(p.name || `Guest_${p.sid}`);
          }
          for (const team of [...groups.keys()].sort((left, right) => left - right)) {
            const label = team === 1 ? "Red" : team === 2 ? "Blue" : `Team ${team}`;
            const names = groups.get(team);
            append(`${label} (${names.length}): ${names.join(", ")}`, "info");
          }
          return true;
        },
        end() {
          const game2 = getOfflineGame();
          if (!game2) return true;
          game2.endTimer = 0;
          game2.gameTimer = 3e3;
          game2.lastTimer = null;
          append("Match timer set to 3 seconds.", "info");
          return true;
        },
        endless() {
          const game2 = getOfflineGame();
          if (!game2) return true;
          const isEndless = game2.endTimer === "inf";
          if (isEndless) {
            const restored = game2.forceStaticMap === true ? 24e4 : game2.mode && game2.mode.gameTime == null ? (game2.config && game2.config.gameTime ? game2.config.gameTime : 4) * 6e4 : game2.mode.gameTime;
            game2.endTimer = 0;
            game2.gameTimer = restored;
            game2.lastTimer = null;
            append("Match timer resumed.", "info");
            return true;
          }
          game2.endTimer = "inf";
          game2.lastTimer = null;
          append("Match timer paused.", "info");
          return true;
        }
      };
      function maybeRunOfflineServerCommand(line) {
        if (!game.singlePlayer) return false;
        const stripped = line.startsWith("/") ? line.slice(1) : line;
        const space = stripped.indexOf(" ");
        const name = (space === -1 ? stripped : stripped.slice(0, space)).toLowerCase();
        const rest = space === -1 ? "" : stripped.slice(space + 1);
        const handler = offlineServerCommands[name];
        if (!handler) return false;
        try {
          handler(parseArgs(rest), rest);
        } catch (err) {
          append("error: " + (err && err.message), "error");
        }
        return true;
      }
      function sendServer(line) {
        if (maybeRunOfflineServerCommand(line)) {
          return;
        }
        if (!window.io || typeof window.io.send !== "function") {
          append("not connected to server", "error");
          return;
        }
        try {
          window.io.send("ct", line);
        } catch (err) {
          append("send failed: " + (err && err.message), "error");
        }
      }
      function parseArgs(rest) {
        const out = [];
        const re = /"([^"]*)"|(\S+)/g;
        let m;
        while ((m = re.exec(rest)) !== null) {
          out.push(m[1] !== void 0 ? m[1] : m[2]);
        }
        return out;
      }
      function exec(line) {
        line = line.trim();
        if (!line) return;
        append(`] ${line}`, "cmd");
        const stripped = line.startsWith("/") ? line.slice(1) : line;
        const space = stripped.indexOf(" ");
        const name = (space === -1 ? stripped : stripped.slice(0, space)).toLowerCase();
        const rest = space === -1 ? "" : stripped.slice(space + 1);
        const args = parseArgs(rest);
        const c = cmds[name];
        if (!c) {
          return;
        }
        if (c.kind === "local") {
          try {
            c.run(args, rest);
          } catch (err) {
            append("error: " + (err && err.message), "error");
          }
        } else {
          sendServer("/" + stripped);
        }
      }
      exports.exec = exec;
      function fmtArgs(args) {
        return args.map((a) => a.optional ? `${a.name}: ${a.type}?` : `${a.name}: ${a.type}`).join("  ");
      }
      function clearHints() {
        hints.innerHTML = "";
        hints.classList.remove("isOpen");
      }
      function addHintItem(label, meta, active, onPick) {
        const item = document.createElement("div");
        item.className = "hintItem" + (active ? " isActive" : "");
        item.textContent = label;
        if (meta) {
          const span = document.createElement("span");
          span.className = "hintMeta";
          span.textContent = `  ${meta}`;
          item.append(span);
        }
        if (onPick) {
          item.addEventListener("mousedown", (e) => {
            e.preventDefault();
            onPick();
            input.focus();
          });
        }
        hints.append(item);
      }
      function updateHints() {
        const v = input.value;
        clearHints();
        if (!v) return;
        const space = v.indexOf(" ");
        const head = (space === -1 ? v : v.slice(0, space)).toLowerCase();
        const headStripped = head.startsWith("/") ? head.slice(1) : head;
        if (space === -1) {
          const matches = Object.keys(cmds).filter((n) => n.startsWith(headStripped)).slice(0, 12);
          if (!matches.length) return;
          hints.classList.add("isOpen");
          const activeIndex = Math.max(0, matches.indexOf(headStripped));
          for (let i = 0; i < matches.length; i++) {
            const name = matches[i];
            addHintItem(name, null, i === activeIndex, () => {
              input.value = name + " ";
              updateHints();
            });
          }
          return;
        }
        const c = cmds[headStripped];
        if (c) {
          hints.classList.add("isOpen");
          addHintItem(headStripped, `${fmtArgs(c.args)}  \u2014  ${c.desc}`, true);
        } else {
          hints.classList.add("isOpen");
          addHintItem("(unknown command)", "will not be sent", true);
        }
      }
      function tabComplete() {
        const v = input.value;
        const space = v.indexOf(" ");
        if (space !== -1) return;
        const headStripped = v.startsWith("/") ? v.slice(1) : v;
        const matches = Object.keys(cmds).filter((n) => n.startsWith(headStripped));
        if (matches.length === 1) {
          input.value = matches[0] + " ";
        } else if (matches.length > 1) {
          let prefix = matches[0];
          for (const m of matches) {
            while (!m.startsWith(prefix)) prefix = prefix.slice(0, -1);
          }
          if (prefix.length > headStripped.length) input.value = prefix;
        }
        updateHints();
      }
      function handleConsoleKeydown(e) {
        if (!exports.visible) return;
        const activeEl = document.activeElement;
        const focusInConsole = activeEl === input || activeEl === logs;
        if (e.key === "Escape" && focusInConsole) {
          e.preventDefault();
          e.stopPropagation();
          exports.toggleConsole();
          return;
        }
        if (activeEl !== input) return;
        if (e.key === "ArrowUp") {
          e.preventDefault();
          e.stopPropagation();
          if (!history.length) return;
          if (historyIdx === -1) {
            draft = input.value;
            historyIdx = history.length - 1;
          } else if (historyIdx > 0) {
            historyIdx--;
          }
          input.value = history[historyIdx];
          updateHints();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          e.stopPropagation();
          if (historyIdx === -1) return;
          if (historyIdx < history.length - 1) {
            historyIdx++;
            input.value = history[historyIdx];
          } else {
            historyIdx = -1;
            input.value = draft;
          }
          updateHints();
        } else if (e.key === "Tab") {
          e.preventDefault();
          e.stopPropagation();
          tabComplete();
        }
      }
      window.addEventListener("keydown", handleConsoleKeydown, true);
      input.addEventListener("input", (e) => {
        const bindKey = (window.devConsoleKey || "Backquote").replace(/^Key/, "");
        const toggleChars = /* @__PURE__ */ new Set(["`", "~"]);
        const bindChar = { Backquote: "`", Minus: "-", Equal: "=" }[window.devConsoleKey || "Backquote"] || (bindKey.length === 1 ? bindKey.toLowerCase() : null);
        if (bindChar) toggleChars.add(bindChar);
        if (e.data && toggleChars.has(e.data)) {
          const pos = input.selectionStart ?? input.value.length;
          const before = input.value.slice(0, Math.max(0, pos - e.data.length));
          const after = input.value.slice(pos);
          input.value = before + after;
          try {
            input.setSelectionRange(before.length, before.length);
          } catch {
          }
          exports.toggleConsole();
          return;
        }
        updateHints();
      });
      inputRow.addEventListener("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const line = input.value;
        input.value = "";
        clearHints();
        if (line.trim()) {
          history.push(line);
          if (history.length > 200) history.shift();
        }
        historyIdx = -1;
        draft = "";
        exec(line);
      });
      for (const t of ["keydown", "keyup", "keypress"]) {
        overlay.addEventListener(t, (e) => e.stopPropagation(), true);
      }
      var GEOM_KEY = "krk_dev_console_geom";
      function loadGeom() {
        try {
          const raw = localStorage.getItem(GEOM_KEY);
          if (!raw) return null;
          const g = JSON.parse(raw);
          if (!g || typeof g !== "object") return null;
          return g;
        } catch {
          return null;
        }
      }
      var saveGeomTimer = 0;
      function saveGeom() {
        clearTimeout(saveGeomTimer);
        saveGeomTimer = setTimeout(() => {
          if (modal.dataset.posCommitted !== "1") return;
          try {
            localStorage.setItem(
              GEOM_KEY,
              JSON.stringify({
                left: parseInt(modal.style.left || "0", 10),
                top: parseInt(modal.style.top || "0", 10),
                width: modal.offsetWidth,
                height: modal.offsetHeight
              })
            );
          } catch {
          }
        }, 150);
      }
      function clampPos() {
        const w = modal.offsetWidth;
        const h = modal.offsetHeight;
        const left = parseInt(modal.style.left || "0", 10);
        const top = parseInt(modal.style.top || "0", 10);
        const maxX = Math.max(0, window.innerWidth - w);
        const maxY = Math.max(0, window.innerHeight - h);
        modal.style.left = Math.max(0, Math.min(maxX, left)) + "px";
        modal.style.top = Math.max(0, Math.min(maxY, top)) + "px";
      }
      function commitInitialPos() {
        if (modal.dataset.posCommitted === "1") return;
        const rect = modal.getBoundingClientRect();
        modal.style.transform = "none";
        modal.style.left = rect.left + "px";
        modal.style.top = rect.top + "px";
        modal.dataset.posCommitted = "1";
      }
      function restoreGeom() {
        const g = loadGeom();
        if (!g) return;
        if (Number.isFinite(g.width) && g.width >= 280) {
          modal.style.width = g.width + "px";
        }
        if (Number.isFinite(g.height) && g.height >= 160) {
          modal.style.height = g.height + "px";
        }
        if (Number.isFinite(g.left) && Number.isFinite(g.top)) {
          modal.style.transform = "none";
          modal.style.left = g.left + "px";
          modal.style.top = g.top + "px";
          modal.dataset.posCommitted = "1";
          clampPos();
        }
      }
      if (document.body) restoreGeom();
      else document.addEventListener("DOMContentLoaded", restoreGeom, { once: true });
      {
        let dragging = false;
        let dx = 0;
        let dy = 0;
        header.addEventListener("mousedown", (e) => {
          if (e.button !== 0 || e.target === closeBtn) return;
          commitInitialPos();
          dragging = true;
          const rect = modal.getBoundingClientRect();
          dx = e.clientX - rect.left;
          dy = e.clientY - rect.top;
          e.preventDefault();
        });
        window.addEventListener("mousemove", (e) => {
          if (!dragging) return;
          modal.style.left = e.clientX - dx + "px";
          modal.style.top = e.clientY - dy + "px";
          clampPos();
        });
        window.addEventListener("mouseup", () => {
          if (dragging) saveGeom();
          dragging = false;
        });
      }
      {
        let resizing = false;
        let startX = 0;
        let startY = 0;
        let startW = 0;
        let startH = 0;
        grip.addEventListener("mousedown", (e) => {
          if (e.button !== 0) return;
          commitInitialPos();
          resizing = true;
          startX = e.clientX;
          startY = e.clientY;
          startW = modal.offsetWidth;
          startH = modal.offsetHeight;
          e.preventDefault();
        });
        window.addEventListener("mousemove", (e) => {
          if (!resizing) return;
          const w = Math.max(280, startW + (e.clientX - startX));
          const h = Math.max(160, startH + (e.clientY - startY));
          modal.style.width = w + "px";
          modal.style.height = h + "px";
        });
        window.addEventListener("mouseup", () => {
          if (resizing) saveGeom();
          resizing = false;
        });
      }
      exports.visible = false;
      exports.update = function update() {
        overlay.style.display = exports.visible ? "block" : "none";
        if (exports.visible) {
          setTimeout(() => input.focus(), 0);
          try {
            document.exitPointerLock && document.exitPointerLock();
          } catch {
          }
        } else {
          input.blur();
          controls.locklessChange(true);
          RENDER.renderer.domElement.requestPointerLock();
        }
      };
      exports.toggleConsole = function toggleConsole() {
        exports.visible = !exports.visible;
        exports.update();
      };
      function applyForceCollideFromServer(enabled) {
        const game2 = window.game;
        const manager = game2 && game2.map && game2.map.manager;
        const runtimeObjects = manager && Array.isArray(manager.objects) ? manager.objects : [];
        const mapObjects = game2 && game2.map && Array.isArray(game2.map.maps) && game2.map.maps[game2.mapIndex] && Array.isArray(game2.map.maps[game2.mapIndex].objects) ? game2.map.maps[game2.mapIndex].objects : [];
        if (runtimeObjects.length === 0 && mapObjects.length === 0) return;
        const state = manager.__forceColClientState || null;
        if (enabled) {
          if (state && state.enabled) return;
          const entries = [];
          for (const obj of [...runtimeObjects, ...mapObjects]) {
            if (!obj || typeof obj !== "object") continue;
            entries.push({
              obj,
              hasNoCol: Object.prototype.hasOwnProperty.call(obj, "noCol"),
              noCol: obj.noCol,
              hasCollidable: Object.prototype.hasOwnProperty.call(obj, "collidable"),
              collidable: obj.collidable,
              hasMeshCollidable: !!obj.meshRef && Object.prototype.hasOwnProperty.call(obj.meshRef, "collidable"),
              meshCollidable: obj.meshRef ? obj.meshRef.collidable : void 0
            });
            if (obj.noCol) obj.noCol = false;
            if (obj.collidable !== true) {
              obj.collidable = true;
            }
            if (obj.meshRef && obj.meshRef.collidable !== true) {
              obj.meshRef.collidable = true;
            }
          }
          manager.__forceColClientState = { enabled: true, entries };
          return;
        }
        if (!state || !state.enabled) return;
        for (const entry of state.entries || []) {
          const obj = entry && entry.obj;
          if (!obj) continue;
          if (entry.hasNoCol) obj.noCol = entry.noCol;
          else if (Object.prototype.hasOwnProperty.call(obj, "noCol"))
            delete obj.noCol;
          if (entry.hasCollidable) obj.collidable = entry.collidable;
          else if (Object.prototype.hasOwnProperty.call(obj, "collidable")) {
            delete obj.collidable;
          }
          if (obj.meshRef) {
            if (entry.hasMeshCollidable)
              obj.meshRef.collidable = entry.meshCollidable;
            else if (Object.prototype.hasOwnProperty.call(obj.meshRef, "collidable")) {
              delete obj.meshRef.collidable;
            }
          }
        }
        manager.__forceColClientState = null;
      }
      function hookChat() {
        let installed = false;
        const wrap = (events, name, fmt) => {
          const orig = events[name];
          if (typeof orig !== "function" || orig.__devConsoleWrapped) return;
          const wrapped = function(...args) {
            try {
              const msg = fmt(...args);
              if (msg) append(msg, "reply");
            } catch {
            }
            return orig.apply(this, arguments);
          };
          wrapped.__devConsoleWrapped = true;
          events[name] = wrapped;
        };
        const onOff2 = (v) => v ? "Enabled" : "Disabled";
        const tryInstall = () => {
          if (installed) return;
          const io2 = window.io;
          const events = io2 && io2.events;
          if (!events || typeof events.ch !== "function") return;
          wrap(events, "ch", (name, text) => {
            const cleaned = String(text == null ? "" : text).replace(/<[^>]+>/g, "");
            return `${name || "Server"}: ${cleaned}`;
          });
          wrap(events, "noc", (v) => `Noclip - ${onOff2(v)}`);
          wrap(events, "unl", (v) => `Unlimited Ammo - ${onOff2(v)}`);
          wrap(events, "fh", (v) => `Force Hide - ${onOff2(v)}`);
          if (!events.forcecol || !events.forcecol.__devConsoleWrapped) {
            const origForcecol = typeof events.forcecol === "function" ? events.forcecol : null;
            const wrappedForcecol = function(v) {
              try {
                applyForceCollideFromServer(!!v);
              } catch {
              }
              if (origForcecol) return origForcecol.apply(this, arguments);
            };
            wrappedForcecol.__devConsoleWrapped = true;
            events.forcecol = wrappedForcecol;
          }
          installed = true;
        };
        const t = setInterval(() => {
          tryInstall();
          if (installed) clearInterval(t);
        }, 500);
      }
      hookChat();
      function hookOfflineChatCommands() {
        const BHOP_MODE_NAMES = [
          "Disabled",
          "Hold Space",
          "Always (while moving)",
          "Slidehop (while moving)"
        ];
        function resolveBhopMode(arg2, currentMode) {
          if (!arg2) return ((currentMode | 0) + 1) % BHOP_MODE_NAMES.length;
          const raw = String(arg2).trim().toLowerCase();
          if (/^[0-3]$/.test(raw)) return Number(raw);
          if (raw === "off" || raw === "0" || raw === "disable" || raw === "disabled") {
            return 0;
          }
          if (raw === "hold" || raw === "manual" || raw === "1") return 1;
          if (raw === "auto" || raw === "move" || raw === "always" || raw === "2") {
            return 2;
          }
          if (raw === "slide" || raw === "slidehop" || raw === "3") return 3;
          return null;
        }
        function maybeHandleClientBhopCommand(label, payload) {
          if (label !== "ct" && label !== "ch") return false;
          if (typeof payload !== "string") return false;
          const line = payload.trim();
          if (!line.toLowerCase().startsWith("/bhop")) return false;
          const rest = line.slice(5).trim();
          const currentMode = window.bhopMode | 0;
          const nextMode = resolveBhopMode(rest, currentMode);
          if (nextMode == null) {
            append("Usage: /bhop [0-3|off|hold|auto|slide]", "error");
            return true;
          }
          window.bhopMode = nextMode;
          window.bhopEnabled = nextMode > 0;
          try {
            localStorage.setItem("bhop", String(nextMode));
          } catch {
          }
          const msg = `Bhop - ${BHOP_MODE_NAMES[nextMode]}`;
          append(msg, "reply");
          try {
            if (typeof window.notify === "function") window.notify(msg);
          } catch {
          }
          return true;
        }
        let installed = false;
        const tryInstall = () => {
          if (installed) return;
          const io2 = window.io;
          if (!io2 || typeof io2.send !== "function") return;
          if (io2.send.__devConsoleOfflineWrapped) {
            installed = true;
            return;
          }
          const origSend = io2.send;
          io2.send = function(label, ...data) {
            if (maybeHandleClientBhopCommand(label, data[0])) {
              return;
            }
            if (label === "ct" && this && this.socket === null) {
              const line = data[0];
              if (typeof line === "string" && maybeRunOfflineServerCommand(line)) {
                return;
              }
            }
            return origSend.apply(this, arguments);
          };
          io2.send.__devConsoleOfflineWrapped = true;
          installed = true;
        };
        const t = setInterval(() => {
          tryInstall();
          if (installed) clearInterval(t);
        }, 500);
      }
      hookOfflineChatCommands();
      document.addEventListener("keydown", (e) => {
        if (e.repeat) return;
        if (exports.visible) return;
        const tag = e.target && e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
        const cmd = keyBinds[e.key] || keyBinds[e.code];
        if (cmd) {
          e.preventDefault();
          exec(cmd);
        }
      });
      append("Krunker developer console - type `help` for commands.", "info");
      append("Press ~ to toggle, Esc to close, Tab to autocomplete.", "hint");
      window.devConsole = exports;
    }
  });

  // hook/cheats.js
  var require_cheats = __commonJS({
    "hook/cheats.js"() {
      "use strict";
      window.bhopMode = Number(localStorage.getItem("bhop"));
      if (!Number.isFinite(window.bhopMode) || window.bhopMode < 0 || window.bhopMode > 3)
        window.bhopMode = 0;
      window.bhopEnabled = window.bhopMode > 0;
      window.bhop = false;
      var BHOP_MODE_NAMES = [
        "Disabled",
        "Hold Space",
        "Always (while moving)",
        "Slidehop (while moving)"
      ];
      window.ctrlTpEnabled = localStorage.getItem("ctrlTp") === "1";
      window.ctrlTp = false;
      var devConsole = require_devConsole();
      function readStoredValue(key) {
        if (typeof window.getSavedVal === "function") {
          return window.getSavedVal(key);
        }
        try {
          return localStorage.getItem(key);
        } catch {
          return null;
        }
      }
      function writeStoredValue(key, value) {
        if (typeof window.saveVal === "function") {
          window.saveVal(key, value);
          return;
        }
        try {
          localStorage.setItem(key, value);
        } catch {
        }
      }
      function readStoredBool(key, fallback) {
        const value = readStoredValue(key);
        if (value == null) return fallback;
        return value === true || value === "true" || value === "1";
      }
      function formatDevConsoleBind(code) {
        if (!code) return "Unbound";
        const special = {
          Backquote: "`",
          Minus: "-",
          Equal: "=",
          BracketLeft: "[",
          BracketRight: "]",
          Backslash: "\\",
          Semicolon: ";",
          Quote: "'",
          Comma: ",",
          Period: ".",
          Slash: "/",
          Space: "Space",
          Escape: "Esc",
          ArrowUp: "Up",
          ArrowDown: "Down",
          ArrowLeft: "Left",
          ArrowRight: "Right"
        };
        if (special[code]) return special[code];
        if (/^Key[A-Z]$/.test(code)) return code.slice(3);
        if (/^Digit\d$/.test(code)) return code.slice(5);
        if (/^Numpad\d$/.test(code)) return `Num ${code.slice(6)}`;
        return code.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/(Left|Right)$/, " $1");
      }
      window.devConsoleEnabled = readStoredBool(
        "kro_setngss_devConsoleEnabled",
        ["127.0.0.1", "localhost"].includes(location.hostname)
      );
      window.devConsoleKey = readStoredValue("krk_dev_console_bind") || "Backquote";
      var devConsoleCapturingKey = false;
      function refreshDevConsoleUi() {
        const settingInput = document.querySelector(
          "[data-dev-console-setting] input[type='checkbox']"
        );
        if (settingInput) settingInput.checked = !!window.devConsoleEnabled;
        const bindValue = document.querySelector(
          "[data-dev-console-bind] .settText.floatRNoC.keyIcon"
        );
        if (bindValue) {
          bindValue.textContent = devConsoleCapturingKey ? "Press any Key" : formatDevConsoleBind(window.devConsoleKey);
        }
      }
      function setDevConsoleEnabled(value) {
        window.devConsoleEnabled = !!value;
        writeStoredValue(
          "kro_setngss_devConsoleEnabled",
          String(window.devConsoleEnabled)
        );
        if (!window.devConsoleEnabled && devConsole.visible) {
          instructionHolder?.click?.();
          devConsole.toggleConsole();
        }
        refreshDevConsoleUi();
      }
      function setDevConsoleBind(code) {
        window.devConsoleKey = code || "";
        writeStoredValue("krk_dev_console_bind", window.devConsoleKey);
        refreshDevConsoleUi();
      }
      function matchesDevConsoleBind(event) {
        return !!window.devConsoleEnabled && !!window.devConsoleKey && event.code === window.devConsoleKey;
      }
      function toggleDeveloperConsole() {
        if (!window.devConsoleEnabled) return;
        if (devConsole.visible) instructionHolder?.click?.();
        else document.exitPointerLock?.();
        devConsole.toggleConsole();
      }
      function beginDevConsoleBindCapture() {
        if (devConsoleCapturingKey) return;
        devConsoleCapturingKey = true;
        refreshDevConsoleUi();
        const captureKey = (event) => {
          event.preventDefault();
          event.stopImmediatePropagation();
          document.removeEventListener("keydown", captureKey, true);
          devConsoleCapturingKey = false;
          if (event.code !== "Escape") {
            setDevConsoleBind(event.code);
          } else {
            refreshDevConsoleUi();
          }
        };
        document.addEventListener("keydown", captureKey, true);
      }
      function makeDevConsoleSettingRow() {
        const row = document.createElement("div");
        row.className = "settName";
        row.dataset.devConsoleSetting = "1";
        row.title = "Allows opening the developer console in-game";
        row.append(document.createTextNode("Enable Developer Console (`) "));
        const label = document.createElement("label");
        label.className = "switch";
        label.style.marginLeft = "10px";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.checked = !!window.devConsoleEnabled;
        input.addEventListener("click", () => setDevConsoleEnabled(input.checked));
        const slider = document.createElement("span");
        slider.className = "slider";
        label.append(input, slider);
        row.append(label);
        return row;
      }
      function makeDevConsoleBindHeading() {
        const heading = document.createElement("div");
        heading.className = "setHedBind";
        heading.dataset.devConsoleBindHead = "1";
        heading.textContent = "Developer Tools";
        return heading;
      }
      function makeDevConsoleBindRow() {
        const row = document.createElement("div");
        row.className = "settName";
        row.dataset.devConsoleBind = "1";
        row.append(document.createTextNode("Developer Console"));
        const clear = document.createElement("span");
        clear.className = "unbind";
        clear.addEventListener("click", () => setDevConsoleBind(""));
        const clearIcon = document.createElement("i");
        clearIcon.className = "material-icons";
        clearIcon.style.fontSize = "40px";
        clearIcon.style.color = "var(--red)";
        clearIcon.textContent = "delete_forever";
        clear.append(clearIcon);
        const bind = document.createElement("span");
        bind.className = "settText floatRNoC keyIcon";
        bind.textContent = formatDevConsoleBind(window.devConsoleKey);
        bind.addEventListener("mouseover", () => window.playTick?.());
        bind.addEventListener("click", beginDevConsoleBindCapture);
        row.append(clear, bind);
        return row;
      }
      function ensureDevConsoleSettingRow() {
        const anchorInput = document.getElementById("slid_flickClamp");
        if (!anchorInput) return;
        const anchorRow = anchorInput.closest(".settName");
        if (!anchorRow) return;
        let row = document.querySelector("[data-dev-console-setting='1']");
        if (!row) {
          row = makeDevConsoleSettingRow();
          anchorRow.insertAdjacentElement("afterend", row);
        } else if (row.previousElementSibling !== anchorRow) {
          row.remove();
          anchorRow.insertAdjacentElement("afterend", row);
        }
        refreshDevConsoleUi();
      }
      function ensureDevConsoleBindRow() {
        const anchor = document.getElementById("cont37") || document.getElementById("cont34");
        if (!anchor) return;
        const anchorRow = anchor.closest(".settName");
        if (!anchorRow) return;
        let heading = document.querySelector("[data-dev-console-bind-head='1']");
        let row = document.querySelector("[data-dev-console-bind='1']");
        if (!heading || !row) {
          heading?.remove();
          row?.remove();
          heading = makeDevConsoleBindHeading();
          row = makeDevConsoleBindRow();
          anchorRow.insertAdjacentElement("afterend", heading);
          heading.insertAdjacentElement("afterend", row);
        } else if (heading.previousElementSibling !== anchorRow || row.previousElementSibling !== heading) {
          heading.remove();
          row.remove();
          anchorRow.insertAdjacentElement("afterend", heading);
          heading.insertAdjacentElement("afterend", row);
        }
        refreshDevConsoleUi();
      }
      function syncDevConsoleInterface() {
        ensureDevConsoleSettingRow();
        ensureDevConsoleBindRow();
      }
      {
        let scheduled = false;
        const scheduleSync = () => {
          if (scheduled) return;
          scheduled = true;
          requestAnimationFrame(() => {
            scheduled = false;
            syncDevConsoleInterface();
          });
        };
        const startObserver = () => {
          const root = document.body || document.documentElement;
          if (!root) {
            requestAnimationFrame(startObserver);
            return;
          }
          new MutationObserver(scheduleSync).observe(root, {
            childList: true,
            subtree: true
          });
          scheduleSync();
        };
        startObserver();
      }
      document.addEventListener("keydown", (e) => {
        if (e.repeat) return;
        const input = e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";
        if (matchesDevConsoleBind(e)) {
          if (input && !devConsole.visible) return;
          e.preventDefault();
          toggleDeveloperConsole();
          return;
        }
        switch (e.key) {
          case "F1":
            if (input) return;
            window.io.send("clearLog");
            console.clear();
            break;
          case "F4":
            if (input) return;
            location.href = "/";
            break;
          case "F5":
            location.reload();
            break;
          case "F6":
            console.log("Creating editor window");
            window.open("editor.html");
            break;
          case "T":
          case "t":
            if (input) return;
            window.ctrlTpEnabled ^= 1;
            localStorage.setItem("ctrlTp", +window.ctrlTpEnabled);
            {
              const msg = "Ctrl TP - " + (window.ctrlTpEnabled ? "Enabled" : "Disabled");
              notify(msg);
              console.log(msg);
            }
            break;
          case "B":
          case "b":
            if (input) return;
            window.bhopMode = ((window.bhopMode | 0) + 1) % BHOP_MODE_NAMES.length;
            window.bhopEnabled = window.bhopMode > 0;
            localStorage.setItem("bhop", String(window.bhopMode));
            {
              const msg = "Bhop - " + BHOP_MODE_NAMES[window.bhopMode];
              notify(msg);
              console.log(msg);
            }
            break;
        }
      });
      {
        const pr = Array.prototype;
        const { push } = pr;
        pr.push = function(...args) {
          if (this === window.controls?.tmpInpts) {
            patchInputs(args[0]);
          }
          return push.apply(this, args);
        };
      }
      var iInputs = {
        frame: 0,
        delta: 1,
        xDir: 2,
        yDir: 3,
        moveDir: 4,
        shoot: 5,
        scope: 6,
        jump: 7,
        crouch: 8,
        reload: 9,
        weaponScroll: 10,
        weaponSwap: 11
      };
      var slideDidCrouch = false;
      window.slideHold = false;
      window.addEventListener("blur", (e) => {
        window.ctrlTp = false;
        window.slideHold = false;
      });
      window.addEventListener("keydown", (e) => {
        if (e.repeat || document.activeElement?.tagName === "INPUT") return;
        if (e.code === "Space") {
          window.bhop = true;
        } else if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
          window.slideHold = true;
        } else if (e.code === "ControlLeft" && window.ctrlTpEnabled) {
          window.ctrlTp = true;
        }
      });
      window.addEventListener("keyup", (e) => {
        if (e.repeat) return;
        if (e.code === "Space") {
          window.bhop = false;
        } else if (e.code === "ShiftLeft" || e.code === "ShiftRight") {
          window.slideHold = false;
        } else if (e.code === "ControlLeft" && window.ctrlTpEnabled) {
          window.ctrlTp = false;
        }
      });
      document.addEventListener("pointerlockchange", () => {
        if (!document.pointerLockElement) {
          window.bhop = false;
          window.slideHold = false;
          window.ctrlTp = false;
        }
      });
      {
        const pr = EventTarget.prototype;
        const { addEventListener } = pr;
        pr.addEventListener = function(type, listener, options) {
          if (this instanceof HTMLCanvasElement && (type === "mousedown" || type === "mouseup")) {
            const wrappedListener = function(event) {
              if (window.ctrlTpEnabled && window.ctrlTp && event.which === 1) {
                if (event.type === "mouseup") {
                } else if (localPlayer?.active && RENDER?.camera) {
                  const tpRaycaster = new THREE.Raycaster();
                  tpRaycaster.far = 6e3;
                  tpRaycaster.setFromCamera({ x: 0, y: 0 }, RENDER.camera);
                  const hits = tpRaycaster.intersectObject(RENDER.scene, true).filter(function(h) {
                    var o = h.object;
                    if (!o || !o.visible) return false;
                    var p = o;
                    while (p) {
                      if (p === (localPlayer && localPlayer.object)) return false;
                      p = p.parent;
                    }
                    return true;
                  });
                  if (hits.length) {
                    const pt = hits[0].point;
                    io.send("tp", pt.x, pt.y + (localPlayer.height || 11), pt.z);
                  }
                }
                return;
              }
              listener.call(this, event);
            };
            return addEventListener.call(this, type, wrappedListener, options);
          }
          return addEventListener.call(this, type, listener, options);
        };
      }
      function bhopRandom(min, max, isFloat) {
        const v = Math.random() * (max - min) + min;
        return isFloat ? v : Math.floor(v);
      }
      function pickZeroSome() {
        return bhopRandom(-0.015, 5e-3, true);
      }
      function isBhoppable(lp) {
        if (!lp) return false;
        if (lp.onGround) return true;
        try {
          const g = window.game;
          const cls = g && g.classConfig && g.classConfig[lp.classIndex];
          if (cls && cls.wallJ && lp.wallJump && lp.onWall) return true;
        } catch (_) {
        }
        return false;
      }
      var bhopZeroSome = pickZeroSome();
      var bhopNextZeroSome = pickZeroSome();
      var bhopDidCrouch = false;
      var bhopTimer = 0;
      var bhopStart = 0;
      var BHOP_DELAY = 130;
      function patchInputs(inputs) {
        const lp = localPlayer;
        if (lp?.noclip) return;
        const mode = window.bhopMode | 0;
        if (mode === 0) {
          slideDidCrouch = false;
          return;
        }
        const moving = inputs[iInputs.moveDir] !== -1;
        const autoBhop = (mode === 2 || mode === 3) && moving;
        const holdBhop = mode === 1 && (inputs[iInputs.jump] || window.bhop);
        const wantBhop = autoBhop || holdBhop;
        if (wantBhop) {
          const now = Date.now();
          if (bhopTimer <= now) {
            bhopTimer = 0;
            bhopStart = 0;
          }
          if (!bhopTimer && isBhoppable(lp)) {
            bhopTimer = now + BHOP_DELAY + bhopRandom(0, 20);
            bhopStart = inputs[iInputs.frame] + bhopRandom(1, 3);
            inputs[iInputs.jump] = 0;
          } else {
            const mustBhop = inputs[iInputs.frame] >= bhopStart && now < bhopTimer;
            inputs[iInputs.jump] = mustBhop ? 1 : 0;
          }
        } else {
          bhopTimer = 0;
          bhopStart = 0;
        }
        if (mode === 3) {
          const onGround = !!lp?.onGround;
          if (onGround && !inputs[iInputs.jump] && inputs[iInputs.crouch]) {
            inputs[iInputs.crouch] = 1;
            bhopDidCrouch = true;
          } else {
            if (!bhopDidCrouch) bhopZeroSome = bhopNextZeroSome;
            const vy = lp && (lp.velocity?.y ?? lp.velY) || 0;
            const willCrouch = !onGround && vy < bhopZeroSome;
            inputs[iInputs.crouch] = willCrouch ? 1 : 0;
            if (!bhopDidCrouch && willCrouch) bhopNextZeroSome = pickZeroSome();
            bhopDidCrouch = willCrouch;
          }
          slideDidCrouch = bhopDidCrouch;
        } else {
          bhopDidCrouch = false;
          slideDidCrouch = false;
        }
      }
      window.addEventListener("blur", () => {
        const doHopsBoing = localStorage.boing;
        if (!doHopsBoing) window.bhop = false;
      });
    }
  });

  // hook/notify.js
  var require_notify = __commonJS({
    "hook/notify.js"(exports, module) {
      var notification = document.createElement("div");
      var anim = document.createElement("style");
      notification.style.cssText = `
  position: absolute;
  z-index: 9999;
  top: 10px;
  right: 10px;
  transform: translateX(calc(100% + 20px));
  padding: 10px;
  margin: 10px;
  box-sizing: border-box;
  border-radius: 5px;
  background: #0005;
  color: #fff;
`;
      anim.textContent = `
  @keyframes slide {
      0%, 100% {
          transform: translateX(calc(100% + 20px));
      }
  
      10%, 90% {
          transform: translateX(0);
      }
  }
  
  .anim {
      animation: slide 2s forwards;
  }
`;
      function waitFor(check, interval = 50) {
        return new Promise((resolve) => {
          let timer;
          const run = () => {
            try {
              const result = check();
              if (result) {
                if (timer) clearInterval(timer);
                resolve(result);
                return true;
              }
            } catch (err) {
              if (typeof isDevelopment !== "undefined" && isDevelopment)
                console.error(err);
            }
            return false;
          };
          if (!run()) timer = setInterval(run, interval);
        });
      }
      waitFor(() => document.head).then(() => {
        document.body.append(notification, anim);
      });
      function notify2(message) {
        notification.innerHTML = message;
        notification.className = "";
        void notification.offsetHeight;
        notification.className = "anim";
      }
      module.exports = window.notify = notify2;
    }
  });

  // hook/index.js
  var require_index = __commonJS({
    "hook/index.js"() {
      var { rewrite, rewrite_mm } = require_hooks();
      window._debugTimeStart = Date.now();
      window.IO = {
        broadcast() {
        },
        send() {
        }
      };
      window.grecaptcha = {
        execute: function(siteKey, options) {
          return Promise.resolve(
            "recaptcha-token-" + Math.random().toString(36).slice(2)
          );
        },
        ready: function(cb) {
          cb();
        }
      };
      localStorage.logs = "true";
      window.setCookie = function setCookie(name, value, days = 3650) {
        const d = /* @__PURE__ */ new Date();
        d.setTime(d.getTime() + days * 864e5);
        const s = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/; SameSite=Lax; expires=" + d.toUTCString();
        document.cookie = s;
        return s;
      };
      function installCrossRegionAuthBridge() {
        const host = String(location.hostname || "").toLowerCase();
        const sharedDomain = host.endsWith(".krunker.zip") ? ".krunker.zip" : null;
        if (!sharedDomain) return;
        const AUTH_KEYS = ["krunker_username", "krunker_token", "krunker_id"];
        function readCookie(name) {
          const encoded = encodeURIComponent(name) + "=";
          const parts = String(document.cookie || "").split(";");
          for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            if (!part.startsWith(encoded)) continue;
            return decodeURIComponent(part.slice(encoded.length));
          }
          return null;
        }
        function writeCookie(name, value, days = 365) {
          const d = /* @__PURE__ */ new Date();
          d.setTime(d.getTime() + days * 864e5);
          const secure = location.protocol === "https:" ? "; Secure" : "";
          document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + "; path=/; domain=" + sharedDomain + "; SameSite=Lax" + secure + "; expires=" + d.toUTCString();
        }
        function deleteCookie(name) {
          const secure = location.protocol === "https:" ? "; Secure" : "";
          document.cookie = encodeURIComponent(name) + "=; path=/; domain=" + sharedDomain + "; SameSite=Lax" + secure + "; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        for (const key of AUTH_KEYS) {
          const value = readCookie(key);
          if (value == null || value === "") continue;
          try {
            localStorage.setItem(key, value);
          } catch {
          }
        }
        const storageProto = typeof Storage !== "undefined" && Storage && Storage.prototype ? Storage.prototype : null;
        if (!storageProto) return;
        const origSetItem = storageProto.setItem;
        const origRemoveItem = storageProto.removeItem;
        storageProto.setItem = function(key, value) {
          const out = origSetItem.apply(this, arguments);
          if (this === localStorage && AUTH_KEYS.includes(String(key))) {
            if (value == null || value === "") deleteCookie(String(key));
            else writeCookie(String(key), String(value));
          }
          return out;
        };
        storageProto.removeItem = function(key) {
          const out = origRemoveItem.apply(this, arguments);
          if (this === localStorage && AUTH_KEYS.includes(String(key))) {
            deleteCookie(String(key));
          }
          return out;
        };
      }
      installCrossRegionAuthBridge();
      require_objects();
      require_cheats();
      var notify2 = require_notify();
      {
        const p = Element.prototype;
        const desc = Object.getOwnPropertyDescriptor(p, "innerHTML");
        const replacements = [
          [
            "//client2.krunker.io/setup.exe",
            "https://krunker.zip/glorp/Krunker.io_Client_Setup_v3.1.1.exe"
          ],
          ["//client2.krunker.io/setup.dmg", "#"],
          [
            "//client2.krunker.io/setup.AppImage",
            "https://krunker.zip/glorp/Krunker.io_Client_v3.1.1.AppImage"
          ]
        ];
        if (!desc || !desc.set) return;
        Object.defineProperty(p, "innerHTML", {
          configurable: true,
          enumerable: desc.enumerable,
          get: desc.get,
          set(value) {
            if (typeof value === "string") {
              for (const [pat, sub] of replacements) value = value.replace(pat, sub);
            }
            desc.set.call(this, value);
          }
        });
      }
      function quickJoinRegion(hj) {
        const ww = window.windows && window.windows[1];
        const servers = {
          custom: { order: 1, name: "Custom Games", players: 0, games: [] }
        };
        const defReg = window.settings && window.settings.list && window.settings.list.defaultRegion && window.settings.list.defaultRegion.val;
        for (const tup of ww.serverListData || []) {
          const regionID = tup[1];
          const meta = tup[4];
          if (!meta) continue;
          if (!servers[regionID]) {
            servers[regionID] = {
              name: config.regionNames[regionID],
              players: 0,
              games: []
            };
            if (defReg === regionID) servers[regionID].order = 1;
          }
          const bucket = meta.cs ? "custom" : regionID;
          servers[bucket].games.push(tup);
          servers[bucket].players += tup[2];
        }
        const hB = [];
        for (const k in servers)
          if (Object.prototype.hasOwnProperty.call(servers, k)) hB.push(servers[k]);
        hB.sort((a, b) => (b.order || -1) - (a.order || -1));
        const pick = hB[hj];
        if (!pick) return;
        const games = pick.games.filter((t) => t[2] < t[3]).sort((a, b) => b[2] - a[2]);
        if (!games.length) return;
        client.switchGame(games[0][0]);
      }
      Object.defineProperty(window, "quickJoinRegion", {
        get: () => quickJoinRegion
      });
      Object.defineProperty(Object.prototype, "PING_REGION_CACHE_KEY", {
        set(value) {
          delete Object.prototype.PING_REGION_CACHE_KEY;
          this.PING_REGION_CACHE_KEY = value;
          const proto = this.prototype;
          if (!proto) return;
          const original = proto.fetchGameInfo;
          Object.defineProperty(proto, "fetchGameInfo", {
            configurable: true,
            get() {
              if (this !== proto) window.client = this;
              return original;
            }
          });
        },
        configurable: true
      });
      Object.defineProperty(Object.prototype, "finishInit", {
        set(value) {
          delete Object.prototype.finishInit;
          this.finishInit = value;
          const { init } = this;
          this.init = function(mapIndex, modeIndex, mapData, isAsync) {
            const mapToEdit = typeof mapData === "string" ? mapData : JSON.stringify(this.map.maps[mapIndex]);
            localStorage.mapToEdit = mapToEdit;
            return init.call(this, mapIndex, modeIndex, mapData, isAsync);
          };
        },
        configurable: true
      });
      {
        const pr = Image.prototype;
        const src = Object.getOwnPropertyDescriptor(pr, "src");
        Object.defineProperty(pr, "src", {
          get: src.get,
          set: function(value) {
            const newValue = rewrite(value);
            src.set.call(this, newValue);
          }
        });
      }
      {
        const pr = XMLHttpRequest.prototype;
        const { open } = pr;
        pr.open = function(method, url, ...args) {
          const newUrl = rewrite(url);
          return open.call(this, method, newUrl, ...args);
        };
      }
      {
        const pr = History.prototype;
        const { pushState, replaceState } = pr;
        pr.pushState = function(state, title, url) {
          const newUrl = rewrite_history(url);
          return pushState.call(this, state, title, newUrl);
        };
        pr.replaceState = function(state, title, url) {
          const newUrl = rewrite_history(url);
          if (url === "offline") return;
          return replaceState.call(this, state, title, newUrl);
        };
      }
      function rewrite_history(url) {
        return url;
      }
      {
        const pr = HTMLMediaElement.prototype;
        const src = Object.getOwnPropertyDescriptor(pr, "src");
        Object.defineProperty(pr, "src", {
          get: src.get,
          set: function(value) {
            const newValue = rewrite(value);
            src.set.call(this, newValue);
          }
        });
      }
      {
        const WebSocket2 = window.WebSocket;
        const pr = WebSocket2.prototype;
        const REWRITE_HOSTS = /(^|\.)krunker\.io$/i;
        window.WebSocket = function(value) {
          const o = new URL(value);
          const shouldRewrite = !o.host || REWRITE_HOSTS.test(o.hostname);
          const newValue = shouldRewrite ? (location.protocol === "https:" ? "wss:" : "ws:") + "//" + location.host + o.pathname + o.search : value;
          const wss = new WebSocket2(newValue);
          return wss;
        };
        window.WebSocket.prototype = pr;
        window.WebSocket.CONNECTING = WebSocket2.CONNECTING;
        window.WebSocket.OPEN = WebSocket2.OPEN;
        window.WebSocket.CLOSING = WebSocket2.CLOSING;
        window.WebSocket.CLOSED = WebSocket2.CLOSED;
      }
      var xhrOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url, ...args) {
        const rewrittenUrl = rewrite_mm(url);
        return xhrOpen.call(this, method, rewrittenUrl, ...args);
      };
      var fetch = window.fetch;
      window.fetch = function(init, opts) {
        const rewrittenUrl = rewrite_mm(init);
        return fetch.call(this, rewrittenUrl, opts);
      };
    }
  });
  require_index();
})();
//# sourceMappingURL=hook.js.map
