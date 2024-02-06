import { AddRounded } from "@mui/icons-material";
import { Button, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Index() {
  const user = useSelector((state) => state.user.user);
  const [newChapterModal, setNewChapterModal] = useState(false);
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="text-5xl font-bold">
            Welcome {user != null && user.username}
          </h1>
          <p className="mt-1">What are we learning today?</p>
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-2xl font-bold">Chapters</h1>
        <div className="my-2">
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
            onClose={() => {
              setNewChapterModal(false);
            }}
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
                        userId: user.user_id,
                      },
                    })
                    .then((res) => {
                      console.log(res);
                    })
                    .catch((e) => {
                      console.log(e);
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
      </div>
    </>
  );
}

export default Index;
