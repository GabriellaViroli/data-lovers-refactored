export const mainFilters = {
  getCharactersNames, getBooksTitles, getSpellsNames,
  filterCharactersByHouses, sortBy, calcPercentage
};

function getCharactersNames(names) {
  let characters = names.map((characters) => characters.name);
  return characters;
}

function filterCharactersByHouses(characters, houseToFilterBy) {
  const filteredCharacters = characters.filter((character) => {
    if (character.house === houseToFilterBy ) {
      return true;
    }
    return false
  })
  return filteredCharacters.map((character) => character.name)
}

function getBooksTitles(books) {
  return books.map((book) => book.title);
}

function getSpellsNames(spells) {
  return spells.map((spell) => spell.name);
}

function charactersFromAtoZ(charactersNames) {
  return charactersNames.sort();
}

function charactersFromZtoA(charactersNames) {
  return charactersNames.sort().reverse();
}

function sortBy(arrObjects, sortByParam) {
  if (sortByParam == 'asc') {
    arrObjects = charactersFromAtoZ(arrObjects);
  }
  else if (sortByParam == 'desc') {
    arrObjects = charactersFromZtoA(arrObjects);
  }
  return arrObjects
}

function calcPercentage(lengthFilteredCharacters, lengthAllCharacters) {
  if (lengthFilteredCharacters < 0) {
    throw TypeError("Can't receive a negative number");
  }
  
  return Math.round((lengthFilteredCharacters * 100) / lengthAllCharacters);
}