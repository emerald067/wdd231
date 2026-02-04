// ===== DOM ELEMENTS =====
const menuButton = document.getElementById('menu-button');
const primaryNav = document.getElementById('primary-nav');
const currentYearSpan = document.getElementById('current-year');
const lastModifiedSpan = document.getElementById('last-modified');
const applicationDataDiv = document.getElementById('application-data');

// ===== MOBILE MENU TOGGLE =====
menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', 
        primaryNav.classList.contains('active'));
});

// ===== SET FOOTER CONTENT =====
currentYearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// ===== DISPLAY APPLICATION DATA FROM URL =====
function displayApplicationData() {
    if (!applicationDataDiv) return;
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    
    // Map of field names to display names
    const fieldLabels = {
        'first-name': 'First Name',
        'last-name': 'Last Name',
        'title': 'Professional Title',
        'email': 'Email Address',
        'phone': 'Mobile Phone',
        'business-name': 'Business Name',
        'membership-level': 'Membership Level',
        'description': 'Business Description',
        'timestamp': 'Application Date & Time'
    };
    
    // Map membership level codes to full names
    const membershipLevels = {
        'np': 'NP Membership (Non-Profit)',
        'bronze': 'Bronze Membership',
        'silver': 'Silver Membership',
        'gold': 'Gold Membership'
    };
    
    let html = '';
    
    // Loop through all URL parameters and display them
    for (const [key, value] of urlParams.entries()) {
        if (fieldLabels[key]) {
            let displayValue = value;
            
            // Format membership level
            if (key === 'membership-level' && membershipLevels[value]) {
                displayValue = membershipLevels[value];
            }
            
            // Format timestamp
            if (key === 'timestamp') {
                const date = new Date(value);
                displayValue = date.toLocaleString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            }
            
            html += `
                <div class="data-row">
                    <strong>${fieldLabels[key]}:</strong>
                    <span>${displayValue || 'Not provided'}</span>
                </div>
            `;
        }
    }
    
    // If no data found (direct access to page)
    if (!html) {
        html = `
            <div class="no-data">
                <p>No application data found. Please submit an application through our <a href="join.html">Join page</a>.</p>
            </div>
        `;
    }
    
    applicationDataDiv.innerHTML = html;
}

// ===== INITIALIZE PAGE =====
document.addEventListener('DOMContentLoaded', () => {
    displayApplicationData();
    
    // Close mobile menu when clicking links
    document.querySelectorAll('#primary-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                primaryNav.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
});