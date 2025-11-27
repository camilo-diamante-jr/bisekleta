export function initChainLenght() {
  const filePath = "./src/pages/tools/chain-length.html";

  $("#chainLengthContent").load(filePath, function () {
    function calculateChainLength() {
      const chainstay = parseFloat($("#chainstay").val());
      const chainring = parseFloat($("#chainring").val());
      const biggestcogs = parseFloat($("#biggestcogs").val());

      if (isNaN(chainstay) || isNaN(chainring) || isNaN(biggestcogs)) {
        $(".output").html("");
        return;
      }

      // Shimano / ParkTool Single-Chainring Formula
      // L (inches) = 2 * CS + (CR + LR) / 4 + 1
      const L = 2 * chainstay + (chainring + biggestcogs) / 4 + 1;

      // Round to nearest whole chain link
      const totalLinks = Math.round(L * 2) / 2;

      $(".output").html(`${totalLinks * 2} links`);
    }

    // Auto calculate on any input
    $("#chainstay, #chainring, #biggestcogs").on("input", calculateChainLength);
  });
}
