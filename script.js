const allSections = document.querySelectorAll("section");
const skillLogos = document.querySelectorAll(".skill-logo");
const skillsGrid = document.querySelector(".skills-grid");
const footerText = document.querySelector("footer p");
const darkLightButton = document.querySelector(".dark-light-mode-btn");
const body = document.querySelector("body");
const lightIcon = document.querySelector(".light-icon");
const darkIcon = document.querySelector(".dark-icon");
const nav = document.querySelector("nav");
const burgerButton = document.querySelector(".burger-icon");
const burgerMenu = document.querySelector(".burger-menu");
const closeBurgerButton = document.querySelector(".close-burger-menu-button");
const emailButton = document.querySelector(".email");

const d = new Date();
let year = d.getFullYear();

//light/dark mode functionality
function switchLightMode() {
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    lightIcon.classList.add("hidden-icon");
    darkIcon.classList.remove("hidden-icon");
  } else if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
    lightIcon.classList.remove("hidden-icon");
    darkIcon.classList.add("hidden-icon");
  }
}

// intersection observer function to animate sections
function revealSection(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("hidden-section");
  observer.unobserve(entry.target);
}

// intersection observer function to animate logos
function revealLogos(entries, observer) {
  const [entry] = entries;
  let currentLogo = 0;

  if (!entry.isIntersecting) return;

  function makeLogoVisible() {
    if (currentLogo < skillLogos.length) {
      skillLogos[currentLogo].classList.remove("hidden-logo");
      currentLogo++;
      setTimeout(makeLogoVisible, 200);
    }
  }

  makeLogoVisible();

  observer.unobserve(skillsGrid);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

const logoObserver = new IntersectionObserver(revealLogos, {
  root: null,
  threshold: 0.3,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
});

logoObserver.observe(skillsGrid);

darkLightButton.addEventListener("click", switchLightMode);

// dynamic copyright text
footerText.textContent = `©Tom Chapman ${year}`;

// smooth scroll handling
nav.addEventListener("click", function (e) {
  if (!e.target.classList.contains("nav-link")) {
    return;
  } else {
    let destination = e.target.dataset.destination;
    document.querySelector(`.${destination}`).scrollIntoView({
      behavior: "smooth",
    });
  }
});

// handling mobile burger button
burgerButton.addEventListener("click", function () {
  burgerMenu.classList.remove("hidden-burger-menu");
});

burgerMenu.addEventListener("click", function (e) {
  if (!e.target.classList.contains("nav-link")) {
    return;
  } else {
    let destination = e.target.dataset.destination;
    document.querySelector(`.${destination}`).scrollIntoView({
      behavior: "smooth",
    });
    burgerMenu.classList.add("hidden-burger-menu");
  }
});

closeBurgerButton.addEventListener("click", function () {
  burgerMenu.classList.add("hidden-burger-menu");
});

// mail button
function SendMail() {
  const link = "mailto:tom.chapman97@btinternet.com";
  window.location.href = link;
}

emailButton.addEventListener("click", SendMail);
