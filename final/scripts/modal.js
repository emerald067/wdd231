const modal = document.getElementById('pet-modal');
const modalContent = modal?.querySelector('.modal-content');
const closeBtn = modal?.querySelector('.modal-close');
const overlay = modal?.querySelector('.modal-overlay');

export function openModal(pet) {
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <h2 id="modal-title">${pet.name}</h2>
        <img src="${pet.image}" alt="${pet.name}" loading="lazy">
        <p><strong>Breed:</strong> ${pet.breed}</p>
        <p><strong>Age:</strong> ${pet.age} years</p>
        <p><strong>Gender:</strong> ${pet.gender}</p>
        <p><strong>Size:</strong> ${pet.size}</p>
        <p><strong>Personality:</strong> ${pet.personality}</p>
        <p>${pet.description}</p>
        <button class="btn btn-primary" id="modal-adopt-btn">Interested in Adopting?</button>
    `;

    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtn?.focus(), 100);

    document.getElementById('modal-adopt-btn')?.addEventListener('click', () => {
        window.location.href = 'get-involved.html';
    });
}

export function closeModal() {
    if (!modal) return;
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

if (closeBtn) closeBtn.addEventListener('click', closeModal);
if (overlay) overlay.addEventListener('click', closeModal);
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.getAttribute('aria-hidden') === 'false') {
        closeModal();
        e.preventDefault();
    }
});