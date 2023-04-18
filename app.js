document.getElementById("simulation-form").addEventListener("submit", function (event) {
    event.preventDefault();

    // Get values from the input fields
    const annualEnergyConsumptionKwh = parseFloat(document.getElementById("annual-energy-consumption-kwh").value);
    // Add more variables for other input fields

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
    // ... Add the same pvSystemDimensioning logic as in the Python code
}
