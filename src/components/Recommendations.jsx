import { useState } from "react";
export const Recommendations = ({ recommendations }) => {
  const [selected, setSelected] = useState(0);

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
