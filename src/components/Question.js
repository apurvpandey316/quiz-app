import React from "react";

const Question = ({ question, handleScore }) => {
  const pointsForCorrectAnswer = 5;
  const pointsForIncorrectAnswer = -1;
  const checkAnswer = (marked, question) => {
    if (question.answered) return;
    if (question.options[marked] == question.options[question.correct]) {
      handleScore(pointsForCorrectAnswer);
    } else {
      handleScore(pointsForIncorrectAnswer);
    }
    //marking the question as answered so the answer cant be changed later
    question.answered = true;
  };
  const commanstyles =
    "w-[70%] lg:w-[50%] flex flex-col justify-around items-start rounded-full cursor-pointer";
  const answerStatus = {
    notAttempted: `bg-slate-500/40 ${commanstyles}`,
    incorrect: `bg-red-500 ${commanstyles}`,
    correct: `bg-green-500 ${commanstyles}`,
  };
  console.log(question);
  return (
    <div className="p-10 flex flex-col justify-between  items-center w-full h-[80%]">
      <h1 className="text-3xl font-semibold">{question.question}</h1>
      {question.options.map((item, index) => (
        <div
          className={
            // checking if the question is unanswerd or answered incorrectly or answered correctly
            !question.answered
              ? answerStatus.notAttempted
              : question.correct == index
              ? answerStatus.correct
              : answerStatus.incorrect
          }
          id={index}
          onClick={() => checkAnswer(index, question)}
          key={index}
        >
          <p className="text-xl font-normal p-2">{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Question;
