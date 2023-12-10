import { useState } from "react";
import { axios } from "axios";
export const Recommendations = ({ recommendations }) => {
  console.log({ recommendations });

  const [selected, setSelected] = useState(0);

  const testGameSite = async () => {
    const res = await fetch(
      "https://html5.gamedistribution.com/?search=fantasy"
    );
    if (res.ok) console.log({ res });
  };
  return (
    <div className="grid pr-20 pl-20">
      {[...recommendations, ...recommendations, ...recommendations].map(
        (recommendation, index) => {
          return (
            <div key={index} className="collapse bg-base-200 mb-8">
              <input
                type="radio"
                name="my-accordion-1"
                checked={selected === index}
                onChange={() => setSelected(index)}
              />
              <div className="collapse-title text-2xl font-medium">
                {recommendation.name}
              </div>
              <div className="collapse-content">
                <div className="mockup-window border border-base-300">
                  {/* I WILL BUILD A WEB SCRAPER FOR THIS TO WORK AS EXPECTED =]  */}
                  <iframe
                    height={500}
                    width={"100%"}
                    src="https://html5.gamedistribution.com/3b897ce6c7d94c65a23f05cc9319b536/"
                  ></iframe>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};
