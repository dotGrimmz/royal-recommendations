import CallIGDB from "./callIGDB.js";
import GetGenres from "./getGenres.js";
import GetMultiPlayerMode from "./getMultiPlayerMode.js";
import GetPlatforms from "./getPlatforms.js";

const GetGameName = async () => {

    // build up the query string based on these fields
    // extracting ids into easily searchable format for the query string
    // format: (1, 2, 3, 4, ...)
    // const genres = await GetGenres();
    // const platforms = await GetPlatforms();
    // const multiPlayers = await GetMultiPlayerMode();
    // const releaseDate = await GetReleaseDate();
    // const ageRating = await GetAgeRating();

    const [platforms, genres, multiPlayers] = await Promise.all([GetPlatforms(), GetGenres(), GetMultiPlayerMode()]);


    let genreIds = "(";
    let platformIds = "(";
    //let multiPlayerIds = "(";
    //let releaseDateIds = "(";

    const [multi1, multi2] = multiPlayers;

    //console.log(ageRating);
    genres.map((genre) => {
        genreIds += `${genre.id}, `;
    })
    genreIds = genreIds.slice(0, -2) + ")";
    //console.log("genres: " + genreIds);


    platforms.map((platform) => {
        platformIds += `${platform.id}, `;
    })
    platformIds = platformIds.slice(0, -2) + ")";
    //console.log("platforms: " + platformIds);

    let releaseDate = ["1991", "2023"];
    // user wants retro games
    // if (retroGames.id == 0) {
    //     releaseDate.push("1980");
    //     releaseDate.push("1990");
    // }
    // else {
    //     // no retro games; any games released after 1991
    //     releaseDate.push("1991", "2023");
    // }

    const url = "https://api.igdb.com/v4/games/"
    const query = `fields name; where genres.id = ${genreIds} & platforms.id = ${platformIds} & game_modes = ${multi1.id} & release_dates.y >= ${releaseDate[0]} & release_dates.y <= ${releaseDate[1]}; sort release_dates.y asc; limit 10;`;

    //console.log(query);
    const response = await CallIGDB(url, query);

    const res = [...response];
    //console.log("response: " + JSON.stringify(response));
    console.log(res);

    


}

GetGameName();

export default GetGameName;