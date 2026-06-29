// $SONO Tokenomics and Distribution Calculator

const MAX_SUPPLY = 1000000000; // 1 Billion $SONO Tokens

const ALLOCATIONS = {
    sonicMiningRewards: 0.40, // 40%
    liquidityPool: 0.25, // 25%
    publicLaunch: 0.15, // 15%
    coreLabTeam: 0.15, // 15%
    communityAirdrops: 0.05 // 5%
};

function displayTokenomicsBlueprint() {
    console.log("\n=============================================");
    console.log("🔬 SONOLUMINESCENCE ($SONO) TOKENOMICS BLUEPRINT");
    console.log("=============================================");
    console.log(`Maximum Token Supply: ${MAX_SUPPLY.toLocaleString()} $SONO\n`);

    for (const [bucket, percentage] of Object.entries(ALLOCATIONS)) {
        const amount = MAX_SUPPLY * percentage;
        const formattedBucket = bucket.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
        console.log(`📊 ${formattedBucket}:`);
        console.log(` Allocation: ${(percentage * 100)}%`);
        console.log(` Tokens: ${amount.toLocaleString()} $SONO`);
        
        if (bucket === 'coreLabTeam') {
            console.log(" Lock-up: 6-Month Cliff, 2-Year Linear Vesting");
        }
        console.log("---------------------------------------------");
    }
}

// Simulate mining reward distribution based on validated acoustic blocks
function simulateSonicMining(activeNodes, blocksValidated) {
    const totalMiningPool = MAX_SUPPLY * ALLOCATIONS.sonicMiningRewards;
    const rewardPerBlock = 50; // 50 $SONO distributed per validated sonoluminescence block
    const totalRewardsDistributed = blocksValidated * rewardPerBlock;
    const remainingPool = totalMiningPool - totalRewardsDistributed;

    console.log("\n⚡ LIVE NETWORK ORACLE MINING SIMULATION");
    console.log(`Active Laboratory Nodes: ${activeNodes}`);
    console.log(`Acoustic Blocks Validated: ${blocksValidated}`);
    console.log(`Total $SONO Distributed: ${totalRewardsDistributed.toLocaleString()} $SONO`);
    console.log(`Remaining Mining Pool: ${remainingPool.toLocaleString()} $SONO`);
    console.log("=============================================");
}

// Run the engine output
displayTokenomicsBlueprint();
simulateSonicMining(124, 4520); // Simulating 124 active research nodes processing data
