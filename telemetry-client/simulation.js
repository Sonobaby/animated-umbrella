// Laboratory Telemetry Data Simulator

function generateTelemetryData() {
    return {
        deviceId: "LAB-EQUIP-001",
        timestamp: new Date().toISOString(),
        temperatureCelsius: parseFloat((20 + Math.random() * 5).toFixed(2)),
        status: "OPERATIONAL",
        readingId: Math.floor(Math.random() * 1000000)
    };
}

// Stream data every 3 seconds to test the client loop
console.log("🚀 Telemetry Laboratory stream started...");
setInterval(() => {
    const reading = generateTelemetryData();
    console.log("🔬 New Laboratory Reading Generated:", JSON.stringify(reading, null, 2));
}, 3000);
