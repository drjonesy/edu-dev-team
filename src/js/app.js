// This is a static website on GitHub Pages
// Could not use pure pure JSON. Had to prepend: 'const courses =' 
// This files assumes courses.js is imported before this script

function cardTile(obj){
    return `
    
    <div class="card">
    <a href="${obj.courseURL}"><img class="card-img-top" src="${obj.image}" alt="${obj.title}"></a>
    <div class="card-body">
    <p class="card-title"><a href="${obj.courseURL}">${obj.title}</a></p>
    <p class="card-text">${obj.desc}</p>
    </div>`;
}


// iterate over each course
// create new row
// if n number of courses iterated create new row
const body = document.querySelector('body');



const blockCards = document.createElement("div");
blockCards.id = "blockCards";
blockCards.className = "container";
const cardRow = document.createElement("div");
cardRow.className = "card-deck";

// add elements
body.prepend(blockCards);
blockCards.append(cardRow);

for(const obj in courses){
    cardRow.innerHTML += cardTile(courses[obj]);
}

body.innerHTML += "<div class='container px-10'>&nbsp;</div>";

// REMOVE THIS CONTENT ONCE THE PLACEHOLDER IS CONVERTED TO HTML
const placeholder = document.createElement("div");
placeholder.className = "container";
placeholder.innerHTML = `<img src="src/images/placeholder-home.png" alt="temp image">`;

body.prepend(placeholder);