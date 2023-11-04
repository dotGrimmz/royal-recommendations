import CallIGDB from "./callIGDB.js";

const RatingsEnum = {
    8: "E",
    9: "E10",
    10: "T",
    11: "M"
};

const GetAgeRating = async () => {

    const url = "https://api.igdb.com/v4/age_ratings/";
    const query = "fields rating; where category = 1;"; // category 1 = ESRB
    // 8 9 10 11 E E10 T M respectively
    try {
        const ratings = await CallIGDB(url, query);

        // need to close eyes
        // will do when alive again:
        // make age rating obj
        // it'll have the fields id + name
        // name will be pulld from the ENUm above
        // keys correspond with igdb enum values

        return ratings;
    }
    catch (err) {
        throw err;
    }
}

export default GetAgeRating;