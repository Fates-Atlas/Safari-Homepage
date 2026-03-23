# Safari-Homepage

A highly customizable, privacy-focused start page designed to replace the default Safari homepage (though it works great in Chrome and Firefox too). I built this because I wasn't satisfied with the default start page options and wanted a personalized dashboard with widgets, dynamic backgrounds, and essential tools.

<p align="center">
  <a href="https://fates-atlas.github.io/Safari-Homepage/"><strong>▶️ Live Demo</strong></a>
</p>

![Safari Homepage](Images/webpage.png)
![Liquid Glass Theme](Images/liquid-glass.png)
*Liquid Glass Theme*

## Features

*   **Dynamic Backgrounds**: Upload your own images or use URL links. Includes blur controls and editing modes.
*   **Smart Widgets**:
    *   **Clock & Date**: Customizable fonts, sizes, and gradients.
    *   **Weather**: Automatic geolocation or default fallback, with support for Celsius/Fahrenheit.
    *   **Calendar**: Built-in simple calendar or full Google Calendar integration.
    *   **Stocks**: Real-time stock price tracking via TradingView.
    *   **Embed Website**: Embed a news site or any other webpage directly on your dashboard.
*   **Search**: Integrated search bar supporting Google, Bing, DuckDuckGo, Yahoo, and Ecosia.
*   **Visual Customization**:
    *   Glassmorphism (Frosted Glass) effects.
    *   "Liquid Glass" theme.
    *   Custom accent colors, font families, and transparency levels.
*   **Privacy**: All settings and images are stored locally in your browser (`localStorage`). No external servers or tracking.

## Supported Browsers

*   **Safari** (Recommended)
*   **Google Chrome**
*   **Mozilla Firefox**
*   **Microsoft Edge**

## Setting as Homepage / New Tab

You can use the hosted version of this dashboard at:
> **https://fates-atlas.github.io/Safari-Homepage/**

### Safari
1.  Open Safari and go to **Settings** (or Preferences) > **General**.
    *   *Shortcut: Press `Command + ,` to open preferences.*
2.  Set **"New windows open with"** to *Homepage*.
3.  Set **"New tabs open with"** to *Homepage*.
4.  In the **Homepage** box, paste the link:
    `https://fates-atlas.github.io/Safari-Homepage/`

### Google Chrome
1.  Install the New Tab Redirect extension.
2.  Click the extension icon and go to **Extension Options**.
3.  Paste the link above into the URL box and save.

### Mozilla Firefox
1.  Install the Custom New Tab Page add-on.
2.  Go to **Add-ons** > **Extensions** > **Custom New Tab Page** > **Options**.
3.  Paste the link above and click Save.

### Microsoft Edge
1.  Install the Custom New Tab extension.
2.  Click the extension icon (you may need to click "Keep Changes" if Edge warns you).
3.  Paste the link above to set it as your new tab page.

## Setup & Configuration

### 1. Custom Backgrounds & Storage Limits
Since this dashboard runs entirely in your browser without a backend server, images are stored in your browser's Local Storage.

**Storage Quota Warning:** Browsers typically limit Local Storage to **~5MB total**.

| Image Method | Approx. Size | Recommendation |
| :--- | :--- | :--- |
| **Image URL Link** | ~100 Bytes | **Highly Recommended**. Uses virtually zero storage. |
| **WebP Upload** | ~100KB - 500KB | Good. Efficient compression. |
| **JPEG Upload** | ~300KB - 1MB | Okay. The app auto-compresses uploads to 70% quality. |
| **PNG Upload** | ~1MB - 5MB+ | **Avoid**. PNGs are often too large and will fill your storage instantly. |

**How to add an image:**
1.  Click the Settings (Gear) icon.
2.  Under "Background", expand the image list.
3.  Click the **`+`** button.
4.  **Option A (Best)**: Paste a direct link (URL) to an image found online.
5.  **Option B**: Upload a file from your computer (Automatic compression is applied, but space is limited).

### 2. Google Calendar Integration
To display your actual Google Calendar events inside the widget:

1.  Go to Google Calendar in your browser.
2.  Click the **Gear Icon** (Settings) in the top right > **Settings**.
3.  On the left sidebar, find **"Settings for my calendars"** and click the calendar you want to add.
4.  Scroll down to the **"Integrate calendar"** section.
5.  Look for the **"Embed code"** box. It starts with `<iframe src=...`.
6.  Copy that entire code block.
7.  Go back to your Safari Homepage > **Settings** > **Calendar**.
8.  Click **"Add New Calendar"**, give it a name, and paste the code.

> **Note:** If your calendar is private, you may see a "permission denied" error unless you are logged into your Google account in that browser.

### 3. Stocks Widget
1.  Open **Settings** > **Preferences**.
2.  Enter stock symbols separated by commas (e.g., `AAPL, TSLA, BTCUSD, SPX`).

### 4. Embed Website Widget
1.  Open **Settings** > **Preferences**.
2.  Paste a URL into the **Website URL** field.

> **Pro Tip:** You can do a lot with this feature including embedding a Google Doc/Sheet filled with links for quick access to your important information/websites

---
