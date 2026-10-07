var DOWNLOAD_URL = "/.netlify/functions/download";

function downloadAPK() {
  // Navigate directly to Netlify function which redirects to latest APK
  window.location.href = DOWNLOAD_URL;
}

document.addEventListener("DOMContentLoaded", function() {
  var btn = document.getElementById("downloadBtn");
  var versionLabel = document.getElementById("versionLabel");

  // Fetch version info for display only (does not affect the download)
  var GITHUB_API = "https://api.github.com/repos/iitiankrishnaa-svg/ClassChat/releases/latest";

  fetch(GITHUB_API, { headers: { "Accept": "application/vnd.github+json" } })
    .then(function(res) { return res.json(); })
    .then(function(data) {
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
        var tagName = data.tag_name || "latest";
        var sizeMB  = (apkAsset.size / (1024 * 1024)).toFixed(1);
        versionLabel.innerHTML =
          "<span class=\"dot-pulse\"></span>" +
          "Latest version available &nbsp;&middot;&nbsp; " + tagName + " &nbsp;&middot;&nbsp; " + sizeMB + " MB";
      } else {
        versionLabel.innerHTML =
          "<span class=\"dot-pulse\"></span>Latest version available";
      }
    })
    .catch(function() {
      versionLabel.innerHTML =
        "<span class=\"dot-pulse\"></span>Latest version available";
    })
    .finally(function() {
      btn.disabled = false;
      btn.classList.remove("loading");
    });
});