
/* =========================
   ELEMENTS
========================= */

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const progressBar = document.getElementById("progress-bar");
const typingText = document.getElementById("typing-text");
const loader = document.getElementById("loader");

const backToTop = document.getElementById("backToTop");
const themeToggle = document.getElementById("theme-toggle");

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
    if (!typingText) return;

    const word = words[wordIndex];

    typingText.textContent = word.substring(0, charIndex);

    if (!isDeleting) {
        charIndex++;
    } else {
        charIndex--;
    }

    if (!isDeleting && charIndex > word.length) {
        isDeleting = true;
        return setTimeout(typeEffect, 1200);
    }

    if (isDeleting && charIndex < 0) {
        charIndex = 0;
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

if (typingText) {
    typeEffect();
}

/* =========================
   ANALYTICS
========================= */

const analytics = {
    cv_clicks: 0,
    project_views: 0,
    github_clicks: 0,
    demo_clicks: 0
};

function saveAnalytics() {
    try {
        localStorage.setItem(
            "portfolio_analytics",
            JSON.stringify(analytics)
        );
    } catch (error) {
        console.error("Unable to save analytics:", error);
    }

    updateAnalyticsDashboard();
}

function loadAnalytics() {
    try {
        const saved = localStorage.getItem("portfolio_analytics");

        if (saved) {
            const parsed = JSON.parse(saved);

            analytics.cv_clicks = Number(parsed.cv_clicks) || 0;
            analytics.project_views = Number(parsed.project_views) || 0;
            analytics.github_clicks = Number(parsed.github_clicks) || 0;
            analytics.demo_clicks = Number(parsed.demo_clicks) || 0;
        }
    } catch (error) {
        console.error("Unable to load analytics:", error);
    }

    updateAnalyticsDashboard();
}

function updateAnalyticsDashboard() {
    const cvCount = document.getElementById("cvCount");
    const projectCount = document.getElementById("projectCount");
    const gitCount = document.getElementById("gitCount");
    const demoCount = document.getElementById("demoCount");

    if (cvCount) {
        cvCount.textContent = analytics.cv_clicks;
    }

    if (projectCount) {
        projectCount.textContent = analytics.project_views;
    }

    if (gitCount) {
        gitCount.textContent = analytics.github_clicks;
    }

    if (demoCount) {
        demoCount.textContent = analytics.demo_clicks;
    }
}

loadAnalytics();

/* =========================
   CV AND WIL LETTER TRACKING
========================= */

["wilLetterDownload", "cvDownload"].forEach(id => {
    const downloadLink = document.getElementById(id);

    downloadLink?.addEventListener("click", () => {
        analytics.cv_clicks++;
        saveAnalytics();
    });
});

/* =========================
   PROJECT FILTERS
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => {
            btn.classList.toggle("active", btn === button);
        });

        projectCards.forEach(card => {
            const matches =
                filter === "all" || card.dataset.type === filter;

            card.style.display = matches ? "" : "none";
        });
    });
});

/* =========================
   PROJECT DETAILS MODAL
========================= */

const modal = document.getElementById("project-modal");
const closeBtn = document.querySelector(".close");

const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalTech = document.getElementById("modal-tech");

const modalGit = document.getElementById("modal-github");
const modalDemo = document.getElementById("modal-demo");

/* PROJECT INFORMATION */

const projects = {
    nightwatch: {
        title: "The Night's Watch",

        desc: "A neighborhood safety reporting system built to help residents report local problems and follow their progress. It includes resident, responder and administrator roles, report verification, assignment, status history, notes, private photo uploads and location-based searches.",

        tech: [
            "React",
            "Node.js",
            "Express",
            "TypeScript",
            "Supabase",
            "PostgreSQL",
            "PostGIS"
        ],

        github: "https://github.com/charlie2-6",
        demo: ""
    },

    smartcity: {
        title: "Smart City Municipal Complaint Management System",

        desc: "A municipal service delivery platform designed to help citizens report, track and escalate complaints. It includes role-based dashboards and an AI-powered natural language processing classifier for categorising and prioritising complaints.",

        tech: [
            "AI / NLP",
            "PostgreSQL",
            "PostGIS",
            "Web Development"
        ],

        github: "https://github.com/charlie2-6",
        demo: ""
    },

    maintenance: {
        title: "University Residence Maintenance Reporting App",

        desc: "A maintenance reporting application designed for university residences. Students can submit maintenance reports, while workers can manage repairs, update report statuses and record completion notes. The backend is being designed using Java and JDBC.",

        tech: [
            "Java",
            "JDBC",
            "Object-Oriented Programming",
            "SQL"
        ],

        github: "https://github.com/charlie2-6",
        demo: ""
    }
};

/* OPEN PROJECT DETAILS */

function openProjectModal(projectKey) {
    const project = projects[projectKey];

    if (!project) {
        console.error("Project not found:", projectKey);
        return;
    }

    if (!modal || !modalTitle || !modalDesc || !modalTech) {
        console.error("Project modal elements are missing.");
        return;
    }

    modalTitle.textContent = project.title;
    modalDesc.textContent = project.desc;

    /* CLEAR PREVIOUS TECHNOLOGY TAGS */

    modalTech.replaceChildren();

    /* ADD TECHNOLOGY TAGS */

    project.tech.forEach(technology => {
        const tag = document.createElement("span");

        tag.textContent = technology;

        modalTech.appendChild(tag);
    });

    /* CONFIGURE GITHUB BUTTON */

    if (modalGit) {
        modalGit.href = project.github || "#";

        modalGit.style.display = project.github
            ? "inline-block"
            : "none";
    }

    /* CONFIGURE LIVE DEMO BUTTON */

    if (modalDemo) {
        modalDemo.href = project.demo || "#";

        modalDemo.style.display = project.demo
            ? "inline-block"
            : "none";
    }

    /* DISPLAY MODAL */

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";

    analytics.project_views++;
    saveAnalytics();
}

/* ATTACH EVENT LISTENERS TO PROJECT BUTTONS */

document.querySelectorAll(".project-details-btn").forEach(button => {
    button.addEventListener("click", () => {
        const projectKey = button.dataset.project;

        openProjectModal(projectKey);
    });
});

/* CLOSE PROJECT MODAL */

function closeProjectModal() {
    if (!modal) return;

    modal.style.display = "none";
    document.body.style.overflow = "";
}

closeBtn?.addEventListener("click", closeProjectModal);

/* CLOSE WHEN CLICKING OUTSIDE THE MODAL */

window.addEventListener("click", event => {
    if (event.target === modal) {
        closeProjectModal();
    }
});

/* CLOSE WITH ESCAPE KEY */

window.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeProjectModal();
    }
});

/* =========================
   GITHUB CLICK TRACKING
========================= */

document.querySelectorAll("[data-github]").forEach(link => {
    link.addEventListener("click", () => {
        analytics.github_clicks++;
        saveAnalytics();
    });
});

/* TRACK MODAL GITHUB CLICKS */

modalGit?.addEventListener("click", () => {
    if (modalGit.style.display !== "none" && modalGit.href !== "#") {
        analytics.github_clicks++;
        saveAnalytics();
    }
});

/* =========================
   LIVE DEMO CLICK TRACKING
========================= */

modalDemo?.addEventListener("click", () => {
    if (modalDemo.style.display !== "none" && modalDemo.href !== "#") {
        analytics.demo_clicks++;
        saveAnalytics();
    }
});

/* =========================
   SCROLL EFFECTS
========================= */

let ticking = false;

function onScroll() {
    const scrollY = window.scrollY;

    /* NAVBAR EFFECTS */

    navbar?.classList.toggle("scrolled", scrollY > 50);
    navbar?.classList.toggle("shrink", scrollY > 80);

    /* PROGRESS BAR */

    if (progressBar) {
        const scrollTop = document.documentElement.scrollTop;

        const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        progressBar.style.width = progress + "%";
    }

    /* ACTIVE NAVIGATION LINK */

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

    /* BACK TO TOP VISIBILITY */

    if (backToTop) {
        backToTop.classList.toggle("show", scrollY > 300);
    }
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

/* RUN ON INITIAL PAGE LOAD */

window.addEventListener("load", onScroll);

/* =========================
   REVEAL ANIMATION
========================= */

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        observer.observe(section);
    });
} else {
    sections.forEach(section => {
        section.classList.add("show");
    });
}

/* =========================
   THEME TOGGLE
========================= */

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLightMode =
        document.body.classList.contains("light-mode");

    themeToggle.textContent = isLightMode ? "☀️" : "🌙";

    themeToggle.setAttribute(
        "aria-label",
        isLightMode ? "Switch to dark mode" : "Switch to light mode"
    );
});

/* =========================
   LOADER
========================= */

window.addEventListener("load", () => {
    if (!loader) return;

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 800);
});

/* =========================
   BACK TO TOP
========================= */

backToTop?.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});