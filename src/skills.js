document.addEventListener("DOMContentLoaded", () => {
if (!localStorage.getItem("skillComp")) {
    const skills = [
        // Melee Skills
        {
            id: "melee-X-1", // Randomized, will be referenced by the skills array saved to each player.
            name: "Constrict", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 12, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 8, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "melee-X-2", // Randomized, will be referenced by the skills array saved to each player.
            name: "Tail", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 10, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "melee-X-3", // Randomized, will be referenced by the skills array saved to each player.
            name: "Fire Breath", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 9, // The number of the CostType to spend.
            type: "Fire", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "melee-X-4", // Randomized, will be referenced by the skills array saved to each player.
            name: "Fireball", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 15, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 25, // The number of the CostType to spend.
            type: "Fire", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "melee-X-5", // Randomized, will be referenced by the skills array saved to each player.
            name: "Ice Breath", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 9, // The number of the CostType to spend.
            type: "Ice", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "melee-X-6", // Randomized, will be referenced by the skills array saved to each player.
            name: "Ice Bound", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 25, // The number of the CostType to spend.
            type: "Ice", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "melee-X-7", // Randomized, will be referenced by the skills array saved to each player.
            name: "Poison Breath", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 8, // The number of the CostType to spend.
            type: "Curse", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "melee-X-8", // Randomized, will be referenced by the skills array saved to each player.
            name: "Wing Flap", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 15, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 9, // The number of the CostType to spend.
            type: "Force", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "melee-X-9", // Randomized, will be referenced by the skills array saved to each player.
            name: "Acid", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 30, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 20, // The number of the CostType to spend.
            type: "Curse", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        // unarmed
        {
            id: "unarmed-X-1", // Randomized, will be referenced by the skills array saved to each player.
            name: "Straight Punch", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 5, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-3", // Randomized, will be referenced by the skills array saved to each player.
            name: "Tekken Punch", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 20, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 10, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-4", // Randomized, will be referenced by the skills array saved to each player.
            name: "Kick", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 4, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-5", // Randomized, will be referenced by the skills array saved to each player.
            name: "Lunge", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 15, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 6, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-6", // Randomized, will be referenced by the skills array saved to each player.
            name: "Dharma Kaeshi", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 40, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 20, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-7", // Randomized, will be referenced by the skills array saved to each player.
            name: "Jump Kick", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 18, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 12, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-8", // Randomized, will be referenced by the skills array saved to each player.
            name: "Roundhouse Kick", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 12, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-9", // Randomized, will be referenced by the skills array saved to each player.
            name: "Iron Punch", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 10, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-10", // Randomized, will be referenced by the skills array saved to each player.
            name: "Berserk", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 18, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 18, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-11", // Randomized, will be referenced by the skills array saved to each player.
            name: "Tempest", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 30, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 25, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-12", // Randomized, will be referenced by the skills array saved to each player.
            name: "Body Slam", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 6, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-13", // Randomized, will be referenced by the skills array saved to each player.
            name: "Thunder Kick", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 16, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 36, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-14", // Randomized, will be referenced by the skills array saved to each player.
            name: "Hell Thrust", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 30, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 20, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-15", // Randomized, will be referenced by the skills array saved to each player.
            name: "Pressure Point", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 10, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-16", // Randomized, will be referenced by the skills array saved to each player.
            name: "Boddhisattvas Palm", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 30, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 15, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-17", // Randomized, will be referenced by the skills array saved to each player.
            name: "Squash", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 25, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 22, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-18", // Randomized, will be referenced by the skills array saved to each player.
            name: "Hades Blast", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 50, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 33, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-19", // Randomized, will be referenced by the skills array saved to each player.
            name: "Piercing Blow", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 10, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 20, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-20", // Randomized, will be referenced by the skills array saved to each player.
            name: "Akasha Arts", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 50, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-21", // Randomized, will be referenced by the skills array saved to each player.
            name: "Vacuum Throw", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 20, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 27, // The number of the CostType to spend.
            type: "Almighty", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "unarmed-X-22", // Randomized, will be referenced by the skills array saved to each player.
            name: "Landslide", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 40, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 99, // The number of the CostType to spend.
            type: "Almighty", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "weapon-X-1", // Randomized, will be referenced by the skills array saved to each player.
            name: "One Cut", // Name of the Skill
            roll: "Attack", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 16, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 8, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },
        {
            id: "weapon-X-2", // Randomized, will be referenced by the skills array saved to each player.
            name: "Certain Kill", // Name of the Skill
            roll: "TN", // or "Power" for skills with no TN, or "Passive" for skills that require no rolls.
            description: "Refer to Core Rulebook pg. 87", // Due to copyright, these will be kept with placeholders refering to the rulebook so that the players can fill it themselves.
            bonusTN: 0, // The bonus value provided to the TN roll.
            bonusPower: 0, // The bonus value provided to the power rolls.
            bonusPowerDice: 0, // The bonus dice added to power rolls.
            costType: "HP", // Refers to either HP, MP, Card or Fate.
            costNum: 10, // The number of the CostType to spend.
            type: "Melee", // Affects the image that will accompany the skill when listed,
            rules: "X", // Used to distinguish between TC rules and X rules.
        },

    ];
    localStorage.setItem("skillComp", JSON.stringify(skills));
}
});