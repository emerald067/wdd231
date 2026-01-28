// ========== WEATHER API FUNCTIONALITY ==========
async function getWeather() {
    const apiKey = '96d97f068e64a8507712aa395d817433';
    const lat = '6.322931567819658';
    const lon = '8.112586973869954';
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather API error: ${response.status}`);
        }
        const data = await response.json();

        const current = data.list[0];
        document.getElementById('current-temp').textContent = Math.round(current.main.temp);
        document.getElementById('current-desc').textContent = current.weather[0].description;
        document.getElementById('current-humidity').textContent = current.main.humidity;
        document.getElementById('current-wind').textContent = Math.round(current.wind.speed); // Already mph with imperial units

        // Add weather icon
        const iconCode = current.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${current.weather[0].description}" width="60" height="60">`;

        // 3-Day Forecast - filter for one forecast per day at midday
        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = '';
        
        // Get unique days (midday forecasts)
        const dailyForecasts = [];
        const processedDays = new Set();
        
        data.list.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dateString = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' });
            
            // Use forecast around midday (12:00) for each day
            if (!processedDays.has(dateString) && date.getHours() >= 11 && date.getHours() <= 13) {
                dailyForecasts.push({
                    date: date,
                    temp: Math.round(forecast.main.temp),
                    description: forecast.weather[0].description,
                    icon: forecast.weather[0].icon
                });
                processedDays.add(dateString);
            }
        });

        // Display next 3 days (indices 0, 1, 2 for today, tomorrow, day after)
        for (let i = 0; i < 3 && i < dailyForecasts.length; i++) {
            const forecast = dailyForecasts[i];
            const dayName = forecast.date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const dayElement = document.createElement('div');
            dayElement.className = 'forecast-day';
            dayElement.innerHTML = `
                <h4>${dayName}</h4>
                <img src="https://openweathermap.org/img/wn/${forecast.icon}.png" alt="${forecast.description}">
                <p class="forecast-temp">${forecast.temp}°F</p>
                <p class="forecast-desc">${forecast.description}</p>
            `;
            forecastContainer.appendChild(dayElement);
        }

    } catch (error) {
        console.error('Failed to fetch weather:', error);
        document.querySelector('.weather-content').innerHTML = 
            '<p class="error">Unable to load weather data. Please check your connection.</p>';
    }
}

// ========== MEMBER SPOTLIGHTS FUNCTIONALITY ==========
async function displaySpotlights() {
    try {
        const response = await fetch('data/members.json');
        if (!response.ok) throw new Error('Network response was not ok');
        const members = await response.json();
        // Map numbers to level names for filtering.
        const membersWithLevel = members.map(member => {
            let levelName = 'Member';
            if (member.membership === 3) levelName = 'Gold';
            if (member.membership === 2) levelName = 'Silver';
            // member.membership === 1 remains 'Member'
            return { ...member, membershipLevel: levelName };
        });

        // Now filter for Gold & Silver members
        const qualifiedMembers = membersWithLevel.filter(m =>
            m.membershipLevel === 'Gold' || m.membershipLevel === 'Silver'
        );

        // Shuffle and select 2-3 random members
        const shuffled = [...qualifiedMembers].sort(() => 0.5 - Math.random());
        const spotlightsToShow = Math.floor(Math.random() * 2) + 2; // 2 or 3
        const selected = shuffled.slice(0, spotlightsToShow);

        // Generate HTML for spotlights
        const container = document.getElementById('spotlight-container');
        container.innerHTML = '';

        selected.forEach(member => {
            const card = document.createElement('div');
            card.className = 'spotlight-card card';
            
            // Determine badge class based on membership level
            const badgeClass = member.membershipLevel.toLowerCase();
            
            card.innerHTML = `
                <div class="spotlight-header">
                    <img src="images/${member.image || 'placeholder-logo.webp'}" alt="Logo of ${member.name}" loading="lazy">
                    <div class="member-title">
                        <h3>${member.name}</h3>
                        <span class="membership-badge ${badgeClass}">${member.membershipLevel} Member</span>
                    </div>
                </div>
                <div class="spotlight-info">
                    <p class="member-address">📍 ${member.address || 'Address not available'}</p>
                    <p class="member-phone">📞 ${member.phone || 'Phone not available'}</p>
                    <p class="member-website">
                        <a href="${member.url}" target="_blank" rel="noopener">
                            Visit Website
                        </a>
                    </p>
                </div>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error('Error loading member spotlights:', error);
        document.getElementById('spotlight-container').innerHTML = 
            '<div class="error-card"><p>Featured members could not be loaded at this time.</p></div>';
    }
}

// ========== UTILITY FUNCTIONS ==========
function setCurrentYear() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
}

function setLastModified() {
    document.getElementById('last-modified').textContent = document.lastModified;
}

// ========== MOBILE MENU TOGGLE ==========
function setupMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    if (menuButton && primaryNav) {
        menuButton.addEventListener('click', () => {
            primaryNav.classList.toggle('active');
            menuButton.textContent = primaryNav.classList.contains('active') ? '✕' : '☰';
            menuButton.setAttribute('aria-expanded', primaryNav.classList.contains('active'));
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (!primaryNav.contains(event.target) && !menuButton.contains(event.target)) {
                primaryNav.classList.remove('active');
                menuButton.textContent = '☰';
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// ========== INITIALIZE EVERYTHING ==========
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    setLastModified();
    setupMobileMenu();
    
    // Load dynamic content
    getWeather();
    displaySpotlights();
});