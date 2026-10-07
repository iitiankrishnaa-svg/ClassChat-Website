/**
 * ClassChat Download Website — app.js
 *
 * Uses the GitHub Releases API to fetch the LATEST release automatically.
 * No version numbers are hard-coded. When you publish a new GitHub Release,
 * the button on this page will automatically point to the new APK.
 *
 * Repository: https://github.com/iitiankrishnaa-svg/ClassChat
 */

const GITHUB_REPO = 'iitiankrishnaa-svg/ClassChat';
const GITHUB_API  = https://api.github.com/repos//releases/latest;

// State
let latestAPKUrl = null;

/**
 * Fetch the latest release info from GitHub and wire up the button.
 */
async function fetchLatestRelease() {
  const btn         = document.getElementById('downloadBtn');
  const versionLabel = document.getElementById('versionLabel');

  try {
    const response = await fetch(GITHUB_API, {
      headers: { 'Accept': 'application/vnd.github+json' }
    });

    if (!response.ok) throw new Error(GitHub API error: );

    const data = await response.json();

    // Find the first .apk asset in the release
    const apkAsset = data.assets && data.assets.find(a =>
      a.name.toLowerCase().endsWith('.apk')
    );

    if (apkAsset) {
      latestAPKUrl = apkAsset.browser_download_url;
      const tagName = data.tag_name || 'latest';
      const sizeMB  = (apkAsset.size / (1024 * 1024)).toFixed(1);

      // Update version label
      versionLabel.innerHTML = 
        <span class="dot-pulse"></span>
        Latest version available &nbsp;·&nbsp;  &nbsp;·&nbsp;  MB
      ;

      // Enable button
      btn.disabled = false;
      btn.classList.remove('loading');
    } else {
      // Release exists but no APK asset found — link to releases page
      latestAPKUrl = https://github.com//releases/latest;
      versionLabel.innerHTML = 
        <span class="dot-pulse" style="background:#f59e0b;"></span>
        See GitHub Releases for download
      ;
      btn.disabled = false;
      btn.classList.remove('loading');
    }

  } catch (err) {
    console.warn('Failed to fetch release info:', err);
    // Graceful fallback — link to GitHub releases page
    latestAPKUrl = https://github.com//releases/latest;
    versionLabel.innerHTML = 
      <span class="dot-pulse" style="background:#f59e0b;"></span>
      View releases on GitHub
    ;
    btn.disabled = false;
    btn.classList.remove('loading');
  }
}

/**
 * Trigger the APK download.
 * Called from the button's onclick attribute.
 */
function downloadAPK() {
  if (!latestAPKUrl) return;

  // Create a temporary anchor and click it — triggers browser download
  const anchor = document.createElement('a');
  anchor.href     = latestAPKUrl;
  anchor.download = '';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  // Visual feedback — brief animation on button
  const btn = document.getElementById('downloadBtn');
  btn.style.transform = 'scale(0.97)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  // Show loading state on button while fetching
  const btn = document.getElementById('downloadBtn');
  btn.disabled = true;
  btn.classList.add('loading');

  fetchLatestRelease();
});
