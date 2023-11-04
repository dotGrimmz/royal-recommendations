import CallIGDB from "./callIGDB.js";

const GetReleaseDate = async() => {
    
    const url = "https://api.igdb.com/v4/release_dates/";
    const query = "fields y; where y >= 1990 & y < 1999; limit 10;";

    try {
        const response = await CallIGDB(url, query);

        let releaseDates = [];
        response.map((date) => {
            releaseDates.push(date.y);
        });

        console.log(releaseDates);

        return releaseDates;
        
    } catch (err) {
        throw err;
    }
}

export default GetReleaseDate;