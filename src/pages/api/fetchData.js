import { useFetchDataService } from "./services/fetchData.service";

export default async function fetchData(req, res) {
  const { buildGameObj } = useFetchDataService();

  const results = await buildGameObj();  
  console.log(results);
  // let question = {
  //   name: "param type (platform, etc)",
  //   responseId: "",
  //   question: "corresponding to name",
  //   imgSrc: "img path for question bg",
  //   options: [
  //     {
  //       // img: "img path for option",
  //       // id: "",
  //       // name: "value for option button"
  //     }
  //   ]
  // };

  let questions = [];

  // first populating array with all question objects; filling in the question field
  questions.push(
    {
      name: "genres",
      responseId: "1",
      question: "Which of these genres do you like best?",
      imgSrc: "",
      options: [{
        img: "img path for option",
        id: "",
        name: "value for option button"
      }]
    }
  );

  questions.push(
    {
      name: "platforms",
      responseId: "2",
      question: "Which platform do you enjoy playing on the most?",
      imgSrc: "",
      options: [{
        img: "img path for option",
        id: "",
        name: "value for option button"
      }]
    }
  );

  questions.push(
    {
      name: "retro",
      responseId: "3",
      question: "How do you feel about retro games?",
      imgSrc: "",
      options: [{
        img: "img path for option",
        id: "",
        name: "value for option button"
      }]
    }
  );

  questions.push(
    {
      name: "play style",
      responseId: "4",
      question: "Which play style do you prefer?",
      imgSrc: "",
      options: [{
        img: "img path for option",
        id: "",
        name: "value for option button"
      }]
    }
  );
    /*
    {
      name: "question name, determined by param (platform, etc)",
      responseId: "",
      question: "question for corresponding name",
      imgSrc: "img path for question",
      options: [
        {
          img: "img path", we can get this from IGDB
          id: "someId",
          name: "platform name 1"
        },
                {
          img: "img path", we can get this from IGDB
          id: "someId",
          name: "platform name 2"
        },
                {
          img: "img path", we can get this from IGDB
          id: "someId",
          name: "platform name 3"
        },
                {
          img: "img path", we can get this from IGDB
          id: "someId",
          name: "platform name 4"
        }
      ]
    }    
    */

  // let questions = [];

  // results.platforms.forEach( p => {
  //   let platform = {
  //     "img" : '',
  //     "id" : toString(p.id),
  //     "name" : p.name
  //   };
  //   questions.push(platform);
  // });

    // structure each promise as an object
    // ex. genres in a genre obj

    console.log(questions);
    return res.status(200).json(questions);
}



/*
    handler = api endpoint
    create new handler/service file

    retro games- yes = 1 (1980s to 1990)
                no = 0 (1990s onwards) for release date

    body: selectedResponseId: [{id: 02, param: platform},  {id: 453556, param: genre}, {id: 32, param:multiplayerStatus }, { id: 00 , param: retro} ]

    from handler pass to service, break down to query params, back to same handler

*/