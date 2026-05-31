/* =========================
   ELEMENTS
========================= */
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const progressBar = document.getElementById("progress-bar");
const typingText = document.getElementById("typing-text");

// =========================
// TYPING ANIMATION
// =========================


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
    const currentWord = words[wordIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingText.textContent = currentWord.substring(0, charIndex);

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

document.getElementById("cvDownload")?.addEventListener("click", () => {
    console.log("CV downloaded");

    // optional: send to analytics
    localStorage.setItem("cv_downloaded", "true");
});

/* =========================
   SCROLL EFFECT (OPTIMIZED)
========================= */
function handleScroll() {

    const scrollY = window.scrollY;

    /* Navbar blur + shrink */
    navbar.classList.toggle("scrolled", scrollY > 50);
    navbar.classList.toggle("shrink", scrollY > 80);

    /* Progress bar */
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + "%";

    /* Active nav links */
    let current = "";

    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (scrollY >= top) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
}

// =========================
// SCROLL SPY NAVBAR
// =========================


window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

window.addEventListener("scroll", handleScroll);
handleScroll();

/* =========================
   INTERSECTION OBSERVER (REVEAL)
========================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => observer.observe(section));

/* =========================
   THEME TOGGLE
========================= */
const themeToggle = document.getElementById("theme-toggle");

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    themeToggle.textContent =
        document.body.classList.contains("light-mode") ? "☀️" : "🌙";
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
};

closeBtn?.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

/* =========================
   LOADER
========================= */
window.addEventListener("load", () => {
    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);

    }, 800);
});

// fetch("https://api.github.com/users/YOUR_USERNAME/repos")
//     .then(res => res.json())
//     .then(data => {
//         const container = document.querySelector(".projects-container");
//         container.innerHTML = "";

//         data.slice(0, 6).forEach(repo => {
//             const card = document.createElement("div");
//             card.className = "project-card";

//             card.innerHTML = `
//                 <h3>${repo.name}</h3>
//                 <p>${repo.description || "No description"}</p>
//                 <a href="${repo.html_url}" target="_blank">View on GitHub</a>
//             `;

//             container.appendChild(card);
//         });
//     });

// =========================
// BACK TO TOP BUTTON
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const backToTop = document.getElementById("backToTop");

    if (!backToTop) return; // safety check

    // show/hide button
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "flex";
        } else {
            backToTop.style.display = "none";
        }
    });

    // click event
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

});

function filterProjects(type) {
    const cards = document.querySelectorAll(".project-card");

    cards.forEach(card => {
        const match = type === "all" || card.dataset.type === type;
        card.style.display = match ? "block" : "none";
    });
}

const fills = document.querySelectorAll(".fill");

window.addEventListener("scroll", () => {
    fills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            fill.style.width = fill.classList.contains("java") ? "90%" : "75%";
        }
    });
});