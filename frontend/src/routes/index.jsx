import { useSelector } from "react-redux";
import NewChapterModal from "../components/NewChapterModal";
import ChapterList from "../components/ChapterList";

function Index() {
  const user = useSelector((state) => state.user.user);
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
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Chapters</h1>
          <div>
            <NewChapterModal />
          </div>
        </div>
        <ChapterList />
      </div>
    </>
  );
}

export default Index;
