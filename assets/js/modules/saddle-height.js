export function initSaddleHeight() {
  const filePath = "./src/tools/saddle-height.html";

  $("#saddleHeightContent").load(filePath, function () {
    const inseamInput = document.getElementById("inseamInput");
    const saddleOutput = document.getElementById("saddleOutput");

    function calculate() {
      const inseam = parseFloat(inseamInput.value);
      const factor = 0.885;

      if (isNaN(inseam) || inseam <= 0) {
        saddleOutput.value = "";
        return;
      }

      const saddleHeight = inseam * factor;
      saddleOutput.value = saddleHeight.toFixed(2);
    }

    inseamInput.addEventListener("input", calculate);
  });
}
