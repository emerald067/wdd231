// Import attractions data
import { attractions } from '../data/discover.mjs';

// ===== DOM ELEMENTS =====
const menuButton = document.getElementById('menu-button');
const primaryNav = document.getElementById('primary-nav');
const currentYearSpan = document.getElementById('current-year');
const lastModifiedSpan = document.getElementById('last-modified');
const discoverContainer = document.getElementById('discover-container');
const visitMessage = document.getElementById('visit-message');
const visitText = document.getElementById('visit-text');
const closeMessageBtn = document.getElementById('close-message');

// ===== MOBILE MENU TOGGLE =====
menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', 
        primaryNav.classList.contains('active'));
});

// ===== SET FOOTER CONTENT =====
currentYearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// ===== VISIT MESSAGE FUNCTIONALITY =====
function displayVisitMessage() {
    const lastVisit = localStorage.getItem('lastVisitDiscover');
    const now = Date.now();
    
    if (!lastVisit) {
        // First visit
        visitText.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const daysSinceLastVisit = Math.floor((now - lastVisitTime) / (1000 * 60 * 60 * 24));
        
        if (daysSinceLastVisit < 1) {
            visitText.textContent = 'Back so soon! Awesome!';
        } else {
            const dayText = daysSinceLastVisit === 1 ? 'day' : 'days';
            visitText.textContent = `You last visited ${daysSinceLastVisit} ${dayText} ago.`;
        }
    }
    
    // Store current visit
    localStorage.setItem('lastVisitDiscover', now.toString());
}

// Close message functionality
closeMessageBtn.addEventListener('click', () => {
    visitMessage.style.display = 'none';
});

// ===== LOAD AND DISPLAY ATTRACTIONS =====
function displayAttractions() {
    if (!discoverContainer) return;
    
    // Clear loading message
    discoverContainer.innerHTML = '';
    
    // Create cards for each attraction
    attractions.forEach(attraction => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        card.setAttribute('data-category', attraction.category);
        
        card.innerHTML = `
            <figure class="card-image">
                <img src="images/${attraction.image}" 
                     alt="${attraction.name}" 
                     loading="lazy"
                     width="300"
                     height="200">
                <figcaption class="visually-hidden">${attraction.name}</figcaption>
            </figure>
            <div class="card-content">
                <h2>${attraction.name}</h2>
                <address>📍 ${attraction.address}</address>
                <p class="description">${attraction.description}</p>
                <button class="learn-more" data-id="${attraction.id}">
                    Learn More
                </button>
            </div>
        `;
        
        // Add event listener to learn more button
        const learnMoreBtn = card.querySelector('.learn-more');
        learnMoreBtn.addEventListener('click', () => {
            showAttractionDetails(attraction);
        });
        
        discoverContainer.appendChild(card);
    });
}

// ===== SHOW ATTRACTION DETAILS MODAL =====
function showAttractionDetails(attraction) {
    // Create modal
    const modal = document.createElement('dialog');
    modal.className = 'attraction-modal';
    
    modal.innerHTML = `
        <button class="close-modal" aria-label="Close modal">✕</button>
        <div class="modal-content">
            <img src="images/${attraction.image}" 
                 alt="${attraction.name}"
                 width="400"
                 height="250"
                 class="modal-image">
            <h2>${attraction.name}</h2>
            <address><strong>Address:</strong> ${attraction.address}</address>
            <p class="modal-description">${attraction.description}</p>
            <div class="modal-details">
                <p><strong>Category:</strong> ${attraction.category.charAt(0).toUpperCase() + attraction.category.slice(1)}</p>
                <p><strong>Area:</strong> ${attraction.area}</p>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.appendChild(modal);
    
    // Show modal
    modal.showModal();
    
    // Close button functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.close();
        modal.remove();
    });
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.close();
            modal.remove();
        }
    });
}

// ===== INITIALIZE PAGE =====
document.addEventListener('DOMContentLoaded', () => {
    displayVisitMessage();
    displayAttractions();
    
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