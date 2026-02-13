import './navigation.js';
import './pets.js';
import './storage.js';
import './modal.js';
import './weather.js';

// Footer: current year & last modified
document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.getElementById('currentyear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    const lastMod = document.getElementById('lastModified');
    if (lastMod) lastMod.textContent = document.lastModified;
});

// Form data display on action.html
if (window.location.pathname.includes('action.html')) {
    const params = new URLSearchParams(window.location.search);
    const container = document.getElementById('submission-details');
    if (container) {
        let html = '<dl>';
        for (let [key, value] of params.entries()) {
            let label = key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            html += `<dt>${label}</dt><dd>${value || '(not provided)'}</dd>`;
        }
        html += '</dl>';
        container.innerHTML = html;
    }
}