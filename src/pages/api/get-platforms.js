import axios from "axios";
import getAccessToken from "./get-access-token";

const clientID = "h1xgwhjvma1rvd46q2qwphbozrm58u"; 

const GetPlatforms = async() => {

    // need access token to make requests
    const token = await getAccessToken();
    const tokenType = `Bearer ${token}`;

    console.log(token);


    const headers = {
            "Accept": "application/json",
            "Client-ID": clientID, 
            "Authorization": tokenType
        };

    // make request for 10 games based on params 

    const response = await axios.post(
        "https://api.igdb.com/v4/platforms/",
        "fields name; where name ~ *\"microsoft\"* | name ~ *\"nintendo\"* | name ~ *\"playstation\"*; limit 10;",
        {headers: headers}); 

    let games = [...response.data];

    console.log(response.data);

}

export default GetPlatforms;