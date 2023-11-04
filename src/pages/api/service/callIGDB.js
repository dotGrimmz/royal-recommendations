import axios from "axios";
import GetAccessToken from "./getAccessToken.js";

const CallIGDB = async (url, query) => {

    let responseDestructured;
    const clientID = "h1xgwhjvma1rvd46q2qwphbozrm58u"; 

    try {

        const token = await GetAccessToken();
        const tokenType = `Bearer ${token}`;
    
    
        const headers = {
                "Accept": "application/json",
                "Client-ID": clientID, 
                "Authorization": tokenType
            };

        const response = await axios.post(url, query, {headers: headers});

        responseDestructured = [...response.data]; 

    } catch (err) {
        throw err;
    }

    return responseDestructured;
}

export default CallIGDB;