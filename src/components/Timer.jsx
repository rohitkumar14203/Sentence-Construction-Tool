import React, { useEffect, useState } from "react";

const Timer = ({ initialTime = 30, onTimeEnd }) => {
  const [timer, setTimer] = useState(initialTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((pre) => {
        if (pre === 0) {
          clearInterval(intervalId);
          onTimeEnd();
        }
        return pre - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const timeFormat = () => {
    const min = Math.floor(timer / 60)
      .toString()
      .padStart(2, "0");
    const sec = (timer % 60).toString().padStart(2, "0");
    return `${min}:${sec}`; // 00:10
  };

  return <div>{timeFormat()}</div>;
};

export default Timer;
