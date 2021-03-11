// This is a static website on GitHub Pages
// Could not use pure pure JSON. Had to prepend: 'const courses =' 
// This files assumes courses.js is imported before this script

function cardTile(obj){
    return `
    <div class="col-sm">
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${obj.image}" alt="${obj.title}">
    <div class="card-body">
    <h5 class="card-title">${obj.title}</h5>
    <p class="card-text">${obj.desc}</p>
    <a href="${obj.courseURL}" class="btn btn-primary">View Micro-Course</a>
    </div>
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
cardRow.className = "row";

// add elements
body.prepend(blockCards);
blockCards.append(cardRow);

for(const obj in courses){
    cardRow.innerHTML += cardTile(courses[obj]);
}

