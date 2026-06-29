function generateTelemetryData() {
    return {
        deviceId: "LAB-EQUIP-001",
        timestamp: new Date().toISOString(),
        temperatureCelsius: parseFloat((19 + Math.random() * 4).toFixed(2)),
        status: "OPERATIONAL",
        readingId: Math.floor(Math.random() * 1000000)
    };
}
setInterval(() => {
    const reading = generateTelemetryData();
    console.log(JSON.stringify(reading));
}, 2000);
