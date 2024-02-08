/* eslint-disable react/prop-types */
import axios from "../config/axiosConfig";
import { IconButton } from "@mui/material";
import { DeleteOutlineRounded } from "@mui/icons-material";

const ChapterListItem = ({
  current,
  chapters,
  setChapters,
  handleShowSnackbar,
  deleteChapter,
}) => {
  const id = current.chapter_id;
  const date = new Date(current.last_revised_date).toLocaleDateString("en-GB");
  return (
    <div className="rounded-lg flex-grow flex items-center justify-between px-2 py-1">
      {current.title}
      <div className="inline-flex space-x-4">
        <p className="bg-orange-300 self-center py-0.5 px-2 text-sm rounded-lg">
          {current.confidence_rating}
        </p>
        <p className="inline-flex self-center text-sm">{date}</p>
        {deleteChapter && (
          <IconButton
            onClick={(e) => {
              e.preventDefault();
              axios
                .delete(`http://localhost:3000/api/chapters/${id}`)
                .then(() => {
                  const filteredChapters = chapters.filter(
                    (chap) => chap.chapter_id !== id,
                  );
                  setChapters(filteredChapters);
                  handleShowSnackbar("Chapter deleted successfully", "success");
                })
                .catch((err) => {
                  console.log(err);
                  handleShowSnackbar(
                    "Something went wrong! Please try again later.",
                    "error",
                  );
                });
            }}
            size="small"
            color="error"
          >
            <DeleteOutlineRounded fontSize="small" />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default ChapterListItem;
