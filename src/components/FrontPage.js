import React from "react";

const FrontPage = ({ startquiz, isLoading }) => {
  return (
    <div className="p-10 flex flex-col justify-around items-center h-full w-full ">
      <h1 className="text-5xl font-semibold">
        Click the start button to start the quiz
      </h1>
      {/* start button is disabled to during loading */}
      <button
        className="px-10 py-3 rounded-full bg-slate-400 text-2xl font-semibold"
        onClick={startquiz}
        disabled={isLoading}
      >
        Start
      </button>
    </div>
  );
};

export default FrontPage;
