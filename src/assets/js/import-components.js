import { initNavbar } from "./components/navbar.js";
import { initChainLenght } from "./modules/chain-length.js";
import { initSaddleHeight } from "./modules/saddle-height.js";
import { initGearRatio } from "./modules/gear-ratio.js";
import { initTirePressure } from "./modules/tire-pressure.js";

$(document).ready(function () {
  initNavbar();
  initChainLenght();
  initSaddleHeight();
  initGearRatio();
  initTirePressure();
});
