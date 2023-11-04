import CallIGDB from "./callIGDB.js";

const GetGenres = async () => {

    const url = "https://api.igdb.com/v4/genres/";
    const query = "fields name; where id = (4, 5, 7, 8, 9, 12, 13, 14, 15, 24, 31, 33, 36); limit 13;";
    
    try {
        const genres = await CallIGDB(url, query);

        return genres;
    }
    catch (err) {
        throw err;
    }
}

export default GetGenres;