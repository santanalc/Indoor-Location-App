import React, { useState, useRef, useEffect } from "react";
import "./Home.scss";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
import BluetoothIcon from "@material-ui/icons/Bluetooth";
import ModalBluetooth from "./components/ModalBluetooth";
import ModalSearch from "./components/ModalSearch";
import { BLE } from "@ionic-native/ble";
import { blue } from "@material-ui/core/colors";
import { userPosition } from "../../utils/UserPosition";
import { Plugins } from "@capacitor/core";
const { Accelerometer } = Plugins;
const KalmanFilter = require("kalmanjs");

export interface RSSI {
  rssi: number;
  filter: number;
}

Accelerometer.onCreate();
const svgImage = require("../../images/mapa3.svg");
const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#94BFE7",
    width: "300px",
    height: "70px",
    borderRadius: "20px",
  },
}));

//FIltros de Kalman utilizados na precisão do RSSI
var kalmanFilterOne = new KalmanFilter({ R: 0.01, Q: 10, B: 2 });
var kalmanFilterTwo = new KalmanFilter({ R: 0.01, Q: 10, B: 2 });
var kalmanFilterThree = new KalmanFilter({ R: 0.01, Q: 10, B: 2 });

function Home() {
  const classes = useStyles();
  const [openModalBluetooth, setOpenModalBluetooth] = useState(false);
  const [openModalSearch, setOpenModalSearch] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [motion, setMotion] = useState(0);
  const [flag, setFlag] = useState(false);

  //DISTÂNCIA DO USUÁRIO COM RELAÇÃO AO BEACON EM METROS
  const [distanceOne, setDistanceOne] = useState(0);
  const [distanceTwo, setDistanceTwo] = useState(0);
  const [distanceThree, setDistanceThree] = useState(0);

  //POSIÇÃO DO USUÁRIO
  let [xy, setXY] = useState({ x: 0, y: 0 });

  //TAMANHO DO MAPA SVG EM PIXEL
  let [width, setWidth] = useState(0);
  let [height, setHeight] = useState(0);
  let [left, setLeft] = useState(-1);
  let [top, setTop] = useState(-1);

  //POSIÇÃO DOS BEACONS EM PIXEL
  let [xyBeaconOne, setXYBeaconOne] = useState({ x: 0, y: 0 });
  let [xyBeaconTwo, setXYBeacoTwo] = useState({ x: 0, y: 0 });
  let [xyBeaconThree, setXYBeaconThree] = useState({ x: 0, y: 0 });
  let [xyBeaconFour, setXYBeaconFour] = useState({ x: 0, y: 0 });

  //
  let [rssiOne, setRssiOne] = useState<RSSI>({ rssi: 0, filter: 0 });
  let [rssiTwo, setRssiTwo] = useState<RSSI>({ rssi: 0, filter: 0 });
  let [rssiThree, setRssiThree] = useState<RSSI>({ rssi: 0, filter: 0 });

  //  console.log("top", top);

  ///////////////////////////////////////
  ///////////// SALA THALES /////////////
  ///////////////////////////////////////

  // //TAMANHO DO MAPA REAL EM METROS
  // const realWidth = 40.2;
  // const realHeight = 45.6;

  // //POSIÇÃO DOS BEACONS REAL EM METROS
  // //ONE
  // const xBeaconOne = 34.8;
  // const yBeaconOne = 15.6;
  // //TWO
  // const xBeaconTwo = 40.2;
  // const yBeaconTwo = 23.4;
  // //THREE
  // const xBeaconThree = 29.4;
  // const yBeaconThree = 23.4;
  // //FOUR
  // const xBeaconFour = 34.8;
  // const yBeaconFour = 31.2;

  ///////////////////////////////////////
  ///////////// LABORATÓRIO /////////////
  ///////////////////////////////////////

  //TAMANHO DO MAPA REAL EM METROS
  const realWidth = 8.66;
  const realHeight = 11.78;

  //POSIÇÃO DOS BEACONS REAL EM METROS
  //ONE
  const xBeaconOne = 4.33;
  const yBeaconOne = 0;
  //TWO
  const xBeaconTwo = 0;
  const yBeaconTwo = 5.89;
  //THREE
  const xBeaconThree = 4.33;
  const yBeaconThree = 11.78;

  let motionRef = useRef(0);
  useEffect(() => {
    //EVENTO VINCULADO COM A FUNÇÂO PARA DETECTAR MOVIMENTOS VINDO DO Accelerometer.java

    window.addEventListener("myCustomEvent", function (evtData: any) {
      console.log("myCustomEvent was fired", evtData.Walking);

      let isWalking = evtData.Walking === "True";

      if (!isWalking && motionRef.current == 1) {
        kalmanFilterOne = new KalmanFilter({ R: 0.01, Q: 10, B: 2 });
        kalmanFilterTwo = new KalmanFilter({ R: 0.01, Q: 10, B: 2 });
        kalmanFilterThree = new KalmanFilter({ R: 0.01, Q: 10, B: 2 });

        motionRef.current = 0;
      } else if (isWalking && motionRef.current == 0) {
        kalmanFilterOne = new KalmanFilter({ R: 0.01, Q: 10, B: 2 });
        kalmanFilterTwo = new KalmanFilter({ R: 0.01, Q: 10, B: 2 });
        kalmanFilterThree = new KalmanFilter({ R: 0.01, Q: 10, B: 2 });

        motionRef.current = 1;
      }
    });

    if (imageRef.current) {
      console.log(imageRef.current.getBoundingClientRect());

      //RECEBENDO O TAMANHO DO MAPA SVG EM PIXEL
    }

    BLE.enable();
  }, []);

  //INSERINDO AS POSIÇÕES DOS BEACONS COM RELAÇÃO AO TAMANHO DO MAPA
  useEffect(() => {
    if (width > 0 && left >= 0 && top >= 0) {
      setXYBeaconOne({
        x: (width * xBeaconOne) / realWidth + left,
        y: (width * yBeaconOne) / realWidth + top,
      });
      setXYBeacoTwo({
        x: (width * xBeaconTwo) / realWidth + left,
        y: (width * yBeaconTwo) / realWidth + top,
      });
      setXYBeaconThree({
        x: (width * xBeaconThree) / realWidth + left,
        y: (width * yBeaconThree) / realWidth + top,
      });
    }
    // setRssiOne;
  }, [width]);

  //////////////////////
  //Informações Beacon//
  //////////////////////

  //Beacon1 : EF:29:E0:C0:C7:FB
  //Beacon2 : F2:55:56:32:1E:59
  //Beacon3 : EA:99:49:8F:A4:B6

  //TX Power: -12DBM
  //RSSi @1 1m: -77
  //RSSi @ 0m: -36

  //SCANEANDO APARELHO BLUETOOTH E RECEBENDO RSSI
  BLE.startScan([]).subscribe(async (device) => {
    console.log(device);

    //RECEBENDO RSSI DO APARELHO QUE ESTIVER COM ID DOS BEACONS
    if (device.id == "EF:29:E0:C0:C7:FB") {
      setRssiTwo({
        rssi: device.rssi,
        filter: kalmanFilterTwo.filter(device.rssi, motionRef.current),
      });
      setDistanceTwo(
        Math.pow(
          10,
          (-77 - kalmanFilterTwo.filter(device.rssi, motionRef.current)) /
            (10 * 2)
        )
      );
    }
    if (device.id == "F2:55:56:32:1E:59") {
      setRssiOne({
        rssi: device.rssi,
        filter: kalmanFilterOne.filter(device.rssi, motionRef.current),
      });
      setDistanceOne(
        Math.pow(
          10,
          (-77 - kalmanFilterOne.filter(device.rssi, motionRef.current)) /
            (10 * 2)
        )
      );
    }
    if (device.id == "EA:99:49:8F:A4:B6") {
      setRssiThree({
        rssi: device.rssi,
        filter: kalmanFilterThree.filter(device.rssi, motionRef.current),
      });
      setDistanceThree(
        Math.pow(
          10,
          (-77 - kalmanFilterThree.filter(device.rssi, motionRef.current)) /
            (10 * 2)
        )
      );
    }
  });

  useEffect(() => {
    setXY(
      userPosition(
        distanceOne,
        distanceTwo,
        distanceThree,
        xBeaconOne,
        xBeaconTwo,
        xBeaconThree,
        yBeaconOne,
        yBeaconTwo,
        yBeaconThree,
        width,
        left,
        top
      )
    );
  }, [distanceOne, distanceTwo, distanceThree]);

  return (
    <div className="home">
      <div className="home__icon">
        <BluetoothIcon
          onClick={() => {
            setOpenModalBluetooth(true);
          }}
        />
      </div>

      <img
        onLoad={() => {
          if (!imageRef.current) return;

          let { left, top, x, y } = imageRef.current.getBoundingClientRect();
          //   console.log("left", left, "top", top, "x", x, "y", y);
          setWidth(
            imageRef.current.getBoundingClientRect().width -
              imageRef.current.getBoundingClientRect().x
          );
          setHeight(
            imageRef.current.getBoundingClientRect().bottom -
              imageRef.current.getBoundingClientRect().y
          );

          setLeft(imageRef.current.getBoundingClientRect().left);
          setTop(imageRef.current.getBoundingClientRect().top);

          setXY({ x, y });
        }}
        //console.log(e.screenX, e.screenY)
        onClick={(e) => {
          setXY({ x: e.screenX, y: e.screenY });
          console.log("x", e.screenX, "y", e.screenY);
        }}
        ref={imageRef}
        src={svgImage}
        className="image"
      ></img>

      <div
        className="image__person"
        style={{
          left: xy.x,
          top: xy.y,
        }}
      />

      <div
        className="image__person"
        style={{
          left: xyBeaconOne.x,
          top: xyBeaconOne.y,
          backgroundColor: "blue",
        }}
      />

      <div
        className="image__person"
        style={{
          left: xyBeaconTwo.x,
          top: xyBeaconTwo.y,
          backgroundColor: "blue",
        }}
      />

      <div
        className="image__person"
        style={{
          left: xyBeaconThree.x,
          top: xyBeaconThree.y,
          backgroundColor: "blue",
        }}
      />

      <div className="home__buton">
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => {
            setOpenModalSearch(true);
          }}
        >
          Search Local
        </Button>
      </div>
      <ModalBluetooth
        open={openModalBluetooth}
        set={setOpenModalBluetooth}
        rssi={[rssiOne, rssiTwo, rssiThree]}
        xy={{ x: (8.66 * (xy.x - left)) / 330, y: (8.66 * (xy.y - top)) / 330 }} //Conta para converter de pixel para metros conforme a sala
        motion={motionRef.current}
      />
      <ModalSearch open={openModalSearch} set={setOpenModalSearch} />
    </div>
  );
}

export default Home;
