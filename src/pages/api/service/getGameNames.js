import CallIGDB from "./callIGDB.js";
import GetAgeRating from "./getAgeRatings.js";
import GetGenres from "./getGenres.js";
import GetMultiPlayerMode from "./getMultiPlayerMode.js";
import GetPlatforms from "./getPlatforms.js";
import GetReleaseDate from "./getReleaseDate.js";

const GetGameName = async () => {

    // build up the query string based on these fields
    // extracting ids into easily searchable format for the query string
    // format: (1, 2, 3, 4, ...)
    const genres = await GetGenres();
    const platforms = await GetPlatforms();
    const multiPlayers = await GetMultiPlayerMode();
    const releaseDate = await GetReleaseDate();
    const ageRating = await GetAgeRating();

    let genreIds = "(";
    let platformIds = "(";
    let multiPlayerIds = "(";
    let releaseDateIds = "(";

    console.log(ageRating);
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

    multiPlayers.map((mp) => {
        multiPlayerIds += `${mp.id}, `;
    })
    multiPlayerIds = multiPlayerIds.slice(0, -2) + ")";
    //console.log("multiplayer: " + multiPlayerIds);

    // this probbly needs to be reworked; release date should be array of 2 years, min and max
    releaseDate.map((date) => {
        releaseDateIds += `${date}, `;
    })
    releaseDateIds = releaseDateIds.slice(0, -2) + ")";
    //console.log("release date: " + releaseDateIds);

    const url = "https://api.igdb.com/v4/games/"
    const query = `fields name; where genres.id = ${genreIds} & platforms.id = ${platformIds} & game_modes = 1 & release_dates.y > 1993 & release_dates.y < 1995; sort release_dates.y asc; limit 10;`;

    const response = await CallIGDB(url, query);

    const res = [...response];
    //console.log("response: " + JSON.stringify(response));
    //console.log(res);


}

export default GetGameName;