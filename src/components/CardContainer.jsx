import Image from "next/image";
import { useState, useEffect } from "react";
export const CardContainer = ({
  options,
  question,
  handleClick,
  imgSrc,
  responseId,
}) => {
  console.log({ responseId });

  /*
  So at first I just want to capture the response of the current question
  if its included set the animation  right? right. 
  
  */

  return (
    <div className="card min-w-[40vw] min-h-[300px]  bg-base-100 shadow-xl image-full overflow-hidden">
      {imgSrc && (
        <figure>
          <Image
            alt="bg-img"
            fill={true}
            className="object-cover overflow-hidden"
            src={imgSrc}
          />
        </figure>
      )}
      <div className="card-body gap-16">
        <h2 className="card-title mx-auto text-white text-3xl">{question}</h2>
        <div className={`grid grid-cols-2  gap-16`}>
          {options?.map((data) => {
            const { name, id, imgSrc: img } = data;
            console.log({ data });
            const isSelected = responseId === id;
            const imgStyles = img
              ? {
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : null;
            return (
              <ItemBtn
                key={name}
                imgStyles={imgStyles}
                handleClick={handleClick}
                isSelected={isSelected}
                id={id}
                className="btn btn-primary min-h-[60px]  text-white-500 text-2xl "
              >
                {!imgStyles && name}
              </ItemBtn>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const ItemBtn = ({ name, id, imgStyles, handleClick, isSelected }) => {
  //reset state incase user goes back - could be handy
  // isSelected && "animate-bounce";
  return (
    <button
      key={name}
      style={imgStyles}
      onClick={() => handleClick(id)}
      className={`btn btn-primary min-h-[60px]  text-white-500 text-2x ${
        isSelected && "animate-bounce"
      }`}
    >
      {!imgStyles && name}
    </button>
  );
};
