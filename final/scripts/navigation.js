// Hamburger menu + wayfinding
(function() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav-menu');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('show');
            const expanded = nav.classList.contains('show');
            hamburger.setAttribute('aria-expanded', expanded);
            hamburger.innerHTML = expanded ? '✕' : '☰';
        });
    }

    // Wayfinding – set active class
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
})();