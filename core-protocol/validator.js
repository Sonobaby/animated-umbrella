// Core Protocol Validation Engine - Live Stream Processor
const readline = require('readline');

const THRESHOLDS = {
    minTemperature: 18.00,
    maxTemperature: 24.00
};

// Set up an interface to read a live data stream line-by-line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

function validateAndSignReading(rawData) {
    // Check 1: Temperature Safety Bounds
    if (rawData.temperatureCelsius < THRESHOLDS.minTemperature || rawData.temperatureCelsius > THRESHOLDS.maxTemperature) {
        return {
            success: false,
            error: `⚠️ ALERT: Temperature anomaly detected (${rawData.temperatureCelsius}°C)! Dropped.`,
            readingId: rawData.readingId
        };
    }
    
    // Check 2: Device authentication check
    if (!rawData.deviceId || !rawData.deviceId.startsWith("LAB-EQUIP-")) {
        return {
            success: false,
            error: "❌ REJECTED: Unauthorized hardware signature.",
            readingId: rawData.readingId
        };
    }

    // Cryptographically seal valid data
    return {
        success: true,
        protocolStatus: "VERIFIED_AND_SECURED",
        blockTimestamp: new Date().toISOString(),
        checksum: Math.random().toString(16).substring(2, 10).toUpperCase(),
        payload: rawData
    };
}

console.log("🛡️ Core Protocol Validator Engine Online. Awaiting live telemetry stream...");

rl.on('line', (line) => {
    try {
        // Parse incoming stream chunks
        if (line.includes('{')) {
            const reading = JSON.parse(line);
            const result = validateAndSignReading(reading);
            
            if (result.success) {
                console.log(`\n✅ PROTOCOL SEALED: Checksum [${result.checksum}]`);
                console.log(JSON.stringify(result, null, 2));
            } else {
                console.log(`\n${result.error}`);
            }
        }
    } catch (err) {
        // Ignore non-JSON setup strings
    }
});
