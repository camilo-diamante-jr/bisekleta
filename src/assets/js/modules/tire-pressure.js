export function initTirePressure() {
  const filePath = "./src/pages/tools/tire-pressure.html";

  $("#tirePressureContent").load(filePath, () => {
    const weightInput = $("#weightInput");
    const tireTypeInput = $("#tireTypeInput");
    const tireSizeInput = $("#tireSizeInput");
    const tireWidthInput = $("#tireWidthInput");
    const unitInput = $("#unitInput");
    const tireMaxInput = $("#tireMaxInput");
    const output = $("#tirePressureOutput");

    const loadCache = () => {
      const saved = {
        weight: localStorage.getItem("tire_weight"),
        type: localStorage.getItem("tire_type"),
        size: localStorage.getItem("tire_size"),
        width: localStorage.getItem("tire_width"),
        unit: localStorage.getItem("tire_unit"),
        max: localStorage.getItem("tire_max"),
        pressure: localStorage.getItem("tire_pressure"),
      };
      if (saved.weight) weightInput.val(saved.weight);
      if (saved.type) tireTypeInput.val(saved.type);
      if (saved.size) tireSizeInput.val(saved.size);
      if (saved.width) tireWidthInput.val(saved.width);
      if (saved.unit) unitInput.val(saved.unit);
      if (saved.max) tireMaxInput.val(saved.max);
      if (saved.pressure) output.html(saved.pressure);
    };

    const saveCache = (pressureDisplay) => {
      localStorage.setItem("tire_weight", weightInput.val());
      localStorage.setItem("tire_type", tireTypeInput.val());
      localStorage.setItem("tire_size", tireSizeInput.val());
      localStorage.setItem("tire_width", tireWidthInput.val());
      localStorage.setItem("tire_unit", unitInput.val());
      localStorage.setItem("tire_max", tireMaxInput.val());
      localStorage.setItem("tire_pressure", pressureDisplay);
    };

    const calculatePressure = () => {
      const weight = parseFloat(weightInput.val());
      const type = tireTypeInput.val();
      const size = parseFloat(tireSizeInput.val());
      const width = parseFloat(tireWidthInput.val());
      const unit = unitInput.val();
      const userMaxPSI = parseFloat(tireMaxInput.val());

      if (!weight || !type || !size || !width || !unit) {
        output.html("");
        return;
      }

      // Realistic pressure calculation (base per kg)
      let pressureBar = type === "road" ? 0.07 * weight : 0.05 * weight;

      // Max pressure dynamic
      let defaultMaxPSI = type === "road" ? 120 : 35;
      let maxPSI = !isNaN(userMaxPSI) ? userMaxPSI : defaultMaxPSI;
      let maxPressure = unit === "bar" ? maxPSI / 14.5038 : maxPSI;

      // Convert to desired unit
      let pressure = unit === "bar" ? pressureBar : pressureBar * 14.5038;

      // Clamp to max
      if (pressure > maxPressure) pressure = maxPressure;

      let display =
        unit === "bar"
          ? pressure.toFixed(2) + " bar"
          : pressure.toFixed(2) + " psi";
      if (pressure / maxPressure > 0.9) display += " ⚠ Near max";

      output.html(display);
      saveCache(display);
    };

    const updatePlaceholders = () => {
      const type = tireTypeInput.val();
      if (type === "road") {
        unitInput.val("bar");
        tireSizeInput.attr("placeholder", "e.g., 28, 29 (700c)");
        tireWidthInput.attr("placeholder", "e.g., 1.25, 1.5");
        if (!tireMaxInput.val()) tireMaxInput.val(120);
      } else if (type === "mountain") {
        unitInput.val("psi");
        tireSizeInput.attr("placeholder", "e.g., 26, 27.5, 29");
        tireWidthInput.attr("placeholder", "e.g., 1.75, 2.0, 2.25");
        if (!tireMaxInput.val()) tireMaxInput.val(35);
      }
      calculatePressure();
    };

    loadCache();
    tireTypeInput.on("change", updatePlaceholders);
    weightInput.on("input", calculatePressure);
    tireSizeInput.on("input", calculatePressure);
    tireWidthInput.on("input", calculatePressure);
    unitInput.on("change", calculatePressure);
    tireMaxInput.on("input", calculatePressure);

    if (weightInput.val() && tireTypeInput.val()) calculatePressure();
  });
}
