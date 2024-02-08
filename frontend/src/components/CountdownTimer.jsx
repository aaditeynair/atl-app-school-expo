/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { PauseRounded, PlayArrowRounded } from "@mui/icons-material";

const CountdownTimer = ({ currentTask, setCurrentTask, chapter }) => {
  const [minutes, setMinutes] = useState(chapter.time_estimate);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && minutes >= 0 && seconds >= 0) {
      timer = setInterval(() => {
        if (currentTask === null) {
          clearInterval(timer);
          setIsRunning(false);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
            setIsRunning(false);
          } else {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds, currentTask]);

  return (
    <div className="flex self-center">
      <IconButton
        disabled={chapter.completed}
        onClick={() => {
          if (currentTask === null) {
            setCurrentTask(chapter);
            setIsRunning(true);
          } else if (currentTask.task_id === chapter.task_id) {
            setIsRunning(!isRunning);
          }
        }}
      >
        {isRunning ? <PauseRounded /> : <PlayArrowRounded />}
      </IconButton>
      {currentTask && currentTask.task_id === chapter.task_id ? (
        <p className="self-center">
          {`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
            2,
            "0",
          )}`}
        </p>
      ) : (
        <p className="self-center">{chapter.time_estimate}:00</p>
      )}
    </div>
  );
};

export default CountdownTimer;
