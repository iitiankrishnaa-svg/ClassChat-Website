const https = require("https");

const GITHUB_API = "https://api.github.com/repos/iitiankrishnaa-svg/ClassChat/releases/latest";
const FALLBACK   = "https://github.com/iitiankrishnaa-svg/ClassChat/releases/latest";

function fetchJson(url) {
  return new Promise(function(resolve, reject) {
    var options = {
      headers: {
        "User-Agent": "ClassChat-Website/1.0",
        "Accept": "application/vnd.github+json"
      }
    };
    https.get(url, options, function(res) {
      var body = "";
      res.on("data", function(chunk) { body += chunk; });
      res.on("end", function() {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(e); }
      });
    }).on("error", reject);
  });
}

exports.handler = async function(event, context) {
  try {
    var data = await fetchJson(GITHUB_API);

    var apkAsset = null;
    if (data.assets && data.assets.length > 0) {
      for (var i = 0; i < data.assets.length; i++) {
        if (data.assets[i].name.toLowerCase().endsWith(".apk")) {
          apkAsset = data.assets[i];
          break;
        }
      }
    }

    var redirectUrl = apkAsset ? apkAsset.browser_download_url : FALLBACK;

    return {
      statusCode: 302,
      headers: {
        "Location": redirectUrl,
        "Cache-Control": "no-cache, no-store, must-revalidate"
      },
      body: ""
    };

  } catch (err) {
    return {
      statusCode: 302,
      headers: {
        "Location": FALLBACK,
        "Cache-Control": "no-cache"
      },
      body: ""
    };
  }
};