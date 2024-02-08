import { AddRounded } from "@mui/icons-material";
import { Fab } from "@mui/material";

const SessionsSection = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Previous Sessions</h1>
        <div>
          <Fab color="primary">
            <AddRounded />
          </Fab>
        </div>
      </div>
    </div>
  );
};

export default SessionsSection;
