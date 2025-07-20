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