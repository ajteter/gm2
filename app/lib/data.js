import gmbestvertical from './gmbestvertical.json';

// In the future, you can add more data sources here
// import anotherSource from './anotherSource.json';

const sources = {
    gmbestvertical,
    // anotherSource,
};

/**
 * Loads game data from a specified source.
 * @param {string} sourceName - The name of the data source.
 * @returns {Array} An array of game items.
 */
export function loadGames(sourceName) {
    return sources[sourceName] || [];
}
