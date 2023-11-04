export const getQuestions = {
  questionsArr: [
    {
      selectLimit: 1,
      question: "What platforms do you enjoy playing on the  most?",
      imgSrc: "/images/question_one/switches_image.jpg",
      options: [
        { name: "PC", id: 1, imgSrc: "/images/question_one/pc_image.png" },
        {
          name: "Sony Consoles",
          id: 2,
          imgSrc: "/images/question_one/sony_image.jpg",
        },
        {
          imgSrc: "/images/question_one/xbox_image_2.png",
          name: "Microsoft Consoles",
          id: 3,
        },
        {
          imgSrc: "/images/question_one/nintendo_image.jpg",
          name: "Nintendo Consoles",
          id: 4,
        },
      ],
      /*need an array of primary keys for each console to create object key
      val pairs of name and keys
      */
    },
    {
      selectLimit: 3,
      question: "Rank your top 3 genre of games",
      imgSrc: "/images/question_two/pichu.jpg",

      options: [
        { id: 4, name: "Fighting" },
        { id: 5, name: "Shooter" },
        { id: 8, name: "Platform" },
        { id: 9, name: "Puzzle" },
        { id: 12, name: "Role-playing (RPG)" },
        { id: 13, name: "Simulator" },
        { id: 14, name: "Sport" },
        { id: 15, name: "Strategy" },
        { id: 24, name: "Tactical" },
        { id: 31, name: "Adventure" },
        { id: 33, name: "Arcade" },
        { id: 36, name: "MOBA" },
      ],
    },
    {
      selectLimit: 1,
      question: "Which do you prefer?",
      imgSrc: "/images/question_three/bg_image.jpg",

      /* need primary keys for these*/
      options: [
        {
          name: "Single",
          id: 32,
          imgSrc: "/images/question_three/singleplayer_image.jpg",
        },
        {
          name: "Multi",
          id: 53,
          imgSrc: "/images/question_three/multiplayer_image.jpg",
        },
        { id: 55, name: "Meh, I dominate both" },
      ],
    },
    {
      selectLimit: 1,
      question: " How do you feel about retro games??",
      imgSrc: "/images/question_four/bg_image.jpg",

      options: [
        {
          name: "I like them",
          /* 
          this is the release date query, how can you
          what value do you need to query games with a release date before 
          or after 1990 ( our retro benchmark)
          */
          value: "",
        },
        {
          name: "Open to trying them out",
          value: "same as i like them",
        },
        { name: "Not a fan", value: "false" },
      ],
    },
    {
      question: "",
    },
  ],
};
