import { initNavbar } from "./components/navbar.js";
import { initChainLenght } from "./modules/chain-length.js";
import { initSaddleHeight } from "./modules/saddle-height.js";

$(document).ready(function () {
  initNavbar();
  initChainLenght();
  initSaddleHeight();
});
