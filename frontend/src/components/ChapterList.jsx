import { useEffect, useState } from "react";
import axios from "../config/axiosConfig";

const ChapterList = () => {
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    const getChapters = async () => {
      const response = await axios.get("http://localhost:3000/api/chapters/");
      const allChapters = response.data.allChapters;
      setChapters(allChapters);
    };
    getChapters();
  }, []);
  return (
    <ul className="mt-6 space-y-2 max-h-[50%]">
      {chapters.map((chapter) => {
        const date = new Date(chapter.last_revised_date).toLocaleDateString(
          "en-GB",
        );
        return (
          <li
            className="rounded-lg flex items-center justify-between hover:bg-gray-200 px-2 py-1"
            key={chapter.chapter_id}
          >
            {chapter.title}
            <div className="inline-flex space-x-4">
              <p className="bg-orange-300 py-0.5 px-2 text-sm rounded-lg">
                {chapter.confidence_rating}
              </p>
              <p className="inline-flex self-center text-sm">{date}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ChapterList;
