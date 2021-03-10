// This is a static website on GitHub Pages
// Could not use pure pure JSON. Had to prepend: 'const courses =' 
// This files assumes courses.js is imported before this script
const buildList = () => {
    console.log(courses);
}



const newTile = (obj) => {
    return `
    <div class="col-sm">
    <img class="img-preview" src="${obj.image}" />
    <p class="title">${obj.title}</p>
    <p class="desc">${obj.desc}</p>
    </div>`;
}

const addTiles = (id, ...items) => {
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
buildList();

let x = addTiles("results", newTile(courses.git), newTile(courses.git));

addRow("#courses", x);

