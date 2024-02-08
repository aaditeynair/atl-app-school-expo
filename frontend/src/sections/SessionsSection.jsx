import { AddRounded } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "../config/axiosConfig";
import { useState, useEffect } from "react";

const SessionsSection = () => {
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const getSessions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/sessions/");
        const allSessions = response.data.allSessions;
        setSessions(allSessions);
      } catch (err) {
        console.log(err);
      }
    };
    getSessions();
  }, []);
  return (
    <div className="mt-8">
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
      {sessions.length > 0 ? (
        <div className="grid grid-cols-4 gap-8 mt-4">
          {sessions.map((session) => {
            const date = new Date(session.date).toLocaleDateString("en-GB");
            return (
              <Card variant="outlined" key={session.session_id}>
                <CardContent>
                  <h1 className="text-xl font-bold">{session.title}</h1>
                  <p className="text-sm text-gray-700 mt-1">Date: {date}</p>
                </CardContent>
                <CardActions>
                  <Link to={`/session/${session.session_id}`}>
                    <Button size="small" color="secondary" variant="filled">
                      See Details
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="mt-8 italic text-center text-gray-500">
          Let&apos;s start with your first session!
        </p>
      )}
    </div>
  );
};

export default SessionsSection;
