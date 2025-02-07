document.addEventListener("DOMContentLoaded", () => {
if (!localStorage.getItem("skillComp")) {
    const skills = [
        {
            id: "Physical-X-3", // Randomized, will be referenced by the skills array saved to each player.
            name: "Fire Breath", // Name of the Skill
            type: "Fire", // Affects the image that will accompany the skill when listed,
            costNum: 9, // The number of the CostType to spend. 
            costType: "HP", // Refers to either HP, MP, CARD or FATE.
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "Magic", // The base TN stat to roll against.
            basePower: "Magic", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            description: "Refer to Core Rulebook pg. 87", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "Physical-X-5", // Randomized, will be referenced by the skills array saved to each player.
            name: "Ice Breath", // Name of the Skill
            type: "Ice", // Affects the image that will accompany the skill when listed,
            costNum: 9, // The number of the CostType to spend. 
            costType: "HP", // Refers to either HP, MP, CARD or FATE.
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "Magic", // The base TN stat to roll against.
            basePower: "Magic", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            description: "Refer to Core Rulebook pg. 87", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
    ];
    localStorage.setItem("skillComp", JSON.stringify(skills));
}
});