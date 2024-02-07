import { useState } from "react";
import { AddRounded } from "@mui/icons-material";
import { Button, Modal, TextField } from "@mui/material";
import axios from "../config/axiosConfig";
import SnackbarMessage from "./SnackbarMessage";

const NewChapterModal = () => {
  const [newChapterModal, setNewChapterModal] = useState(false);
  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleClose = () => {
    setNewChapterModal(false);
  };

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

  return (
    <div>
      <SnackbarMessage
        open={snackbarInfo.open}
        message={snackbarInfo.message}
        severity={snackbarInfo.severity}
        handleClose={handleSnackbarClose}
      />
      <Button
        variant="contained"
        disableElevation
        size="small"
        color="warning"
        startIcon={<AddRounded />}
        onClick={(e) => {
          e.preventDefault();
          setNewChapterModal(true);
        }}
      >
        Add Chapter
      </Button>
      <Modal
        open={newChapterModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute rounded-lg top-1/2 left-1/2 bg-white outline-0 p-8 -translate-x-1/2 -translate-y-1/2">
          <form
            className="space-y-4"
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
                .then(() => {
                  handleClose();
                  handleShowSnackbar("Chapter added successfully", "success");
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
            />
            <Button type="submit" color="secondary" variant="outlined">
              Add Chapter
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NewChapterModal;
