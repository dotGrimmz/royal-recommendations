export const CardContainer = ({ options, question, cb, imgSrc }) => {
  console.log({ imgSrc });
  return (
    <div className="card min-w-[40vw] min-h-[400px] bg-base-100 shadow-xl image-full">
      <figure>
        <img alt="Shoes" src={imgSrc} />
      </figure>
      <div className="card-body gap-16">
        <h2 className="card-title text-white">{question}</h2>
        <div className="grid grid-cols-2 gap-16">
          {options?.map((data) => {
            const { name, id, imgSrc: img } = data;
            return (
              <button
                key={name}
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => cb(id)}
                className="btn btn-primary min-h-[60px] bg-opacity-[.20] text-blue-500 text-2xl "
              ></button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
