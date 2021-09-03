import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import ReplayIcon from "@material-ui/icons/Replay";
import { PROCESS_STATUS, PROCESS_STATUS_TEXT } from "../constants";
import PrettoSlider from "./PrettoSlider";

const useStyles = makeStyles((theme) => ({
  listItem: {
    width: "100%",
    minWidth: 1020,
  },
  listItemText: {
    maxWidth: "20%",
    minWidth: "20%",
  },
  listItemStatus: {
    maxWidth: "15%",
    minWidth: "15%",
  },
  listItemAction: {
    maxWidth: "5%",
    minWidth: "5%",
    display: "flex",
  },
}));

const AntBox = ({
  name,
  initialState = PROCESS_STATUS.NOT_STARTED,
  length,
  weight,
  callback,
}) => {
  const classes = useStyles();
  const [status, setStatus] = useState(initialState);
  const [prediction, setPrediction] = useState(0);

  const updateStatus = (antName, status, res) => {
    setStatus(status);
    if (res) setPrediction(res);
  };

  const handleRace = (name) => {
    setStatus(PROCESS_STATUS.RUNNING);
    let promise = callback();
    promise((res) => {
      if (res) {
        updateStatus(name, PROCESS_STATUS.COMPLETED, res.toFixed(2) * 100);
      }
    });
  };

  const handleReplayRace = () => {
    setPrediction(0);
    handleRace();
  };

  return (
    <ListItem className={classes.listItem}>
      <ListItemText
        className={classes.listItemText}
        primary={name}
        secondary={`Weight: ${weight}, Length: ${length}`}
      />
      <PrettoSlider
        aria-label="pretto slider"
        defaultValue={prediction}
        value={prediction}
        valueLabelDisplay={prediction ? "on" : "off"}
      />
      <ListItemText
        className={classes.listItemStatus}
        primary={PROCESS_STATUS_TEXT[status]}
      />
      <ListItemSecondaryAction className={classes.listItemAction}>
        {status === PROCESS_STATUS.NOT_STARTED && (
          <IconButton
            edge="end"
            aria-label="play"
            onClick={handleRace.bind(null, name)}
          >
            <PlayArrowIcon />
          </IconButton>
        )}
        {status === PROCESS_STATUS.COMPLETED && (
          <IconButton
            edge="end"
            aria-label="replay"
            onClick={handleReplayRace.bind(null, name)}
          >
            <ReplayIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default React.memo(AntBox);
