/* eslint-disable react/prop-types */
import { useState } from "react";
import { AddRounded } from "@mui/icons-material";
import { Button, Modal, TextField } from "@mui/material";
import axios from "../config/axiosConfig";

const NewChapterModal = ({ handleShowSnackbar, setChapters, value }) => {
  const [newChapterModal, setNewChapterModal] = useState(false);
  const handleClose = () => {
    setNewChapterModal(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        disableElevation
        size="small"
        color="primary"
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
        aria-labelledby="new-chapter-modal"
        aria-describedby="Pop-up modal to enter the name of the new chapter"
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
                .then((res) => {
                  handleClose();
                  setChapters((chap) => [...chap, res.data]);
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
              defaultValue={value}
            />
            <Button type="submit" color="primary" variant="contained">
              Add Chapter
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default NewChapterModal;
