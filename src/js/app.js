// Created by Ryan Jones 3/12/2021
// To use this template leave in the comments and creator line
// This is a static website on GitHub Pages
// Could not use pure pure JSON. Had to prepend: 'const courses =' 
// This files assumes courses.js is imported before this script

// Query Elements

const body              =   document.querySelector('body');
const navDiv            =   document.querySelector('#nav');
const featureDiv        =   document.querySelector('#feature');
const searchDiv         =   document.querySelector('#search');
const cardsDiv          =   document.querySelector('#cards');
const topMenu           =   document.querySelector('#menu');
const videoContainer    =   document.querySelector('#videoContainer');
const colNav            =   document.querySelector('#colNav');

// generate menu navigation
const linkHome  =   'http://www.edudevteam.com';
const linkAbout =   'http://www.edudevteam.com/about.html';
const navItems = '' +
    `<a href="${linkHome}"><button class="rounded-btn bg-pink text-white nav-margin btn-hover">home</button></a>
    <a href="${linkAbout}"><button class="rounded-btn bg-violet text-white nav-margin btn-hover">about</button></a>`;

topMenu.innerHTML = navItems;



// ==== FUNCTIONS
function cardTile(obj){
    return ` 
    <div class="card">
    <a href="${obj.courseURL}"><img class="card-img-top" src="${obj.image}" alt="${obj.title}"></a>
    <div class="card-body">
    <p class="card-title"><a href="${obj.courseURL}">${obj.title}</a></p>
    <p class="card-text">${obj.desc}</p>
    </div>`;
}

function filterResults() {
    for(const obj in courses){
        cardsDiv.firstElementChild.firstElementChild.innerHTML += cardTile(courses[obj]);
    }
}

function responsiveVideo(videoURL) {
    videoContainer.innerHTML = `<iframe class="video" src="${videoURL}" allowfullscreen></iframe>`
}

function loadVideo(url){
    // clear current video
    videoContainer.innerHTML = "";
    // load clicked video
    responsiveVideo(url);
}



function buildColNav(count=0, obj="")  {
    // for testings
    if(count > 0){
        for(let i = 1; i <= count; i += 1){
            colNav.innerHTML += `<li id="nav_${i}">Link ${i}</li>`;
        }
    } else {
        // load video links and apply loadVideo function
        const arr = courses[`${obj}`]['videos'];
        // generate links
        for(let i = 0; i < arr.length; i += 1){
            colNav.innerHTML += `<li id="videoLink_${i}">
            <div class="checkbox">
                <label>
                    <input type="checkbox" id="checkbox_${i}"> <span id="link_${i}" class="col-nav-text">${i+1}.  ${arr[i]['title']}</span>
                </label>
            </div>
            </li>`;

        };
        // insert first video
        loadVideo(arr[0]['url']);
        // attach event handlers
        for(let i = 0; i < arr.length; i += 1){
            const textLink = document.querySelector(`#checkbox_${i}`);
            textLink.addEventListener('click', ()=>{
                loadVideo(arr[i]['url']);
            });
        }
    }
    
    // set height and apply overflow-y:scroll if video links are greater than screen height
    let screenHeight = window.innerHeight - navDiv.clientHeight;
    if(colNav.clientHeight > screenHeight){
        document.querySelector('.col-nav').style = `height: ${screenHeight - navDiv.clientHeight}px; overflow-y: scroll;`;
    }
}





// Details Section on Course Page
const overviewTab = document.querySelector('#overviewTab');
const classroomTab = document.querySelector('#classroomTab');
const announcementsTab = document.querySelector('#announcementsTab');

const overviewContent = document.querySelector('#overviewContent');
const classroomContent = document.querySelector('#classroomContent');
const announcementsContent = document.querySelector('#announcementsContent');

const courseAbout = document.querySelector('#courseAbout');
const courseCat = document.querySelector('#courseCat');
const courseDesc = document.querySelector('#courseDesc');

// functions
function removeActiveTabsAll(){
    for (const content of [overviewTab, classroomTab, announcementsTab]) {
        content.classList.remove("bg-light", "text-dark");
    }
}

function activeTab(htmlElement){
    removeActiveTabsAll();
    htmlElement.classList.add("bg-light", "text-dark");
}

function hideAllDetails() {
    for (const content of [overviewContent, classroomContent, announcementsContent]) {
        content.classList = 'd-none';
    }
}

function showDetails(htmlElement){
    htmlElement.classList = 'd-block';
}

// functions that display conent from courses.js
function addContent(htmlElement, obj, descriptor) {
    let content = courses[obj][descriptor];
    if(content instanceof Array){
        content = content.map(x => ' ' + x);
    }
    htmlElement.innerHTML += `<p>${content}</p>`;
}

// Event Listeners that affect CSS
overviewTab.addEventListener('click', ()=>{
    activeTab(overviewTab);
    hideAllDetails();
    showDetails(overviewContent);
});

classroomTab.addEventListener('click', ()=>{
    activeTab(classroomTab);
    hideAllDetails();
    showDetails(classroomContent);
});

announcementsTab.addEventListener('click', ()=>{
    activeTab(announcementsTab);
    hideAllDetails();
    showDetails(announcementsContent);
});