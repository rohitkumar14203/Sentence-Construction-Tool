import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ArrowLeft } from "lucide-react";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, questions, userAnswers } = location.state || {};
  const [showDetails, setShowDetails] = useState(false);

  const handleDashboard = () => navigate("/");

  return (
    <div className="min-h-screen px-4 py-8 md:px-20 md:py-12 bg-white text-gray-800">
      <div className="flex items-center justify-between mb-6">
        <ArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <h1 className="text-xl font-semibold text-center w-full -ml-6">
          Sentence Construction
        </h1>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full border-[6px] border-green-500 flex items-center justify-center text-3xl font-bold text-green-600">
          {score}
        </div>
        <p className="mt-2 text-sm text-gray-500 font-medium">Overall Score</p>

        <p className="text-center mt-6 max-w-xl text-gray-600">
          While you correctly formed several sentences, there are a couple of
          areas where improvement is needed. Pay close attention to sentence
          structure and word placement to ensure clarity and correctness. Review
          your responses below for more details.
        </p>

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
        <div className="mt-10 space-y-6">
          {questions.map((q, idx) => {
            const user = userAnswers[q.questionId] || [];
            const correct = q.correctAnswer;
            const isCorrect = JSON.stringify(user) === JSON.stringify(correct);
            return (
              <div
                key={q.questionId}
                className={`bg-${
                  isCorrect ? "green" : "red"
                }-50 p-4 rounded-xl shadow-sm`}
              >
                <p className="text-xs text-gray-500 mb-2">Prompt</p>
                <p className="mb-4 text-sm">
                  {q.question.replace(/___________/g, "_____")}
                </p>

                <p className="text-sm font-medium">
                  Your response:{" "}
                  <span
                    className={isCorrect ? "text-green-600" : "text-red-600"}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </p>
                <p className="mt-1 text-gray-700 text-sm">{user.join(" ")}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
