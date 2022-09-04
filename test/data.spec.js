import { mainFilters } from '../src/data.js'
import { charactersData, booksData, spellsData, listToSort } from '../test/data.mock.js'

describe('mainFilters', () => {
  it('should be an object', () => {
    expect(typeof mainFilters).toBe('object');
  });

});

describe('mainFilters.getCharactersNames', () => {

  it('should be a function', () => {
    expect(typeof mainFilters.getCharactersNames).toBe('function');
  });

  it('should return 08 characters', () => {
    expect(mainFilters.getCharactersNames(charactersData).length).toBe(8)
  })

  it('should return Bellatrix Lestrange', () => {
    expect(mainFilters.getCharactersNames(charactersData).includes('Bellatrix Lestrange')).toBe(true)
  })

});

describe('mainFilters.getBooksTitles', () => {

  it('should be a function', () => {
    expect(typeof mainFilters.getBooksTitles).toBe('function');
  });

  it('should return 2 books', () => {
    expect(mainFilters.getBooksTitles(booksData).length).toBe(2)
  })

  it('should return Harry Potter and the Prisoner of Azkaban', () => {
    expect(mainFilters.getBooksTitles(booksData).includes('Harry Potter and the Prisoner of Azkaban')).toBe(true)
  })

});

describe('mainFilters.getSpellsNames', () => {

  it('should be a function', () => {
    expect(typeof mainFilters.getSpellsNames).toBe('function');
  });

  it('should return 2 spells', () => {
    expect(mainFilters.getSpellsNames(spellsData).length).toBe(2)
  })

  it('should return Wingardium Leviosa', () => {
    expect(mainFilters.getSpellsNames(spellsData).includes('Wingardium Leviosa')).toBe(true)
  })

});

describe('mainFilters.filterCharactersByHouses', () => {
  it('should be a function', () => {
    expect(typeof mainFilters.filterCharactersByHouses).toBe('function')
  });

  it('should return Albus Dumbledore, Sirius Black and Harry Potter from house Gryffindor', () => {
    const gryffindorCharacters = mainFilters.filterCharactersByHouses(charactersData, 'Gryffindor')
    expect(gryffindorCharacters[0]).toEqual('Albus Dumbledore')
    expect(gryffindorCharacters[1]).toEqual('Sirius Black')
    expect(gryffindorCharacters[2]).toEqual('Harry Potter')
  });

  it('should return Severus Snape and Albus Potter from house Slytherin', () => {
    const slytherinCharacters = mainFilters.filterCharactersByHouses(charactersData, 'Slytherin')
    expect(slytherinCharacters[0]).toEqual('Severus Snape')
    expect(slytherinCharacters[1]).toEqual('Albus Potter')
  });

  it('should return Luna Lovegood from house Ravenclaw', () => {
    const ravenclawCharacters = mainFilters.filterCharactersByHouses(charactersData, 'Ravenclaw')
    expect(ravenclawCharacters[0]).toEqual('Luna Lovegood')
  });

  it('should return Cedric Diggory from house Hufflepuff', () => {
    const hufflepuffCharacters = mainFilters.filterCharactersByHouses(charactersData, 'Hufflepuff')
    expect(hufflepuffCharacters[0]).toEqual('Cedric Diggory')
  });

  it('should return 03 characters from house Gryffindor', () => {
    const gryffindorCharacters = mainFilters.filterCharactersByHouses(charactersData, 'Gryffindor')
    expect(gryffindorCharacters.length).toBe(3)
  });

  it('should return 02 characters from house Slytherin', () => {
    const slytherinCharacters = mainFilters.filterCharactersByHouses(charactersData, 'Slytherin')
    expect(slytherinCharacters.length).toBe(2)
  });
});

describe('mainFilters.sortBy', () => {
  it('should be a function', () => {
    expect(typeof mainFilters.sortBy).toBe('function')
  });
  it('should return sorted from A to Z', () => {
    expect(mainFilters.sortBy(listToSort, 'asc')).toStrictEqual([1, 'A', 'B', 'C'])
  });
  it('should return sorted from Z to A', () => {
    expect(mainFilters.sortBy(listToSort, 'desc')).toStrictEqual(['C', 'B', 'A', 1])
  });
});

describe('mainFilters.calcPercentage', () => {
  it('should be a function', () => {
    expect(typeof mainFilters.calcPercentage).toBe('function')
  });

it ('should return 30%', () => {
  expect(mainFilters.calcPercentage(30, 100)).toBe(30)
});

it ('should throw Error when receive a negative number', () => {
  expect(() => mainFilters.calcPercentage(-30, 100)).toThrow(TypeError);
});

});