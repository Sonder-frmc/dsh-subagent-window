window.__ModuleLoader__.load({
  id: "@local/subagent-window",
  factory(require) {
    const React = require("react");
    const ReactDOM = require("react-dom");
    const h = React.createElement;

    const NS = "@local/subagent-window";
    const TAB_ID = "@local/subagent-window";
    const TAB_KIND = "subagent-window";
    const ANCHOR_ID = "subagent-window-header-menu";
    const MENU_OVERLAY_ID = "subagent-window-menu";
    const TAB_MENU_ID = "subagent-window-tab-menu";
    const CHAT_PREFIX = "dsh-resource://subagentchat/session/";
    const STYLE_ID = "subagent-window-style";

    // One line per key; [0] is zh, [1] is en. The two dictionaries are derived
    // from it so the registered objects keep exactly the v3.9 key/value shape.
    const MESSAGES = {
      "tab.title": ["子智能体", "Subagents"],
      "guide.title": ["子智能体", "Subagents"],
      "guide.desc": ["列出当前对话的子智能体，并打开或关闭它们的浮窗", "List this conversation's subagents and open or close their floating windows"],
      "page.title": ["子智能体", "Subagents"],
      "page.empty": ["当前对话还没有子智能体。", "This conversation has no subagents yet."],
      "page.noSession": ["打开一个会话后，这里会列出它的子智能体。", "Open a conversation to list its subagents here."],
      "page.open": ["打开对话", "Open conversation"],
      "page.float": ["打开浮窗", "Open floating window"],
      "page.close": ["关闭浮窗", "Close floating window"],
      "page.running": ["运行中", "Running"],
      "page.idle": ["空闲", "Idle"],
      "page.floated": ["已弹窗", "Floating"],
      "page.hint": ["浮窗内可查看、发消息、接受权限确认与停止；关闭浮窗不会结束子智能体。", "Floating windows support viewing, messaging, permission prompts and stop; closing a window does not end the subagent."],
      "menu.button": ["子智能体浮窗菜单", "Subagent floating-window menu"],
      "menu.title": ["子智能体浮窗", "Subagent windows"],
      "menu.openFloat": ["打开浮窗", "Open floating window"],
      "menu.closeFloat": ["关闭浮窗", "Close floating window"],
      "menu.empty": ["该会话没有可操作子智能体。", "This session has no subagents to act on."],
      "mode.oneShot": ["只读", "Read-only"],
      "mode.continuable": ["可交互", "Interactive"],
      "mode.unknown": ["模式未知", "Unknown mode"],
      "error.prefix": ["操作失败：", "Action failed: "],
      "error.generic": ["发生了未知错误。", "Unknown error."]
    };
    const zh = {};
    const en = {};
    Object.keys(MESSAGES).forEach(function (key) {
      zh[key] = MESSAGES[key][0];
      en[key] = MESSAGES[key][1];
    });

    const styleText = [
      ".sw_anchor{display:inline-block;width:0;height:0;overflow:visible;position:relative;line-height:0;}",
      ".sw_dots{position:absolute;top:-10px;left:2px;font:inherit;font-size:14px;line-height:1;width:22px;height:22px;border:0;border-radius:var(--dsw-radius-s,6px);background:transparent;color:inherit;cursor:pointer;opacity:.75;}",
      ".sw_dots:hover{opacity:1;background:var(--dsw-alias-bg-hover,rgba(128,128,128,.14));}",
      ".sw_menu{position:fixed;z-index:2147483000;min-width:250px;max-width:340px;max-height:64vh;overflow:auto;box-sizing:border-box;padding:6px;display:flex;flex-direction:column;gap:2px;background:var(--dsw-alias-bg-elevated,rgba(24,24,24,.98));border:1px solid var(--dsw-alias-border,rgba(128,128,128,.35));border-radius:var(--dsw-radius-m,8px);box-shadow:0 8px 24px rgba(0,0,0,.28);color:var(--dsw-alias-text,inherit);font-size:12px;}",
      ".sw_menuTitle{font-size:11px;opacity:.65;padding:4px 8px;color:var(--dsw-alias-text-secondary,inherit);}",
      ".sw_menuEmpty{font-size:12px;opacity:.8;padding:8px;color:var(--dsw-alias-text-secondary,inherit);}",
      ".sw_menuRow{padding:4px 2px 6px;display:flex;flex-direction:column;gap:2px;border-top:1px solid var(--dsw-alias-border,rgba(128,128,128,.18));}",
      ".sw_menuRow:first-of-type{border-top:0;}",
      ".sw_menuRowName{display:flex;align-items:center;gap:6px;font-size:12px;padding:2px 8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
      ".sw_menuActions{display:flex;gap:4px;padding:0 4px;}",
      ".sw_menuItem{font:inherit;font-size:12px;padding:4px 9px;border:1px solid var(--dsw-alias-border,rgba(128,128,128,.3));border-radius:var(--dsw-radius-s,6px);background:transparent;color:inherit;cursor:pointer;}",
      ".sw_menuItem:hover:not(:disabled){background:var(--dsw-alias-bg-hover,rgba(128,128,128,.14));}",
      ".sw_menuItem:disabled,.sw_btn:disabled{opacity:.45;cursor:default;}",
      ".sw_menuStatus{font-size:11px;color:var(--dsw-alias-danger,inherit);padding:4px 8px;}",
      ".sw_panel{display:flex;flex-direction:column;gap:12px;height:100%;box-sizing:border-box;padding:18px 20px;overflow:auto;color:var(--dsw-alias-text,inherit);}",
      ".sw_header{display:flex;align-items:center;justify-content:space-between;gap:12px;}",
      ".sw_title{display:flex;align-items:center;gap:8px;font-size:15px;font-weight:600;}",
      ".sw_count{font-size:11px;font-weight:500;opacity:.75;color:var(--dsw-alias-text-secondary,inherit);}",
      ".sw_btn{font:inherit;font-size:12px;padding:4px 10px;border-radius:var(--dsw-radius-s,6px);border:1px solid var(--dsw-alias-border,currentColor);background:transparent;color:inherit;cursor:pointer;}",
      ".sw_btn:hover:not(:disabled),.sw_row:hover{background:var(--dsw-alias-bg-hover,transparent);}",
      ".sw_list{display:flex;flex-direction:column;gap:2px;}",
      ".sw_row{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:var(--dsw-radius-s,6px);}",
      ".sw_dot{flex:none;width:7px;height:7px;border-radius:999px;background:var(--dsw-alias-text-secondary,currentColor);opacity:.45;}",
      ".sw_dot_on{background:var(--dsw-alias-success,currentColor);opacity:1;}",
      ".sw_rowText{flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;}",
      ".sw_name{font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
      ".sw_meta{display:flex;align-items:center;gap:8px;font-size:11px;opacity:.8;color:var(--dsw-alias-text-secondary,inherit);}",
      ".sw_chip{padding:1px 6px;border-radius:999px;border:1px solid var(--dsw-alias-border,currentColor);font-size:10px;}",
      ".sw_btn_primary,.sw_chip_on{border-color:var(--dsw-alias-accent,currentColor);color:var(--dsw-alias-accent,inherit);}",
      ".sw_metaText{font-size:11px;}",
      ".sw_actions{display:flex;gap:6px;flex:none;}",
      ".sw_empty{padding:18px 4px;font-size:13px;opacity:.8;color:var(--dsw-alias-text-secondary,inherit);}",
      ".sw_hint{font-size:11px;opacity:.7;color:var(--dsw-alias-text-secondary,inherit);}",
      ".sw_status{font-size:12px;color:var(--dsw-alias-danger,inherit);}",
      ".sw_tabTitle{display:inline-flex;align-items:center;gap:6px;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}",
      "[data-dockkit-float]:has([data-sidebar-chat]){max-width:calc(100vw - 24px);max-height:calc(100vh - 24px);box-sizing:border-box;}",
      "[data-dockkit-float]:has([data-sidebar-chat]) > [data-dockkit-float-resize]{width:28px!important;height:28px!important;z-index:40!important;cursor:nwse-resize!important;touch-action:none!important;}"
    ].join("\n");

    let api = null;
    let lastRect = null;
    // Dockkit renders a float at top: max(var(--dsh-dockkit-float-top, 0px), y).
    // On the desktop shell with a native Windows titlebar that variable is
    // "titlebar height + 20px", so the usable vertical space starts lower.
    let measuredTopOffset = 0;
    let reclaiming = false;
    let lastReclaimAt = 0;
    // Set when collapsing the right column took the float down with it and the
    // reopen fallback failed too; from then on the column is left expanded.
    let restoreCollapseFailed = false;

    // Run `work` and return its result; on a synchronous throw return `fallback`.
    // Only "best effort" catches use this; the swallow/report/fallback intent
    // stays readable at each call site.
    function attempt(work, fallback) {
      try {
        return work();
      } catch (error) {
        return fallback;
      }
    }

    function t(key) {
      if (api && typeof api.t === "function") {
        const value = attempt(function () { return api.t(key); }, null);
        if (typeof value === "string" && value.length > 0) return value;
      }
      // Fall through to the local dictionary below.
      return typeof zh[key] === "string" ? zh[key] : key;
    }

    function resourceOf(address) {
      return (
        CHAT_PREFIX +
        encodeURIComponent(address.childSessionId) +
        "?parent=" +
        encodeURIComponent(address.parentSessionId) +
        "&mode=" +
        encodeURIComponent(address.mode || "unknown")
      );
    }

    function sessionsSnapshot() {
      if (!api || !api.sessions || !api.sessions.list) return null;
      return attempt(function () { return api.sessions.list.getSnapshot(); }, null);
    }

    function subscribeSessions(listener) {
      if (!api || !api.sessions || !api.sessions.list) return function () {};
      const off = attempt(function () { return api.sessions.list.subscribe(listener); }, null);
      return typeof off === "function" ? off : function () {};
    }

    function subscribeLocaleChanges(listener) {
      if (!api || !api.locale) return function () {};
      const off = attempt(function () { return api.locale.subscribe(listener); }, null);
      return typeof off === "function" ? off : function () {};
    }

    function screenLayout() {
      if (!api || !api.sidebarRight || typeof api.sidebarRight.screen !== "function") return null;
      const screen = attempt(function () { return api.sidebarRight.screen(); }, null);
      return screen && screen.surface ? screen.surface.layout : null;
    }

    // Whether the right column is currently expanded. Used by the reclaim path
    // so a collapsed column is not left open just because reopening the float
    // needed a surface to mount in.
    function rightbarExpanded() {
      if (api && api.sidebarRight && typeof api.sidebarRight.isExpanded === "function") {
        const value = attempt(function () { return api.sidebarRight.isExpanded(); }, null);
        if (typeof value === "boolean") return value;
      }
      // Fall through to the layout flag.
      const layout = screenLayout();
      if (layout && typeof layout.expanded === "boolean") return layout.expanded;
      return null;
    }

    // Decide whether opening a float should leave the right column collapsed.
    // `wasExpanded` is the state read before the surface is ensured; `surface.opened`
    // says whether this call expanded the column itself; `options.restoreCollapsed`
    // is the reclaim path's explicit request. Once the reopen fallback has failed,
    // never try to collapse again (it would just flicker on every open).
    function shouldRestoreRightbar(wasExpanded, surface, options) {
      if (restoreCollapseFailed) return false;
      if (options && options.restoreCollapsed === true) return true;
      if (wasExpanded === false) return true;
      return wasExpanded === null && !!(surface && surface.opened);
    }

    function findTab(layout, contentId) {
      if (!layout || !layout.tabs) return null;
      return (
        rowsOf(layout.tabs).find(function (tab) {
          return tab && tab.contentId === contentId;
        }) || null
      );
    }

    function paneOfTab(layout, tabId) {
      if (!layout || !layout.nodes) return null;
      return (
        rowsOf(layout.nodes).find(function (node) {
          return node && node.kind === "pane" && Array.isArray(node.tabs) && node.tabs.indexOf(tabId) >= 0;
        }) || null
      );
    }

    function currentFloatRect() {
      const layout = screenLayout();
      if (!layout || !layout.floats) return null;
      for (let index = 0; index < layout.floats.length; index += 1) {
        const node = layout.nodes ? layout.nodes[layout.floats[index]] : null;
        if (node && node.rect) return node.rect;
      }
      return null;
    }

    function isFloatedContent(contentId) {
      const layout = screenLayout();
      const tab = findTab(layout, contentId);
      if (!tab) return false;
      const pane = paneOfTab(layout, tab.id);
      return !!(pane && pane.host === "float");
    }

    const FLOAT_MARGIN = 12;

    // Extra top offset applied by dockkit CSS (Windows native titlebar). The
    // rect we pass to float() is interpreted from the viewport top, but the
    // rendered window starts at max(topOffset, y); clamping against vh alone
    // therefore leaves the bottom cut off. Prefer the measured real value.
    function floatTopOffset() {
      try {
        if (measuredTopOffset > 0) return measuredTopOffset;
        if (typeof document === "undefined" || !document.documentElement) return 0;
        const root = document.documentElement;
        if (typeof root.hasAttribute !== "function" || !root.hasAttribute("data-windows-titlebar")) return 0;
        if (root.hasAttribute("data-fullscreen")) return 20;
        const raw = attempt(function () { return getComputedStyle(root).getPropertyValue("--dsh-windows-titlebar-height"); }, "");
        const parsed = parseFloat(raw);
        return (isFinite(parsed) && parsed >= 0 ? parsed : 32) + 20;
      } catch (error) {
        return 0;
      }
    }

    function measureTopOffset() {
      if (typeof document === "undefined") return measuredTopOffset;
      const parsed = attempt(function () {
        const element = document.querySelector('[data-dockkit-float]:has([data-sidebar-chat])');
        return element ? parseFloat(getComputedStyle(element).getPropertyValue("--dsh-dockkit-float-top")) : NaN;
      }, NaN);
      if (isFinite(parsed) && parsed > 0) measuredTopOffset = parsed;
      return measuredTopOffset;
    }

    function clampRect(rect) {
      const raw = rect || {};
      const root = typeof document !== "undefined" && document.documentElement ? document.documentElement : null;
      const vw = (root && root.clientWidth) || (typeof window !== "undefined" && window.innerWidth) || 1440;
      const vh = (root && root.clientHeight) || (typeof window !== "undefined" && window.innerHeight) || 900;
      const usableH = Math.max(180, vh - floatTopOffset());
      const maxW = Math.max(240, vw - 2 * FLOAT_MARGIN);
      const maxH = Math.max(180, usableH - 2 * FLOAT_MARGIN);
      const width = Math.min(maxW, Math.max(240, Math.round(Number(raw.width) || 0)));
      const height = Math.min(maxH, Math.max(180, Math.round(Number(raw.height) || 0)));
      const maxX = Math.max(FLOAT_MARGIN, vw - width - FLOAT_MARGIN);
      // dockkit renders the float at top = max(topOffset, y), so as soon as y is
      // at/after the titlebar offset the room below is vh - margin. Using usableH
      // here would double-subtract the offset and flag the bottom band as
      // out-of-bounds (every drag there would reclaim/close the window).
      const maxY = Math.max(FLOAT_MARGIN, vh - height - FLOAT_MARGIN);
      const x = Math.min(maxX, Math.max(FLOAT_MARGIN, Math.round(Number(raw.x) || 0)));
      const y = Math.min(maxY, Math.max(FLOAT_MARGIN, Math.round(Number(raw.y) || 0)));
      return { x: x, y: y, width: width, height: height };
    }

    function defaultRect() {
      const width = typeof window !== "undefined" && window.innerWidth ? window.innerWidth : 1440;
      const height = typeof window !== "undefined" && window.innerHeight ? window.innerHeight : 900;
      const boxWidth = Math.min(520, Math.max(360, Math.round(width * 0.34)));
      const boxHeight = Math.min(620, Math.max(420, Math.round(height * 0.62)));
      const topOffset = floatTopOffset();
      const usableH = Math.max(180, height - topOffset);
      return clampRect({
        x: Math.max(16, width - boxWidth - 24),
        y: Math.max(16, topOffset + Math.round((usableH - boxHeight) / 2)),
        width: boxWidth,
        height: boxHeight
      });
    }

    function waitFor(read, timeoutMs) {
      return new Promise(function (resolve, reject) {
        const started = Date.now();
        (function poll() {
          const value = attempt(read, undefined);
          if (value !== undefined && value !== null) {
            resolve(value);
            return;
          }
          if (Date.now() - started >= timeoutMs) {
            reject(new Error("timeout"));
            return;
          }
          setTimeout(poll, 60);
        })();
      });
    }

    async function ensureSurface() {
      if (screenLayout()) return { opened: false };
      if (!api || !api.layout || typeof api.layout.openRightbar !== "function") {
        throw new Error("layout service is unavailable");
      }
      // The right column may already be mounted; the poll below decides.
      const opened = attempt(function () { api.layout.openRightbar(false, false); return true; }, false);
      await waitFor(function () {
        return screenLayout() || undefined;
      }, 1500);
      return { opened: opened };
    }

    async function openFloat(address, options) {
      // Remember the column state before a surface is mounted for the float.
      const wasExpanded = rightbarExpanded();
      const surface = await ensureSurface();
      const contentId = resourceOf(address);
      let layout = screenLayout();
      let tab = findTab(layout, contentId);
      if (!tab) {
        api.sidebarRight.openResource(contentId, { kind: "subagentchat", preferNewPane: true });
        tab = await waitFor(function () {
          return findTab(screenLayout(), contentId) || undefined;
        }, 2000);
      }
      layout = screenLayout();
      const pane = paneOfTab(layout, tab.id);
      if (!pane || pane.host !== "float") {
        // Already floating after a concurrent action; the rect below still applies.
        attempt(function () { api.sidebarRight.float(tab.id, clampRect(lastRect || defaultRect())); });
      }
      const rect = currentFloatRect();
      lastRect = clampRect(rect || lastRect || defaultRect());
      measureTopOffset();
      if (shouldRestoreRightbar(wasExpanded, surface, options)) {
        await restoreCollapsedRightbar(tab, contentId, address);
      }
      return tab;
    }

    function closeFloatByContent(contentId) {
      const layout = screenLayout();
      const tab = findTab(layout, contentId);
      if (!tab || !api || !api.sidebarRight) return false;
      return attempt(function () { api.sidebarRight.close(tab.id); return true; }, false);
    }

    function floatExistingTabContent(contentId) {
      const layout = screenLayout();
      const tab = findTab(layout, contentId);
      if (!tab || !api || !api.sidebarRight) return false;
      const pane = paneOfTab(layout, tab.id);
      if (pane && pane.host === "float") return true;
      if (!attempt(function () { api.sidebarRight.float(tab.id, clampRect(lastRect || defaultRect())); return true; }, false)) return false;
      const rect = currentFloatRect();
      if (rect) lastRect = clampRect(rect);
      measureTopOffset();
      return true;
    }

    // Collapsing the column after a float was opened can unmount the float on
    // hosts where the float lives in the same surface. Give the dock a moment to
    // settle, and if the float is gone, reopen the column and float the tab again.
    async function reopenFloatedTab(tab, contentId, address) {
      const targetId = contentId || resourceOf(address);
      const layout = screenLayout();
      const existing = findTab(layout, targetId);
      const target = existing || tab;
      if (target && target.id) {
        try {
          api.sidebarRight.float(target.id, clampRect(lastRect || defaultRect()));
          const rect = currentFloatRect();
          if (rect) lastRect = clampRect(rect);
          measureTopOffset();
          return true;
        } catch (error) {
          // The tab may be gone; reopen the resource below.
        }
      }
      try {
        api.sidebarRight.openResource(targetId, { kind: "subagentchat", preferNewPane: true });
        const reopened = await waitFor(function () {
          return findTab(screenLayout(), targetId) || undefined;
        }, 2000);
        api.sidebarRight.float(reopened.id, clampRect(lastRect || defaultRect()));
        const rect = currentFloatRect();
        if (rect) lastRect = clampRect(rect);
        measureTopOffset();
        return true;
      } catch (error) {
        return false;
      }
    }

    // Restore a column that was collapsed before the float opened. Never throws:
    // on hosts where collapsing takes the float down, it reopens the column and
    // floats the tab again; if that fails too, the column simply stays open.
    async function restoreCollapsedRightbar(tab, contentId, address) {
      if (restoreCollapseFailed) return;
      if (!api || !api.layout || typeof api.layout.closeRightbar !== "function") return;
      // Best effort: a failing collapse must not break the caller.
      if (!attempt(function () { api.layout.closeRightbar(); return true; }, false)) return;
      const survived = await waitFor(function () {
        return floatedSubagentTab() && currentFloatRect() ? true : undefined;
      }, 400).then(
        function () {
          return true;
        },
        function () {
          return false;
        }
      );
      if (survived) return;
      // The column took the float with it: reopen the column and float again.
      if (!attempt(function () { api.layout.openRightbar(false, false); return true; }, false)) {
        restoreCollapseFailed = true;
        return;
      }
      try {
        await waitFor(function () {
          return screenLayout() || undefined;
        }, 1500);
      } catch (error) {
        // The reopen fallback below decides whether the float can be restored.
      }
      const restored = await reopenFloatedTab(tab, contentId, address);
      if (!restored) restoreCollapseFailed = true;
    }

    function floatedSubagentTab() {
      const layout = screenLayout();
      if (!layout || !layout.tabs) return null;
      return (
        rowsOf(layout.tabs).find(function (tab) {
          if (!tab || typeof tab.contentId !== "string") return false;
          if (tab.contentId.indexOf(CHAT_PREFIX) !== 0) return false;
          const pane = paneOfTab(layout, tab.id);
          return !!(pane && pane.host === "float");
        }) || null
      );
    }

    function addressFromContentId(contentId) {
      if (typeof contentId !== "string" || contentId.indexOf(CHAT_PREFIX) !== 0) return null;
      return attempt(function () {
        const rest = contentId.slice(CHAT_PREFIX.length);
        const mark = rest.indexOf("?");
        const childSessionId = decodeURIComponent(mark >= 0 ? rest.slice(0, mark) : rest);
        if (!childSessionId) return null;
        const params = mark >= 0 ? new URLSearchParams(rest.slice(mark + 1)) : null;
        const parentSessionId = params ? params.get("parent") || "" : "";
        const mode = params ? params.get("mode") || "unknown" : "unknown";
        return { parentSessionId: parentSessionId, childSessionId: childSessionId, mode: mode };
      }, null);
    }

    // Dockkit lets the user drag/resize a float past the viewport edge and does
    // not correct it. Its own pointerup listener commits the new rect on the
    // bubble phase, which runs AFTER our capture-phase listener, so the capture
    // phase must only screen the event: the actual reclaim check is deferred to
    // the next task (plus one frame) so currentFloatRect() sees the committed
    // rect. A one-shot reclaim: no continuous fighting with the user's drag.
    function isFloatPointerTarget(target) {
      if (!isElement(target) || typeof target.closest !== "function") return false;
      if (target.closest("[data-dockkit-float]")) return true;
      return !!(target.closest("[data-dockkit-float-resize]") || target.closest("[data-dockkit-float-grip]"));
    }

    function reclaimOutOfBoundsFloat() {
      if (reclaiming) return;
      if (Date.now() - lastReclaimAt < 800) return;
      const tab = floatedSubagentTab();
      if (!tab) return;
      const address = addressFromContentId(tab.contentId);
      if (!address) return;
      const rect = currentFloatRect();
      if (!rect) return;
      const clamped = clampRect(rect);
      const outOfBounds =
        Math.abs(Number(rect.x) - clamped.x) > 2 ||
        Math.abs(Number(rect.y) - clamped.y) > 2 ||
        Math.abs(Number(rect.width) - clamped.width) > 2 ||
        Math.abs(Number(rect.height) - clamped.height) > 2;
      if (!outOfBounds) return;
      const wasExpanded = rightbarExpanded();
      lastReclaimAt = Date.now();
      reclaiming = true;
      // Reopen at the clamped rect closest to where the user dropped the window.
      lastRect = clamped;
      const contentId = tab.contentId;
      closeFloatByContent(contentId);
      Promise.resolve()
        .then(function () {
          // Collapse the column again only when the caller knew it was
          // collapsed; when the state is unknown, keep dockkit's behaviour.
          return openFloat(address, {
            restoreCollapsed: !restoreCollapseFailed && wasExpanded === false
          });
        })
        .catch(function () {
          // Reopening is best effort; a failure leaves the window closed.
        })
        .then(function () {
          reclaiming = false;
        });
    }

    function onWindowPointerUp(event) {
      if (reclaiming) return;
      if (!event || !isFloatPointerTarget(event.target)) return;
      const run = function () {
        reclaimOutOfBoundsFloat();
      };
      if (typeof window === "undefined" || typeof window.setTimeout !== "function") {
        run();
        return;
      }
      // Deferred: dockkit commits the rect in its own bubble-phase pointerup.
      window.setTimeout(function () {
        if (typeof window.requestAnimationFrame === "function") {
          window.requestAnimationFrame(run);
        } else {
          run();
        }
      }, 0);
    }

    function rowsOf(byId) {
      return Object.keys(byId).map(function (key) {
        return byId[key];
      });
    }

    function currentMainSessionId(snapshot) {
      const byId = (snapshot && snapshot.byId) || {};
      const row = rowsOf(byId).find(function (row) {
        return row && row.retainedBy && (row.retainedBy.mainView || 0) > 0;
      });
      return row ? row.id : null;
    }

    function collectDescendants(snapshot, rootId) {
      const byId = (snapshot && snapshot.byId) || {};
      if (!rootId) return { rootId: null, items: [] };
      const items = [];
      const rows = rowsOf(byId);
      for (let index = 0; index < rows.length; index += 1) {
        const row = rows[index];
        if (!row || row.origin !== "subagent") continue;
        let depth = 1;
        let parentId = row.parentId;
        let guard = 0;
        while (parentId && parentId !== rootId && byId[parentId] && guard < 64) {
          depth += 1;
          parentId = byId[parentId].parentId;
          guard += 1;
        }
        if (parentId !== rootId) continue;
        items.push({ row: row, depth: depth });
      }
      items.sort(function (left, right) {
        if (left.depth !== right.depth) return left.depth - right.depth;
        const leftName = String(left.row.displayTitle || left.row.title || left.row.id);
        const rightName = String(right.row.displayTitle || right.row.title || right.row.id);
        return leftName.localeCompare(rightName);
      });
      return { rootId: rootId, items: items };
    }

    function collectRows(snapshot) {
      return collectDescendants(snapshot, currentMainSessionId(snapshot));
    }

    function modeOf(snapshot, row) {
      if (!snapshot) return "unknown";
      const projections = (snapshot.projectionsBySession || {})[row.parentId];
      const values = projections && projections.values;
      const catalog = values && values.subagentCatalog;
      if (!Array.isArray(catalog)) return "unknown";
      const item = catalog.find(function (item) {
        return item && item.id === row.id && item.mode;
      });
      return item ? item.mode : "unknown";
    }

    function addressOf(row, snapshot) {
      const address =
        api && api.sessions && typeof api.sessions.subagentAddress === "function"
          ? attempt(function () { return api.sessions.subagentAddress(row.id); }, null)
          : null;
      const mode = modeOf(snapshot, row);
      if (!address) {
        return { parentSessionId: row.parentId, childSessionId: row.id, mode: mode };
      }
      return {
        parentSessionId: address.parentSessionId || row.parentId,
        childSessionId: address.childSessionId || row.id,
        mode: mode !== "unknown" ? mode : address.mode || "unknown"
      };
    }

    function modeLabel(mode) {
      if (mode === "one-shot") return t("mode.oneShot");
      if (mode === "continuable") return t("mode.continuable");
      return t("mode.unknown");
    }

    function rowName(row) {
      return String(row.displayTitle || row.title || row.id || "");
    }

    function errorMessage(error) {
      return error && error.message ? String(error.message) : t("error.generic");
    }

    // Subagent catalog rows: map a row element back to its subagent session.
    //
    // ui-subagent renders each catalog row as div[role="treeitem"] with an
    // aria-label but without data-* attributes; the enclosing element is keyed
    // by the child session id (React key), so the fiber is the primary source.
    // Everything here degrades silently: an unmatched row means "no menu".

    function isElement(value) {
      return !!value && typeof value === "object" && value.nodeType === 1;
    }

    function reactFiberOf(node) {
      if (!node || typeof node !== "object") return null;
      const names = attempt(function () { return Object.getOwnPropertyNames(node); }, null);
      if (!names) return null;
      for (let index = 0; index < names.length; index += 1) {
        const name = names[index];
        if (name.indexOf("__reactFiber$") === 0) return node[name] || null;
      }
      return null;
    }

    function matchSessionIdByLabel(label, snapshot) {
      const wanted = typeof label === "string" ? label.trim() : "";
      if (!wanted) return null;
      const rows = rowsOf((snapshot && snapshot.byId) || {}).filter(function (row) {
        return !!row;
      });
      const exact = rows.filter(function (row) {
        return rowName(row) === wanted;
      });
      if (exact.length === 1) return exact[0].id;
      if (exact.length > 1) return null;
      const prefixed = rows.filter(function (row) {
        const name = rowName(row);
        if (!name) return false;
        return name.indexOf(wanted) === 0 || wanted.indexOf(name) === 0;
      });
      return prefixed.length === 1 ? prefixed[0].id : null;
    }

    function rowLabelOf(rowEl) {
      const labelElement = attempt(function () { return rowEl.querySelector('[class*="_label"]'); }, null);
      const text = labelElement && typeof labelElement.textContent === "string" ? labelElement.textContent.trim() : "";
      if (text) return text;
      const aria = typeof rowEl.getAttribute === "function" ? rowEl.getAttribute("aria-label") : null;
      return typeof aria === "string" ? aria.trim() : "";
    }

    // The token-count text ("23.4M tok") only exists on built-in subagent
    // catalog rows; requiring it keeps the label fallback from matching an
    // unrelated tree row whose name happens to equal a subagent name.
    function hasTokenSignal(rowEl) {
      let text = "";
      try {
        if (typeof rowEl.getAttribute === "function") {
          const aria = rowEl.getAttribute("aria-label");
          if (typeof aria === "string") text += aria;
        }
        if (typeof rowEl.textContent === "string") text += " " + rowEl.textContent;
      } catch (error) {
        return false;
      }
      return /\b\d+(\.\d+)?\s*[kKmM]?\s*tok\b/.test(text);
    }

    function inCatalogTree(rowEl) {
      try {
        const tree = rowEl.closest('[role="tree"]');
        if (!tree) return false;
        const className = typeof tree.className === "string" ? tree.className : "";
        if (className.indexOf("_menuBody") >= 0) return true;
        const aria = typeof tree.getAttribute === "function" ? tree.getAttribute("aria-label") : "";
        return typeof aria === "string" && /子智能体会话|Subagent sessions/.test(aria);
      } catch (error) {
        return false;
      }
    }

    function resolveTreeitemSessionId(rowEl) {
      const snapshot = sessionsSnapshot();
      if (!snapshot) return null;
      const byId = snapshot.byId || {};
      let fiber = reactFiberOf(rowEl);
      let guard = 0;
      while (fiber && guard < 6) {
        const key = fiber.key;
        if (typeof key === "string" && key.length > 0) {
          if (Object.prototype.hasOwnProperty.call(byId, key) && byId[key]) return key;
        }
        fiber = fiber.return || null;
        guard += 1;
      }
      const label = rowLabelOf(rowEl);
      if (!label) return null;
      // The label fallback is inherently fuzzy (prefix match): only trust it
      // for rows that look like the built-in catalog (token text + catalog
      // context). The fiber-key path above stays authoritative.
      if (!hasTokenSignal(rowEl)) return null;
      if (!subagentCatalogOpen() && !inCatalogTree(rowEl)) return null;
      return matchSessionIdByLabel(label, snapshot);
    }

    // While the built-in subagent catalog dropdown is open, the header menu
    // would cover it; the dropdown trigger carries aria-haspopup/aria-expanded.
    function subagentCatalogOpen() {
      if (typeof document === "undefined") return false;
      return !!attempt(function () {
        return document.querySelector('header [aria-haspopup="tree"][aria-expanded="true"]');
      }, null);
    }

    // The internal subagent catalog dropdown is a react-dom portal attached to
    // document.body with z-index:100, so a menu rendered inside the layout
    // stacking context can never win the paint order. The menu itself is
    // portaled to document.body as well; this helper only decides where it
    // opens: just outside the catalog list so the list stays fully visible.
    const ROW_MENU_WIDTH = 300;
    const ROW_MENU_HEIGHT = 260;
    const ROW_MENU_GAP = 8;
    const ROW_MENU_MARGIN = 8;

    function rowMenuAnchor(rowEl, event) {
      const vw = typeof window !== "undefined" && window.innerWidth ? window.innerWidth : 1440;
      const vh = typeof window !== "undefined" && window.innerHeight ? window.innerHeight : 900;
      const pointerX = event && typeof event.clientX === "number" ? event.clientX : ROW_MENU_MARGIN;
      const pointerY = event && typeof event.clientY === "number" ? event.clientY : ROW_MENU_MARGIN;
      const boxes = attempt(function () {
        const listEl = typeof rowEl.closest === "function" ? rowEl.closest('[role="tree"]') : null;
        return {
          list: listEl && typeof listEl.getBoundingClientRect === "function" ? listEl.getBoundingClientRect() : null,
          row: typeof rowEl.getBoundingClientRect === "function" ? rowEl.getBoundingClientRect() : null
        };
      }, null);
      const listRect = boxes ? boxes.list : null;
      const rowRect = boxes ? boxes.row : null;
      const anchorTop = rowRect && typeof rowRect.top === "number" ? rowRect.top : pointerY;
      const maxLeft = Math.max(ROW_MENU_MARGIN, vw - ROW_MENU_MARGIN - ROW_MENU_WIDTH);
      const maxTop = Math.max(ROW_MENU_MARGIN, vh - ROW_MENU_MARGIN - ROW_MENU_HEIGHT);
      let left;
      if (listRect && listRect.right + ROW_MENU_GAP + ROW_MENU_WIDTH <= vw - ROW_MENU_MARGIN) {
        left = listRect.right + ROW_MENU_GAP;
      } else if (listRect) {
        left = listRect.left - ROW_MENU_GAP - ROW_MENU_WIDTH;
      } else {
        left = pointerX;
      }
      left = Math.max(ROW_MENU_MARGIN, Math.min(left, maxLeft));
      const top = Math.max(ROW_MENU_MARGIN, Math.min(anchorTop, maxTop));
      return { x: left, y: top };
    }

    function onDocumentContextMenu(event) {
      if (!isElement(event.target)) return;
      const rowEl = event.target.closest('[role="treeitem"]');
      if (!rowEl) return;
      if (typeof rowEl.closest === "function" && rowEl.closest('[data-plugin="subagent-window"]')) return;
      const sessionId = resolveTreeitemSessionId(rowEl);
      if (!sessionId) return;
      event.preventDefault();
      event.stopPropagation();
      closeHeaderMenu();
      const anchor = rowMenuAnchor(rowEl, event);
      openHeaderMenu({ x: anchor.x, y: anchor.y, sessionId: sessionId });
    }

    // Header context menu store (shared by all headers; one menu at a time).

    let menuState = { open: false, x: 0, y: 0, sessionId: null, status: "" };
    const menuListeners = new Set();

    function emitMenu() {
      // A listener must never break the store.
      menuListeners.forEach(function (listener) {
        attempt(listener, undefined);
      });
    }

    function openHeaderMenu(state) {
      menuState = { open: true, x: state.x || 0, y: state.y || 0, sessionId: state.sessionId || null, status: "" };
      emitMenu();
    }

    function setMenuStatus(status) {
      menuState = Object.assign({}, menuState, { status: status || "" });
      emitMenu();
    }

    function closeHeaderMenu() {
      if (!menuState.open) return;
      menuState = { open: false, x: 0, y: 0, sessionId: null, status: "" };
      emitMenu();
    }

    function useMenuState() {
      const [state, setState] = React.useState(menuState);
      React.useEffect(function () {
        const listener = function () {
          setState(menuState);
        };
        menuListeners.add(listener);
        listener();
        return function () {
          menuListeners.delete(listener);
        };
      }, []);
      return state;
    }

    // Hooks

    function useSnapshot() {
      const [snapshot, setSnapshot] = React.useState(function () {
        return sessionsSnapshot();
      });
      React.useEffect(function () {
        let alive = true;
        const sync = function () {
          if (alive) setSnapshot(sessionsSnapshot());
        };
        sync();
        const off = subscribeSessions(sync);
        return function () {
          alive = false;
          off();
        };
      }, []);
      return snapshot;
    }

    function useLocaleVersion() {
      const [version, setVersion] = React.useState(0);
      React.useEffect(function () {
        return subscribeLocaleChanges(function () {
          setVersion(function (current) {
            return current + 1;
          });
        });
      }, []);
      return version;
    }

    function useSlowTick(enabled) {
      const bump = React.useState(0)[1];
      React.useEffect(function () {
        if (!enabled) return undefined;
        const timer = setInterval(function () {
          bump(function (current) {
            return current + 1;
          });
        }, 1200);
        return function () {
          clearInterval(timer);
        };
      }, [enabled, bump]);
      return bump;
    }

    // Header actions anchor: invisible; binds a native contextmenu listener
    // on the ancestor <header>. Falls back to a visible "..." button when the
    // header element or session id is unavailable.

    function WindowMenuAnchor(props) {
      useLocaleVersion();
      const ref = React.useRef(null);
      const [fallback, setFallback] = React.useState(false);
      const rawSessionId = props && props.sessionId ? String(props.sessionId) : null;

      function resolveSessionId() {
        if (rawSessionId) return rawSessionId;
        return currentMainSessionId(sessionsSnapshot());
      }

      React.useEffect(function () {
        const element = ref.current;
        if (!element || typeof element.closest !== "function") {
          setFallback(true);
          return undefined;
        }
        const header = element.closest("header");
        if (!header) {
          setFallback(true);
          return undefined;
        }
        const onContextMenu = function (event) {
          // Row-level right-click is handled by the document listener instead.
          if (isElement(event.target) && event.target.closest('[role="treeitem"]')) return;
          // Do not cover the open subagent catalog dropdown with the big menu.
          if (subagentCatalogOpen()) return;
          const sessionId = resolveSessionId();
          if (!sessionId) return;
          event.preventDefault();
          openHeaderMenu({ x: event.clientX, y: event.clientY, sessionId: sessionId });
        };
        header.addEventListener("contextmenu", onContextMenu);
        return function () {
          header.removeEventListener("contextmenu", onContextMenu);
        };
      }, [rawSessionId]);

      function openFromButton(event) {
        const rect = event.currentTarget ? event.currentTarget.getBoundingClientRect() : null;
        openHeaderMenu({
          x: rect ? rect.left : 24,
          y: rect ? rect.bottom + 4 : 24,
          sessionId: resolveSessionId()
        });
      }

      return h(
        "span",
        { ref: ref, className: "sw_anchor", "data-plugin": "subagent-window" },
        fallback
          ? h(
              "button",
              {
                type: "button",
                className: "sw_dots",
                "aria-haspopup": "menu",
                "aria-label": t("menu.button"),
                title: t("menu.button"),
                onClick: openFromButton
              },
              "\u22ef"
            )
          : null
      );
    }

    // One small button element shared by both context menus and the panel rows;
    // `role`/`className` are passed through so the rendered DOM stays identical.
    function ActionButton(props) {
      return h(
        "button",
        {
          type: "button",
          role: props.role,
          className: props.className,
          disabled: props.disabled,
          onClick: props.onClick
        },
        props.label
      );
    }

    // Header menu overlay (rendered inside the root-scoped shell.overlay slot)

    function WindowMenuOverlay() {
      useLocaleVersion();
      const menu = useMenuState();
      const snapshot = useSnapshot();
      useSlowTick(menu.open);
      const ref = React.useRef(null);
      const [busy, setBusy] = React.useState(false);

      React.useEffect(function () {
        if (!menu.open) return undefined;
        function onPointerDown(event) {
          const element = ref.current;
          if (element && event.target && element.contains(event.target)) return;
          closeHeaderMenu();
        }
        function onKeyDown(event) {
          if (event.key === "Escape") closeHeaderMenu();
        }
        function onScrollOrResize() {
          closeHeaderMenu();
        }
        document.addEventListener("pointerdown", onPointerDown, true);
        document.addEventListener("keydown", onKeyDown, true);
        window.addEventListener("resize", onScrollOrResize);
        window.addEventListener("scroll", onScrollOrResize, true);
        return function () {
          document.removeEventListener("pointerdown", onPointerDown, true);
          document.removeEventListener("keydown", onKeyDown, true);
          window.removeEventListener("resize", onScrollOrResize);
          window.removeEventListener("scroll", onScrollOrResize, true);
        };
      }, [menu.open]);

      if (!menu.open) return null;
      const byId = (snapshot && snapshot.byId) || {};
      const rootRow = menu.sessionId ? byId[menu.sessionId] : null;
      const targetIsSubagent = !!(rootRow && rootRow.origin === "subagent");
      const items = targetIsSubagent
        ? [{ row: rootRow, depth: 1 }]
        : collectDescendants(snapshot, menu.sessionId).items;

      function run(work) {
        setBusy(true);
        setMenuStatus("");
        Promise.resolve()
          .then(work)
          .then(
            function () {
              setBusy(false);
              closeHeaderMenu();
            },
            function (error) {
              setBusy(false);
              setMenuStatus(errorMessage(error));
            }
          );
      }

      function renderItem(item) {
        const row = item.row;
        const address = addressOf(row, snapshot);
        const contentId = resourceOf(address);
        const floated = isFloatedContent(contentId);
        return h(
          "div",
          { className: "sw_menuRow", key: row.id },
          h(
            "div",
            { className: "sw_menuRowName" },
            h("span", { className: "sw_dot" + (row.running ? " sw_dot_on" : "") }),
            h("span", { title: row.id }, rowName(row)),
            h("span", { className: "sw_chip" }, modeLabel(modeOf(snapshot, row)))
          ),
          h(
            "div",
            { className: "sw_menuActions" },
            h(ActionButton, {
              role: "menuitem",
              className: "sw_menuItem",
              disabled: busy || floated,
              label: t("menu.openFloat"),
              onClick: function () { run(function () { return openFloat(address); }); }
            }),
            h(ActionButton, {
              role: "menuitem",
              className: "sw_menuItem",
              disabled: busy || !floated,
              label: t("menu.closeFloat"),
              onClick: function () { run(function () { closeFloatByContent(contentId); }); }
            })
          )
        );
      }

      const width = typeof window !== "undefined" && window.innerWidth ? window.innerWidth : 1440;
      const height = typeof window !== "undefined" && window.innerHeight ? window.innerHeight : 900;
      const left = Math.max(8, Math.min(menu.x, width - 300));
      const top = Math.max(8, Math.min(menu.y, height - 240));

      const menuNode = h(
        "div",
        {
          ref: ref,
          className: "sw_menu",
          role: "menu",
          "data-plugin": "subagent-window",
          style: { left: String(left) + "px", top: String(top) + "px" },
          onContextMenu: function (event) {
            event.preventDefault();
          }
        },
        h("div", { className: "sw_menuTitle" }, t("menu.title")),
        items.length === 0
          ? h("div", { className: "sw_menuEmpty" }, t("menu.empty"))
          : items.map(renderItem),
        menu.status ? h("div", { className: "sw_menuStatus" }, t("error.prefix") + menu.status) : null
      );
      if (
        typeof document === "undefined" ||
        !document.body ||
        !ReactDOM ||
        typeof ReactDOM.createPortal !== "function"
      ) {
        // Keep the menu usable if the portal API is unavailable; stacking may
        // be imperfect but nothing crashes.
        return menuNode;
      }
      return ReactDOM.createPortal(menuNode, document.body);
    }

    // Right-sidebar tab menu items (dockkit context menu extras)

    function TabMenuItem(props) {
      useLocaleVersion();
      useSlowTick(true);
      const tab = props && props.tab ? props.tab : null;
      const dismiss = props && typeof props.dismiss === "function" ? props.dismiss : function () {};
      if (!tab || tab.kind !== "subagentchat") return null;
      if (typeof tab.contentId !== "string" || tab.contentId.indexOf(CHAT_PREFIX) !== 0) return null;
      const floated = isFloatedContent(tab.contentId);

      function onOpen() {
        dismiss();
        // The tab may be gone; the action is best-effort either way.
        attempt(function () { floatExistingTabContent(tab.contentId); }, undefined);
      }

      function onClose() {
        dismiss();
        // The surface may be gone; nothing else to clean up.
        attempt(function () { api.sidebarRight.close(tab.id); }, undefined);
      }

      return h(
        React.Fragment,
        null,
        h(ActionButton, {
          role: "menuitem",
          className: "sw_menuItem",
          disabled: floated,
          label: t("menu.openFloat"),
          onClick: onOpen
        }),
        h(ActionButton, {
          role: "menuitem",
          className: "sw_menuItem",
          disabled: !floated,
          label: t("menu.closeFloat"),
          onClick: onClose
        })
      );
    }

    // "Subagents" tab page (body of the Start-page card)

    function SubagentPage(props) {
      useLocaleVersion();
      const snapshot = useSnapshot();
      const bump = useSlowTick(true);
      const [status, setStatus] = React.useState("");
      const [busy, setBusy] = React.useState(false);
      const sessionId = props && props.sessionId ? props.sessionId : null;
      const data = sessionId ? collectDescendants(snapshot, sessionId) : collectRows(snapshot);
      const rows = data.rootId ? data.items : [];

      function run(work) {
        setBusy(true);
        setStatus("");
        Promise.resolve()
          .then(work)
          .catch(function (error) {
            setStatus(errorMessage(error));
          })
          .then(function () {
            setBusy(false);
            bump();
          });
      }

      function renderRow(item) {
        const row = item.row;
        const address = addressOf(row, snapshot);
        const contentId = resourceOf(address);
        const floated = isFloatedContent(contentId);
        return h(
          "div",
          {
            className: "sw_row",
            key: row.id,
            style: { paddingLeft: String(12 + (item.depth - 1) * 18) + "px" }
          },
          h("span", { className: "sw_dot" + (row.running ? " sw_dot_on" : "") }),
          h(
            "div",
            { className: "sw_rowText" },
            h("div", { className: "sw_name", title: row.id }, rowName(row)),
            h(
              "div",
              { className: "sw_meta" },
              h("span", { className: "sw_chip" }, modeLabel(modeOf(snapshot, row))),
              h("span", { className: "sw_metaText" }, row.running ? t("page.running") : t("page.idle")),
              floated ? h("span", { className: "sw_chip sw_chip_on" }, t("page.floated")) : null
            )
          ),
          h(
            "div",
            { className: "sw_actions" },
            h(ActionButton, {
              className: "sw_btn",
              disabled: busy,
              label: t("page.open"),
              onClick: function () { run(function () { api.uiWorkspace.openSession(address); }); }
            }),
            floated
              ? h(ActionButton, {
                  className: "sw_btn",
                  disabled: busy,
                  label: t("page.close"),
                  onClick: function () { run(function () { closeFloatByContent(contentId); }); }
                })
              : h(ActionButton, {
                  className: "sw_btn sw_btn_primary",
                  disabled: busy,
                  label: t("page.float"),
                  onClick: function () { run(function () { return openFloat(address); }); }
                })
          )
        );
      }

      function renderHeader(count) {
        return h(
          "div",
          { className: "sw_header" },
          h(
            "div",
            { className: "sw_title" },
            t("page.title"),
            h("span", { className: "sw_count" }, count)
          )
        );
      }
      const header = renderHeader(data.rootId ? String(rows.length) : "0");

      if (!data.rootId) {
        return h(
          "div",
          { className: "sw_panel", "data-plugin": "subagent-window" },
          header,
          h("div", { className: "sw_empty" }, t("page.noSession"))
        );
      }

      return h(
        "div",
        { className: "sw_panel", "data-plugin": "subagent-window" },
        header,
        rows.length === 0
          ? h("div", { className: "sw_empty" }, t("page.empty"))
          : h("div", { className: "sw_list" }, rows.map(renderRow)),
        h("div", { className: "sw_hint" }, t("page.hint")),
        status ? h("div", { className: "sw_status" }, t("error.prefix") + status) : null
      );
    }

    function SubagentTabTitle() {
      useLocaleVersion();
      return h("span", { className: "sw_tabTitle", "data-plugin": "subagent-window" }, t("tab.title"));
    }

    function installStyles() {
      if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return function () {};
      const element = document.createElement("style");
      element.id = STYLE_ID;
      element.textContent = styleText;
      document.head.appendChild(element);
      return function () {
        if (element.parentNode) element.parentNode.removeChild(element);
      };
    }

    const inject = ["sessions", "uiWorkspace", "slots", "layout", "locale", "sidebarRight", "sidebarRightTabs"];

    function apply(ctx) {
      api = {
        sessions: ctx.sessions,
        uiWorkspace: ctx.uiWorkspace,
        layout: ctx.layout,
        locale: ctx.locale,
        sidebarRight: ctx.sidebarRight,
        t: ctx.locale.bind(NS)
      };
      ctx.effect(function () {
        const dispose = ctx.locale.register(NS, { zh: zh, en: en });
        return function () {
          if (typeof dispose === "function") dispose();
        };
      }, "subagent-window: dictionaries");
      ctx.effect(function () {
        return installStyles();
      }, "subagent-window: styles");
      ctx.effect(function () {
        if (typeof document === "undefined") return function () {};
        document.addEventListener("contextmenu", onDocumentContextMenu, true);
        return function () {
          document.removeEventListener("contextmenu", onDocumentContextMenu, true);
        };
      }, "subagent-window: row context menu");
      ctx.effect(function () {
        if (typeof window === "undefined" || typeof window.addEventListener !== "function") return function () {};
        window.addEventListener("pointerup", onWindowPointerUp, true);
        return function () {
          window.removeEventListener("pointerup", onWindowPointerUp, true);
        };
      }, "subagent-window: reclaim out-of-bounds float");
      ctx.effect(function () {
        return ctx.sidebarRightTabs.register({
          id: TAB_ID,
          kind: TAB_KIND,
          priority: "builtin",
          title: function () {
            return t("tab.title");
          },
          guide: [
            {
              id: "open",
              order: 25,
              title: function () {
                return t("guide.title");
              },
              description: function () {
                return t("guide.desc");
              }
            }
          ]
        });
      }, "subagent-window: tab type");
      function registerSlot(options, component) {
        return ctx.slots.inject(options.name, function () {
          return ctx.slots.register(options, component);
        });
      }
      registerSlot({
        name: "sidebar.right.pane.tab",
        key: TAB_ID,
        locale: NS,
        inject: function (sessionId, actions) {
          return { sessionId: sessionId, actions: actions };
        }
      }, SubagentPage);
      registerSlot({ name: "sidebar.right.pane.tab.title", key: TAB_ID, locale: NS }, SubagentTabTitle);
      registerSlot({
        name: "conversation.session.header.actions",
        id: ANCHOR_ID,
        order: 50,
        locale: NS,
        inject: function (sessionId) {
          return { sessionId: sessionId };
        }
      }, WindowMenuAnchor);
      registerSlot({ name: "sidebar.right.tab.menu.item", id: TAB_MENU_ID, locale: NS }, TabMenuItem);
      registerSlot({ name: "shell.overlay", id: MENU_OVERLAY_ID }, WindowMenuOverlay);
    }

    return {
      inject: inject,
      apply: apply,
      __test: {
        clampRect: clampRect,
        matchSessionIdByLabel: matchSessionIdByLabel,
        rowMenuAnchor: rowMenuAnchor,
        rightbarExpanded: rightbarExpanded,
        shouldRestoreRightbar: shouldRestoreRightbar,
        restoreCollapsedRightbar: restoreCollapsedRightbar,
        ensureSurface: ensureSurface,
        openFloat: openFloat
      }
    };
  }
});
