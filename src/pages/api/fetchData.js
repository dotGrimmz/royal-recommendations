import { useFetchDataService } from "./services/fetchData.service";

export default async function fetchData(req, res) {

  const { buildGameObj } = useFetchDataService();
  const results = await buildGameObj();


  //const results = await buildGameObj();  
  //console.log(results);
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

  // do we include all the genres as choices or make groups?

  // populate question array with question objects (options are filled in the function call below)
  questions.push(formQuestionObj("platforms", "Which platform do you enjoy playing on the most?", "", results));
  questions.push(formQuestionObj("genres", "Which of these genres do you like best?", "", results));
  questions.push(formQuestionObj("multiPlayers", "Which play style do you prefer?", "", results));

  // only this one is formed locally bc the options don't rely on API response
  questions.push(
    {
      name: "retro",
      responseId: "",
      question: "How do you feel about retro games?",
      imgSrc: "",
      options: [
        {
          img: "img path for option",
          id: "1",
          name: "I like them"
        },
        {
          img: "img path for option",
          id: "2",
          name: "Open to trying them out"
        },
        {
          img: "img path for option",
          id: "0",
          name: "Not a fan"
        }
      ]
    }
  );


    console.log(questions);
    return res.status(200).json(questions);
}

const formQuestionObj = (name, question, imgPath, results) => {

  const optionsPopulated = populateQuestionOptions(name, results);

  return {
    name: name,
    responseId: "",
    question: question,
    imgSrc: imgPath,
    options: optionsPopulated
  };
}

const populateQuestionOptions = (name, results) => {

  let options = [];

  if (results.hasOwnProperty(name)) {
    const prop = results[name];
    
    prop.forEach((item) => {
      let option = {
        img: "",
        id: item.id,
        name: item.name
      }

      options.push(option);
    })
    return options;
  }

  return [];

};

/*
    handler = api endpoint
    create new handler/service file

    retro games- yes = 1 (1980s to 1990)
                no = 0 (1990s onwards) for release date

    body: selectedResponseId: [{id: 02, param: platform},  {id: 453556, param: genre}, {id: 32, param:multiplayerStatus }, { id: 00 , param: retro} ]

    from handler pass to service, break down to query params, back to same handler

*/