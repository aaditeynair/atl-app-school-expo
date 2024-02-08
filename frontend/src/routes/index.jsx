import { useSelector } from "react-redux";
import ChapterSection from "../sections/ChapterSection";
import SessionsSection from "../sections/SessionsSection";

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

      <SessionsSection />
      <ChapterSection />
    </>
  );
}

export default Index;
