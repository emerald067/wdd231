// ===== DOM ELEMENTS =====
const menuButton = document.getElementById('menu-button');
const primaryNav = document.getElementById('primary-nav');
const currentYearSpan = document.getElementById('current-year');
const lastModifiedSpan = document.getElementById('last-modified');
const timestampField = document.getElementById('timestamp');
const membershipForm = document.getElementById('membership-form');
const viewButtons = document.querySelectorAll('.view-benefits');
const closeButtons = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.membership-modal');

// ===== MOBILE MENU TOGGLE =====
menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('active');
    menuButton.setAttribute('aria-expanded', 
        primaryNav.classList.contains('active'));
});

// ===== SET FOOTER CONTENT =====
currentYearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;

// ===== SET TIMESTAMP ON FORM LOAD =====
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// ===== MODAL FUNCTIONALITY =====
viewButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.showModal();
        }
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('dialog');
        if (modal) {
            modal.close();
        }
    });
});

// Close modal when clicking outside
modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close();
        }
    });
});

// ===== FORM VALIDATION =====
if (membershipForm) {
    // Real-time validation for title field
    const titleField = document.getElementById('title');
    if (titleField) {
        titleField.addEventListener('input', () => {
            const pattern = /^[A-Za-z -]{7,}$/;
            const hint = titleField.nextElementSibling;
            
            if (titleField.value === '') {
                titleField.style.borderColor = '#ccc';
                if (hint) hint.style.color = '#666';
            } else if (pattern.test(titleField.value)) {
                titleField.style.borderColor = '#4CAF50';
                if (hint) hint.style.color = '#4CAF50';
            } else {
                titleField.style.borderColor = '#f44336';
                if (hint) hint.style.color = '#f44336';
            }
        });
    }
    
    // Phone number formatting
    const phoneField = document.getElementById('phone');
    if (phoneField) {
        phoneField.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = '(' + value;
                if (value.length > 4) {
                    value = value.slice(0, 4) + ') ' + value.slice(4);
                }
                if (value.length > 9) {
                    value = value.slice(0, 9) + '-' + value.slice(9, 13);
                }
            }
            e.target.value = value;
        });
    }
}

// ===== CLOSE MOBILE MENU WHEN CLICKING LINKS =====
document.querySelectorAll('#primary-nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            primaryNav.classList.remove('active');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    });
});
