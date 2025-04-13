import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";
import menu from "../assets/menu.png";
import ScoreLoader from "../components/ScoreLoader";

const fillSentence = (question, words, className = "") => {
  const parts = question.split("_____________");
  return parts.map((part, index) => (
    <React.Fragment key={index}>
      {part}
      {index < words.length && (
        <span className={`font-semibold ${className}`}>{words[index]}</span>
      )}
    </React.Fragment>
  ));
};

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, questions, userAnswers } = location.state || {};
  const [showDetails, setShowDetails] = useState(false);

  const handleDashboard = () => navigate("/");

  const percentageScore =
    questions && questions.length > 0
      ? Math.round((score / questions.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-white text-gray-800 relative">
      <header className="w-full text-center py-4 text-[18px] backdrop-blur-[50px] shadow-[0px_2px_36px_0px_#00000014] bg-[#F8F8F8BF] text-[#414343] font-[500] relative">
        <ArrowLeft
          className="cursor-pointer absolute left-6 top-1/2 -translate-y-1/2"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-center">Sentence Construction</h1>
        <img
          className="absolute right-10 top-1/2 -translate-y-1/2 cursor-pointer"
          src={menu}
          alt="menu"
        />
      </header>

      <div className="px-4 py-8 md:px-20 md:py-12 mt-[60px]">
        <div className="flex flex-col items-center">
          <ScoreLoader score={percentageScore} />

          {score > 0 ? (
            <p className="text-center mt-6 max-w-xl text-gray-600">
              While you correctly formed several sentences, there are a couple
              of areas where improvement is needed. Pay close attention to
              sentence structure and word placement to ensure clarity and
              correctness. Review your responses below for more details.
            </p>
          ) : (
            <p className="text-center mt-6 max-w-xl text-red-500">
              Don’t worry about the score! Every expert was once a beginner.
              Keep practicing and you'll get better with every try!
            </p>
          )}

          <button
            onClick={handleDashboard}
            className="mt-6 border border-purple-600 text-purple-600 px-5 py-2 rounded-lg"
          >
            Go to Dashboard
          </button>

          <button onClick={() => setShowDetails(!showDetails)} className="mt-4">
            <ChevronDown className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {showDetails && (
          <div className="mt-10 flex justify-center">
            <div className="w-full max-w-4xl space-y-6">
              {questions &&
                questions.map((q, idx) => {
                  const user = userAnswers?.[q.questionId] || [];
                  const correct = q.correctAnswer;
                  const isCorrect =
                    JSON.stringify(user) === JSON.stringify(correct);

                  return (
                    <div
                      key={q.questionId}
                      className="p-4 rounded-xl shadow-sm border"
                      style={{
                        backgroundColor: isCorrect ? "#f0f9f0" : "#fff0f0",
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">Prompt</p>
                        <p className="text-xs text-gray-500">{idx + 1}/10</p>
                      </div>

                      <p className="mb-2 text-sm text-gray-800">
                        <span className="font-medium">Question:</span>{" "}
                        {q.question.replace(/_____________/g, "_____")}
                      </p>

                      <p className="mt-3 text-sm font-medium mb-[5px]">
                        Your Response :
                        <span
                          className={
                            isCorrect ? "text-green-600" : "text-red-600"
                          }
                        >
                          {isCorrect ? " Correct" : " Incorrect"}
                        </span>
                      </p>

                      <p className="text-sm text-gray-700">
                        {fillSentence(
                          q.question,
                          user,
                          isCorrect ? "text-green-600" : "text-red-600"
                        )}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
