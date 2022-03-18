/*====== MENU =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/* ==========   SHOW LIST   ========== */
const showList = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-list");
    });
  }
};

showList("nav-toggle", "nav-list");

/* ==========   ANIMATION TOGGLE    ========== */
const hambToggle = (
  toggleId,
  navhomeId,
  navaboutId,
  navprojectId,
  navcontactId
) => {
  const toggle = document.getElementById(toggleId),
    home = document.getElementById(navhomeId),
    about = document.getElementById(navaboutId),
    project = document.getElementById(navprojectId),
    contact = document.getElementById(navcontactId);

  if (toggle && home && about && project && contact) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("active");
    });
    home.addEventListener("click", () => {
      toggle.classList.toggle("active");
    });
    about.addEventListener("click", () => {
      toggle.classList.toggle("active");
    });
    project.addEventListener("click", () => {
      toggle.classList.toggle("active");
    });
    contact.addEventListener("click", () => {
      toggle.classList.toggle("active");
    });
  }
};

hambToggle(
  "nav-toggle",
  "link-home",
  "link-about",
  "link-project",
  "link-contact"
);

/* ==========   REMOVE MENU   ========== */
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");

  const navList = document.getElementById("nav-list");
  navList.classList.remove("show-list");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

/* ==========   SCROLL ANIMATION NAVBAR   ========== */
window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 200);
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 50,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
  // reset: true
});

sr.reveal(`.home, .project`, {
  interval: 100,
});
sr.reveal(`.abt-row-one, .contact-row-one`, { origin: "left" });
sr.reveal(`.abt-row-scd, .contact-row-scd`, { origin: "right" });
