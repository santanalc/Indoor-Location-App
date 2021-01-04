import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AdjustIcon from "@material-ui/icons/Adjust";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import { BLE } from "@ionic-native/ble";
import { RSSI } from "../Home";

const beacons = [
  { name: "Beacon 1", mac_address: "EF:29:E0:C0:C7:FB" },
  { name: "Beacon 2", mac_address: "F2:55:56:32:1E:59" },
  { name: "Beacon 3", mac_address: "EA:99:49:8F:A4:B6" },
];

interface Beacon {
  name: string;
  mac_address: string;
}

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  button: {
    backgroundColor: blue[100],
    display: "flex",
    margin: "auto",
    borderRadius: "210px",
  },
});
interface Position {
  x: number;
  y: number;
}
interface Props {
  set: any;
  open: boolean;
  rssi: RSSI[];
  xy: Position;
  motion: number;
}

export default function ModalBluetooth(props: Props) {
  const classes = useStyles();
  const { open, set, rssi, xy, motion } = props;

  return (
    <Dialog aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Connect Bluetooth</DialogTitle>
      <List>
        <div>
          <span> {motion === 1 ? "Andando" : "Parado"}</span>

          <span>X: {parseFloat(xy.x.toFixed(2))}</span>
          <span>Y: {parseFloat(xy.y.toFixed(2))}</span>
        </div>
        {rssi.map((vlu) => (
          <div>
            <span>RSSI: {parseFloat(vlu.rssi.toFixed(2))}</span>
            <span>Filter: {parseFloat(vlu.filter.toFixed(2))} </span>
          </div>
        ))}
        <Button
          className={classes.button}
          onClick={() => {
            set(false);
          }}
        >
          Close
        </Button>
      </List>
    </Dialog>
  );
}
