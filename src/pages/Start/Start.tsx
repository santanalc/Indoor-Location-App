import React from "react";
import "./Start.scss";
import logo from "../../images/logo.png";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#94BFE7",
    width: "300px",
    height: "70px",
    borderRadius: "20px",
  },
}));

function Start() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <div className="start">
      <div className="logo-box">
        <img src={logo} className="logo" />
      </div>

      <div>
        <div className="curve-1"></div>
        <div className="curve-2">
          <div className="button">
            <Button
              variant="contained"
              className={classes.button}
              onClick={() => {
                history.push("/home");
              }}
            >
              Start
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Start;
