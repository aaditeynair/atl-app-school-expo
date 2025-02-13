import { useNavigate, useParams } from "react-router-dom";
import axios from "../config/axiosConfig";
import { useEffect, useState } from "react";
import SnackbarMessage from "../components/SnackbarMessage";
import { Button, Checkbox, MenuItem, Select } from "@mui/material";
import CountdownTimer from "../components/CountdownTimer";

const Session = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sessionDetails, setSessionDetails] = useState({});
  const [chapters, setChapters] = useState({});
  const [currentTask, setCurrentTask] = useState(null);

  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleShowSnackbar = (message, severity) => {
    setSnackbarInfo({
      open: true,
      message,
      severity,
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarInfo((info) => {
      return { ...info, open: false };
    });
  };

  useEffect(() => {
    const getDetails = async () => {
      axios
        .get(`http://localhost:3000/api/sessions/${id}`)
        .then((res) => {
          const { session } = res.data;
          if (session.tasks && session.tasks.length > 0) {
            session.tasks.map((task) => {
              const getChapter = async () => {
                axios
                  .get(`http://localhost:3000/api/tasks/${task.task_id}`)
                  .then((res) => {
                    const { task: taskInfo, chapter: chapterInfo } = res.data;
                    const task = {
                      ...taskInfo,
                      title: chapterInfo.title,
                      confidence_rating: chapterInfo.confidence_rating,
                    };
                    const id = task.task_id;
                    setChapters((chapters) => {
                      let newChapters = { ...chapters };
                      newChapters[id] = task;
                      return newChapters;
                    });
                  })
                  .catch((err) => {
                    console.log(err);
                    handleShowSnackbar(
                      "Something went wrong! Please try again later.",
                      "error",
                    );
                  });
              };
              getChapter();
            });
          }

          setSessionDetails(session);
        })
        .catch((err) => {
          console.log(err);
          handleShowSnackbar(
            "Something went wrong! Please try again later.",
            "error",
          );
        });
    };
    getDetails();
  }, [id]);

  const date = new Date(sessionDetails.date).toLocaleDateString("en-GB");
  return (
    <>
      {sessionDetails && (
        <div>
          <h1 className="font-bold text-4xl">{sessionDetails.title}</h1>
          <div className="mt-4 text-lg text-gray-700">
            <p>Date: {date}</p>
            <p>
              No. of Chapters:{" "}
              {sessionDetails.tasks ? sessionDetails.tasks.length : "0"}
            </p>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-2">Chapters</h2>
            {Object.keys(chapters).map((key) => {
              const chapter = chapters[key];
              return (
                <div key={chapter.task_id}>
                  <div className="flex justify-between w-1/2">
                    <div className="self-center flex">
                      <div className="flex self-center mr-6">
                        <CountdownTimer
                          currentTask={currentTask}
                          setCurrentTask={setCurrentTask}
                          chapter={chapter}
                        />
                      </div>
                      <p className="self-center">{chapter.title}</p>
                    </div>
                    <div>
                      <Select
                        onChange={(e) => {
                          setChapters((chap) => {
                            let newChapters = { ...chap };
                            newChapters[key].confidence_rating = e.target.value;
                            return newChapters;
                          });
                        }}
                        size="small"
                        value={chapters[key].confidence_rating}
                      >
                        <MenuItem value="good">Good</MenuItem>
                        <MenuItem value="average">Average</MenuItem>
                        <MenuItem value="bad">Bad</MenuItem>
                      </Select>
                      <Checkbox
                        checked={chapters[key].completed}
                        onClick={(e) => {
                          setChapters((chap) => {
                            let newChapters = { ...chap };
                            newChapters[key].completed = e.target.checked;
                            return newChapters;
                          });
                          if (
                            currentTask &&
                            currentTask.task_id === chapter.task_id
                          ) {
                            if (e.target.checked) {
                              setCurrentTask(null);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 space-x-4">
            <Button
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                Object.keys(chapters).map((key) => {
                  const task = chapters[key];
                  const id = task.task_id;
                  const date = new Date();
                  axios
                    .put(`http://localhost:3000/api/tasks/${id}`, null, {
                      params: {
                        completed: task.completed,
                        confidenceRating: task.confidence_rating,
                        date,
                      },
                    })
                    .catch((err) => {
                      console.log(err);
                      handleShowSnackbar(
                        "Something went wrong! Please try again later",
                        "error",
                      );
                    });
                });
                navigate("/");
              }}
            >
              Complete Session
            </Button>
            <Button variant="outlined">Delete Session</Button>
          </div>
        </div>
      )}
      <SnackbarMessage
        open={snackbarInfo.open}
        message={snackbarInfo.message}
        severity={snackbarInfo.severity}
        handleClose={handleSnackbarClose}
      />
    </>
  );
};

export default Session;
