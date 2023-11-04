import axios from "axios";

const GetAccessToken = async () => {

    const clientID = "h1xgwhjvma1rvd46q2qwphbozrm58u"; 
    const clientSecret = "eorcmduiaee82df9u8uhzfyuobczzb";

    let accessToken = null;
    let tokenExpiryTime = 0;

    if (!accessToken || Date.now() >= tokenExpiryTime) {
    const res = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${clientID}&client_secret=${clientSecret}&grant_type=client_credentials`);
     

        accessToken = res.data.access_token;

        tokenExpiryTime = res.data.expires_in * 1000;
    }
    
    return accessToken; // valid for 60 days
}

export default GetAccessToken;