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
    // Solo prevenir default si es un enlace anchor (#)
    const href = link.getAttribute("href");
    if (href.startsWith("#")) {
      e.preventDefault();

      // Obtener el destino
      const targetId = href;
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
    } else {
      // Para enlaces externos, simplemente cerrar el menú
      hamburger.classList.remove("active");
      navbarMenu.classList.remove("active");
      body.classList.remove("menu-open");
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
            counter.textContent = Math.floor(current).toLocaleString("en-US");
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString("en-US");
            // Casos especiales
            if (target === 1000) {
              counter.textContent = "+1,000";
            } else if (target === 40000000) {
              counter.textContent = "+40,000,000";
            } else if (target === 3) {
              counter.textContent = "-3%";
            } else if (target === 121) {
              counter.textContent = "121";
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
// FORM VALIDATION & SECURITY
// ================================
const contactForm = document.getElementById("contactForm");

// Validación helpers
const validators = {
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) return "El correo es requerido";
    if (!emailRegex.test(value)) return "Correo electrónico inválido";
    if (value.length > 150) return "Correo demasiado largo";
    return null;
  },
  phone: (value) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
    if (!value.trim()) return "El número es requerido";
    if (!phoneRegex.test(value)) return "Número de teléfono inválido";
    if (value.length > 20) return "Número demasiado largo";
    return null;
  },
  city: (value) => {
    if (!value.trim()) return "La ciudad es requerida";
    if (value.length < 5) return "Ciudad demasiado corta";
    if (value.length > 100) return "Ciudad demasiado larga";
    // Prevenir inyección de scripts
    if (/<|>|&lt;|&gt;/.test(value)) return "Caracteres no permitidos";
    return null;
  },
  service: (value) => {
    if (!value.trim()) return "El tipo de servicio es requerido";
    if (value.length < 10) return "Aclare el tipo de servicio";
    if (value.length > 200) return "Texto muy largo";
    // Prevenir inyección de scripts
    if (/<|>|&lt;|&gt;/.test(value)) return "Caracteres no permitidos";
    return null;
  },
  amount: (value) => {
    // Campo opcional
    if (!value.trim()) return null;
    if (value.length > 50) return "Monto demasiado largo";
    return null;
  },
};

// Sanitizar input
function sanitizeInput(value) {
  return value
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

// Mostrar error
function showError(inputId, message) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(`${inputId}-error`);

  input.classList.add("error");
  input.classList.remove("success");
  errorElement.textContent = message;
  errorElement.classList.add("visible");
}

// Limpiar error
function clearError(inputId) {
  const input = document.getElementById(inputId);
  const errorElement = document.getElementById(`${inputId}-error`);

  input.classList.remove("error");
  input.classList.add("success");
  errorElement.textContent = "";
  errorElement.classList.remove("visible");
}

// Validar campo individual
function validateField(inputId) {
  const input = document.getElementById(inputId);
  const validator = validators[inputId];

  if (!validator) return true;

  const error = validator(input.value);
  if (error) {
    showError(inputId, error);
    return false;
  } else {
    clearError(inputId);
    return true;
  }
}

// Rate limiting para prevenir spam
let lastSubmitTime = 0;
const SUBMIT_COOLDOWN = 10000; // 10 segundos entre envíos

if (contactForm) {
  // Validación en tiempo real
  const formInputs = ["email", "phone", "city", "service", "amount"];

  formInputs.forEach((inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      // Validar al perder el foco
      input.addEventListener("blur", () => validateField(inputId));

      // Limpiar errores mientras escribe
      input.addEventListener("input", () => {
        const errorElement = document.getElementById(`${inputId}-error`);
        if (errorElement.classList.contains("visible")) {
          validateField(inputId);
        }
      });

      // Animaciones de foco
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });
    }
  });

  // Manejo del envío del formulario con Web3Forms
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Rate limiting
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
      alert("Por favor espera unos segundos antes de enviar otro mensaje.");
      return;
    }

    // Validar todos los campos
    let isValid = true;
    formInputs.forEach((inputId) => {
      if (!validateField(inputId)) {
        isValid = false;
      }
    });

    if (!isValid) {
      // Hacer scroll al primer error
      const firstError = contactForm.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Preparar datos para Web3Forms
    const formData = new FormData(contactForm);

    // Sanitizar los valores antes de enviar
    const sanitizedData = new FormData();
    for (let [key, value] of formData.entries()) {
      // No sanitizar campos de sistema de Web3Forms
      if (
        key === "access_key" ||
        key === "subject" ||
        key === "from_name" ||
        key === "botcheck"
      ) {
        sanitizedData.append(key, value);
      } else {
        sanitizedData.append(key, sanitizeInput(value));
      }
    }

    // Deshabilitar botón de envío
    const submitBtn = contactForm.querySelector(".btn-send");
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";

    try {
      // Enviar a Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: sanitizedData,
      });

      const result = await response.json();

      if (result.success) {
        // Actualizar timestamp del último envío
        lastSubmitTime = Date.now();

        // Mostrar mensaje de éxito
        submitBtn.textContent = "¡Mensaje enviado!";
        submitBtn.style.background =
          "linear-gradient(135deg, #16a34a, #15803d)";

        // Limpiar formulario
        setTimeout(() => {
          contactForm.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.disabled = false;

          // Limpiar estados de validación
          formInputs.forEach((inputId) => {
            const input = document.getElementById(inputId);
            if (input) {
              input.classList.remove("success");
              clearError(inputId);
            }
          });
        }, 3000);

        console.log("Formulario enviado exitosamente a Web3Forms");
      } else {
        throw new Error(result.message || "Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      submitBtn.textContent = "Error al enviar";
      submitBtn.style.background = "linear-gradient(135deg, #dc2626, #b91c1c)";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
      }, 3000);
    }
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
  ".process-card, .protection-card, .social-card"
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
// SECURITY: Prevenir ataques XSS en URLs
// ================================
window.addEventListener("DOMContentLoaded", () => {
  // Limpiar query parameters sospechosos
  const urlParams = new URLSearchParams(window.location.search);
  let hasSuspicious = false;

  for (let [key, value] of urlParams.entries()) {
    if (/<script|javascript:|onerror=/i.test(value)) {
      hasSuspicious = true;
      break;
    }
  }

  if (hasSuspicious) {
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});
