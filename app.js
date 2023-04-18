document.getElementById("simulation-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the input fields
    const annualEnergyConsumptionKwh = parseFloat(document.getElementById("annual-energy-consumption-kwh").value);
    const coverageRatio = parseFloat(document.getElementById("coverage-ratio").value);
    const solarIrradiation = parseFloat(document.getElementById("solar-irradiation").value);
    const roofOrientation = parseFloat(document.getElementById("roof-orientation").value);
    const systemEfficiency = parseFloat(document.getElementById("system-efficiency").value);
    const panelEfficiency = parseFloat(document.getElementById("panel-efficiency").value);
    const inverterEfficiency = parseFloat(document.getElementById("inverter-efficiency").value);
    const desiredStorageCapacityHours = parseFloat(document.getElementById("desired-storage-capacity-hours").value);

    const [panelArea, storageCapacity] = pvSystemDimensioning(
        annualEnergyConsumptionKwh,
        coverageRatio,
        solarIrradiation,
        roofOrientation,
        systemEfficiency,
        panelEfficiency,
        inverterEfficiency,
        desiredStorageCapacityHours
    );

    // Display results
    document.getElementById("results").innerHTML = `
        <h2>Résultats:</h2>
        <p>Surface des panneaux solaires (m²): ${panelArea.toFixed(2)}</p>
        <p>Capacité de stockage optimale (kWh): ${storageCapacity.toFixed(2)}</p>
    `;
});

function pvSystemDimensioning(
    annualEnergyConsumptionKwh,
    coverageRatio,
    solarIrradiation,
    roofOrientation,
    systemEfficiency,
    panelEfficiency,
    inverterEfficiency,
    desiredStorageCapacityHours
) {
    const dailyEnergyConsumptionKwh = annualEnergyConsumptionKwh / 365;
    const dailyEnergyProductionKwh = dailyEnergyConsumptionKwh * coverageRatio / 100;
    const effectiveIrradiation = solarIrradiation * Math.cos(Math.PI * roofOrientation / 180);
    const panelOutputKwhPerSquareMeter = effectiveIrradiation * panelEfficiency / 100;
    const panelArea = dailyEnergyProductionKwh / panelOutputKwhPerSquareMeter;
    const storageCapacity = dailyEnergyConsumptionKwh * desiredStorageCapacityHours * inverterEfficiency / (100 * systemEfficiency / 100);

    return [panelArea, storageCapacity];
}
