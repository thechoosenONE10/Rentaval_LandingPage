// ================================
// SCROLL PROGRESS INDICATOR
// ================================
const scrollProgress = document.querySelector(".scroll-progress");

function updateScrollProgress() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  scrollProgress.style.transform = `scaleX(${scrollPercentage / 100})`;
}

window.addEventListener("scroll", updateScrollProgress);

// ================================
// NAVBAR SCROLL EFFECT
// ================================
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ================================
// HAMBURGER MENU
// ================================
const hamburger = document.getElementById("hamburger");
const navbarMenu = document.getElementById("navbarMenu");
const navLinks = document.querySelectorAll(".nav-link");
const body = document.body;

// Toggle del menú
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navbarMenu.classList.toggle("active");
  body.classList.toggle("menu-open");
});

// Cerrar menú al hacer click en un link
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Obtener el destino
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    // Cerrar el menú
    hamburger.classList.remove("active");
    navbarMenu.classList.remove("active");
    body.classList.remove("menu-open");

    // Scroll suave a la sección
    if (targetSection) {
      const navbarHeight = document.querySelector(".navbar").offsetHeight;
      const targetPosition = targetSection.offsetTop - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Cerrar menú al hacer click fuera
navbarMenu.addEventListener("click", (e) => {
  if (e.target === navbarMenu) {
    hamburger.classList.remove("active");
    navbarMenu.classList.remove("active");
    body.classList.remove("menu-open");
  }
});

// ================================
// SCROLL REVEAL ANIMATIONS
// ================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");

      // Si es un elemento con animación de lista, animar los hijos
      if (
        entry.target.classList.contains("investigation-content") ||
        entry.target.classList.contains("benefits-content")
      ) {
        const listItems = entry.target.querySelectorAll(".list-item-animate");
        listItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("revealed");
          }, index * 100);
        });
      }
    }
  });
}, observerOptions);

// Observar todos los elementos con data-scroll-reveal
const revealElements = document.querySelectorAll("[data-scroll-reveal]");
revealElements.forEach((element) => {
  observer.observe(element);
});

// ================================
// COUNTER ANIMATIONS
// ================================
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-count"));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
            // Add "+" suffix if needed
            if (target >= 100 && !counter.textContent.includes("%")) {
              counter.textContent = target + "+";
            }
            if (counter.textContent.includes("98")) {
              counter.textContent = "98%";
            }
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  },
  { threshold: 0.5 }
);

const counters = document.querySelectorAll(".stat-number");
counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// ================================
// PARALLAX EFFECT FOR HERO
// ================================
const heroSection = document.querySelector(".herosection");

if (heroSection) {
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroBackground = heroSection.querySelector("::before");

    // Parallax effect
    if (scrolled < window.innerHeight) {
      heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroSection.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
  });
}

// ================================
// SCROLL TO TOP BUTTON
// ================================
const scrollToTopBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollToTopBtn.classList.add("visible");
  } else {
    scrollToTopBtn.classList.remove("visible");
  }
});

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ================================
// RIPPLE EFFECT FOR BUTTONS
// ================================
const rippleButtons = document.querySelectorAll(".btn-ripple");

rippleButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

// ================================
// FORM VALIDATION & ANIMATION
// ================================
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Simple validation
    const inputs = contactForm.querySelectorAll("input");
    let isValid = true;

    inputs.forEach((input) => {
      if (!input.value.trim()) {
        isValid = false;
        input.style.borderColor = "#ff4444";
        setTimeout(() => {
          input.style.borderColor = "";
        }, 2000);
      }
    });

    if (isValid) {
      // Show success message
      const submitBtn = contactForm.querySelector(".btn-send");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "¡Mensaje enviado!";
      submitBtn.style.background = "linear-gradient(135deg, #4CAF50, #45a049)";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
        contactForm.reset();
      }, 3000);

      // Here you would typically send the data to a server
      console.log("Form data:", data);
    }
  });

  // Add focus animations to inputs
  const formInputs = contactForm.querySelectorAll("input");
  formInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", () => {
      if (!input.value) {
        input.parentElement.classList.remove("focused");
      }
    });
  });
}

// ================================
// SMOOTH SCROLLING FOR ALL LINKS
// ================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = target.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    }
  });
});

// ================================
// LAZY LOADING FOR IMAGES
// ================================
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        imageObserver.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll("img[data-src]");
  lazyImages.forEach((img) => imageObserver.observe(img));
}

// ================================
// CARD HOVER EFFECTS WITH 3D TILT
// ================================
const cards = document.querySelectorAll(
  ".brand-card, .process-card, .protection-card"
);

cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ================================
// ANIMATED GRADIENT BACKGROUNDS
// ================================
const gradientSections = document.querySelectorAll(
  ".risk-section, .protection-section"
);

gradientSections.forEach((section) => {
  let angle = 0;

  setInterval(() => {
    angle = (angle + 1) % 360;
    // This is handled by CSS animations, but we could add more dynamic effects here
  }, 50);
});

// ================================
// LOADING ANIMATION
// ================================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");

  // Trigger initial animations
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = "1";
  }
});

// ================================
// PERFORMANCE OPTIMIZATION
// ================================
let ticking = false;

function requestTick(callback) {
  if (!ticking) {
    requestAnimationFrame(() => {
      callback();
      ticking = false;
    });
    ticking = true;
  }
}

// Throttle scroll events
let lastScrollY = 0;

window.addEventListener(
  "scroll",
  () => {
    lastScrollY = window.scrollY;
    requestTick(() => {
      updateScrollProgress();
    });
  },
  { passive: true }
);

// ================================
// ACCESSIBILITY IMPROVEMENTS
// ================================
// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Close menu with Escape key
  if (e.key === "Escape" && navbarMenu.classList.contains("active")) {
    hamburger.classList.remove("active");
    navbarMenu.classList.remove("active");
    body.classList.remove("menu-open");
  }

  // Scroll to top with Home key
  if (e.key === "Home" && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Scroll to bottom with End key
  if (e.key === "End" && e.ctrlKey) {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }
});

// ================================
// CONSOLE MESSAGE
// ================================
console.log(
  "%c¡Bienvenido a Rentaval! 🏠",
  "color: #c39c05; font-size: 24px; font-weight: bold;"
);
console.log("%cTu renta segura", "color: #202f58; font-size: 16px;");
