import CallIGDB from "./callIGDB.js";

const GetMultiPlayerMode = async() => {

    const url = "https://api.igdb.com/v4/game_modes/";
    const query = "fields name; where id = (1, 2);";

    try {
        const modes = await CallIGDB(url, query);

        return modes;

    } catch (err) {
        throw err;
    }
}

export default GetMultiPlayerMode;