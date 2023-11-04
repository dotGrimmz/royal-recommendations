import GetGenres from "./getGenres";
import GetMultiPlayerMode from "./getMultiPlayerMode";
import GetPlatforms from "./getPlatforms";
import GetReleaseDate from "./getReleaseDate";
//import CallIGDB from "./callIGDB";


const BuildGame = async () => {
    const genres = await GetGenres();
    const platforms = await GetPlatforms();
    const multiPlayerMode = await GetMultiPlayerMode();
    const releaseDate = await GetReleaseDate();


    // as I'm working on this, realizing it isn't complete
    // need to make a call to api with the fields from form
    // grab a name
    // maybe grab keywords
    // then structure teh object n return
    
    const game = {
        genres: genres,
        platforms: platforms,
        multiPlayerMode: multiPlayerMode,
        releaseDate: releaseDate
    };



    return game;
}

export default BuildGame;