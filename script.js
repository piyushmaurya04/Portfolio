// --- Section fade-in on scroll (re-triggerable) ---
function handleSectionFadeIn() {
    // Select main sections by class or id
    const sections = [
        document.querySelector('.header'),
        document.querySelector('.about'),
        document.querySelector('.services'),
        document.querySelector('.portfolio'),
        document.querySelector('.contact')
    ].filter(Boolean);
    sections.forEach(section => section.classList.add('section-fade'));
    function checkSections() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80 && rect.bottom > 80) {
                section.classList.add('visible');
            } else {
                section.classList.remove('visible');
            }
        });
    }
    window.addEventListener('scroll', checkSections);
    window.addEventListener('resize', checkSections);
    checkSections();
}
// --- About section fade-in on scroll ---
function handleAboutFadeIn() {
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;
    const fadeEls = aboutSection.querySelectorAll('.about_col1, .about_col2');
    fadeEls.forEach(el => el.classList.add('about_fade'));
    function checkFade() {
        fadeEls.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                el.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', checkFade);
    checkFade();
}

// --- Tab switching animation ---
function enhanceTabSwitching() {
    const tabLinks = document.querySelectorAll('.tab_links');
    const tabContents = document.querySelectorAll('.tab_content');
    tabLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active from all
            tabLinks.forEach(l => l.classList.remove('active_link'));
            // Fade out all tab contents
            tabContents.forEach(c => {
                c.classList.remove('active_tabs');
                c.classList.remove('tab-fade-in');
                c.classList.add('tab-fade-out');
            });
            // Add active to clicked
            this.classList.add('active_link');
            const tabName = this.getAttribute('onclick').match(/openTab\('(.+?)'\)/)[1];
            const content = document.getElementById(tabName);
            if (content) {
                // Wait for fade-out, then fade-in
                setTimeout(() => {
                    tabContents.forEach(c => c.classList.remove('tab-fade-out'));
                    content.classList.add('active_tabs');
                    content.classList.add('tab-fade-in');
                    setTimeout(() => {
                        content.classList.remove('tab-fade-in');
                    }, 500);
                }, 300);
            }
        });
    });
}

// --- Init on DOMContentLoaded ---
document.addEventListener('DOMContentLoaded', function() {
    handleAboutFadeIn();
    enhanceTabSwitching();
    handleSectionFadeIn();
});
// Move theme toggle to top left when menu is open on mobile
const sideMenu = document.getElementById('sideMenu');
const themeToggleWrapper = document.querySelector('.theme-toggle-wrapper');
const barsIcon = document.querySelector('.fa-bars.fas');
const closeIcon = document.querySelector('.fa-circle-xmark.fas');

function moveThemeToggleMobile(open) {
    if (!themeToggleWrapper) return;
    if (window.innerWidth <= 808) {
        if (open) {
            themeToggleWrapper.style.position = 'absolute';
            themeToggleWrapper.style.left = '16px';
            themeToggleWrapper.style.top = '16px';
            themeToggleWrapper.style.zIndex = '1001';
        } else {
            themeToggleWrapper.style.position = '';
            themeToggleWrapper.style.left = '';
            themeToggleWrapper.style.top = '';
            themeToggleWrapper.style.zIndex = '';
        }
    } else {
        themeToggleWrapper.style.position = '';
        themeToggleWrapper.style.left = '';
        themeToggleWrapper.style.top = '';
        themeToggleWrapper.style.zIndex = '';
    }
}

if (barsIcon) {
    barsIcon.addEventListener('click', function() {
        moveThemeToggleMobile(true);
    });
}
if (closeIcon) {
    closeIcon.addEventListener('click', function() {
        moveThemeToggleMobile(false);
    });
}

window.addEventListener('resize', function() {
    if (window.innerWidth > 808) {
        moveThemeToggleMobile(false);
    }
});
// Theme toggle logic
const themeToggleInput = document.getElementById('theme-toggle');
const header = document.querySelector('.header');
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    if (header) {
        if (theme === 'light') {
            header.setAttribute('data-theme-image', 'hide');
        } else {
            header.removeAttribute('data-theme-image');
        }
    }
    if (themeToggleInput) {
        themeToggleInput.checked = (theme === 'light');
    }
}

if (themeToggleInput) {
    themeToggleInput.addEventListener('change', function() {
        const theme = themeToggleInput.checked ? 'light' : 'dark';
        setTheme(theme);
        localStorage.setItem('theme', theme);
    });
}

// On load, set theme from localStorage or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);
var tablinks = document.querySelectorAll(".tab_links");
var tabContent = document.querySelectorAll(".tab_content");
var sidemenu = document.querySelector("#sideMenu");
var moreWork = document.querySelector(".seeMoreWork");
var moreBtn = document.querySelector(".moreBtn");
var lessBtn = document.querySelector(".HideBtn");

function openTab(tabName){
    for(links of tablinks ){
        links.classList.remove("active_link");
    }
    for(content of tabContent ){
        content.classList.remove("active_tabs");
    }
    event.currentTarget.classList.add("active_link");
    document.getElementById(tabName).classList.add("active_tabs");
}

function openMenu(){
    sidemenu.style.right="0";
}
function closeMenu(){
    sidemenu.style.right="-200px";
}


const scriptURL = 'https://script.google.com/macros/s/AKfycbwa9WFJL_v2aPRY4DccuIEqeWpbrxxsZZSkrhy5yNjhLQAxA3XZ6bhZOMfUo0PnpKDj/exec';
  const form = document.forms['submit-to-google-sheet']
  const msg = document.querySelector("#msg");

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML="Message sent successfully" 
        setTimeout(function() {
          msg.innerHTML="";
      }, 5000)
      form.reset();
    })
      .catch(error => console.error('Error!', error.message))
  })


  function seeMoreBtn(){
    event.preventDefault();
    moreWork.style.display="grid";
    lessBtn.style.display="block";
    moreBtn.style.display="none"
    
}
function HideBtn(){
    event.preventDefault();
    moreWork.style.display="none";
    lessBtn.style.display="none";
    moreBtn.style.display="block"

  }

  function calculateExperience(startDate) {
    const start = new Date(startDate);
    const now = new Date();

    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let days = now.getDate() - start.getDate();

    if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); // Days in prev month
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return `${years} year(s), ${months} month(s), ${days} day(s)`;
}

document.getElementById("experienceDuration").textContent = calculateExperience("2025-01-16");