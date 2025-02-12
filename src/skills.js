document.addEventListener("DOMContentLoaded", () => {
if (!localStorage.getItem("skillComp")) {
    const skills = [
        {
            id: "fire-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Agi", // Name of the Skill
            type: "Fire", // Affects the image that will accompany the skill when listed,
            costNum: 3, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "Magic", // The base TN stat to roll against.
            basePower: "Magic", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 15, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 97", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "ice-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Bufu", // Name of the Skill
            type: "Ice", // Affects the image that will accompany the skill when listed,
            costNum: 3, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "Magic", // The base TN stat to roll against.
            basePower: "Magic", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 97", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "electric-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Zio", // Name of the Skill
            type: "Electric", // Affects the image that will accompany the skill when listed,
            costNum: 3, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "Magic", // The base TN stat to roll against.
            basePower: "Magic", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 98", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "force-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Zan", // Name of the Skill
            type: "Force", // Affects the image that will accompany the skill when listed,
            costNum: 3, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "Magic", // The base TN stat to roll against.
            basePower: "Magic", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 98", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "light-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Hama", // Name of the Skill
            type: "Light", // Affects the image that will accompany the skill when listed,
            costNum: 6, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "TN", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "None", // The base TN stat to roll against.
            basePower: "None", // The base Power stat to add.
            bonusTN: 40, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 99", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "dark-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Mudo", // Name of the Skill
            type: "Dark", // Affects the image that will accompany the skill when listed,
            costNum: 6, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "TN", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "None", // The base TN stat to roll against.
            basePower: "None", // The base Power stat to add.
            bonusTN: 40, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 99", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "mind-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Pulinpa", // Name of the Skill
            type: "Ailment", // Affects the image that will accompany the skill when listed,
            costNum: 5, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "TN", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "None", // The base TN stat to roll against.
            basePower: "None", // The base Power stat to add.
            bonusTN: 60, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 99", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "nerve-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Shibaboo", // Name of the Skill
            type: "Nerve", // Affects the image that will accompany the skill when listed,
            costNum: 5, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "TN", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "None", // The base TN stat to roll against.
            basePower: "None", // The base Power stat to add.
            bonusTN: 65, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 99", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "healing-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Dia", // Name of the Skill
            type: "Recovery", // Affects the image that will accompany the skill when listed,
            costNum: 3, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "Power", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "None", // The base TN stat to roll against.
            basePower: "None", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 100", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "buff-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Tarukaja", // Name of the Skill
            type: "Support", // Affects the image that will accompany the skill when listed,
            costNum: 12, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "Power", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "None", // The base TN stat to roll against.
            basePower: "None", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 101", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "ruin-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Dismal Tune", // Name of the Skill
            type: "Ruin", // Affects the image that will accompany the skill when listed,
            costNum: 30, // The number of the CostType to spend. 
            costType: "MP", // Refers to either HP, MP, CARD or FATE.
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "Magic", // The base TN stat to roll against.
            basePower: "Magic", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 50, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 104", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "weapon-03", // Randomized, will be referenced by the skills array saved to each player.
            name: "Brutal Slash", // Name of the Skill
            type: "Physical", // Affects the image that will accompany the skill when listed,
            costNum: 13, // The number of the CostType to spend. 
            costType: "HP", // Refers to either HP, MP, CARD or FATE.
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "Strength", // The base TN stat to roll against.
            basePower: "Melee", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 38, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 107", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
        {
            id: "affinity-01", // Randomized, will be referenced by the skills array saved to each player.
            name: "Anti-Phys", // Name of the Skill
            type: "Passive", // Affects the image that will accompany the skill when listed,
            costNum: 0, // The number of the CostType to spend. 
            costType: "None", // Refers to either HP, MP, CARD or FATE.
            roll: "None", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.     
            baseTN: "None", // The base TN stat to roll against.
            basePower: "None", // The base Power stat to add.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            description: "Refer to Tokyo Conception pg. 109", // These will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
        },
    ];
    localStorage.setItem("skillComp", JSON.stringify(skills));
}
});