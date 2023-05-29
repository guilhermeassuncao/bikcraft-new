class ScrollSmooth {
    constructor(links, options) {
        this.linksInternos = document.querySelectorAll(links);

        if (options === undefined) {
            this.options = { behavior: 'smooth', block: 'nearest' };
        } else {
            this.options = options;
        }

        this.scrollToSection = this.scrollToSection.bind(this);
    }

    scrollToSection(event) {
        event.preventDefault();

        const href = event.currentTarget.getAttribute('href');
        const section = document.querySelector(href);

        section.scrollIntoView(this.options);
    }

    addLinkEvent() {
        this.linksInternos.forEach((link) => {
            link.addEventListener('click', this.scrollToSection);
        });
    }

    init() {
        if (this.linksInternos.length) {
            this.addLinkEvent();
        }
        return this;
    }
}

const scrollSmooth = new ScrollSmooth('a[href^="#"]');

scrollSmooth.init();

ScrollReveal({
    scale: 0.85,
    duration: 1000,
    useDelay: 'onload',
    reset: true,
    easing: 'ease-in-out',
});

ScrollReveal().reveal('.header-nav a', {
    delay: 750,
    interval: 200,
});

ScrollReveal().reveal('.content-intro', {
    delay: 750,
});

ScrollReveal().reveal('.content-img', {
    delay: 500,
});

ScrollReveal().reveal('.content-subtitle', {
    delay: 1000,
});

ScrollReveal().reveal('.content-attributes', {
    delay: 1250,
});
