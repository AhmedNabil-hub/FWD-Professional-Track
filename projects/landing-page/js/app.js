/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const activeClass = "active";
let sectionName, sectionContent;
let sectionsOffsets = [];
let navbarList = document.getElementById("navbar__list");
let main = document.querySelector("main");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function capitalize(text) {
  text = text[0].toUpperCase() + text.slice(1);

  return text;
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function addSection(sectionName, sectionContent) {
  navbarList.innerHTML += `
    <a class="menu__link" href="#${sectionName}">
      ${capitalize(sectionName)}
    </a>
  `;

  main.innerHTML += `
    <section id="${sectionName}" class="" data-nav="${sectionName}">
      <div class="landing__container">
        <h2>${capitalize(sectionName)}</h2>
        ${sectionContent}
      </div>
    </section>
  `;

  sectionsOffsets.push({
    id: sectionName,
    offset: document.getElementById(sectionName).offsetTop,
  });

  document.querySelectorAll(".menu__link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      scrollToSection(
        document.getElementById(link.getAttribute("href").slice(1))
      );
    });
  });
}

function setActive(element) {
  [...element.parentElement.children].forEach((el) =>
    el.classList.remove(activeClass)
  );
  element.classList.add(activeClass);
}

// Add class 'active' to section when near top of viewport
function isInViewport(
  currElementOffset,
  nextElementOffset,
  currElementId
) {
  if (
    window.scrollY >= currElementOffset &&
    window.scrollY < nextElementOffset
  ) {
    setActive(document.getElementById(currElementId));
  }
}

// Scroll to anchor ID using scrollTO event

function scrollToSection(element) {
  window.scrollTo({
    top: element.offsetTop,
    left: 0,
    behavior: "smooth",
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

(function addSections(num = 4) {
  for (let i = 1; i <= num; i++) {
    console.log(i);
    addSection(
      `section${i}`,
      `<p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero asperiores ipsam quidem deleniti error quo, alias ut quod quaerat? Suscipit adipisci sunt reprehenderit hic delectus sed architecto illo ducimus impedit?
      </p>`
    );
  }
})();

// Set sections as active on scroll
window.addEventListener("scroll", function (e) {
  for (let i = 0; i < sectionsOffsets.length; i++) {
    if (i+1 < sectionsOffsets.length) {
      isInViewport(
        sectionsOffsets[i].offset,
        sectionsOffsets[i + 1].offset,
        sectionsOffsets[i].id
      );
    } else {
      isInViewport(
        sectionsOffsets[i].offset,
        document.body.offsetHeight,
        sectionsOffsets[i].id
      );
    }
  }
});
