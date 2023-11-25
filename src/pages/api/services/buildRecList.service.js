import { callIGDB } from "./fetchData.service";

export const useBuildRecListService = ({selectedResponseId}) => {

    // we don't need game names here

    /*
        For now selected response id is undefined for some reason.

        Will probably have to modify this implementation a bit given that the selected response id is formed as:
        {name: 'question param name', id: 'id of value chosen'}
    */

const buildGameRecList = async () => {

    //console.log(selectedResponseId);

    const [platforms, genres, multiPlayers, retroGames] = selectedResponseId;

    // build up the query string based on these fields
    // extracting ids into easily searchable format for the query string
    // format: (1, 2, 3, 4, ...)
    let genreIds = "(";
    let platformIds = "(";
    // multiPlayers will hold a single obj; just need to pull the id to determine MP status
    
    platforms.map((platform) => {
        platformIds += `${platform.id}, `;
    })
    platformIds = platformIds.slice(0, -2) + ")";

    genres.map((genre) => {
        genreIds += `${genre.id}, `;
    })
    genreIds = genreIds.slice(0, -2) + ")";

    let releaseDate = [];
    // user wants retro games
    if (retroGames.id !== 0) {
        releaseDate.push("1980");
        releaseDate.push("1990");
    }
    else {
        // no retro games; any games released after 1991
        releaseDate.push("1991", "2023");
    }

    const url = "https://api.igdb.com/v4/games/"
    const query = `fields name; where genres.id = ${genreIds} & platforms.id = ${platformIds} & game_modes = ${multiPlayers.id} & release_dates.y >= ${releaseDate[0]} & release_dates.y <= ${releaseDate[1]}; sort release_dates.y asc; limit 10;`;

    const response = await callIGDB(url, query);
    // response holds returned games as {id, name} objs
    // list should have 10 games

    return response;
}

return { buildGameRecList };

};