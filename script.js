/* =========================
   ELEMENTS
========================= */
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const progressBar = document.getElementById("progress-bar");
const typingText = document.getElementById("typing-text");

/* =========================
   TYPING ANIMATION
========================= */
const words = [
    "Software Developer 💻",
    "Java Enthusiast ☕",
    "Web Developer 🌐",
    "Problem Solver ⚡"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const word = words[wordIndex];

    typingText.textContent = word.substring(0, charIndex);

    if (!isDeleting) {
        charIndex++;
    } else {
        charIndex--;
    }

    if (!isDeleting && charIndex === word.length) {
        isDeleting = true;
        return setTimeout(typeEffect, 1200);
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

/* =========================
   ANALYTICS (SAFE INIT)
========================= */
const analytics = {
    cv_clicks: 0,
    project_views: 0,
    github_clicks: 0,
    demo_clicks: 0
};

function saveAnalytics() {
    localStorage.setItem("portfolio_analytics", JSON.stringify(analytics));
}

function loadAnalytics() {
    const saved = localStorage.getItem("portfolio_analytics");
    if (saved) Object.assign(analytics, JSON.parse(saved));
}

loadAnalytics();

/* =========================
   CV CLICK
========================= */
document.getElementById("cvDownload")?.addEventListener("click", () => {
    analytics.cv_clicks++;
    saveAnalytics();
});

/* =========================
   MODAL SYSTEM
========================= */
const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close");

const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTech = document.getElementById("modal-tech");
const modalGit = document.getElementById("modal-github");
const modalDemo = document.getElementById("modal-demo");

const projects = {
    fib: {
        title: "Fibonacci Game",
        desc: "A web game where users identify Fibonacci numbers.",
        tech: "Java, JSP, Servlets",
        github: "https://github.com/charlie2-6",
        demo: "#"
    }
};

window.openProject = function (key) {
    const p = projects[key];
    if (!p) return;

    modalTitle.textContent = p.title;
    modalDesc.textContent = p.desc;
    modalTech.textContent = p.tech;

    modalGit.href = p.github;
    modalDemo.href = p.demo;

    modal.style.display = "flex";

    analytics.project_views++;
    saveAnalytics();
};

closeBtn?.addEventListener("click", () => modal.style.display = "none");

window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
});

/* =========================
   SCROLL (OPTIMIZED SINGLE LOOP)
========================= */
let ticking = false;

function onScroll() {
    const scrollY = window.scrollY;

    navbar.classList.toggle("scrolled", scrollY > 50);
    navbar.classList.toggle("shrink", scrollY > 80);

    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

    progressBar.style.width = (scrollTop / scrollHeight) * 100 + "%";

    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 150;
        const height = section.offsetHeight;

        if (scrollY >= top && scrollY < top + height) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + current
        );
    });
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            onScroll();
            ticking = false;
        });
        ticking = true;
    }
});

/* =========================
   REVEAL ANIMATION
========================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

sections.forEach(sec => observer.observe(sec));

/* =========================
   THEME TOGGLE
========================= */
document.getElementById("theme-toggle")?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
});

/* =========================
   LOADER
========================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.style.display = "none", 500);
    }, 800);
});

const backToTop = document.getElementById("backToTop");

if (backToTop) {
    const toggleBtn = () => {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    };

    window.addEventListener("scroll", toggleBtn);
    window.addEventListener("load", toggleBtn);

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
