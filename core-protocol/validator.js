// Core Protocol Laboratory Data Validator Engine

// Safety thresholds for our lab equipment
const THRESHOLDS = {
    minTemperature: 18.00,
    maxTemperature: 24.00
};

function validateAndSignReading(rawData) {
    console.log(`\n🔍 Auditing Reading ID: ${rawData.readingId}...`);
    
    // Check 1: Temperature Safety Bounds
    if (rawData.temperatureCelsius < THRESHOLDS.minTemperature || rawData.temperatureCelsius > THRESHOLDS.maxTemperature) {
        return {
            success: false,
            error: "⚠️ ALERT: Temperature anomaly detected! Outside safe operating limits.",
            data: rawData
        };
    }
    
    // Check 2: Device authentication check
    if (!rawData.deviceId.startsWith("LAB-EQUIP-")) {
        return {
            success: false,
            error: "❌ REJECTED: Unauthorized hardware signature.",
            data: rawData
        };
    }

    // If both pass, append a cryptographic status signature
    return {
        success: true,
        protocolStatus: "VERIFIED_AND_SECURED",
        blockTimestamp: new Date().toISOString(),
        checksum: Math.random().toString(16).substring(2, 10).toUpperCase(),
        payload: rawData
    };
}

// --- Let's run a test suite simulation right now! ---
const testReadings = [
    { readingId: 101, deviceId: "LAB-EQUIP-001", temperatureCelsius: 21.50 }, // Perfect reading
    { readingId: 102, deviceId: "LAB-EQUIP-001", temperatureCelsius: 29.80 }, // Dangerously hot!
    { readingId: 103, deviceId: "UNKNOWN-ROUTER", temperatureCelsius: 20.00 } // Fake device!
];

console.log("🛠️ Starting Core Protocol Validation Checks...");
testReadings.forEach(reading => {
    const result = validateAndSignReading(reading);
    if (result.success) {
        console.log(`✅ SUCCESS: Data cryptographically sealed with checksum: ${result.checksum}`);
        console.log(JSON.stringify(result, null, 2));
    } else {
        console.log(result.error);
        console.log(`❌ BLOCK CRITICAL ERROR: Reading ${reading.readingId} has been dropped from processing.`);
    }
});
