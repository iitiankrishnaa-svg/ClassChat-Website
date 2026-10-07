var GITHUB_API = "https://api.github.com/repos/iitiankrishnaa-svg/ClassChat/releases/latest";
var FALLBACK_URL = "https://github.com/iitiankrishnaa-svg/ClassChat/releases/latest";
var latestAPKUrl = FALLBACK_URL;

function downloadAPK() {
  window.location.href = latestAPKUrl;
}

document.addEventListener("DOMContentLoaded", function () {
  var btn = document.getElementById("downloadBtn");
  var versionLabel = document.getElementById("versionLabel");

  fetch(GITHUB_API, { headers: { "Accept": "application/vnd.github+json" } })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      var apkAsset = null;
      if (data.assets) {
        for (var i = 0; i < data.assets.length; i++) {
          if (data.assets[i].name.toLowerCase().endsWith(".apk")) {
            apkAsset = data.assets[i];
            break;
          }
        }
      }
      if (apkAsset) {
        latestAPKUrl = apkAsset.browser_download_url;
        var tag = data.tag_name || "latest";
        var mb = (apkAsset.size / 1048576).toFixed(1);
        versionLabel.innerHTML =
          "<span class=\"dot-pulse\"></span>" +
          "Latest version available &nbsp;&middot;&nbsp; " + tag + " &nbsp;&middot;&nbsp; " + mb + " MB";
      } else {
        latestAPKUrl = FALLBACK_URL;
        versionLabel.innerHTML = "<span class=\"dot-pulse\"></span>Latest version available";
      }
    })
    .catch(function () {
      latestAPKUrl = FALLBACK_URL;
      versionLabel.innerHTML = "<span class=\"dot-pulse\"></span>Latest version available";
    })
    .finally(function () {
      btn.disabled = false;
      btn.classList.remove("loading");
    });
});