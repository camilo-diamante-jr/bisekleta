export function initGearRatio() {
  const filePath = "./src/pages/tools/gear-ratio.html";

  $("#gearRatioContent").load(filePath, () => {
    const chainringInput = $("#chainringInput");
    const cogsInput = $("#cogsInput");
    const output = $(".output");

    // ---- LOAD SAVED CACHE ----
    const savedChainring = localStorage.getItem("gear_chainring");
    const savedCogs = localStorage.getItem("gear_cogs");
    const savedRatio = localStorage.getItem("gear_ratio");

    if (savedChainring) chainringInput.val(savedChainring);
    if (savedCogs) cogsInput.val(savedCogs);
    if (savedRatio) output.html(savedRatio);

    // ---- CALCULATION ----
    function calculateGearRatio() {
      const chainring = parseFloat(chainringInput.val());
      const cogs = parseFloat(cogsInput.val());

      if (isNaN(chainring) || isNaN(cogs)) {
        output.html("");
        return;
      }

      const ratio = chainring / cogs;
      const roundedRatio = Math.round(ratio * 100) / 100;
      const display = roundedRatio.toFixed(2);

      output.html(display);

      // ---- SAVE TO CACHE ----
      localStorage.setItem("gear_chainring", chainring);
      localStorage.setItem("gear_cogs", cogs);
      localStorage.setItem("gear_ratio", display);
    }

    // Auto-run if cache exists
    if (savedChainring && savedCogs) calculateGearRatio();

    chainringInput.on("input", calculateGearRatio);
    cogsInput.on("input", calculateGearRatio);
  });
}
