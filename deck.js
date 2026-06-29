const blessed = require('blessed');
const contrib = require('blessed-contrib');

// 1. Initialize the master dashboard screen
const screen = blessed.screen({
    autoPadding: true,
    smartCSR: true,
    title: 'SONOLUMINESCENCE ($SONO) NETWORK COMMAND CENTER'
});

// 2. Set up a grid layout matrix
const grid = new contrib.grid({rows: 12, cols: 12, screen: screen});

// 3. Component A: Real-time Sonoluminescence Intensity Gauge
const gauge = grid.set(0, 0, 4, 6, contrib.gauge, {
    label: 'Bubble Implosion Energy (Vapor Node Peak)', 
    percent: [0],
    stroke: 'cyan'
});

// 4. Component B: Network Mining Oracle Log
const log = grid.set(4, 0, 8, 6, contrib.log, {
    fg: "green", 
    selectedFg: "green", 
    label: 'Acoustic Oracle Telemetry Stream'
});

// 5. Component C: Tokenomics Pool Tracker
const donut = grid.set(0, 6, 6, 6, contrib.donut, {
    label: 'Remaining Mining Supply Pool ($SONO)',
    radius: 8,
    arcWidth: 3,
    yPadding: 2,
    data: [{percent: 100, label: 'Unmined', color: 'blue'}]
});

// 6. Component D: Active Science Node Matrix
const table = grid.set(6, 6, 6, 6, contrib.table, {
    keys: true, 
    fg: 'white', 
    selectedFg: 'white', 
    columnWidth: [14, 12, 12],
    columnSpacing: 2, 
    label: 'Active Research Nodes'
});

// Mock Initial Data
let remainingSupplyPercent = 100;
let totalBlocksMined = 4520;

function updateDashboard() {
    // Generate simulated sonoluminescence physics data
    const currentTempPeak = parseFloat((19 + Math.random() * 4).toFixed(2));
    const randomIntensity = Math.floor(Math.random() * 40) + 50; // 50% to 90%
    const currentBlock = Math.floor(Math.random() * 1000000);
    
    // Update live gauge
    gauge.setData([randomIntensity]);
    
    // Push raw network streams to log box
    log.log(`[BLOCK-${currentBlock}] Real-time acoustic signature verified.`);
    log.log(` 🌟 Light emission spike detected at ${currentTempPeak}°C equivalent.`);
    
    // Decay tokenomics supply slightly as tokens are "mined"
    if (remainingSupplyPercent > 1) remainingSupplyPercent -= 0.05;
    donut.setData([{percent: Math.floor(remainingSupplyPercent), label: '$SONO Pool', color: 'magenta'}]);
    
    // Update active validator registry table
    totalBlocksMined++;
    table.setData({
        headers: ['NODE ID', 'STATUS', 'BLOCKS SIGNED'],
        data: [
            ['LAB-EQUIP-001', 'ONLINE', `${totalBlocksMined}`],
            ['LAB-EQUIP-002', 'ACTIVE', '3,211'],
            ['LAB-EQUIP-003', 'SYNCING', '982']
        ]
    });
    
    screen.render();
}

// Exit command listener (Press Ctrl+C or Q to exit)
screen.key(['escape', 'q', 'C-c'], () => {
    return process.exit(0);
});

// Run loop updating metrics every 1.5 seconds
setInterval(updateDashboard, 1500);
screen.render();
