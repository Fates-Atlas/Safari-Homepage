// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const timeWidget = document.getElementById('time-widget');
    const dateWidget = document.getElementById('date-widget');
    const calendarGrid = document.getElementById('calendar-grid');
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarGridContainer = document.getElementById('calendar-grid-container');
    const calendarEmbedContainer = document.getElementById('calendar-embed-container');
    const calendarWidget = document.getElementById('calendar-widget');
    const settingsIcon = document.getElementById('settings-icon');
    const settingsModal = document.getElementById('settings-modal');
    const searchForm = document.querySelector('#search-container form');
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');
    const dashboardGrid = document.getElementById('dashboard-grid');
    
    // --- Inputs ---
    const bgListContainer = document.getElementById('bg-list');
    const customBgInputContainer = document.getElementById('custom-bg-input');
    const customUrlInput = document.getElementById('custom-url-input');
    const fileUploadInput = document.getElementById('file-upload');
    const saveCustomBgBtn = document.getElementById('save-custom-bg');
    const toggleBgViewBtn = document.getElementById('toggle-bg-view');
    const bgEditModeControls = document.getElementById('bg-edit-mode-controls');
    const exitEditModeBtn = document.getElementById('exit-edit-mode');
    
    const bgBlurInput = document.getElementById('bg-blur');
    const widgetOpacityInput = document.getElementById('widget-opacity');
    const searchEngineSelect = document.getElementById('search-engine');
    const calendarProviderSelect = document.getElementById('calendar-provider');
    const timeFormatCheckbox = document.getElementById('time-format');
    const calendarUrlInput = document.getElementById('calendar-url');
    const tempUnitToggle = document.getElementById('temp-unit-toggle');
    const calendarModeSelect = document.getElementById('calendar-mode');
    const calendarHelpIcon = document.getElementById('calendar-help-icon');
    const accentColorPicker = document.getElementById('accent-color-picker');
    const widgetColorPicker = document.getElementById('widget-color-picker');
    const widgetGradientPicker = document.getElementById('widget-gradient-picker');
    const liquidGlassToggle = document.getElementById('liquid-glass-toggle');
    const widgetColorSwatches = document.getElementById('widget-color-swatches');
    const fontFamilySelect = document.getElementById('font-family-select');
    
    // Toggle Inputs
    const toggleCalendar = document.getElementById('toggle-calendar');
    const toggleWeather = document.getElementById('toggle-weather');
    const toggleStocks = document.getElementById('toggle-stocks');
    const toggleNews = document.getElementById('toggle-news');
    
    // New Widget Containers
    const headerWeather = document.getElementById('header-weather'); 
    const stocksWidget = document.getElementById('stocks-widget');
    const newsWidget = document.getElementById('news-widget');
    const newsFrame = document.getElementById('news-frame');
    const stockSymbolInput = document.getElementById('stock-symbol');
    const newsUrlInput = document.getElementById('news-url');

    // --- State Management ---
    // Default images that always exist
    const defaultImages = [
        'Images/image1.jpeg'
    ];

    const presetColors = [
        '#000000', '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', 
        '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', 
        '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'
    ];

    let settings = {
        bgImage: 'url("Images/image1.jpeg")',
        bgBlur: '0',
        widgetOpacity: '0.5',
        accentColor: '#4285F4',
        widgetColor: '#000000', // Default widget background color
        widgetGradientColor: '#000000',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        isLiquidGlass: false,
        is24Hour: false,
        searchEngine: 'google',
        calendarProvider: 'apple',
        calendarMode: 'grid', // 'grid' or 'embed'
        calendarUrl: '',
        tempUnit: 'celsius',
        stockSymbol: 'AAPL',
        newsUrl: '',
        showCalendar: true,
        showWeather: false,
        showStocks: false,
        showNews: false,
        customImages: [],
    };

    // Profile System: Key = Image URL, Value = Settings Object
    let bgProfiles = {};

    // Helper to get default profile settings
    const getDefaultProfile = () => {
        // Returns a subset of settings that are per-background
        const { customImages, ...profileSettings } = settings;
        // Reset specific fields for a fresh profile
        profileSettings.bgBlur = '0';
        profileSettings.widgetOpacity = '0.5';
        return profileSettings;
    };

    // --- Time and Date Widget ---
    function updateTimeAndDate() {
        const now = new Date();
        
        const timeOptions = {
            hour: 'numeric', // Changed from 2-digit to numeric to remove leading zero
            minute: '2-digit',
            hour12: !settings.is24Hour
        };

        timeWidget.textContent = now.toLocaleTimeString([], timeOptions);
        dateWidget.textContent = now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    }
    setInterval(updateTimeAndDate, 1000);
    updateTimeAndDate();

    // --- Calendar Widget ---
    let currentCalendarDate = new Date();

    function renderCalendar() {
        const year = currentCalendarDate.getFullYear();
        const month = currentCalendarDate.getMonth();
        const today = new Date();

        // Update Header
        const monthName = new Date(year, month).toLocaleString('default', { month: 'long' });
        calendarMonthYear.textContent = `${monthName} ${year}`;

        calendarGrid.innerHTML = '';

        // Day Names
        ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day-name';
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        });

        // Days Logic
        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Empty slots before first day
        for (let i = 0; i < firstDayIndex; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            calendarGrid.appendChild(empty);
        }

        // Days
        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.className = 'calendar-day';
            dayEl.textContent = i;

            // Highlight today
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayEl.classList.add('today');
            }

            // Link to Calendar
            dayEl.addEventListener('click', () => {
                const link = settings.calendarProvider === 'google' 
                    ? "https://calendar.google.com/" 
                    : "https://www.icloud.com/calendar/";
                window.open(link, '_blank');
            });

            calendarGrid.appendChild(dayEl);
        }
    }
    
    // Navigation
    document.getElementById('prev-month').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
        renderCalendar();
    });
    document.getElementById('next-month').addEventListener('click', () => {
        currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();

    // --- Settings Panel Logic ---
    settingsIcon.addEventListener('click', () => {
        settingsModal.classList.toggle('hidden');
    });

    // --- Apply Settings ---
    function applySettings() {
        // Background
        const bgLayer = document.getElementById('background-layer');
        bgLayer.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), ${settings.bgImage}`;
        bgLayer.style.filter = `blur(${settings.bgBlur}px)`;
        
        document.documentElement.style.setProperty('--accent-color', settings.accentColor);
        document.documentElement.style.setProperty('--font-family', settings.fontFamily);
        
        // Widgets
        const widgets = document.querySelectorAll('.widget-container');
        
        if (settings.isLiquidGlass) {
            widgets.forEach(w => w.classList.add('liquid-glass'));
            widgets.forEach(w => w.classList.remove('transparent-mode'));
            // Update liquid opacity based on widgetOpacity setting (mapping 0-1 to reasonable glass range)
            document.documentElement.style.setProperty('--liquid-opacity', Math.max(0.05, settings.widgetOpacity * 0.5));
        } else {
            widgets.forEach(w => w.classList.remove('liquid-glass'));
            
            // Transparent Mode (No border/shadow if opacity is 0)
            if (parseFloat(settings.widgetOpacity) === 0) {
                widgets.forEach(w => w.classList.add('transparent-mode'));
            } else {
                widgets.forEach(w => w.classList.remove('transparent-mode'));
            }

            // Handle Colors & Gradients
            const rgbColor = hexToRgb(settings.widgetColor);
            const rgbGradient = hexToRgb(settings.widgetGradientColor);
            
            if (rgbColor) {
                let bgValue;
                if (settings.widgetGradientColor && settings.widgetGradientColor !== settings.widgetColor) {
                    bgValue = `linear-gradient(135deg, rgba(${rgbColor}, ${settings.widgetOpacity}), rgba(${rgbGradient}, ${settings.widgetOpacity}))`;
                } else {
                    bgValue = `rgba(${rgbColor}, ${settings.widgetOpacity})`;
                }
                document.documentElement.style.setProperty('--glass-bg', bgValue);
            }
        }
        
        // Time
        updateTimeAndDate(); // Force update immediately

        // Search Engine
        let searchUrl = "";
        let searchName = "";
        switch(settings.searchEngine) {
            case 'bing':
                searchUrl = "https://www.bing.com/search"; searchName = "Bing";
                break;
            case 'duckduckgo':
                searchUrl = "https://duckduckgo.com/"; searchName = "DuckDuckGo";
                break;
            case 'yahoo':
                searchUrl = "https://search.yahoo.com/search"; searchName = "Yahoo";
                break;
            case 'ecosia':
                searchUrl = "https://www.ecosia.org/search"; searchName = "Ecosia";
                break;
            default: // Google
                searchUrl = "https://www.google.com/search"; searchName = "Google";
        }
        searchForm.action = searchUrl;
        searchInput.placeholder = `Search ${searchName}...`;

        // Toggles
        calendarWidget.classList.toggle('hidden', !settings.showCalendar);
        weatherWidget.classList.toggle('hidden', !settings.showWeather);
        stocksWidget.classList.toggle('hidden', !settings.showStocks);
        newsWidget.classList.toggle('hidden', !settings.showNews);

        // Update Calendar Mode
        if (settings.showCalendar) {
            if (settings.calendarMode === 'embed' && settings.calendarUrl) {
                calendarGridContainer.classList.add('hidden');
                calendarEmbedContainer.classList.remove('hidden');
                if (calendarEmbedContainer.innerHTML.indexOf(settings.calendarUrl) === -1) {
                     // Ensure clean slate before inject
                     calendarEmbedContainer.innerHTML = '';
                     if (settings.calendarUrl.trim().startsWith('<iframe')) {
                         calendarEmbedContainer.innerHTML = settings.calendarUrl;
                     } else if (settings.calendarUrl.trim().startsWith('http')) {
                         // Try wrapping in iframe if just a URL
                         calendarEmbedContainer.innerHTML = `<iframe src="${settings.calendarUrl}" style="width:100%; height:100%; border:0;"></iframe>`;
                     }
                }
            } else {
                calendarGridContainer.classList.remove('hidden');
                calendarEmbedContainer.classList.add('hidden');
            }
        }
        
        if (settings.showNews && newsFrame.src !== settings.newsUrl) {
             newsFrame.src = settings.newsUrl || "about:blank";
        }
    }

    // --- Load/Save Settings ---
    function loadSettings() {
        const savedGlobal = localStorage.getItem('homepageSettings');
        const savedProfiles = localStorage.getItem('homepageProfiles');

        if (savedGlobal) {
            const parsed = JSON.parse(savedGlobal);
            if (parsed.customImages) settings.customImages = parsed.customImages;
             settings = { ...settings, ...parsed };
        }
        if (savedProfiles) {
            bgProfiles = JSON.parse(savedProfiles);
        }

        // Ensure the active background image is loaded from settings if available
        loadProfileForImage(settings.bgImage);
        syncInputs();
        
        
        renderColorSwatches();
        renderBackgroundList();
        applySettings();
        
        if(settings.showStocks) updateStockWidget();
        if(settings.showWeather) updateWeatherWidget();
    }

    function loadProfileForImage(imageUrl) {
        if (bgProfiles[imageUrl]) {
            const globalImages = settings.customImages;
            const globalBg = imageUrl; // Keep the requested image
            // Merge defaults with saved profile to ensure new fields (like showWeather) exist
            settings = { ...settings, ...getDefaultProfile(), ...bgProfiles[imageUrl] };
            settings.customImages = globalImages; // Restore global images list
            settings.bgImage = globalBg; // Ensure bgImage is set to the requested one
        } else {
            const globalImages = settings.customImages;
            const newProfile = getDefaultProfile();
            newProfile.bgImage = imageUrl;
            settings = { ...settings, ...newProfile };
            settings.customImages = globalImages;
            settings.bgImage = imageUrl;
        }
    }

    function saveSettings() {
        const globalData = {
            customImages: settings.customImages,
            bgImage: settings.bgImage
        };
        
        const currentProfile = { ...settings };
        delete currentProfile.customImages;
        bgProfiles[settings.bgImage] = currentProfile;

        try {
            localStorage.setItem('homepageSettings', JSON.stringify(globalData));
            localStorage.setItem('homepageProfiles', JSON.stringify(bgProfiles));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                alert("Storage full.");
            }
        } finally {
            applySettings();
        }
    }

    function syncInputs() {
        bgBlurInput.value = settings.bgBlur;
        widgetOpacityInput.value = settings.widgetOpacity;
        widgetColorPicker.value = settings.widgetColor;
        accentColorPicker.value = settings.accentColor;
        widgetGradientPicker.value = settings.widgetGradientColor || settings.widgetColor;
        liquidGlassToggle.checked = settings.isLiquidGlass;
        timeFormatCheckbox.checked = settings.is24Hour;
        searchEngineSelect.value = settings.searchEngine;
        calendarProviderSelect.value = settings.calendarProvider;
        calendarModeSelect.value = settings.calendarMode;
        calendarUrlInput.value = settings.calendarUrl;
        fontFamilySelect.value = settings.fontFamily;
        
        toggleCalendar.checked = settings.showCalendar;
        toggleWeather.checked = settings.showWeather;
        toggleStocks.checked = settings.showStocks;
        toggleNews.checked = settings.showNews;
        
        stockSymbolInput.value = settings.stockSymbol;
        newsUrlInput.value = settings.newsUrl;
        tempUnitToggle.checked = settings.tempUnit === 'fahrenheit';
        
        updateCalendarHelpTooltip();
    }

    function updateCalendarHelpTooltip() {
        if (settings.calendarMode === 'embed') {
             calendarHelpIcon.dataset.tooltip = "For Google Calendar: Go to Settings > 'Integrate calendar' and copy the full HTML 'Embed code'. Pasting a simple URL will not work. This feature is not supported for Apple Calendar.";
             return;
        }
        calendarHelpIcon.dataset.tooltip = "This mode does not show events. Use 'Embed Widget' mode to see your calendar details.";
    }

    // --- New Widgets Logic ---
    function updateWeatherWidget() {
        const tempEl = document.getElementById('weather-temp');
        const descEl = document.getElementById('weather-desc'); 
        const iconEl = document.getElementById('weather-icon');

        const fetchWeather = (lat, lon, unit) => {
            const unitSymbol = unit === 'fahrenheit' ? '°F' : '°C';
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&temperature_unit=${unit}`;
            
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    if (data && data.current_weather) {
                        tempEl.textContent = `${Math.round(data.current_weather.temperature)}${unitSymbol}`;
                        const { text } = getWeatherInfo(data.current_weather.weathercode);
                        descEl.textContent = text;
                        // ensure icon is visible if we had one (simplified text only for now per code)
                        if (iconEl) iconEl.style.display = 'none'; 
                    }
                })
                .catch(err => {
                    descEl.textContent = "Weather API error";
                });
        };

        const getWeatherForIP = (countryCode) => {
            const defaultUnit = (countryCode === 'US') ? 'fahrenheit' : 'celsius';
            const unitToUse = settings.tempUnit || defaultUnit;
            if (!settings.tempUnit) { // Save the default if not set
                settings.tempUnit = unitToUse;
                tempUnitToggle.checked = (unitToUse === 'fahrenheit');
            }

            const cupertino = { lat: 37.33, lon: -122.01 };

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        fetchWeather(position.coords.latitude, position.coords.longitude, unitToUse);
                    },
                    () => { // Error/denial
                        descEl.textContent = "Using default location";
                        fetchWeather(cupertino.lat, cupertino.lon, unitToUse);
                    }
                );
            } else {
                descEl.textContent = "Using default location";
                fetchWeather(cupertino.lat, cupertino.lon, unitToUse);
            }
        };

        fetch('https://get.geojs.io/v1/ip/country.json')
            .then(res => res.json())
            .then(data => getWeatherForIP(data.country))
            .catch(() => getWeatherForIP(null)); // On error, default to Celsius logic
    }

    function updateStockWidget() {
        const container = document.getElementById('tradingview-widget-container');
        container.innerHTML = ''; // clear old
        // Handle multiple stocks
        const symbols = settings.stockSymbol.split(',').map(s => s.trim()).filter(s => s);
        
        symbols.forEach(symbol => {
            const wrapper = document.createElement('div');
            wrapper.style.minHeight = "150px"; // Ensure height for vertical stack
            const script = document.createElement('script');
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "symbol": symbol,
                "width": "100%",
                "colorTheme": "dark",
                "isTransparent": true,
                "locale": "en"
            });
            wrapper.appendChild(script);
            container.appendChild(wrapper);
        });
    }
    
    function getWeatherInfo(code) {
        const info = { text: 'Clear', icon: '' }; // Default
        if (code === 0) { info.text = 'Clear sky'; }
        else if ([1, 2, 3].includes(code)) { info.text = 'Partly cloudy'; }
        else if ([45, 48].includes(code)) { info.text = 'Fog'; }
        else if ([51, 53, 55, 56, 57].includes(code)) { info.text = 'Drizzle'; }
        else if ([61, 63, 65, 66, 67].includes(code)) { info.text = 'Rain'; }
        else if ([71, 73, 75, 77].includes(code)) { info.text = 'Snow'; }
        else if ([80, 81, 82].includes(code)) { info.text = 'Rain showers'; }
        else if ([85, 86].includes(code)) { info.text = 'Snow showers'; }
        else if ([95, 96, 99].includes(code)) { info.text = 'Thunderstorm'; }
        return info;
    }
    

    calendarUrlInput.addEventListener('change', (e) => {
        settings.calendarUrl = e.target.value;
        saveSettings();
    });
    
    // --- Search Suggestions ---
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        if (query.length < 2) {
            searchSuggestions.classList.add('hidden');
            return;
        }
        
        // JSONP Callback
        const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
        window[callbackName] = function(data) {
            delete window[callbackName];
            document.body.removeChild(script);
            showSuggestions(data[1]);
        };

        const script = document.createElement('script');
        script.src = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&callback=${callbackName}`;
        document.body.appendChild(script);
    });

    function showSuggestions(results) {
        searchSuggestions.innerHTML = '';
        if (results.length > 0) {
            searchSuggestions.classList.remove('hidden');
            results.slice(0, 5).forEach(item => {
                const div = document.createElement('div');
                div.className = 'suggestion-item';
                div.textContent = item;
                div.addEventListener('click', () => {
                    searchInput.value = item;
                    searchForm.submit();
                });
                searchSuggestions.appendChild(div);
            });
        } else {
            searchSuggestions.classList.add('hidden');
        }
    }
    
    // Hide suggestions on click outside
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            searchSuggestions.classList.add('hidden');
        }
    });

    // --- Color Picker Logic ---
    function hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    }

    function renderColorSwatches() {
        widgetColorSwatches.innerHTML = '';
        presetColors.forEach(color => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;
            swatch.dataset.color = color;
            if (color.toLowerCase() === settings.widgetColor.toLowerCase()) {
                swatch.classList.add('selected');
            }
            swatch.addEventListener('click', () => {
                settings.widgetColor = color;
                // If using solid color, sync gradient too so it's solid
                settings.widgetGradientColor = color;
                
                widgetColorPicker.value = color; // Sync color wheel
                widgetGradientPicker.value = color;
                saveSettings();
                renderColorSwatches(); // Re-render to update selection
            });
            widgetColorSwatches.appendChild(swatch);
        });
    }

    // --- Background List Logic ---
    let editModeTimeout;
    let isEditMode = false;

    function renderBackgroundList() {
        bgListContainer.innerHTML = '';

        // 1. "Custom" Option (The Plus Button)
        const addBtn = document.createElement('div');
        addBtn.className = 'bg-option add-new';
        addBtn.textContent = '+';
        addBtn.title = 'Add Custom Image';
        if (!isEditMode) {
            addBtn.addEventListener('click', () => {
                customBgInputContainer.classList.toggle('hidden');
            });
        }
        bgListContainer.appendChild(addBtn);

        // Combine defaults and custom images
        const allImages = [...settings.customImages, ...defaultImages];

        allImages.forEach(imgSrc => {
            const option = document.createElement('div');
            option.className = 'bg-option';
            
            // Format the image source for the thumbnail
            let formattedSrc = imgSrc;
            if (!imgSrc.startsWith('url(') && !imgSrc.startsWith('data:')) {
                 // Assume it's a relative path if not url() or data URI
                 formattedSrc = `url('${imgSrc}')`;
            }
            
            option.style.backgroundImage = formattedSrc;

            // Highlight if selected
            if (settings.bgImage === formattedSrc) {
                option.classList.add('selected');
            }

            if (isEditMode) {
                // In edit mode, clicking does nothing, only delete works
                if (!defaultImages.includes(imgSrc)) { // Can't delete default
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-btn';
                    deleteBtn.textContent = '×';
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation(); // Prevent any other clicks
                        const index = settings.customImages.indexOf(imgSrc);
                        if (index > -1) {
                            settings.customImages.splice(index, 1);
                            
                            // Also delete profile data to clean up storage
                            if (bgProfiles[imgSrc]) {
                                delete bgProfiles[imgSrc];
                            }
                            
                            saveSettings();
                            renderBackgroundList(); // Re-render the list
                        }
                    });
                    option.appendChild(deleteBtn);
                }
            } else {
                // Normal click behavior
                option.addEventListener('click', () => {
                    // 1. Save current profile before switching
                    // We need to save the CURRENT profile to the map before switching active image
                    const currentProfile = { ...settings };
                    delete currentProfile.customImages;
                    bgProfiles[settings.bgImage] = currentProfile;
                    localStorage.setItem('homepageProfiles', JSON.stringify(bgProfiles));
                    
                    // 2. Switch
                    settings.bgImage = formattedSrc;
                    // Update selection UI immediately before re-rendering
                    document.querySelectorAll('.bg-option').forEach(el => el.classList.remove('selected'));
                    option.classList.add('selected');

                    customBgInputContainer.classList.add('hidden');
                    
                    loadProfileForImage(formattedSrc);
                    syncInputs();
                    saveSettings();
                    renderBackgroundList(); // Re-render to update selection border
                });
            }

            bgListContainer.appendChild(option);
        });

        // Show/hide edit mode controls
        bgListContainer.classList.toggle('edit-mode', isEditMode);
        bgEditModeControls.classList.toggle('hidden', !isEditMode);
        toggleBgViewBtn.classList.toggle('hidden', isEditMode);
    }

    // Toggle Expand/Collapse
    toggleBgViewBtn.addEventListener('click', () => {
        bgListContainer.classList.toggle('expanded');
        toggleBgViewBtn.textContent = bgListContainer.classList.contains('expanded') ? 'Collapse' : 'Expand';
    });

    // Edit Mode Logic
    bgListContainer.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('bg-option') && !e.target.classList.contains('add-new')) {
            editModeTimeout = setTimeout(() => {
                isEditMode = true;
                renderBackgroundList();
            }, 1000); // 1 second hold
        }
    });
    bgListContainer.addEventListener('mouseup', () => clearTimeout(editModeTimeout));
    bgListContainer.addEventListener('mouseleave', () => clearTimeout(editModeTimeout));

    exitEditModeBtn.addEventListener('click', () => {
        isEditMode = false;
        renderBackgroundList();
    });

    // Add Custom Image Logic
    saveCustomBgBtn.addEventListener('click', () => {
        let newImage = '';

        // Check File Upload First
        if (fileUploadInput.files && fileUploadInput.files[0]) {
            processImageUpload(fileUploadInput.files[0], (compressedImageUrl) => {
                newImage = `url('${compressedImageUrl}')`;
                addCustomImage(newImage);
            });
        } 
        // Check URL Input
        else if (customUrlInput.value.trim() !== "") {
            newImage = `url('${customUrlInput.value.trim()}')`;
            addCustomImage(newImage);
        } 
        // If empty, revert to default (as per request)
        else {
            settings.bgImage = `url('${defaultImages[0]}')`;
            saveSettings();
            renderBackgroundList();
        }
    });

    // --- Image Compression Helper ---
    function processImageUpload(file, callback) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                // Resize to HD (1920x1080) max to save storage
                const MAX_WIDTH = 1920;
                const MAX_HEIGHT = 1080;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                // Compress to JPEG at 70% quality
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                callback(dataUrl);
            };
        };
    }

    const MAX_CUSTOM_IMAGES = 20; // Set a reasonable limit for stored images

    function addCustomImage(imageStr) {
        // Add to list if not already there
        if (!settings.customImages.includes(imageStr)) {
            // Enforce the cap: show error if limit is reached
            if (settings.customImages.length >= MAX_CUSTOM_IMAGES) {
                alert(`Error: Maximum of ${MAX_CUSTOM_IMAGES} custom images reached. Please delete an existing image to add a new one.`);
                return; // Stop execution
            }
            settings.customImages.unshift(imageStr); // Add to start
        }
        
        // Set as current
        settings.bgImage = imageStr;
        
        // Clear inputs
        customUrlInput.value = '';
        fileUploadInput.value = '';
        customBgInputContainer.classList.add('hidden');

        saveSettings();
        renderBackgroundList();
    }

    // --- Event Listeners for Inputs ---
    bgBlurInput.addEventListener('input', (e) => { settings.bgBlur = e.target.value; saveSettings(); });
    widgetOpacityInput.addEventListener('input', (e) => { settings.widgetOpacity = e.target.value; saveSettings(); });
    widgetColorPicker.addEventListener('input', (e) => {
        settings.widgetColor = e.target.value;
        saveSettings();
        renderColorSwatches(); // Re-render to update selection on swatches
    });
    accentColorPicker.addEventListener('input', (e) => { settings.accentColor = e.target.value; saveSettings(); });
    widgetGradientPicker.addEventListener('input', (e) => {
        settings.widgetGradientColor = e.target.value;
        saveSettings();
    });
    liquidGlassToggle.addEventListener('change', (e) => { settings.isLiquidGlass = e.target.checked; saveSettings(); });
    timeFormatCheckbox.addEventListener('change', (e) => { settings.is24Hour = e.target.checked; saveSettings(); });
    tempUnitToggle.addEventListener('change', (e) => { settings.tempUnit = e.target.checked ? 'fahrenheit' : 'celsius'; updateWeatherWidget(); saveSettings(); });
    searchEngineSelect.addEventListener('change', (e) => { settings.searchEngine = e.target.value; saveSettings(); });
    calendarProviderSelect.addEventListener('change', (e) => {
        settings.calendarProvider = e.target.value;
        updateCalendarHelpTooltip();
        saveSettings();
    });
    calendarModeSelect.addEventListener('change', (e) => { 
        settings.calendarMode = e.target.value; 
        updateCalendarHelpTooltip(); 
        saveSettings(); 
    });
    fontFamilySelect.addEventListener('change', (e) => { settings.fontFamily = e.target.value; saveSettings(); });
    
    // Widget Toggles
    toggleCalendar.addEventListener('change', (e) => { settings.showCalendar = e.target.checked; saveSettings(); });
    toggleWeather.addEventListener('change', (e) => { settings.showWeather = e.target.checked; if(settings.showWeather) updateWeatherWidget(); saveSettings(); });
    toggleStocks.addEventListener('change', (e) => { settings.showStocks = e.target.checked; if(settings.showStocks) updateStockWidget(); saveSettings(); });
    toggleNews.addEventListener('change', (e) => { settings.showNews = e.target.checked; saveSettings(); });

    stockSymbolInput.addEventListener('change', (e) => { settings.stockSymbol = e.target.value; updateStockWidget(); saveSettings(); });
    newsUrlInput.addEventListener('change', (e) => { settings.newsUrl = e.target.value; saveSettings(); });

    // Initialize
    loadSettings();
});