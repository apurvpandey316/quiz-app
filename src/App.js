import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import FrontPage from "./components/FrontPage";
import Question from "./components/Question";
function App() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionNumber, setquestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const numberOfQuestions = 10;
  const commanstyles = "text-2xl bg-slate-400 px-4 py-2 rounded-full";
  //getting data from the api
  const getdata = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get("https://opentdb.com/api.php?amount=10");
      if (!data.data.results) alert("Api is not working");
      console.log(data.data.results);

      const questions = data.data.results.map((item) => ({
        question: item.question,
        ...makeOptions(item.correct_answer, item.incorrect_answers),
        answered: false,
      }));
      setQuestions(questions);
    } catch (error) {
      alert(error);
      window.location.reload();
    } finally {
      setIsLoading(false);
    }
  };
  const makeOptions = (correct_answer, incorrect_answers) => {
    //if question is of type true/false
    if (incorrect_answers.length === 1) {
      const correct = Math.floor(Math.random() * 2);
      console.log(correct);
      let options = ["", ""];
      options[correct] = correct_answer;
      console.log(options);
      let j = 0;
      for (let i = 0; i < 2; i++) {
        if (options[i] == correct_answer) continue;
        options[i] = incorrect_answers[j];
        j++;
      }
      return { options, correct };
    }
    // if the questions has 4 options
    const correct = Math.floor(Math.random() * 4);
    console.log(correct);
    let options = ["", "", "", ""];
    options[correct] = correct_answer;
    console.log(options);
    let j = 0;
    for (let i = 0; i < 4; i++) {
      if (options[i] == correct_answer) continue;
      options[i] = incorrect_answers[j];
      j++;
    }
    return { options, correct };
  };
  const handleScore = (gained) => {
    setScore((prev) => prev + gained);
  };
  const startquiz = () => {
    setQuizStarted(true);
  };
  useEffect(() => {
    getdata();
  }, []);
  return (
    <div className="flex flex-col bg-slate-300 h-[100vh] w-[100vw]">
      {!quizStarted ? (
        <FrontPage startquiz={startquiz} isLoading={isLoading} />
      ) : (
        <>
          <Question
            question={questions[questionNumber]}
            handleScore={handleScore}
          />
          <div className="flex flex-row justify-around items-center">
            <button
              className={commanstyles}
              onClick={() => setquestionNumber((prev) => prev - 1)}
              disabled={questionNumber == 0}
            >
              Prev
            </button>
            <p className="text-2xl">Score: {score}</p>
            {/* if the question is not the last next button is enabled otherwise reset button is used */}
            {questionNumber < numberOfQuestions - 1 ? (
              <button
                className={commanstyles}
                onClick={() => setquestionNumber((prev) => prev + 1)}
                disabled={!questions[questionNumber].answered}
              >
                Next
              </button>
            ) : (
              <button
                className={commanstyles}
                onClick={() => window.location.reload()}
                disabled={!questions[questionNumber].answered}
              >
                Reset
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
