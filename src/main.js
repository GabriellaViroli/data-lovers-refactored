import { mainFilters } from './data.js';
import data from './data/harrypotter/data.js';

const dataBaseCharacters = data.characters;
const dataBaseBooks = data.books;
const dataBaseSpells = data.spells;
let charactersNames;
const returnToList = document.getElementById('return-btn');
const modalContent = document.getElementById('modal-content');
const charactersPercentage = document.getElementById('characters-percentage');
const cardInfo = document.getElementById('card-info'); 
const charactersList = document.getElementById('characters-list');
const modalList = document.getElementById('modal-list'); 
const welcomeSection = document.getElementById('welcome-section'); 
const sortElement = document.getElementById('sort');



function hideModals() {
    welcomeSection.style.display = 'none';
    modalList.style.display = 'none';
    charactersList.style.display = 'none';
    cardInfo.style.display = 'none';
    charactersPercentage.style.display = 'none';
}

function formatList(arrayObjects) {
    let list = arrayObjects.map(names => `<li class="list-elements">${names}</li>`).join('');
    list = "<ul>" + list + "</ul>"
    return list
}


function makeCardInfo(filterData, cardContent, cardTitle) {
    filterData.map((data) => {
        let dataInfos = '';
        Object.keys(data).forEach(key => {
            data[key] = (data[key] ? data[key] : 'Unknown')
            if (key != 'id') {
                dataInfos += `<li class="card-line"><em class="card-content-heading">${key}:</em> ${data[key]}</li>`;
            }

        })
        cardContent.innerHTML = dataInfos;
        cardTitle.innerHTML = `${data.name}`

    })
}

function displayCharacters() {
    const sortBy = sortElement.value;
    charactersNames = mainFilters.getCharactersNames(dataBaseCharacters);
    charactersNames = mainFilters.sortBy(charactersNames, sortBy);
    hideModals();
    charactersList.style.display = 'block';
    document.getElementById('header-modal-characters').innerText = 'Characters list';
    const charactersResult = document.getElementById('characters-content');
    return charactersResult.innerHTML = formatList(charactersNames);
}

const btnCharacters = document.getElementById('btn-characters');
btnCharacters.addEventListener('click', displayCharacters);

sortElement.addEventListener('change', () => {
    const sortBy = sortElement.value;
    charactersNames = mainFilters.sortBy(charactersNames, sortBy)
    const charactersResult = document.getElementById('characters-content');
    return charactersResult.innerHTML = formatList(charactersNames);
});

const housesGroupBtn = document.getElementById('houses-group-btn');
housesGroupBtn.addEventListener('click', listenedElement => {
    if (listenedElement.target.tagName == 'BUTTON') {
        const house = listenedElement.target.innerText;
        charactersNames = mainFilters.filterCharactersByHouses(dataBaseCharacters, house);
        const sortBy = sortElement.value;
        charactersNames = mainFilters.sortBy(charactersNames, sortBy);
        let percentageOfCharsByHouse = mainFilters.calcPercentage(charactersNames.length, dataBaseCharacters.length);

        hideModals();
        charactersList.style.display = 'block';
        charactersPercentage.style.display = 'block';
        document.getElementById('header-modal-characters').innerText = `Characters from house ${house}`;
        charactersPercentage.innerHTML = `The characters in <em class="house-name">${house}</em> represent ${percentageOfCharsByHouse}% of all characters in the Harry Potter Books`
        const charactersByHouseResult = document.getElementById('characters-content');
        return charactersByHouseResult.innerHTML = formatList(charactersNames);
    }
})

const charactersContent = document.getElementById('characters-content');
charactersContent.addEventListener('click', (listedCharacter) => {
    if (listedCharacter.target.tagName == 'LI') {
        returnToList.removeEventListener('click', displayCharacters);
        returnToList.addEventListener('click', displayCharacters);
        charactersList.style.display = 'none';
        cardInfo.style.display = 'block';
        const cardContent = document.getElementById('card-content-info');
        const cardTitle = document.getElementById('card-info-title');
        const clickedName = listedCharacter.target.innerText;
        const filterCharacters = dataBaseCharacters.filter((character) => character.name === clickedName);

        makeCardInfo(filterCharacters, cardContent, cardTitle)
    }

});

function displayBooksList() {
    const bookTitles = mainFilters.getBooksTitles(dataBaseBooks);
    hideModals();
    modalList.style.display = 'block';
    document.getElementById('modal-header-title').innerText = 'Books list';

    modalContent.innerHTML = formatList(bookTitles);

    modalContent.addEventListener('click', listenedElement => {
        if (listenedElement.target.tagName == 'LI') {
            let bookTitle = listenedElement.target.innerText;
            displayBookCard(bookTitle)
        }
    });
}

const btnBooks = document.getElementById('btn-books');
btnBooks.addEventListener('click', displayBooksList);

function displayBookCard(bookTitle) {
    returnToList.removeEventListener('click', displayBooksList);
    returnToList.addEventListener('click', displayBooksList);
    modalList.style.display = 'none';
    cardInfo.style.display = 'block';
    const cardContent = document.getElementById('card-content-info');
    const cardTitle = document.getElementById('card-info-title');
    const filterBooks = dataBaseBooks.filter((book) => book.title === bookTitle);

    return filterBooks.map((book) => {
        if (book.releaseDay == null) book.releaseDay = 'Unknown'
        if (book.author == null) book.author = 'Unknown'
        if (book.description == null) book.description = 'Unknown'
        cardTitle.innerHTML = `${book.title}`
        cardContent.innerHTML =
            `
            <li class="card-line"><em class="card-content-heading">Release Date:</em> ${book.releaseDay}</li>
            <li class="card-line"><em class="card-content-heading">Author:</em> ${book.author}</li>
            <li class="card-line"><em class="card-content-heading">Description:</em> ${book.description}</li>
            `
    });
}

function displaySpellsList() {
    const spellsNames = mainFilters.getSpellsNames(dataBaseSpells);
    hideModals()
    modalList.style.display = 'block';
    document.getElementById('modal-header-title').innerText = 'Spells list';

    modalContent.innerHTML = formatList(spellsNames);

    modalContent.addEventListener('click', listenedElement => {
        if (listenedElement.target.tagName == 'LI') {
            let spellName = listenedElement.target.innerText;
            returnToList.removeEventListener('click', displaySpellsList);
            returnToList.addEventListener('click', displaySpellsList);
            modalList.style.display = 'none';
            cardInfo.style.display = 'block';
            const cardContent = document.getElementById('card-content-info')
            const cardTitle = document.getElementById('card-info-title')
            const filterSpells = dataBaseSpells.filter((spell) => spell.name === spellName);

            return filterSpells.map((spell) => {
                if (spell.pronunciation == null) spell.pronunciation = 'Unknown'
                if (spell.spell_type == null) spell.spell_type = 'Unknown'
                if (spell.description == null) spell.description = 'Unknown'
                if (spell.mention == null) spell.mention = 'Unknown'
                cardTitle.innerHTML = `${spell.name}`
                cardContent.innerHTML =
                    `
            <li class="card-line"><em class="card-content-heading">Pronunciation:</em> ${spell.pronunciation}</li>
            <li class="card-line"><em class="card-content-heading">Type:</em> ${spell.spell_type}</li>
            <li class="card-line"><em class="card-content-heading">Description:</em> ${spell.description}</li>
            <li class="card-line"><em class="card-content-heading">Mention:</em> ${spell.mention}</li>
            `
            });
        }
    });
}

const btnSpells = document.getElementById('btn-spells');
btnSpells.addEventListener('click', displaySpellsList);

const pageLogo = document.getElementById('page-logo');
pageLogo.addEventListener('click', () => {
    hideModals()
    welcomeSection.style.display = 'block';
});