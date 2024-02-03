import { CssBaseline } from "@mui/material";
import "./App.css";

function App() {
  return (
    <>
      <CssBaseline />
      <div className="p-12">
        <div className="flex justify-between">
          <div>
            <h1 className="text-5xl font-bold">Welcome Aadi</h1>
            <p className="mt-1">What are we learning today?</p>
          </div>
          <div className="">
            <a href="/signup">Sign Up</a>
          </div>
        </div>

        <div className="grid grid-cols-2 h-52 gap-12 mt-6">
          <div className="">
            <h1 className="text-2xl font-bold">Chapters</h1>
          </div>
          <div className="text-2xl font-bold">
            <h1>Assignments</h1>
          </div>
        </div>

        <div></div>
      </div>
    </>
  );
}

export default App;
