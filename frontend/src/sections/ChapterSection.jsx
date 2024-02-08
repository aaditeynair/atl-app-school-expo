import NewChapterModal from "../components/NewChapterModal";
import axios from "../config/axiosConfig";
import ChapterList from "../components/ChapterList";
import { useState, useEffect } from "react";
import SnackbarMessage from "../components/SnackbarMessage";

const ChapterSection = () => {
  const [chapters, setChapters] = useState([]);
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
    const getChapters = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/chapters/");
        const allChapters = response.data.allChapters;
        setChapters(allChapters);
      } catch (err) {
        console.log(err);
        handleShowSnackbar(
          "Something went wrong! Please reload the page",
          "error",
        );
      }
    };
    getChapters();
  }, []);
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Chapters</h1>
        <div>
          <NewChapterModal
            setChapters={setChapters}
            handleShowSnackbar={handleShowSnackbar}
          />
        </div>
      </div>
      {chapters.length > 0 ? (
        <ChapterList
          chapters={chapters}
          setChapters={setChapters}
          handleShowSnackbar={handleShowSnackbar}
        />
      ) : (
        <p className="mt-8 italic text-center text-gray-500">
          No Chapters Made
        </p>
      )}
      <SnackbarMessage
        open={snackbarInfo.open}
        message={snackbarInfo.message}
        severity={snackbarInfo.severity}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
};

export default ChapterSection;
