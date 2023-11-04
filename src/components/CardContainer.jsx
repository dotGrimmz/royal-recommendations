import Image from "next/image";
import { useState, useEffect } from "react";
export const CardContainer = ({
  options,
  question,
  handleClick,
  imgSrc,
  selectLimit,
  selectedResponseId,
}) => {
  console.log({ imgSrc });

  const calculateGridCols = () => {
    const itemCount = options?.length;

    if (itemCount === 3) {
      return "grid-cols-3";
    }
    if (itemCount > 4) {
      return "grid-cols-4";
    }

    return "grid-cols-2";
  };

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
        <div className={`grid  ${calculateGridCols()}  gap-16`}>
          {options?.map((data) => {
            return (
              <ItemBtnWrapper
                data={data}
                handleClick={handleClick}
                selectedResponseId={selectedResponseId}
              />
            );
            // const { name, id, imgSrc: img } = data;
            // const imgStyles = img
            //   ? {
            //       backgroundImage: `url(${img})`,
            //       backgroundSize: "cover",
            //       backgroundPosition: "center",
            //     }
            //   : null;
            // return (
            //   <ItemBtn
            //     key={name}
            //     imgStyles={imgStyles}
            //     handleClick={handleClick}
            //     id={id}
            //     limitReached={limitReached}
            //     className="btn btn-primary min-h-[60px]  text-white-500 text-2xl "
            //   >
            //     {!imgStyles && name}
            //   </ItemBtn>
            // );
          })}
        </div>
      </div>
    </div>
  );
};

const ItemBtn = ({
  name,
  id,
  imgStyles,
  handleClick,
  limitReached,
  selectedResponseId,
}) => {
  //reset state incase user goes back - could be handy

  const toggleAnimate = () => {
    /* needs a call back to check the selected limit for the question
    I only want to animate the button with id that is selected
    */

    console.log({ limitReached });
    // if (limitReached) return;

    //    setIsSelected(!isSelected);
    handleClick(id);
  };

  const isSelected = selectedResponseId?.includes(id);
  return (
    <button
      key={name}
      style={imgStyles}
      onClick={toggleAnimate}
      className={`btn btn-primary min-h-[60px]  text-white-500 text-2xl ${
        isSelected && "animate-bounce"
      } `}
    >
      {!imgStyles && name}
    </button>
  );
};

// i hate this paradigm so much for jsx but
// it'll work for now
const ItemBtnWrapper = ({ data, handleClick }) => {
  const { name, id, imgSrc: img, selectedLimit } = data;

  const imgStyles = img
    ? {
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : null;

  const limitReached = () => selectedResponseId.length === selectedLimit;

  return (
    <div>
      <ItemBtn
        limitReached={limitReached}
        imgStyles={imgStyles}
        id={id}
        name={name}
        handleClick={handleClick}
      />
    </div>
  );
};
