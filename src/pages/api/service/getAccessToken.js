import axios from 'axios';

const GetAccessToken = async () => {

 
    //const clientID = process.env.CLIENT_ID; 
    //const clientSecret = process.env.CLIENT_SECRET;

    // temp; env variables not working for some reason
    const CLIENT_ID = "h1xgwhjvma1rvd46q2qwphbozrm58u";
    const CLIENT_SECRET="eorcmduiaee82df9u8uhzfyuobczzb"

    let accessToken = null;
    let tokenExpiryTime = 0;

    try{

        if (!accessToken || Date.now() >= tokenExpiryTime) {
            const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&grant_type=client_credentials`);
         
            accessToken = response.data.access_token;
            tokenExpiryTime = response.data.expires_in * 1000;
        }

        return accessToken; // valid for 60 days

    } catch (err) {
        throw err;
    }
}

export default GetAccessToken;