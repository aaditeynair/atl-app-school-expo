import { AddRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SessionsSection = () => {
  return (
    <div className="mt-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Previous Sessions</h1>
        <div>
          <Link to="/new-session">
            <Button
              variant="contained"
              disableElevation
              size="small"
              color="primary"
              startIcon={<AddRounded />}
            >
              New Session
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SessionsSection;
