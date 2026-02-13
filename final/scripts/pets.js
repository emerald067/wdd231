import { addToRecentlyViewed, getRecentlyViewed } from './storage.js';
import { openModal } from './modal.js';

export async function loadPets() {
    const container = document.getElementById('pets-grid');
    if (!container) return;
    try {
        container.innerHTML = '<div class="loading">🐾 Loading adorable pets...</div>';
        const response = await fetch('data/pets.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const pets = await response.json();
        displayPets(pets);
        displayRecentlyViewed();
    } catch (error) {
        console.error('Fetch error:', error);
        container.innerHTML = '<div class="error">⚠️ Unable to load pets. Please try again.</div>';
    }
}

function displayPets(pets) {
    const container = document.getElementById('pets-grid');
    let html = '';
    pets.forEach(pet => {
        html += `
            <div class="pet-card" data-id="${pet.id}">
                <img src="${pet.image}" alt="${pet.name}" loading="lazy" width="400" height="400">
                <div class="card-content">
                    <h3>${pet.name}</h3>
                    <p><strong>Breed:</strong> ${pet.breed}</p>
                    <p><strong>Age:</strong> ${pet.age} years</p>
                    <p><strong>Gender:</strong> ${pet.gender}</p>
                    <p><strong>Size:</strong> ${pet.size}</p>
                    <button class="btn btn-primary view-details">View Details</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
    document.querySelectorAll('.pet-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') e.stopPropagation();
            const petId = parseInt(this.dataset.id);
            const pet = pets.find(p => p.id === petId);
            if (pet) {
                addToRecentlyViewed(petId);
                openModal(pet);
            }
        });
    });
}

export async function loadFeaturedPet() {
    const container = document.getElementById('featured-pet-container');
    if (!container) return;
    try {
        const response = await fetch('data/pets.json');
        const pets = await response.json();
        const featured = pets[Math.floor(Math.random() * pets.length)];
        container.innerHTML = `
            <div class="pet-card featured">
                <img src="${featured.image}" alt="${featured.name}" loading="lazy">
                <div class="card-content">
                    <h3>${featured.name}</h3>
                    <p>${featured.breed}, ${featured.age} years</p>
                    <p>${featured.personality}</p>
                    <a href="adopt.html" class="btn btn-primary">Meet ${featured.name}</a>
                </div>
            </div>
        `;
    } catch (error) {
        container.innerHTML = '<p>Featured pet coming soon!</p>';
    }
}

function displayRecentlyViewed() {
    const section = document.getElementById('recently-viewed-section');
    const list = document.getElementById('recently-viewed-list');
    if (!section || !list) return;
    const recentIds = getRecentlyViewed();
    if (recentIds.length === 0) {
        section.style.display = 'none';
        return;
    }
    fetch('data/pets.json')
        .then(res => res.json())
        .then(pets => {
            const recentPets = pets.filter(pet => recentIds.includes(pet.id));
            let html = '';
            recentPets.forEach(pet => {
                html += `<div class="recent-item">${pet.name} (${pet.breed})</div>`;
            });
            list.innerHTML = html;
            section.style.display = 'block';
        });
}

if (document.getElementById('pets-grid')) loadPets();
if (document.getElementById('featured-pet-container')) loadFeaturedPet();
