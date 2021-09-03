import React from "react";
import AntBox from "./components/AntBox";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { useQuery, gql } from "@apollo/client";

const FETCH_ANTS = gql`
  query GetAnts {
    ants {
      name
      length
      color
      weight
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  listRoot: {
    width: "100%",
    maxWidth: 1020,
  },
  outerDiv: {
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  innerDiv: {
    textAlign: "center",
  },
}));

function generateAntWinLikelihoodCalculator() {
  const delay = 7000 + Math.random() * 7000;
  const likelihoodOfAntWinning = Math.random();

  return (callback) => {
    setTimeout(() => {
      callback(likelihoodOfAntWinning);
    }, delay);
  };
}

function App() {
  const { loading, error, data } = useQuery(FETCH_ANTS);
  const { ants } = data || {};
  const classes = useStyles();

  return (
    !error && (
      <Grid item xs={12} className={classes.root}>
        <div className={classes.outerDiv}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className={classes.innerDiv}>
              <h1>WIN PREDICTION</h1>
              <List dense={false} className={classes.listRoot}>
                {ants.map((ant, index) => (
                  <AntBox
                    key={`${ant.name}_${index}`}
                    {...ant}
                    callback={generateAntWinLikelihoodCalculator}
                  />
                ))}
              </List>
            </div>
          )}
        </div>
      </Grid>
    )
  );
}

export default App;
