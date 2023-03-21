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
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sectionsList = document.querySelectorAll('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the navigation menu

let fragment = document.createDocumentFragment();

// Loop over all sections of the document
for (const section of sectionsList) {
    const listElement = document.createElement('li');

    // Create an anchor element and populate its attributes
    const anchorElement = document.createElement('a');
    anchorElement.textContent = section.getAttribute('data-nav');
    anchorElement.setAttribute('id', 'link_' + section.id);
    anchorElement.setAttribute('class', 'menu__link');
    anchorElement.setAttribute('href', '#' + section.id);

    // Append the anchor to the list, and the list to the fragment
    listElement.appendChild(anchorElement);
    fragment.appendChild(listElement);
}

// Update the DOM once to avoid multiple reflows and repaints
const navList = document.getElementById('navbar__list')
navList.appendChild(fragment);

/* 
* A function that checks which section is in the current view box
* and marks this section active in both body and nav menu 
*/
function toggleActive(sections) {
    // loop over document sections
    for (const sect of sections) {
        const box = sect.getBoundingClientRect();
        // Also find the corresponding nav link
        const navItem = document.getElementById('link_' + sect.id);

        /**
        * Toggle the state of sections and nav links to active if in view box.
        * The number 150 is reached via trial and error 
        * as explained in this link.
        * https://knowledge.udacity.com/questions/85408
        */
        sect.classList.toggle('active', (box.top <= 150 && box.bottom >= 150));
        navItem.classList.toggle('active', (box.top <= 150 && box.bottom >= 150));

    }
}

// Scroll to anchor ID using scrollTO event
function scrollToSection(evt) {
    // Prevent the default jump to link
    evt.preventDefault();

    // First check if the clicked item is a link or not
    if (evt.target.nodeName === 'A') {
        // extract the section ID from the anchor's href
        let navSect = evt.target.getAttribute('href').slice(1);
        let navSection = document.getElementById(navSect)
        
        // Smooth scrolling to the click target
        navSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * End Main Functions
 * Begin Events
 */

// while scrolling the document, set the current section in view to active
document.addEventListener('scroll', function () { toggleActive(sectionsList) });

// Smooth scroll to the section targeted by the click
const navLink = document.getElementById('navbar__list');
navLink.addEventListener('click', function (event) { scrollToSection(event) });



