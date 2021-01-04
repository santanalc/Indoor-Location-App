import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button"
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import {
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  DialogActions,
} from "@material-ui/core";

const emails = ["username@gmail.com", "user02@gmail.com"];
const useStyles = makeStyles((theme) => ({
  box: {
    width: "400px",
    height: "600px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "fit-content",
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
  button: {
    backgroundColor: blue[100],
    display: "flex",
    margin: "15px",
    borderRadius: "10px",
  },
}));

interface Props {
  set: any;
  open: boolean;
}

export default function ModalSearch(props: Props) {
  const classes = useStyles();
  const { open, set } = props;
  const [local, setLocal] = useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLocal(event.target.value as string);
  };

  return (
    <Dialog
      aria-labelledby="simple-dialog-title"
      open={open}
      className={classes.box}
    >
      <DialogTitle id="simple-dialog-title">Search Local</DialogTitle>
      <DialogContent>
        <FormControl className={classes.formControl}>
          <Select value={local} onChange={handleChange}>
            <MenuItem value={10}>Thales classroom</MenuItem>
            <MenuItem value={20}>Secretary</MenuItem>
            <MenuItem value={30}>IoT classroom</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.button}
          onClick={() => {
            set(false);
          }}
        >
          Close
        </Button>
        <Button
          className={classes.button}
          onClick={() => {
            set(false);
          }}
        >
          Go
        </Button>
      </DialogActions>
    </Dialog>
  );
}
