import {
  Autocomplete,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import SnackbarMessage from "../components/SnackbarMessage";
import axios from "../config/axiosConfig";
import { createFilterOptions } from "@mui/material/Autocomplete";
import ChapterListItem from "../components/ChapterListItem";
import { CloseRounded } from "@mui/icons-material";

const filter = createFilterOptions();

const NewSession = () => {
  const [chapters, setChapters] = useState([]);
  const [selectedChapters, setSelectedChapters] = useState([]);

  const [fieldValue, setFieldValue] = useState(null);
  const [timeEstimate, setTimeEstimate] = useState(0);
  const [showModal, setShowModal] = useState(false);
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
    <div>
      <form
        className="flex justify-between"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("hi");
        }}
      >
        <Input
          fullWidth
          autoFocus
          placeholder="Session Name"
          sx={{
            fontSize: "2rem",
            maxWidth: "50%",
          }}
        />
        <div className="space-x-6 self-center">
          <Button variant="filled">Cancel</Button>
          <Button type="submit" variant="contained">
            Start Session
          </Button>
        </div>
      </form>
      <div className="mt-10">
        <h1 className="text-xl font-bold">Chapters</h1>
        <div className="flex mt-4 space-x-4">
          <Autocomplete
            fullWidth
            size="small"
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            freeSolo
            options={chapters}
            renderInput={(params) => (
              <TextField {...params} label="Search Chapters" size="small" />
            )}
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
            sx={{
              maxWidth: "30%",
            }}
            value={fieldValue}
            onChange={(e, newValue) => {
              if (typeof newValue === "string") {
                setFieldValue({
                  title: newValue,
                });
              } else {
                setFieldValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              const isExisting = options.some(
                (option) => inputValue === option.title,
              );
              if (inputValue !== "" && !isExisting) {
                filtered.push({
                  title: inputValue,
                });
              }

              return filtered;
            }}
            getOptionLabel={(option) => {
              return option.title ? option.title : option;
            }}
          />
          <OutlinedInput
            sx={{ maxWidth: "20ch" }}
            placeholder="0"
            size="small"
            value={timeEstimate}
            onChange={(e) => {
              setTimeEstimate(e.target.value);
            }}
            endAdornment={<InputAdornment position="end">mins</InputAdornment>}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (!fieldValue) {
                handleShowSnackbar("Please enter a chapter name", "warning");
                return;
              }

              if (fieldValue.chapter_id === undefined) {
                setShowModal(true);
              } else {
                const digitRegex = /^\d+$/;
                if (!digitRegex.test(timeEstimate)) {
                  handleShowSnackbar("Invalid time estimate", "warning");
                  return;
                }
                const time = parseInt(timeEstimate, 10);
                if (time < 1) {
                  handleShowSnackbar(
                    "Please enter a time estimate of the revision",
                    "warning",
                  );
                  return;
                }
                setSelectedChapters((chap) => [
                  ...chap,
                  { ...fieldValue, timeEstimate: time },
                ]);
              }
            }}
            variant="outlined"
            size="small"
          >
            Add Chapter
          </Button>
          <Modal open={showModal} onClose={() => setShowModal(false)}>
            <div className="absolute rounded-lg top-1/2 left-1/2 bg-white outline-0 p-8 -translate-x-1/2 -translate-y-1/2">
              <p className="text-gray-700">
                This chapter does not exists. Would you like to create it?
              </p>
              <form
                className="space-y-4 mt-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const chapterName = new FormData(e.currentTarget).get(
                    "chapterName",
                  );
                  axios
                    .post("http://localhost:3000/api/chapters", null, {
                      params: {
                        title: chapterName,
                      },
                    })
                    .then((res) => {
                      setShowModal(false);
                      setChapters((chap) => [...chap, res.data]);
                      setFieldValue(res.data);
                      const digitRegex = /^\d+$/;
                      if (!digitRegex.test(timeEstimate)) {
                        handleShowSnackbar("Invalid time estimate", "warning");
                        return;
                      }
                      const time = parseInt(timeEstimate, 10);
                      if (time < 1) {
                        handleShowSnackbar(
                          "Please enter a time estimate of the revision",
                          "warning",
                        );
                        return;
                      }
                      setSelectedChapters((chap) => {
                        return [...chap, { ...res.data, timeEstimate: time }];
                      });
                    })
                    .catch((e) => {
                      console.log(e);
                      handleShowSnackbar(
                        "Something went wrong! Please try again later.",
                        "error",
                      );
                    });
                }}
              >
                <TextField
                  required
                  fullWidth
                  name="chapterName"
                  label="Chapter Name"
                  autoFocus
                  defaultValue={fieldValue ? fieldValue.title : ""}
                />
                <Button
                  sx={{ marginRight: "1rem" }}
                  color="primary"
                  variant="filled"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Add Chapter
                </Button>
              </form>
            </div>
          </Modal>
        </div>
        <div>
          <ul className="mt-6 space-y-1.5 max-w-[66%]">
            {selectedChapters.map((chapter) => {
              return (
                <li className="flex" key={chapter.chapter_id}>
                  <ChapterListItem
                    current={chapter}
                    chapters={selectedChapters}
                    setChapters={setSelectedChapters}
                    handleShowSnackbar={handleShowSnackbar}
                  />
                  <div className="self-center ml-8">
                    <p className="inline mr-8 font-bold">
                      {chapter.timeEstimate} mins
                    </p>
                    <IconButton
                      onClick={() => {
                        setSelectedChapters(
                          selectedChapters.filter(
                            (chap) => chap.chapter_id !== chapter.chapter_id,
                          ),
                        );
                      }}
                      size="small"
                      sx={{ alignSelf: "center" }}
                    >
                      <CloseRounded size="small" />
                    </IconButton>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <SnackbarMessage
        open={snackbarInfo.open}
        message={snackbarInfo.message}
        severity={snackbarInfo.severity}
        handleClose={handleSnackbarClose}
      />
    </div>
  );
};

export default NewSession;
