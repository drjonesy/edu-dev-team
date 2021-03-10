// This is a static website on GitHub Pages
// Could not use pure pure JSON. Had to prepend: 'const courses =' 
// This files assumes courses.js is imported before this script

const cardTile = (obj) => {
    return `
    <div class="col-sm">
    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${obj.image}" alt="${obj.title}">
    <div class="card-body">
    <h5 class="card-title">${obj.title}</h5>
    <p class="card-text">${obj.desc}</p>
    <a href="${obj.courseURL}" class="btn btn-primary">${obj.courseURL}</a>
    </div>
    </div>
    </div>`;
}

const addCards = (id, ...items) => {
    let row = '<div class="row">'
    for (const item of items) {
        row += item;
        row += " ";
    }
    row += '</div>';
    return row;
}

const addRow = (element, html) => {
    const div = document.querySelector(element);
    div.innerHTML = html;
    
}

// MAIN 
let x = addCards("results", cardTile(courses.git), cardTile(courses.git));
addRow("#content", x);

// iterate over each course
// create new row
// if n number of courses iterated create new row



