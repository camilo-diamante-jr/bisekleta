export function initSaddleHeight() {
  const filePath = "./src/pages/tools/saddle-height.html";

  $("#saddleHeightContent").load(filePath, function () {
    const inseamInput = $("#inseamInput");
    const saddleOutput = $("#saddleHeight");

    function calculate() {
      const inseam = parseFloat(inseamInput.val());
      const factor = 0.885;

      if (isNaN(inseam) || inseam <= 0) {
        saddleOutput.text("");
        return;
      }

      const saddleHeight = inseam * factor;
      saddleOutput.text(saddleHeight.toFixed(2));
    }

    // Auto update while typing
    inseamInput.on("input", calculate);

    // Optional: run once on load
    calculate();
  });
}
