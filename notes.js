// So that when we reload the saved notes show up
showNotes();

// If user adds a note, add it to the localstorage
let addNote = document.getElementById('add-note');
addNote.addEventListener("click", function(e) {
    let addText = document.getElementById('add-text');
    let notes = localStorage.getItem('notes');
    if(notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value);
    // To update the local storage
    localStorage.setItem("notes", JSON.stringify(notesObj)); 
    addText.value = "";
    showNotes();
});

// Function to show elements form localstorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if(notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = '';
    notesObj.forEach(function(element, index) {
        html += 
        `
        <div class="single-note">
            <h3>Note ${index+1}</h3>
            <p>${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)">Delete Note</button>
        </div>
        `;
    });
    let notesEle = document.getElementById("saved-notes");
    if(notesObj.length != 0) {
        notesEle.innerHTML = html;
    }
    else {
        notesEle.innerHTML = `Nothing to show! Use "Add a note" section above to add notes.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    let notes = localStorage.getItem('notes');
    if(notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // It takes (index no form where you want to start, no of elements to delete starting form the first index provided)
    notesObj.splice(index, 1); 

    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// Search for laptop
let searchText = document.getElementById("search-box");
searchText.addEventListener("input", function() {
    let inputVal = searchText.value;
    let singleNote = document.getElementsByClassName("single-note");
    Array.from(singleNote).forEach(function(element) {
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if(cardText.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
});
