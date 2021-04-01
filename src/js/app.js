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
    let card = '';
    card += `<div class="card">`;
    let imgString = `<img class="card-img-top" src="${obj.image}" alt="${obj.title}">`;
    card += isCardEnabled(obj,`<a href="${obj.courseURL}">${imgString}</a>`, `${imgString}`);
    card += `<div class="card-body">`;
    card += `<p class="card-title">`;
    card += isCardEnabled(obj,`<a href="${obj.courseURL}">${obj.title}</a>`, `${obj.title}`);
    card += `</p>`;
    card += isCardEnabled(obj, `<p class="card-text">${obj.desc}</p>`, `<h4 class="text-muted"><em>Coming soon...</em></h4>`);
    card += `</div>`;
    return card;
}

// Disabled Cards Functionality
// removes all card hyperlinks if status === 'disabled'
function isCardEnabled(obj, trueHTML, falseHTML){
    let html = trueHTML;
    if(obj['enabled'] === 'true'){
        html = trueHTML;
    }else {
        html = falseHTML;
    }
    return html;
}


// Load all tiles by default
function loadAllResults(){
    for(const obj in courses){
        let el = cardTile(courses[obj])
        cardsDiv.firstElementChild.firstElementChild.innerHTML += el;
        
    }
}



// Filter By Category  Functionality
const cat = document.querySelector('#filterByCat');

function filterResults() {
    let keywords = [];
    // loop through all course keywords and create a set
    for(const obj in courses){
        keywords += courses[obj]['keywords'] + ",";
    }
    // create a new set
    keywords = new Set(keywords.split(',').sort());
    keywords.delete("");
    // build drop-down options
    keywords.forEach(keyword => {
        cat.innerHTML += `<option value="${keyword}">${keyword}</option>`;
    });
    
    // add change event handler when drop value changes
    cat.addEventListener('change', ()=>{
        let value = cat.value;
        cardsDiv.firstElementChild.firstElementChild.innerHTML = ""; // clear results
        if(value === 'default'){
            for(const obj in courses){
                cardsDiv.firstElementChild.firstElementChild.innerHTML += cardTile(courses[obj]);
            }
        } else {
            for(const obj in courses){
                if(courses[obj]['keywords'].includes(value)) {
                    cardsDiv.firstElementChild.firstElementChild.innerHTML += cardTile(courses[obj]);
                }
            }
        }
    });
}



// Search Function
const search = document.querySelector('#search');

function searchBy(){
    search.addEventListener('change', ()=>{
        let value = search.value;
        cardsDiv.firstElementChild.firstElementChild.innerHTML = ""; // clear results
        if(value === ""){
            for(const obj in courses){
                cardsDiv.firstElementChild.firstElementChild.innerHTML += cardTile(courses[obj]);
            }
        } else {
            for(const obj in courses){
                if(courses[obj]['title'].toLowerCase().includes(value.toLowerCase()) 
                || courses[obj]['desc'].toLowerCase().includes(value.toLowerCase())
                || courses[obj]['keywords'].toString().includes(value.toLowerCase())
                ) {
                    cardsDiv.firstElementChild.firstElementChild.innerHTML += cardTile(courses[obj]);
                }
            }
        }
    });
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



function buildColNav(obj="", count=0)  {
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
                    <input type="checkbox" id="checkbox_${i}"> <span id="link_${i}" class="col-nav-text text-secondary">${i+1}.  ${arr[i]['title']}</span>
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
const updatesContent = document.querySelector('#updatesContent');

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
    for (const content of [overviewContent, classroomContent, updatesContent]) {
        content.classList = 'd-none';
    }
}

function showDetails(htmlElement){
    htmlElement.classList = 'd-block';
}

// functions that display content from courses.js
function addContent(htmlElement, obj, descriptor, css="") {
    let content = courses[obj][descriptor];
    if(content instanceof Array){
        for (let i=0; i < content.length; i += 1 ) {
            htmlElement.innerHTML += `<span class="${css}">${content[i]}</span>`;
            if(i < content.length -1){
                htmlElement.innerHTML += ', ';
            }
        }
    } else {
        htmlElement.innerHTML += `<p class="${css}">${content}</p>`;
    }
    
}


// add Additional Resource Links
// Do not provide a comma for the last link
function addResourceLinks(obj, css="", ){
    const resourceLinks = document.querySelector('#resourceLinks');
    const resources = courses[obj]['resources'];
    for (let i=0; i < resources.length; i += 1) {
        resourceLinks.innerHTML += `<a class="${css}" href="${resources[i]['url']}" target="blank">${resources[i]['text']}</a>`;
    }
}


// add updates and announcements
function addUpdates(htmlElement, obj) {
    const updates = courses[obj]['updates'];
    for(let i=0; i < updates.length; i += 1){
        htmlElement.innerHTML += `
        <div class="px-4">
            <span class="block updateDate">${updates[i]['date']}</span>
            <span class="block updateTitle">${updates[i]['title']}</span>
            <span class="block updateDetails">${updates[i]['details']}</span>
        </div>`;
    }
}
