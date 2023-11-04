import CallIGDB from "./callIGDB.js";

const GetPlatforms = async() => {

    const url = "https://api.igdb.com/v4/platforms/";
    const query = "fields name; where name ~ *\"microsoft\"* | name ~ *\"nintendo\"* | name ~ *\"playstation\"* | name ~ *\"xbox\"*; sort id asc; limit 100;";

    try {
        const platforms = await CallIGDB(url, query);

        // to hold each platform type
        let nintendo = [];
        let sony = [];
        let pc = [];
        let microsoft = [];

        // map the platforms to their respective arrays
        platforms.map((obj) => {
            if (obj.name.includes('Nintendo')) {
                nintendo.push(obj.id);
            }
            else if (obj.name.includes('PlayStation')) {
                sony.push(obj.id);
            }
            else if (obj.name.includes('PC')) {
                pc.push(obj.id);
            }
            else if (obj.name.includes('Xbox')) {
                microsoft.push(obj.id);
            }
        })

        let platformObjs = [ {name: "PC", id: pc}, 
                            {name: "Sony Consoles", id: sony }, 
                            {name: "Microsoft Consoles", id: microsoft}, 
                            {name: "Nintendo Consoles", id: nintendo}
        ];

        return platformObjs;

    } catch(err) {
        throw err;
    }
}

export default GetPlatforms;