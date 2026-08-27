const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeButton = document.querySelector('.modal-close');
const cards = document.querySelectorAll('.card');
const modalFrame = document.querySelector('.modal-frame');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebarLinks = document.querySelectorAll('.sidebar-link');

function toggleSidebar() {
    const isOpen = document.body.classList.toggle('sidebar-open');
    sidebarToggle?.setAttribute('aria-expanded', String(isOpen));
}

sidebarToggle?.addEventListener('click', toggleSidebar);
sidebarLinks.forEach((link) => {
    link.addEventListener('click', () => {
        document.body.classList.remove('sidebar-open');
        sidebarToggle?.setAttribute('aria-expanded', 'false');
    });
});

function openModal(card) {
    if (!modal || !modalImage || !card) return;

    const image = card.querySelector('img');
    const title = card.querySelector('h2')?.textContent || image.alt;
    const description = card.querySelector('.card-content p')?.textContent || 'Detail bangunan tidak tersedia.';

    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.classList.add('active');
    modalFrame.classList.add('focused');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function closeModal() {
    modal.classList.remove('active');
    modalFrame.classList.remove('focused');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
}

cards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');

    card.addEventListener('click', () => {
        openModal(card);
    });

    card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openModal(card);
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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.18,
});

cards.forEach((card) => {
    card.classList.add('hidden-card');
    observer.observe(card);
});
