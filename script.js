const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const closeButton = document.querySelector('.modal-close');
const cards = document.querySelectorAll('.card');

function openModal(imageElement) {
    if (!modal || !modalImage || !imageElement) return;

    modalImage.src = imageElement.src;
    modalImage.alt = imageElement.alt;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

cards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('click', () => {
        const image = card.querySelector('img');
        openModal(image);
    });

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            const image = card.querySelector('img');
            openModal(image);
        }
    });
});

if (closeButton) {
    closeButton.addEventListener('click', closeModal);
}

if (modal) {
    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('modal-backdrop')) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});
