import React from "react";
import Icon from "../assets/Icons.png";
import { useNavigate } from "react-router";
import menu from "../assets/menu.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <header className="w-full text-center py-4 text-[18px] backdrop-blur-[50px] shadow-[0px_2px_36px_0px_#00000014] bg-[#F8F8F8BF] text-[#414343] font-[500]">
        <h1 className=" text-center ">Sentence Construction</h1>

        <img
          className="absolute right-10 top-1/2 -translate-y-1/2"
          src={menu}
        />
      </header>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <img src={Icon} alt="" />

          <h1 className="text-[40px] text-[#0F1010] font-semibold">
            Sentence Construction
          </h1>

          <p className="text-[#7C8181] text-[20px] max-w-[700px]">
            Select the correct words to complete the sentence by arranging the
            provided options in the right order.
          </p>

          <div className="flex gap-8 mt-4 text-center text-[20px]">
            <div>
              <p className="font-medium text-[#2A2D2D] ">Time Per Question</p>
              <p className="text-[18px] text-[#7C8181]">30 sec</p>
            </div>
            <span className="w-px h-[54px] bg-gray-300 rotate-0" />
            <div>
              <p className="font-medium text-[#2A2D2D] ">Total Questions</p>
              <p className="text-[18px] text-[#7C8181]">10</p>
            </div>
            <span className="w-px h-[54px] bg-gray-300 rotate-0" />
            <div>
              <p className="font-medium text-[#2A2D2D] ">Coins</p>
              <div className="flex items-center justify-center gap-1">
                <div className="w-[18px] h-[18px] border-[#F5CE00] border-2 bg-[#F5CE00] rounded-full"></div>
                <span className="text-[#414343]"> 0</span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              disabled
              className="px-[24px] py-[10px] border border-[#453FE1] cursor-pointer text-violet-600 rounded-[8px]"
            >
              Back
            </button>
            <button
              onClick={() => {
                navigate("/quiz");
              }}
              className="px-[24px] py-[10px] bg-violet-600 cursor-pointer text-white rounded-md"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
