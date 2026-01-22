// ===== DOM ELEMENTS =====
const menuButton = document.getElementById('menu-button');
const primaryNav = document.getElementById('primary-nav');
const memberContainer = document.getElementById('member-cards-container');
const gridViewBtn = document.getElementById('grid-view-btn');
const listViewBtn = document.getElementById('list-view-btn');
const currentYearSpan = document.getElementById('current-year');
const lastModifiedSpan = document.getElementById('last-modified');

// ===== MOBILE NAVIGATION TOGGLE =====
menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', 
        primaryNav.classList.contains('active'));
});

// ===== FETCH & DISPLAY MEMBER DATA =====
async function fetchMembers() {
    try {
        const response = await fetch('./data/members.json');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Failed to load member data:', error);
        memberContainer.innerHTML = '<p class="error">Unable to load member directory. Please try again later.</p>';
    }
}

function displayMembers(members) {
    // Clear loading message
    memberContainer.innerHTML = '';
    
    // Create grid container
    const gridContainer = document.createElement('div');
    gridContainer.className = 'cards-grid active';
    
    // Create list container
    const listContainer = document.createElement('div');
    listContainer.className = 'list-view';
    
    members.forEach(member => {
        // Create grid card
        const card = document.createElement('article');
        card.className = `member-card ${getMembershipClass(member.membership)}`;
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" class="card-logo" loading="lazy">
            <div class="card-content">
                <h3>${member.name}</h3>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <p class="description">${member.description || ''}</p>
                <p class="website"><a href="${member.url}" target="_blank" rel="noopener">Visit Website</a></p>
                <span class="membership-badge ${getBadgeClass(member.membership)}">${getMembershipLevel(member.membership)}</span>
            </div>
        `;
        gridContainer.appendChild(card);
        
        // Create list item
        const listItem = document.createElement('div');
        listItem.className = `member-list-item ${getMembershipClass(member.membership)}`;
        listItem.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" class="list-logo" loading="lazy">
            <div class="list-info">
                <h3>${member.name}</h3>
                <p class="address">📍 ${member.address}</p>
                <p class="phone">📞 ${member.phone}</p>
                <p class="website"><a href="${member.url}" target="_blank" rel="noopener">Website</a></p>
                <span class="membership-badge ${getBadgeClass(member.membership)}">${getMembershipLevel(member.membership)}</span>
            </div>
        `;
        listContainer.appendChild(listItem);
    });
    
    // Add containers to page
    memberContainer.appendChild(gridContainer);
    memberContainer.appendChild(listContainer);
    
    // Set initial view to grid (as per requirement)
    switchToGridView();
}

// Helper functions for membership levels
function getMembershipLevel(level) {
    switch(level) {
        case 3: return 'Gold Member';
        case 2: return 'Silver Member';
        default: return 'Member';
    }
}

function getMembershipClass(level) {
    switch(level) {
        case 3: return 'gold';
        case 2: return 'silver';
        default: return 'member';
    }
}

function getBadgeClass(level) {
    switch(level) {
        case 3: return 'gold-badge';
        case 2: return 'silver-badge';
        default: return 'member-badge';
    }
}

// ===== VIEW TOGGLE FUNCTIONALITY =====
function switchToGridView() {
    document.querySelector('.cards-grid').classList.add('active');
    document.querySelector('.list-view').classList.remove('active');
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
    memberContainer.className = 'cards-grid-view';
}

function switchToListView() {
    document.querySelector('.list-view').classList.add('active');
    document.querySelector('.cards-grid').classList.remove('active');
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
    memberContainer.className = 'list-view-container';
}

gridViewBtn.addEventListener('click', switchToGridView);
listViewBtn.addEventListener('click', switchToListView);

// ===== FOOTER DYNAMIC CONTENT =====
currentYearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// ===== INITIALIZE PAGE =====
document.addEventListener('DOMContentLoaded', () => {
    fetchMembers();
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('#primary-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                primaryNav.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });
});