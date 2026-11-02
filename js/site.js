/* 声渡 TunePeerly site script. Tiny, no dependencies. */
(function () {
  "use strict";

  /* ===== 发布版本：升级时只改这里（HTML 里的同名文字是无 JS 时的后备，见 README） ===== */
  var VERSION = "0.8.0-alpha.1";
  var REPO = "https://github.com/zhebuilds/TunePeerly";

  /* ===== 截图：把图片放进 assets/screenshots/ 后在这里列出，截图区会自动出现 ===== */
  // 例：{ src: "shot-library.png", zh: "全部音乐", en: "Library" }
  var SCREENSHOTS = [];

  var root = document.documentElement;
  var lang = root.lang.indexOf("zh") === 0 ? "zh" : "en";

  /* ---- 语言：记住选择；首次访问根页面时按浏览器语言跳转（不对爬虫跳转） ---- */
  try {
    var KEY = "tp-lang";
    var saved = localStorage.getItem(KEY);
    var bot = /bot|crawl|spider|slurp|headless|lighthouse|facebookexternalhit|preview/i.test(navigator.userAgent);
    var alt = document.querySelector("[data-lang-switch]");
    if (alt) alt.addEventListener("click", function () {
      localStorage.setItem(KEY, alt.getAttribute("data-lang-switch"));
    });
    if (!bot) {
      var want = saved || (lang === "zh" && !/^zh/i.test(navigator.language || "") ? "en" : null);
      if (want && want !== lang && alt) {
        location.replace(alt.href + location.hash);
        return;
      }
    }
  } catch (e) { /* storage blocked: stay on this page */ }

  /* ---- 版本号与下载链接 ---- */
  var base = REPO + "/releases/download/v" + VERSION + "/";
  var assets = {
    win: base + "TunePeerly-" + VERSION + "-x64-Setup.exe",
    apk: base + "TunePeerly-" + VERSION + "-arm64-v8a.apk",
    release: REPO + "/releases/tag/v" + VERSION
  };
  document.querySelectorAll("[data-dl]").forEach(function (a) {
    a.href = assets[a.getAttribute("data-dl")];
  });
  document.querySelectorAll("[data-version]").forEach(function (el) {
    el.textContent = VERSION;
  });

  /* ---- 截图区 ---- */
  var sec = document.getElementById("screenshots");
  if (sec && SCREENSHOTS.length) {
    var box = sec.querySelector(".shots");
    var prefix = lang === "zh" ? "" : "../";
    SCREENSHOTS.forEach(function (s) {
      var f = document.createElement("figure");
      var img = document.createElement("img");
      img.src = prefix + "assets/screenshots/" + s.src;
      img.alt = s[lang] || s.zh || "";
      img.loading = "lazy";
      var c = document.createElement("figcaption");
      c.textContent = s[lang] || s.zh || "";
      f.appendChild(img); f.appendChild(c); box.appendChild(f);
    });
    sec.hidden = false;
  }
})();
