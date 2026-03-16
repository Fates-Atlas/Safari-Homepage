// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const timeWidget = document.getElementById('time-widget');
    const dateWidget = document.getElementById('date-widget');
    const calendarDisplay = document.getElementById('calendar-display');
    const calendarLink = document.getElementById('calendar-link');
    const settingsIcon = document.getElementById('settings-icon');
    const settingsModal = document.getElementById('settings-modal');
    const searchForm = document.querySelector('#search-container form');
    
    // --- Inputs ---
    const bgUrlInput = document.getElementById('bg-url');
    const bgBlurInput = document.getElementById('bg-blur');
    const widgetOpacityInput = document.getElementById('widget-opacity');
    const searchEngineSelect = document.getElementById('search-engine');
    const calendarProviderSelect = document.getElementById('calendar-provider');
    const timeFormatCheckbox = document.getElementById('time-format');

    // --- State Management ---
    let settings = {
        bgImage: 'url("Images/image1.jpeg")',
        bgBlur: '0',
        widgetOpacity: '0.5',
        is24Hour: false,
        searchEngine: 'google',
        calendarProvider: 'apple'
    };

    // --- Time and Date Widget ---
    function updateTimeAndDate() {
        const now = new Date();
        
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: !settings.is24Hour
        };

        timeWidget.textContent = now.toLocaleTimeString([], timeOptions);
        dateWidget.textContent = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    setInterval(updateTimeAndDate, 1000);
    updateTimeAndDate();

    // --- Calendar Widget ---
    function displayCalendar() {
        const now = new Date();
        calendarDisplay.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    }
    displayCalendar();

    // --- Settings Panel Logic ---
    settingsIcon.addEventListener('click', () => {
        settingsModal.classList.toggle('hidden');
    });

    // --- Apply Settings ---
    function applySettings() {
        // Background
        document.documentElement.style.setProperty('--bg-image', settings.bgImage);
        document.documentElement.style.setProperty('--bg-blur', settings.bgBlur + 'px');
        
        // Widgets
        document.documentElement.style.setProperty('--glass-bg', `rgba(0, 0, 0, ${settings.widgetOpacity})`);
        
        // Time
        updateTimeAndDate(); // Force update immediately

        // Search Engine
        switch(settings.searchEngine) {
            case 'bing':
                searchForm.action = "https://www.bing.com/search";
                break;
            case 'duckduckgo':
                searchForm.action = "https://duckduckgo.com/";
                break;
            default: // Google
                searchForm.action = "https://www.google.com/search";
        }

        // Calendar
        if (settings.calendarProvider === 'google') {
            calendarLink.href = "https://calendar.google.com/";
        } else {
            calendarLink.href = "https://www.icloud.com/calendar/";
        }
    }

    // --- Load/Save Settings ---
    function loadSettings() {
        const saved = localStorage.getItem('homepageSettings');
        if (saved) {
            settings = { ...settings, ...JSON.parse(saved) };
        }
        
        // Update Inputs to match loaded settings
        if (settings.bgImage.includes('url("')) {
             // Simple check to avoid showing "url(...)" in text box if possible, 
             // mostly relevant if user pasted a link.
             // For now we assume standard format.
        }
        
        bgBlurInput.value = settings.bgBlur;
        widgetOpacityInput.value = settings.widgetOpacity;
        timeFormatCheckbox.checked = settings.is24Hour;
        searchEngineSelect.value = settings.searchEngine;
        calendarProviderSelect.value = settings.calendarProvider;

        applySettings();
    }

    function saveSettings() {
        localStorage.setItem('homepageSettings', JSON.stringify(settings));
        applySettings();
    }

    // --- Event Listeners for Inputs ---
    bgUrlInput.addEventListener('change', (e) => {
        if(e.target.value) {
            settings.bgImage = `url('${e.target.value}')`;
            saveSettings();
        }
    });
    
    bgBlurInput.addEventListener('input', (e) => { settings.bgBlur = e.target.value; saveSettings(); });
    widgetOpacityInput.addEventListener('input', (e) => { settings.widgetOpacity = e.target.value; saveSettings(); });
    timeFormatCheckbox.addEventListener('change', (e) => { settings.is24Hour = e.target.checked; saveSettings(); });
    searchEngineSelect.addEventListener('change', (e) => { settings.searchEngine = e.target.value; saveSettings(); });
    calendarProviderSelect.addEventListener('change', (e) => { settings.calendarProvider = e.target.value; saveSettings(); });

    // Initialize
    loadSettings();
});