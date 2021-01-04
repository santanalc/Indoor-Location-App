interface Position {
  x: number;
  y: number;
}

export function userPosition(
  dA: number,
  dB: number,
  dC: number,
  xA: number,
  xB: number,
  xC: number,
  yA: number,
  yB: number,
  yC: number,
  width: number,
  left: number,
  top: number
): Position {
  let W = dA * dA - dB * dB - xA * xA - yA * yA + xB * xB + yB * yB;
  let Z = dB * dB - dC * dC - xB * xB - yB * yB + xC * xC + yC * yC;

  let x =
    (Z * (2 * (yB - yA)) - W * (2 * (yC - yB))) /
    (2 * ((xC - xB) * 2 * (yB - yA)) - 2 * (xB - xA) * 2 * (yC - yB));
  let y =
    (Z * (2 * (xB - xA)) - W * (2 * (xC - xB))) /
    (2 * ((xB - xA) * 2 * (yC - yB)) - 2 * (xC - xB) * 2 * (yB - yA));
  // let x =
  //   (W * (yC - yB) - Z * (yB - yA)) /
  //   (2 * ((xB - xA) * (yC - yB) - (xC - xB) * (yB - yA)));
  // let y = (W - 2 * x * (xB - xA)) / (2 * (yB - yA));
  //yB is a second measure of y to mitigate errors
  let y2 = (Z - 2 * x * (xC - xB)) / (2 * (yC - yB));

  console.log("x: ", x, "y: ", y);
  let xPixel = (width * x) / 8.66 + left;
  let yPixel = (width * y) / 8.66 + top;

  // console.log("x", x, "y", y);
  // console.log("xPixel", xPixel, "yPixel", yPixel);

  return {
    x: xPixel,
    y: yPixel,
  };
  // let xUp =
  //   (Math.pow(d2, 2) -
  //     Math.pow(x2, 2) -
  //     Math.pow(y2, 2) -
  //     Math.pow(d1, 2) +
  //     Math.pow(x1, 2) +
  //     Math.pow(y1, 2)) *
  //     (-2 * y3) +
  //   -2 *
  //     y1 *
  //     (Math.pow(d3, 2) -
  //       Math.pow(x3, 2) -
  //       Math.pow(y3, 2) -
  //       Math.pow(d2, 2) +
  //       Math.pow(x2, 2) +
  //       Math.pow(y2, 2));

  //   console.log("xUp", xUp);

  // let xDown = 2 * (x1 - x3) * (-2 * y3) - (2 * x3 - 2 * x2) * (-2 * y1);

  //   console.log("xDown", xDown);

  // let x = xUp / xDown;

  // console.log("xUp", xUp, "xDown", xDown, "x", x);

  // let yUp =
  //   Math.pow(d3, 2) -
  //   Math.pow(x3, 2) -
  //   Math.pow(y3, 2) -
  //   Math.pow(d2, 2) +
  //   Math.pow(x2, 2) +
  //   Math.pow(y2, 2) +
  //   x * (2 * x3 - 2 * x2);

  //   console.log("yUp", yUp);

  // let yDown = 2 * (y2 - y3);

  //   console.log("yDown", yDown);

  // let y = yUp / yDown;

  // console.log("yUp", yUp, "yDown", yDown, "y", y);

  // console.log("X", x, "Y", y);
  // return {
  //   x: x,
  //   y: y,
  // };
}
