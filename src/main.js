import {mainFilters} from './data.js';

const btnCharacters = document.getElementById('btn-characters');

btnCharacters.addEventListener('click',
function displayCharsResult(){
    const characters = mainFilters.displayChars();
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('characters-list').style.display = 'block';
    const charactersResult = document.getElementById('characters-list');
    return charactersResult.innerHTML = characters;
})

const btnBooks = document.getElementById('btn-books');

btnBooks.addEventListener('click',
function displayBooksResult(){
    const books = mainFilters.displayBooks();
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('books-list').style.display = 'block';
    const booksResult = document.getElementById('books-list');
    return booksResult.innerHTML = books;

})

const btnSpells = document.getElementById('btn-spells');

btnSpells.addEventListener('click', 
function displaySpellsResult(){
    const spells = mainFilters.displaySpells();
    document.getElementById('welcome-section').style.display = 'none';
    document.getElementById('spells-list').style.display = 'block';
    const spellsResult = document.getElementById('spells-list');
    return spellsResult.innerHTML = spells;
})