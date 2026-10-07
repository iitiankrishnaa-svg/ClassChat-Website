const GITHUB_REPO = "iitiankrishnaa-svg/ClassChat";
const GITHUB_API = "https://api.github.com/repos/iitiankrishnaa-svg/ClassChat/releases/latest";

let latestAPKUrl = null;

async function fetchLatestRelease() {
  var btn = document.getElementById("downloadBtn");
  var versionLabel = document.getElementById("versionLabel");

  try {
    var response = await fetch(GITHUB_API, {
      headers: { "Accept": "application/vnd.github+json" }
    });

    if (!response.ok) throw new Error("GitHub API error: " + response.status);

    var data = await response.json();

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
      var tagName = data.tag_name || "latest";
      var sizeMB = (apkAsset.size / (1024 * 1024)).toFixed(1);

      versionLabel.innerHTML =
        "<span class=\"dot-pulse\"></span>" +
        "Latest version available &nbsp;&middot;&nbsp; " + tagName + " &nbsp;&middot;&nbsp; " + sizeMB + " MB";

      btn.disabled = false;
      btn.classList.remove("loading");
    } else {
      latestAPKUrl = "https://github.com/iitiankrishnaa-svg/ClassChat/releases/latest";
      versionLabel.innerHTML =
        "<span class=\"dot-pulse\" style=\"background:#f59e0b;\"></span>" +
        "See GitHub Releases for download";
      btn.disabled = false;
      btn.classList.remove("loading");
    }

  } catch (err) {
    console.warn("Failed to fetch release info:", err);
    latestAPKUrl = "https://github.com/iitiankrishnaa-svg/ClassChat/releases/latest";
    versionLabel.innerHTML =
      "<span class=\"dot-pulse\" style=\"background:#f59e0b;\"></span>" +
      "View releases on GitHub";
    btn.disabled = false;
    btn.classList.remove("loading");
  }
}

function downloadAPK() {
  if (!latestAPKUrl) return;

  // Use window.open to trigger download — works cross-origin for APK files
  window.open(latestAPKUrl, "_blank");

  var btn = document.getElementById("downloadBtn");
  btn.style.transform = "scale(0.97)";
  setTimeout(function() { btn.style.transform = ""; }, 200);
}

document.addEventListener("DOMContentLoaded", function() {
  var btn = document.getElementById("downloadBtn");
  btn.disabled = true;
  btn.classList.add("loading");
  fetchLatestRelease();
});