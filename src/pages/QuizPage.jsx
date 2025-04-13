import React, { useState, useEffect } from "react";
import Timer from "../components/Timer";
import { useNavigate } from "react-router-dom";
import nxtArrow from "../assets/nxtArrow.png";
import Loader from "../components/Loader";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [availableOptions, setAvailableOptions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // For development  http://localhost:8000/data
        const response = await fetch(api || "http://localhost:8000/data");

        const data = await response.json();
        // console.log(api);
        // console.log(data);

        setQuestions(data?.questions);
        setAvailableOptions(data?.questions[0]?.options);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionClick = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
      setAvailableOptions((prevOptions) => [...prevOptions, option]); // Add back to available options when unselected
    } else {
      const emptyIndex = selectedOptions.findIndex(
        (item) => item === null || item === undefined
      );
      if (emptyIndex !== -1) {
        const newOptions = [...selectedOptions];
        newOptions[emptyIndex] = option;
        setSelectedOptions(newOptions);
        setAvailableOptions((prevOptions) =>
          prevOptions.filter((item) => item !== option)
        ); // Remove from available options when selected
      } else {
        setSelectedOptions([...selectedOptions, option]);
        setAvailableOptions((prevOptions) =>
          prevOptions.filter((item) => item !== option)
        ); // Remove from available options when selected
      }
    }
  };

  const handleUnselect = (index) => {
    const newOptions = [...selectedOptions];
    const removedOption = newOptions[index];
    newOptions[index] = null;
    setSelectedOptions(newOptions);
    setAvailableOptions((prevOptions) => [...prevOptions, removedOption]); // Add back to available options when unselected
  };

  const goToNextQuestion = () => {
    
    if (selectedOptions.length > 0 && !selectedOptions.includes(null)) {
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestion.questionId]: [...selectedOptions],
      }));
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptions([]);
      setAvailableOptions(questions[currentQuestionIndex + 1]?.options);
    } else {
     
      const score = calculateScore();
      navigate("/result", {
        state: {
          score,
          questions,
          userAnswers: {
            ...userAnswers,
            [currentQuestion.questionId]: [...selectedOptions],
          },
        },
      });
    }
  };

 

  const calculateScore = () => {
    let correctCount = 0;


    const allAnswers = {
      ...userAnswers,
      [currentQuestion.questionId]: [...selectedOptions],
    };

    questions.forEach((q) => {
      const userAnswer = allAnswers[q.questionId] || [];
      if (JSON.stringify(userAnswer) === JSON.stringify(q.correctAnswer)) {
        correctCount++;
      }
    });

    return correctCount;
  };

  const handleTimeEnd = () => {
    goToNextQuestion();
  };

  const handleQuit = () => {
    navigate("/");
  };

  if (loading) return <Loader />;

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No questions available
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const questionParts = currentQuestion?.question.split("_____________");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F9FA] px-4 py-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-4xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-[24px] font-semibold text=[#616464] ">
            <Timer
              key={currentQuestionIndex}
              initialTime={30}
              onTimeEnd={handleTimeEnd}
            />
          </div>
          <button
            onClick={handleQuit}
            className="px-4 py-1 border border-[#DFE3E3] text-[#414343] rounded-md"
          >
            Quit
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex justify-between items-center mb-10">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`h-[3px] flex-1 mx-1 rounded-full transition-all duration-300 ${
                index <= currentQuestionIndex ? "bg-[#F2A531]" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Instruction */}
        <h2 className="text-center text-[20px] font-semibold mb-10 text-[#616464]">
          Select the missing words in the correct order
        </h2>

        {/* Sentence Area */}
        <div className="text-center text-[24px] font- leading-10 text-[#2A2D2D] mb-8">
          {questionParts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index < questionParts.length - 1 && (
                <span
                  onClick={() => handleUnselect(index)}
                  className="inline-block min-w-[100px] mx-1 border-b-2 border-gray-300 cursor-pointer"
                >
                  {selectedOptions[index] && (
                    <span className="inline-block px-[12px] py-[8px] border border-[#BFC6C6] rounded-[8px] text-[#414343] font-medium text-sm">
                      {selectedOptions[index]}
                    </span>
                  )}
                </span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Option Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {availableOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              disabled={selectedOptions.includes(option)}
              className={`px-5 py-2 border font-medium rounded-md text-[16px] ${
                selectedOptions.includes(option)
                  ? "bg-gray-200 text-[#414343]"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={goToNextQuestion}
            disabled={
              selectedOptions.length !== questionParts.length - 1 ||
              selectedOptions.includes(null) ||
              selectedOptions.length === 0
            }
            className={`w-[64px] h-[64px] px-[2px] py-[5px] flex items-center justify-center border border-[#DFE3E3] rounded-lg ${
              selectedOptions.length === questionParts.length - 1 &&
              !selectedOptions.includes(null) &&
              selectedOptions.length !== 0
                ? "bg-[#453FE1]"
                : ""
            }`}
          >
            <img src={nxtArrow} alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
