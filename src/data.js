document.addEventListener("DOMContentLoaded", () => {
	async function triggerLED(endpoint) {
            try {
                const response = await fetch(endpoint);
                const result = await response.text();
            } catch (err) {
                console.error("Error:", err);
            }
        }
  // Check if 'players' key exists in localStorage
  if (!localStorage.getItem("players")) {
    // Set default players data. Two example players from SMT X Core Rulebook
    termtext(`<color:purple>Note</color> <b>User</b> data not found, generated default user data.\n`);
    const defaultPlayers = [
      {
        id: "675d0a6e252a537876729d13",
        Name: "Fairy Pixie",
        Type: "Demon",
        Level: 5,
        Strength: 2,
        Magic: 8,
        Vitality: 3,
        Agility: 7,
        Luck: 7,
        Status: "Normal",
        STR_TN: 14,
        MG_TN: 44,
        VT_TN: 19,
        AG_TN: 39,
        LK_TN: 39,
        Melee_Power: 6,
        Ranged_Power: 7,
        Magic_Power: 12,
        Initiative: 5,
        Dodge_TN: 17,
        Talk_TN: 34,
        HP_Max: 42,
        HP_Current: 42,
        MP_Max: 36,
        MP_Current: 36,
        Fate_Max: 0,
        Fate_Current: 0,
      },
      {
        id: "675d0675edf082e1619b55dc",
        Name: "Fateful Youth",
        Type: "Human",
        Level: 5,
        Strength: 7,
        Magic: 4,
        Vitality: 4,
        Agility: 5,
        Luck: 5,
        Status: "Normal",
        STR_TN: 40,
        MG_TN: 25,
        VT_TN: 25,
        AG_TN: 30,
        LK_TN: 30,
        Melee_Power: 12,
        Ranged_Power: 5,
        Magic_Power: 9,
        Initiative: 5,
        Dodge_TN: 20,
        Talk_TN: 30,
        HP_Max: 36,
        HP_Current: 36,
        MP_Max: 18,
        MP_Current: 18,
        Fate_Max: 6,
        Fate_Current: 6,
      },
    ];

    // Store the players array in localStorage
    localStorage.setItem("players", JSON.stringify(defaultPlayers));
    console.log("Initialized 'players' in localStorage.");
  }

  // Check if 'party' key exists in localStorage
  if (!localStorage.getItem("party")) {
    termtext(`<color:purple>Note</color> <b>Party</b> data not found, generated default party data.\n`);
    // Set default party data
    const defaultParty = {
      slot1: "675d0675edf082e1619b55dc",
      slot2: "675d0a6e252a537876729d13",
      slot3: null,
      slot4: null,
      slot5: null,
      slot6: null,
    };
    localStorage.setItem("party", JSON.stringify(defaultParty));
    console.log("Initialized 'party' in localStorage.");
  }

  // Check if 'system' key exists in localStorage
  if (!localStorage.getItem("system")) {
    termtext(`<color:purple>Note</color> <b>System</b> data not found, generated default system data.\nYou may change these in the Config within the CHANGE menu.\n\n<anim:term-pulse><color:yellow> UNREAD MESSAGES (1)</color>:\nTo everyone on this network...\n A serious threat is closing in on humanity at this very moment.\nThis program will surely be of use to you. <color:blue>-S</color>\n\n`);
    // Set default party data
    const defaultSystem = {
      moon: 8, // New = 0, 1/8 = 1, 2/8 = 2, 3/8 = 3, 4/8... FULL = 8, 1/8 = 9, 2/8 = 10
      macca: 100,
      rules: 0, // 0 = X, 1 = TC
      username: "<USER>",
      config1: "ddsnet", // Theme, 0 = DDS
      config2: 0,
      config3: 0,
      config4: 0,
      config5: 0,
      config6: 0,
      config7: 0,
      config8: 0,
      config9: 0,
    };
    localStorage.setItem("system", JSON.stringify(defaultSystem));
    console.log("Initialized 'system' in localStorage.");
  }

  // Centralized Retrieval
  const getParty = () => JSON.parse(localStorage.getItem("party")) || {}; // const party = getParty();
  const getPlayers = () => JSON.parse(localStorage.getItem("players")) || []; // const players = getPlayers();
  const getSystem = () => JSON.parse(localStorage.getItem("system")) || []; // const system = getSystem();
  const getskillComp = () => JSON.parse(localStorage.getItem("skillComp")) || []; // const skillsCompendium = getskillsCompendium();
  //Centralized Updates
  const setParty = (party) => localStorage.setItem("party", JSON.stringify(party));
  const setPlayers = (players) => localStorage.setItem("players", JSON.stringify(players));
  const setSystem = (system) => localStorage.setItem("system", JSON.stringify(system));
	const setskillComp = (skillComp) => localStorage.setItem("skillComp", JSON.stringify(skillsComp));

  const sys = getSystem();
  const user = sys.username;
  const theme = sys.config1;

  if (theme === 0 || theme === undefined) // Adapts old versions of system data.
  {
    console.log("Adjusted Theme to Default")
    sys.config1 = "ddsnet";
    setSystem(sys);
    document.documentElement.setAttribute('data-theme', "ddsnet");
  }
  else{
    document.documentElement.setAttribute('data-theme', theme);
  }


  // Generates the 6 slots using the ID's in the "party" data
  function populatePartySlots(players, party, noevent = false) {
    for (let i = 1; i <= 6; i++) {
      party = getParty();
      players = getPlayers();
      const partySlot = document.getElementById(`party-slot-${i}`);
      const playerId = party[`slot${i}`];
      if (playerId) {
        const player = players.find((p) => p.id === playerId);
        if (player) {
          let icon = `${player.Status}.png`;
          if (player.HP_Current < player.HP_Max / 2 && player.Status !== "Dead") {
            if (player.Status === "Normal") {
              icon = "Low_Hp.png";
            }
			document.getElementById(`party-slot-${i}`).classList.remove(`from-primary`);
			document.getElementById(`party-slot-${i}`).classList.add(`from-red-600`);
          }
          if (player.HP_Current === 0 || player.Status === "Dead") {
            icon = "Dead.png";
			player.Status = "Dead";
            document.getElementById(`party-slot-${i}`).classList.add("grayscale");
          }
		switch (player.Status)
		{
			case 'Bind':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-yellow-600`);
			break;
			case 'Charm':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-pink-600`);
			break;
			case 'Cursed':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-purple-600`);
				document.getElementById(`party-slot-${i}`).classList.add("animate-pulse");
			break;
			case 'Fly':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-gray-600`);
				document.getElementById(`party-slot-${i}`).classList.add("animate-spin");
			break;
			case 'Freeze':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-blue-600`);
			break;
			case 'Frog':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-lime-600`);
				document.getElementById(`party-slot-${i}`).classList.add(`animate-bounce`);
			break;
			case 'Happy':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-yellow-600`);
				document.getElementById(`party-slot-${i}`).classList.add(`animate-bounce`);
			break;
			case 'Mute':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-slate-600`);
			break;
			case 'Panic':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-violet-600`);
				document.getElementById(`party-slot-${i}`).classList.add(`animate-bounce`);
			break;
			case 'Poison':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-purple-600`);
				document.getElementById(`party-slot-${i}`).classList.add("animate-pulse");
			break;
			case 'Shock':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-yellow-600`);
				document.getElementById(`party-slot-${i}`).classList.add(`animate-bounce`);
			break;
			case 'Sleep':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-slate-600`);
				document.getElementById(`party-slot-${i}`).classList.add(`rotate-180`);
			break;
			case 'Stone':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-gray-600`);
			break;
			case 'Stun':
				document.getElementById(`party-slot-${i}`).classList.add(`bg-cyan-600`);
			break;
			default:	
		}
			
    partySlot.innerHTML = `
			<div class="flex justify-center gap-3 cursor-pointer click-sfx w-full h-full" data-clicksound="sounds/Okay.mp3" data-volume="0.5">
			
			<div class="space-y-3">
				<img alt="${player.Name}" class="pic card xs:min-w-6 sm:size-7 sm:min-w-7 md:min-w-8 md:size-8 size-6 hidden border-4 border-double border-neutral" id="avatar-${i}">
				<img src="views/${icon}" alt="${player.Status}" class="xs:min-w-7 sm:size-8 sm:min-w-8 md:min-w-9 md:size-9 size-7">
			</div>
			
			<div class="w-3/4">
              <h3 class="text-white"><i>Lv<b>${player.Level}</b></i> ${player.Name}</h3>
              <div class="stat-bar">
                <div class="bar-bg relative">
                  <div class="bar-fill bg-gradient-to-r from-red-600 to-orange-400" style="width: ${(player.HP_Current / player.HP_Max) * 100}%;"></div>
                  <label class="absolute inset-0 flex items-center text-sm font-bold text-white">
                    HP ${player.HP_Current}/${player.HP_Max}
                  </label>
                </div>
              </div>
              <div class="stat-bar">
                <div class="bar-bg relative">
                  <div class="bar-fill2 bg-gradient-to-r from-blue-600 to-cyan-400" style="width: ${(player.MP_Current / player.MP_Max) * 100}%;"></div>
                  <label class="absolute inset-0 flex items-center text-sm font-bold text-white">
                    MP ${player.MP_Current}/${player.MP_Max}
                  </label>
			  </div>
              </div>
			  <div class="stat-bar" id="player-fate${i}">
                <div class="bar-bg relative">
                  <div class="bar-fill3 bg-gradient-to-r from-green-600 to-lime-400" style="width: ${(player.Fate_Current / player.Fate_Max) * 100}%;"></div>
                  <label class="absolute inset-0 flex items-center text-sm font-bold text-white">
                    FATE ${player.Fate_Current}/${player.Fate_Max}
                  </label>
			  </div>
            </div>
          </div>
		`;
    if (player.Fate_Max === 0) {
      document.getElementById(`player-fate${i}`).classList.add("hidden");
    }		
		async function displayPlayer() {
			const file = await getImageFromIndexedDB(player.id);
			if (file) {
				const url = URL.createObjectURL(file);
				const avatar = document.getElementById(`avatar-${i}`);	
				avatar.src = url;
				avatar.classList.remove("hidden");
				}
			}
		  	displayPlayer();
      }
      } else {
        partySlot.innerHTML = `
		    <div class="flex items-center justify-center cursor-pointer h-full">
		    <p class="p-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-base-100 font-bold truncate flex-shrink">EMPTY</p></div>`;
      }
    }
    if (!noevent) {
      attachPartySlotClickEvents();
    }
  }
  populatePartySlots(getPlayers(), getParty());
  updateCornerDisplay();

  const cornerdisplay = document.getElementById("corner-display");
  const playerForm = document.getElementById("player-form");
  const formPlayerName = document.getElementById("form-player-name");
  const formHP = document.getElementById("form-hp");
  const formMP = document.getElementById("form-mp");
  const formFate = document.getElementById("form-fate");
  const formStatus = document.getElementById("form-status");
  const fateIncrease = document.getElementById("fate-increase");
  const fateDecrease = document.getElementById("fate-decrease");
  const formCancel = document.getElementById("form-cancel");
  const formConfirm = document.getElementById("form-confirm");

  if (cornerdisplay) {
    cornerdisplay.addEventListener("click", () => {
      openForm("cornerdisplay");
    });
  }

  let currentPlayer = null;

  function openForm(formType, player = null, playerid = null, skillid = null) {
    const formDisplay = document.getElementById("player-form"); // Ensure this element exists
    if (!formDisplay) {
      console.error("Error: 'formDisplay' element not found.");
      return;
    }
    // Update the form display dynamically based on the formType
    updateFormDisplay(formType, player, playerid, skillid);

    // Remove the hidden class to show the form
    playerForm.classList.remove("hidden");
  }

  // Close Form Function
  function closeForm() {
    termtext(`<color:yellow>Closing</color>.\n`);
    const formElement = document.querySelector(".form"); // Select the form element
	  if (formElement) {
		// Add the 'closing' class to trigger the animation
		formElement.classList.add("closing");
		currentPlayer = null;
		let formCancel = document.getElementById(null);
		let formConfirm = document.getElementById(null);
		const partySlots = document.querySelectorAll(".party-member");
		partySlots.forEach((slot) => {
		  slot.classList.remove("party-member-selected");
		});
		// Wait for the animation to finish before clearing the form
		formElement.addEventListener(
		  "animationend",
		  () => {
			playerForm.classList.add("hidden");
			cornerdisplay.classList.remove("corner-button-selected");
		  },
		  { once: true } // Ensure this listener runs only once
		);
	  }
  }

  // Attach Click Events to Player Slots
  function attachPartySlotClickEvents() {
    const partySlots = document.querySelectorAll(".party-member");

    partySlots.forEach((slot, index) => {
      // Remove any existing click listener
      slot.replaceWith(slot.cloneNode(true)); // Clone and replace the node to clear listeners
      const newSlot = document.querySelectorAll(".party-member")[index]; // Get the new node

      // Add the click listener to the new element
      newSlot.addEventListener("click", () => {
        const players = getPlayers();
        const party = getParty();
        const playerId = party[`slot${index + 1}`];
        const player = players.find((p) => p.id === playerId);
        if (player) {
          newSlot.classList.add("party-member-selected");
          openForm("quick", player);
        }
      });
    });
  }

  const tabs = document.querySelectorAll(".tab-button");
  const bottomDisplay = document.getElementById("bottom-display");
  let currentTab = null;

  // Handle tab switching
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.getAttribute("data-tab");

      // Check if the same tab is clicked
      if (currentTab === tabName) {
        playSound("sounds/Negative.mp3");
        // Reset the bottom display if the same tab is clicked
        updateBottomDisplay("None");
        currentTab = null; // Reset the current tab
        // Unhighlight all tabs
        tabs.forEach((t) => t.classList.remove("tab-button-selected"));
        return;
      }
      // Unhighlight all tabs
      tabs.forEach((t) => t.classList.remove("tab-button-selected"));

      // Highlight the current tab
      tab.classList.add("tab-button-selected");

      // Update the bottom display based on the selected tab
      if (currentTab) {
       // termtext("<color:yellow>Closing</color>.\n\n");
      }
      playSound("sounds/Okay.mp3");
      currentTab = tabName;
      updateBottomDisplay(tabName);
    });
  });

  // Update the bottom display based on the selected tab
  function updateBottomDisplay(tabName) {
    switch (tabName) {
      case "comp":
        termtext(`<color:green>DDS-NET@${user}</color>:<color:blue>~/COMP</color>$ Opening Computer protocol.\n`);
		triggerLED('/led/comp');
        bottomDisplay.innerHTML = `
					<div class="flex justify-center p-4  motion-reduced">
						<div class="menu card grid grid-cols-2 gap-2 flex bg-gradient-to-b shadow-lg from-slate-950 to- bg-#000 p-4 w-full text-white rounded-md bg-opacity-50 shadow-lg shadow-primary/50">
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" id="createuser-button" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3" data-volume="0.5">Create User</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" id="deleteusers-button" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3" data-volume="0.5">Delete User</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" id="summonuser-button" data-clicksound="sounds/Okay.mp3">Summon User</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" id="returnuser-button" data-clicksound="sounds/Okay.mp3">Return User</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="resetdata-button">Reset Data</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="autorecover-button">Auto Recover</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" id="cancel-button" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3" data-volume="0.5">Cancel</div>
						</div>
					</div>
				`;

        // Add the event listener dynamically after the HTML is inserted
        const cancel = document.getElementById("cancel-button");
        const createuser = document.getElementById("createuser-button");
        const deleteuser = document.getElementById("deleteusers-button");
        const summonuser = document.getElementById("summonuser-button");
        const returnuser = document.getElementById("returnuser-button");
        const resetdata = document.getElementById("resetdata-button");
        const autorecover = document.getElementById("autorecover-button");
        if (autorecover) {
          autorecover.addEventListener("click", () => {
            // Iterate through each party slot
            const party = getParty();
            const players = getPlayers();
            Object.values(party).forEach((playerId) => {
              if (!playerId) return; // Skip empty slots

              // Find the player object
              const player = players.find((p) => p.id === playerId);
              if (player) {
                // Update the "_Current" stats to match the "_Max" stats
                player.Status = "Normal";
                const keysToUpdate = Object.keys(player).filter((key) => key.endsWith("_Max"));
                keysToUpdate.forEach((maxKey) => {
                  const currentKey = maxKey.replace("_Max", "_Current");
                  if (player[currentKey] !== undefined) {
                    player[currentKey] = player[maxKey];
                  }
                });
                termtext(`<anim:term-green><color:blue>${player.Name}</color> has been <b>restored</b>.\n`);
              }
            });

            // Save the updated players back to local storage
            setPlayers(players);
            playSound("sounds/Heal.mp3");
          });
        }
        if (resetdata) {
          resetdata.addEventListener("click", () => {
            openForm("resetdata");
          });
        }
        if (returnuser) {
          returnuser.addEventListener("click", () => {
            openForm("returnuser");
          });
        }
        if (deleteuser) {
          deleteuser.addEventListener("click", () => {
            openForm("deleteuser");
          });
        }
        if (createuser) {
          createuser.addEventListener("click", () => {
            openForm("usercreation");
          });
        }
        if (summonuser) {
          summonuser.addEventListener("click", () => {
            openForm("summonuser");
          });
        }
        if (cancel) {
          cancel.addEventListener("click", () => {
            updateBottomDisplay("None");
          });
        }
        break;
      case "fight":
        termtext(`<color:green>DDS-NET@${user}</color>:<color:blue>~/FIGHT</color>$ Opening Combat protocol.\n`);
        triggerLED('/led/fight');
        bottomDisplay.innerHTML = `
					<div class="flex justify-center p-4  motion-reduced">
						<div class="menu card grid grid-cols-2 gap-2 flex bg-gradient-to-b shadow-lg from-slate-950 to- bg-#000 p-4 w-full text-white rounded-md bg-opacity-50 shadow-primary/50">
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="melee-button">Melee Attack</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="meleep-button">Melee Power</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="magic-button">Magic Attack</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="magicp-button">Magic Power</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="ranged-button">Ranged Attack</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="rangedp-button">Ranged Power</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="evade-button">Evade Roll</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" id="cancel-button" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3" data-volume="0.5">Cancel</div>
						</div>
					</div>
				`;
        const cancel2 = document.getElementById("cancel-button");
        if (cancel2) {
          cancel2.addEventListener("click", () => {
            updateBottomDisplay("None");
          });
        }
        const evade = document.getElementById("evade-button");
        if (evade) {
          evade.addEventListener("click", () => {
            openForm("tnroll", "evade");
          });
        }
        const meleep = document.getElementById("meleep-button");
        if (meleep) {
          meleep.addEventListener("click", () => {
            openForm("proll", "meleep");
          });
        }
        const magicp = document.getElementById("magicp-button");
        if (magicp) {
          magicp.addEventListener("click", () => {
            openForm("proll", "magicp");
          });
        }
        const rangedp = document.getElementById("rangedp-button");
        if (rangedp) {
          rangedp.addEventListener("click", () => {
            openForm("proll", "rangedp");
          });
        }
        const melee = document.getElementById("melee-button");
        if (melee) {
          melee.addEventListener("click", () => {
            openForm("tnroll", "melee");
          });
        }
        const magic = document.getElementById("magic-button");
        if (magic) {
          magic.addEventListener("click", () => {
            openForm("tnroll", "magic");
          });
        }
        const ranged = document.getElementById("ranged-button");
        if (ranged) {
          ranged.addEventListener("click", () => {
            openForm("tnroll", "ranged");
          });
        }
        break;
      case "skills":
		termtext(`<color:green>DDS-NET@${user}</color>:<color:blue>~/SKILLS</color>$ Opening Skill protocol.\n`);
		triggerLED('/led/skills');
        bottomDisplay.innerHTML = `
					<div class="flex justify-center p-4  motion-reduced">
						<div class="menu card grid grid-cols-2 gap-2 flex bg-gradient-to-b shadow-lg from-slate-950 to- bg-#000 p-4 w-full text-white rounded-md bg-opacity-50 shadow-primary/50">
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" id="tnroll-button" data-clicksound="sounds/Okay.mp3">Target Number Roll</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" id="proll-button" data-clicksound="sounds/Okay.mp3">Power Roll</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" id="talk-button" data-clicksound="sounds/Okay.mp3">Talk Roll</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="initiative-button">Initiative Roll</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" id="recover-button" data-clicksound="sounds/Okay.mp3">Recovery Roll</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" id="surprise-button" data-clicksound="sounds/Okay.mp3">Encounter Roll</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" id="cancel-button" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3" data-volume="0.5">Cancel</div>
						</div>
					</div>
				`;
        const cancel3 = document.getElementById("cancel-button");
        if (cancel3) {
          cancel3.addEventListener("click", () => {
            updateBottomDisplay("None");
          });
        }
        const tnroll = document.getElementById("tnroll-button");
        if (tnroll) {
          tnroll.addEventListener("click", () => {
            openForm("tnroll");
          });
        }
        const proll = document.getElementById("proll-button");
        if (proll) {
          proll.addEventListener("click", () => {
            openForm("proll");
          });
        }
        const talk = document.getElementById("talk-button");
        if (talk) {
          talk.addEventListener("click", () => {
            openForm("tnroll", "talk");
          });
        }
        const recover = document.getElementById("recover-button");
        if (recover) {
          recover.addEventListener("click", () => {
            openForm("tnroll", "recover");
          });
        }
        const surprise = document.getElementById("surprise-button");
        if (surprise) {
          surprise.addEventListener("click", () => {
            openForm("tnroll", "surprise");
          });
        }
        const initiative = document.getElementById("initiative-button");
        if (initiative) {
          initiative.addEventListener("click", () => {
            openForm("proll", "initiative");
          });
        }
        break;
      case "status":
		termtext(`<color:green>DDS-NET@${user}</color>:<color:blue>~/STATUS</color>$ Opening Analysis protocol.\n`);
		triggerLED('/led/status');
        bottomDisplay.innerHTML = `
					<div class="flex justify-center p-4  motion-reduced">
						<div class="menu card grid grid-cols-2 gap-2 flex bg-gradient-to-b shadow-lg from-slate-950 to- bg-#000 p-4 w-full text-white rounded-md bg-opacity-50 shadow-primary/50">
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="edituser-button">Edit User</div>
						  <div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="assign-button">Assign Skills</div>
							<!-- <div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3">Import Users (WIP)</div> -->
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="help-button">Help</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" id="cancel-button" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3" data-volume="0.5">Cancel</div>
						</div>
					</div>
				`;
        const help = document.getElementById("help-button");
        if (help) {
          help.addEventListener("click", () => {
            updateBottomDisplay("help");
          });
        }
        const edituser = document.getElementById("edituser-button");
        if (edituser) {
          edituser.addEventListener("click", () => {
            openForm("edituser");
          });
        }
        const assign = document.getElementById("assign-button");
        if (assign) {
          assign.addEventListener("click", () => {
            openForm("assign");
          });
        }
        const cancel4 = document.getElementById("cancel-button");
        if (cancel4) {
          cancel4.addEventListener("click", () => {
            updateBottomDisplay("None");
          });
        }
        break;
      case "change":
        termtext(`<color:green>DDS-NET@${user}</color>:<color:blue>~/CHANGE</color>$ Opening Editing protocol.\n`);
		triggerLED('/led/change');
        bottomDisplay.innerHTML = `
					<div class="flex justify-center p-4  motion-reduced">
						<div class="menu card grid grid-cols-2 gap-2 flex bg-gradient-to-b shadow-lg from-slate-950 to- bg-#000 p-4 w-full text-white rounded-md bg-opacity-50 shadow-primary/50">
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="reorder-button">Party Order</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="skillcomp-button">Skill Compendium</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="config-button">Config</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" id="cancel-button" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3" data-volume="0.5">Cancel</div>
						</div>
					</div>
				`;
        const reorder = document.getElementById("reorder-button");
        const skillcomp = document.getElementById("skillcomp-button");
        const cancel5 = document.getElementById("cancel-button");
        const config = document.getElementById("config-button");
        if (skillcomp) {
          skillcomp.addEventListener("click", () => {
            openForm("skillcomp");
          });
        }
        if (config) {
          config.addEventListener("click", () => {
            openForm("config");
          });
        }
        if (reorder) {
          reorder.addEventListener("click", () => {
            openForm("reorder");
          });
        }
        if (cancel5) {
          cancel5.addEventListener("click", () => {
            updateBottomDisplay("None");
          });
        }
        break;
      case "help":
		termtext(`<color:green>DDS-NET@${user}</color>:<color:blue>~/STATUS/HELP</color>$ Opening Assistance protocol.\n`);
		triggerLED('/led/help');
        bottomDisplay.innerHTML = `
					<div class="flex justify-center p-4  motion-reduced">
						<div class="menu card grid grid-cols-2 gap-2 flex bg-gradient-to-b shadow-lg from-slate-950 to- bg-#000 p-4 w-full text-white rounded-md bg-opacity-50 shadow-primary/50">
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="about-button">About DDS-NET</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="support-button">Feedback / Contribution</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="creation-button">Character Creation</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="rolling-button">Dice Rolling</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="management-button">Party Management</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" data-hoversound="sounds/cursor.mp3" data-volume="0.5" data-clicksound="sounds/Okay.mp3" id="controls-button">Keyboard Controls</div>
							<div tabindex="0" class="menu-option hover-sfx click-sfx hover:shadow-md hover:shadow-accent/50" id="cancel-button" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3" data-volume="0.5">Cancel</div>
						</div>
					</div>
				`;
		const support = document.getElementById("support-button");
        if (support) {
          support.addEventListener("click", () => {
            termtext("<color:yellow>Help</color> <b>Support / Contribution</b>.\nIf you have any questions or feedback feel free to reach out to etherawaits on discord. If you wish to support my project, please consider helping me with my hosting costs. You can donate at <u>https://ko-fi.com/etherawaits</u>. This project is open source! You can contribute and peek inside the system at <u>https://github.com/EtherAwaits/DDS-NET</u>.\n\n");
          });
        }
        const about = document.getElementById("about-button");
        if (about) {
          about.addEventListener("click", () => {
            termtext("<color:yellow>Help</color> <b>About DDS-NET</b>.\nDDS-NET was created by <u>EtherAwaits</u> as a tool for party management and dice rolling for the Shin Megami Tensei TTRPG. The layout and style is inspired by the classic SNES games. Images and Sound effects are from Shin Megami Tensei as well as Final Fantasy 6. Skill icons created by <u>Q-Bit</u>.\n\n");
          });
        }
        const controls = document.getElementById("controls-button");
        if (controls) {
          controls.addEventListener("click", () => {
            termtext("<color:yellow>Help</color> <b>Keyboard Controls</b>.\nDDS-NET is designed to be able to fit and work on many screens, including full keyboard functionality. Tabs and menus can be navigated simply with arrow keys with ENTER to click and ESC to return. Forms can be accessed by using the TAB key to move from each element, SHIFT + TAB to move in reverse.\n\n");
          });
        }
        const management = document.getElementById("management-button");
        if (management) {
          management.addEventListener("click", () => {
            termtext("<color:yellow>Help</color> <b>Party Management</b>.\nOnce created, characters can be added to the party under the COMP tab. By clicking on an active party member you can quickly adjust their stats. You can quickly lower HP or MP by the ammount input, or raise them by entering a negative number. You can swap active party member positions under the CHANGE tab.\n\n");
          });
        }
        const rolling = document.getElementById("rolling-button");
        if (rolling) {
          rolling.addEventListener("click", () => {
            termtext("<color:yellow>Help</color> <b>Rolling Dice</b>.\nThe main dice rolling functions for Target Number and Power rolls can be found under the SKILLS tab. There are many other pre-sets under the FIGHT and SKILLS tab to make rolling quicker. It does not take into account the stats gained from skills and equipment. These must be added manually under the Bonus text field. Stats like HP, MP and Fate can also be quickly subtracted as costs to skills and magic.\n\n");
          });
        }
        const creation = document.getElementById("creation-button");
        if (creation) {
          creation.addEventListener("click", () => {
            termtext("<color:yellow>Help</color> <b>Character Creation</b>.\nDDS-NET is not meant to be a full replacement for a character sheet or VTT You can create or delete characters both Players and NPC's under the COMP tab. These are all saved to your local browser each time changes are made. If any major errors occur it can likely be fixed by deleting the corrupted data.\n\n");
          });
        }
        const cancel6 = document.getElementById("cancel-button");
        if (cancel6) {
          cancel6.addEventListener("click", () => {
            updateBottomDisplay("None");
          });
        }
        break;
      default:
        tabs.forEach((t) => t.classList.remove("tab-button-selected"));
        bottomDisplay.innerHTML = `
					<div class="grid grid-cols-3 gap-2 p-4 party-menu motion-reduce" id="party-list">
						<!-- Party Member Cards -->
						<div class="party-member card bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-1" tabindex="0"></div>
						<div class="party-member card bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-2" tabindex="0"></div>
						<div class="party-member card bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-3" tabindex="0"></div>
						<div class="party-member card bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-4" tabindex="0"></div>
						<div class="party-member card bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-5" tabindex="0"></div>
						<div class="party-member card bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-6" tabindex="0"></div>
					</div>
					`;
        currentTab = null;
        populatePartySlots(getPlayers(), getParty());
		termtext(`<color:green>DDS-NET@${user}</color>:<color:blue>~</color>$ \n`);
		triggerLED('/led/online');
    }
  }
  const formDisplay = document.getElementById("player-form");

  function updateFormDisplay(formName, mode = null, playerid = null, skillid = null) {
    const formDisplay = document.getElementById("player-form");
    switch (formName) {
      case "quick":
        currentPlayer = mode;
        termtext(`<color:yellow>Opening</color> Data Analyzer for <color:blue>${currentPlayer.Name}</color>.\n`);
        formDisplay.innerHTML = `  
			   <div class="form text-bold text-white p-4 bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">  
				  <h1 class="text-center font-bold" id="form-player-name">Adjust Player</h2> 
				  <div class="italic text-xs mb-2">Lower HP & MP Use Negative Values to Heal</div>

				  <!-- Adjust HP & MP -->  
				  <div class="mb-2 grid grid-cols-4 gap-2 max-w-80">  
					<label>HP</label>  
					<input type="number" id="form-hp" class="input form-input hover-sfx" data-hoversound="sounds/cursor.mp3">  
					<label>MP</label>  
					<input type="number" id="form-mp" class="input form-input hover-sfx" data-hoversound="sounds/cursor.mp3">  
				  </div>  
				  <!-- Status Dropdown -->  
				  <div class="mb-4 grid grid-cols-4 gap-2 max-w-80">  
					<label>Status</label>  
					<select id="form-status" class="select select-xs max-w-xs form-input hover-sfx" data-hoversound="sounds/cursor.mp3">  
					   <option>Normal</option>  
					   <option>Low_HP</option>  
					   <option>Bind</option>  
					   <option>Dead</option>  
					   <option>Charm</option>  
					   <option>Cursed</option>  
					   <option>Fly</option>  
					   <option>Freeze</option>  
					   <option>Frog</option>  
					   <option>Happy</option>  
					   <option>Mute</option>  
					   <option>Panic</option>  
					   <option>Poison</option>  
					   <option>Shock</option>  
					   <option>Sleep</option>  
					   <option>Stone</option>  
					   <option>Stun</option>  
					</select>  
			   
				  <!-- Adjust Fate -->  
					<label>Fate</label>  
					<div class="flex justify-start items-center space-x-2">  
					   <button id="fate-decrease" class="btn form-input btn-xs btn-square hover-sfx" data-hoversound="sounds/cursor.mp3">-</button>  
					   <span id="form-fate" class="mx-2">0</span>  
					   <button id="fate-increase" class="btn btn-xs btn-square form-input hover-sfx" data-hoversound="sounds/cursor.mp3">+</button>   
				  </div>  
				  </div>  

          <div id="skill-display"></div>
				  
				  <!-- Buttons -->  
				  <div class="flex justify-center space-x-4 mt-4 w-full">  
					<button id="form-cancel" class="btn btn-sm btn-square form-input click-sfx hover-sfx" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3" data-volume="0.5">X</button>  
					<button id="form-confirm" class="btn btn-sm btn-square form-input click-sfx hover-sfx" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3" data-volume="0.5">✔</button>  
				  </div>  
			   </div>  
				`;
        setupFormEventListenersQuick();
        updateFormValuesQuick(currentPlayer);
        let player = currentPlayer;
        compendium = getskillComp();
        if (!player.skills) {
          players = getPlayers();
          player = players.find((p) => p.id === player.id);
          player.skills = [];
          localStorage.setItem('players', JSON.stringify(players));
        }
        document.getElementById("skill-display").innerHTML = `
          <div class="card grid grid-cols-1 p-12 gap-2 bg-base-300 border-neutral border-2 max-h-80 overflow-y-auto">
            ${compendium.filter(skill => player.skills.includes(skill.id)).map((skill) => {
            return `
          <div class="btn grid grid-cols-2 bg-gradient-to-br from-primary to- hover:border-accent hover:border-single hover:border-2 hover:shadow-lg hover:shadow-accent/50 p-2 tooltip tooltip-secondary" data-tip="${skill.description}" id="skill-${skill.id}">
            <div class="flex gap-2 justify-start items-center">
              <img alt="${skill.Type}" class="size-8 rounded-full drop-shadow-lg" src="views/${skill.type}.png">
              <h3 class="font-bold truncate text-sm text-left">${skill.name}</h3>
            </div>
            <div class="flex gap-2 justify-end items-center">
              <p id="cost-label-${skill.id}" class="opacity-80 rounded-full p-1 place-self-center text-xs text-right w-16 sm:w-20 bg-base-300 border-neutral border-2">${skill.costNum} <span class="text-yellow-400">${skill.costType}</span></p>
            </div>
          </div>
            `;
          }).join("")}
        </div>
        `;
        // Hide cost label if no cost
        compendium.forEach((skill) => {
          const costLabel = document.querySelector(`#cost-label-${skill.id}`);
          if (skill.costType === "None" && costLabel) {
            costLabel.classList.add("opacity-0");
          }
        });

        compendium.forEach((skill) => {
          const skillButton = document.getElementById(`skill-${skill.id}`);
          if (skillButton) {
            skillButton.addEventListener("click", () => {
              useSkill(player.id, skill.id);
            });
          }
        });

        // Implements the logic for using a skill
        function useSkill(playerId, skillId) {
          const players = getPlayers();
          const player = players.find((p) => p.id === playerId);
          const skill = compendium.find((s) => s.id === skillId);
          playSound("sounds/Okay.mp3");
          termtext(`<color:blue>${player.Name}</color> used <color:purple>${skill.name}</color>.\n${skill.description}\n`);
          if (skill.costType === "FATE") {
            if (player.Fate_Current - skill.costNum >= 0) {
              player.Fate_Current = Math.min(player.Fate_Max, Math.max(0, player.Fate_Current - skill.costNum));
              console.log(player.Fate_Current);
            } else {
            playSound("sounds/Dead.mp3");
            termtext(`<anim:term-red><color:red>ERROR </color><color:blue>${player.Name}</color> does not have enough Fate to use <color:purple>${skill.name}</color>.\n`);
            }
          }
          switch (skill.roll) {
            case "Attack":
              openForm("tnroll", "skill", player.id, skill.id);
            break;
            case "TN":
              openForm("tnroll", "skill", player.id, skill.id);
            break;
            case "Power":
              openForm("proll", "skill", player.id, skill.id);
            break;
            case "Passive":
              switch (skill.costType) {
                case "HP":
                  player.HP_Current = Math.min(player.HP_Max, Math.max(0, player.HP_Current - skill.costNum));
                break;
                case "MP":
                  player.MP_Current = Math.min(player.MP_Max, Math.max(0, player.MP_Current - skill.costNum));
                  break;
                break;
                default:
              }
              setPlayers(players);
              populatePartySlots(getPlayers(), getParty());
              closeForm();
            break;
          }
          
          
        }

      break;
      case "usercreation":
        termtext(`<color:yellow>Opening</color> User Creator.\n`);
        formDisplay.innerHTML = ` 
				<div class="form text-xs text-white place-items-center text-bold p-4 max-w-[640px] bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">  
					<h2 class="text-center font-bold text-lg mb-4">Register New User</h2> 
					<div class="grid grid-cols-2 gap-2 max-w-96 md:max-w-none> 
						<label for="Name">Input Username:</label>  
						<input class="input form-input hover-sfx" type="text" id="Name" name="Name" maxlength="24" data-hoversound="sounds/cursor.mp3" placeholder="Your Name Please...">  
					</div>
					<br>
					<div class="grid grid-cols-4 landscape:grid-cols-8 md:grid-cols-8 gap-2 max-w-96 md:max-w-none">
					<label for="Type">Type:</label>  
						<select class="select select-xs form-input hover-sfx" id="Type" name="Type" data-hoversound="sounds/cursor.mp3">  
							<option value="Human">Human</option>  
							<option value="Demon">Demon</option>  
							<option value="Other">Other</option> 
						</select>
					<label for="Level">Level:</label>  
					<input class="input form-input hover-sfx" type="number" id="Level" name="Level" min="1" max="100" placeholder="1-100" data-hoversound="sounds/cursor.mp3" required> 
					
					<label for="HP_Max">Max HP:</label>  
					<input class="input form-input hover-sfx" placeholder="VT+L*m" type="number" id="HP_Max" name="HP_Max" min="0" data-hoversound="sounds/cursor.mp3" required>  
					<label for="MP_Max">Max MP:</label>  
					<input class="input form-input hover-sfx" placeholder="MG+L*m" type="number" id="MP_Max" name="MP_Max" min="0" data-hoversound="sounds/cursor.mp3" required>  
					
					<label for="Fate_Max">Max Fate:</label>  
					<input class="input form-input hover-sfx" placeholder="LK/5+5" type="number" id="Fate_Max" name="Fate_Max" min="0" data-hoversound="sounds/cursor.mp3" required>
					<label for="Initiative">Initiative:</label>  
					<input class="input form-input hover-sfx" placeholder="AG+L/2" type="number" id="Initiative" name="Initiative" min="0" data-hoversound="sounds/cursor.mp3" required>
					<label for="Strength">Strength:</label>				
					<input class="input form-input hover-sfx" placeholder="0-40" type="number" id="Strength" name="Strength" min="0" data-hoversound="sounds/cursor.mp3" required> 
					<label for="Strength">STR TN:</label>  
					<input class="input form-input hover-sfx" placeholder="ST*5+L" type="number" id="STR_TN" name="STR_TN" min="0" data-hoversound="sounds/cursor.mp3" required>
					<label for="Magic">Magic:</label>  
					<input class="input form-input hover-sfx" placeholder="0-40" type="number" id="Magic" name="Magic" min="0" data-hoversound="sounds/cursor.mp3" required> 
					<label for="Magic">MG TN:</label>  
					<input class="input form-input hover-sfx" placeholder="MG*5+L" type="number" id="MG_TN" name="MG_TN" min="0" data-hoversound="sounds/cursor.mp3" required> 
					<label for="Vitality">Vitality:</label>  
					<input class="input form-input hover-sfx" placeholder="0-40" type="number" id="Vitality" name="Vitality" min="0" data-hoversound="sounds/cursor.mp3" required> 
					<label for="Vitality">VT TN:</label>  
					<input class="input form-input hover-sfx" placeholder="VT*5+L" type="number" id="VT_TN" name="VT_TN" min="0" data-hoversound="sounds/cursor.mp3" required>
					<label for="Agility">Agility:</label>  
					<input class="input form-input hover-sfx" placeholder="0-40" type="number" id="Agility" name="Agility" min="0" data-hoversound="sounds/cursor.mp3" required>
					<label for="Agility">AG TN:</label>  
					<input class="input form-input hover-sfx" placeholder="AG*5+L" type="number" id="AG_TN" name="AG_TN" min="0" data-hoversound="sounds/cursor.mp3" required>  
					<label for="Luck">Luck:</label>  
					<input class="input form-input hover-sfx" placeholder="0-40" type="number" id="Luck" name="Luck" min="0" data-hoversound="sounds/cursor.mp3" required>
					<label for="Luck">LK TN:</label>  
					<input class="input form-input hover-sfx" placeholder="LK*5+L" type="number" id="LK_TN" name="LK_TN" min="0" data-hoversound="sounds/cursor.mp3" required> 

					<label for="Melee_Power">Melee Power:</label>  
					<input class="input form-input hover-sfx" placeholder="ST+L" type="number" id="Melee_Power" name="Melee_Power" min="0" data-hoversound="sounds/cursor.mp3" required>  
					<label for="Magic_Power">Magic Power:</label>  
					<input class="input form-input hover-sfx" placeholder="MG+L" type="number" id="Magic_Power" name="Magic_Power" min="0" data-hoversound="sounds/cursor.mp3" required>  
					<label for="Ranged_Power">Ranged Power:</label>  
					<input class="input form-input hover-sfx" placeholder="AG" type="number" id="Ranged_Power" name="Ranged_Power" min="0" data-hoversound="sounds/cursor.mp3" required>  
					
					<label for="Dodge_TN">Dodge TN:</label>  
					<input class="input form-input hover-sfx" type="number" placeholder="AG+10" id="Dodge_TN" name="Dodge_TN" min="0" data-hoversound="sounds/cursor.mp3" required>  
					<label for="Talk_TN">Talk TN:</label>  
					<input class="input form-input hover-sfx" type="number" placeholder="LK*2+20" id="Talk_TN" name="Talk_TN" min="0" data-hoversound="sounds/cursor.mp3" required>
					</div>  
					
					<div class="mt-2">
					<label for="playerImage">Add Avatar:</label>
					<input class="file-input file-input-sm form-input hover-sfx" type="file" id="playerImage" data-hoversound="sounds/cursor.mp3">
					<img class="w-8 h-8 hidden" id="playerImageDisplay" alt="Player Image">
					</div>
					
					<div class="flex justify-center space-x-12 mt-4 p-2">
						<input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
						<input class="btn btn-sm btn-square form-input hover-sfx" type="submit" id="form-confirm" value="✔" data-hoversound="sounds/cursor.mp3">
					</div>
				`;

        let formCancel = document.getElementById("form-cancel");
        let formConfirm = document.getElementById("form-confirm");
        formCancel.addEventListener("click", closeForm);

        document.getElementById("form-confirm").addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default form submission behavior

            // Helper function to validate numeric inputs
            const validateNumber = (value, min, max) => {
              const num = parseInt(value);
              return !isNaN(num) && num >= min && num <= max;
            };

            // Collect and validate form inputs
            const formElements = {
              Name: document.getElementById("Name").value.trim(),
              Type: document.getElementById("Type").value,
              Level: document.getElementById("Level").value,
              Strength: document.getElementById("Strength").value,
              Magic: document.getElementById("Magic").value,
              Vitality: document.getElementById("Vitality").value,
              Agility: document.getElementById("Agility").value,
              Luck: document.getElementById("Luck").value,
              STR_TN: document.getElementById("STR_TN").value,
              MG_TN: document.getElementById("MG_TN").value,
              VT_TN: document.getElementById("VT_TN").value,
              AG_TN: document.getElementById("AG_TN").value,
              LK_TN: document.getElementById("LK_TN").value,
              Melee_Power: document.getElementById("Melee_Power").value,
              Ranged_Power: document.getElementById("Ranged_Power").value,
              Magic_Power: document.getElementById("Magic_Power").value,
              Initiative: document.getElementById("Initiative").value,
              HP_Max: document.getElementById("HP_Max").value,
              MP_Max: document.getElementById("MP_Max").value,
              Fate_Max: document.getElementById("Fate_Max").value,
              Dodge_TN: document.getElementById("Dodge_TN").value,
              Talk_TN: document.getElementById("Talk_TN").value,
            };
            // Check for missing or invalid values

            if (formElements.Name === "") {
              playSound("sounds/Dead.mp3");
              termtext(`<anim:term-red><color:red>ERROR!!!</color> Missing Name for new user.\n`);
              return;
            }
            for (const [key, value] of Object.entries(formElements)) {
              if (key !== "Name" && key !== "Type") {
                if (!validateNumber(value, 0, 9999)) {
                  playSound("sounds/Dead.mp3");
                  termtext(`<anim:term-red><color:red>ERROR!!!</color> ${key} must be between 0-9999.\n`);
                  return;
                }
              }
            }

            // Generate a unique 24-character ID
            const generateId = () => {
              const chars = "0123456789abcdef";
              let id = "";
              for (let i = 0; i < 24; i++) {
                id += chars[Math.floor(Math.random() * chars.length)];
              }
              return id;
            };

            // Create player object
            const player = {
              id: generateId(),
              Name: formElements.Name,
              Type: formElements.Type,
              Level: parseInt(formElements.Level),
              Strength: parseInt(formElements.Strength),
              Magic: parseInt(formElements.Magic),
              Vitality: parseInt(formElements.Vitality),
              Agility: parseInt(formElements.Agility),
              Luck: parseInt(formElements.Luck),
              Status: "Normal",
              STR_TN: parseInt(formElements.STR_TN),
              MG_TN: parseInt(formElements.MG_TN),
              VT_TN: parseInt(formElements.VT_TN),
              AG_TN: parseInt(formElements.AG_TN),
              LK_TN: parseInt(formElements.LK_TN),
              Melee_Power: parseInt(formElements.Melee_Power),
              Ranged_Power: parseInt(formElements.Ranged_Power),
              Magic_Power: parseInt(formElements.Magic_Power),
              Initiative: parseInt(formElements.Initiative),
              Dodge_TN: parseInt(formElements.Dodge_TN),
              Talk_TN: parseInt(formElements.Talk_TN),
              HP_Max: parseInt(formElements.HP_Max),
              HP_Current: parseInt(formElements.HP_Max), // Match Max
              MP_Max: parseInt(formElements.MP_Max),
              MP_Current: parseInt(formElements.MP_Max), // Match Max
              Fate_Max: parseInt(formElements.Fate_Max),
              Fate_Current: parseInt(formElements.Fate_Max), // Match Max
            };

            // Retrieve existing players from local storage
            const players = getPlayers();

            // Add the new player to the array
            players.push(player);

            // Save the updated players array back to local storage
            setPlayers(players);
            
            playerimage = document.getElementById("playerImage");
            if (playerimage.value !== "")
            {
              const file = playerimage.files[0];
              
              if(file.type.match('image.*'))
              {
                saveImageToIndexedDB(player.id, file);
              }
              else
              {
                playSound("sounds/Dead.mp3");
                termtext(`<anim:term-red><color:red>ERROR!!!</color> Avatar must be an image!\n`);
                return;
              }
            }
            
            playSound("sounds/Comp.mp3");
            termtext(`<anim:term-blue><color:green>Success!</color> User <color:blue>${formElements.Name}</color> has been registered.\n`);
            closeForm();
          });
      break;
      case "summonuser":
        termtext(`<color:yellow>Opening</color> Summoning Program.\n`);
        formDisplay.innerHTML = `
					<div class="form text-white p-4 w-7/8 bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">
					<h2 class="text-center font-bold mb-4">SELECT USER TO SUMMON</h2>
					<select id="player-select" class="select form-input w-full">
						<option value="">-- Select a User --</option>
						<!-- Player options will be dynamically added here -->
					</select>
					<div class="grid grid-cols-3 gap-2 flex p-4" id="empty-slot-list">
						<!-- Empty Party Slot Cards -->
						<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-1" tabindex="0"></div>
						<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-2" tabindex="0"></div>
						<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-3" tabindex="0"></div>
						<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-4" tabindex="0"></div>
						<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-5" tabindex="0"></div>
						<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-6" tabindex="0"></div>
					</div>
					<input class="btn btn-sm btn-square place-self-center form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
				</div>
				`;
        populatePartySlots(getPlayers(), getParty(), true);
        let formCancelerr = document.getElementById("form-cancel");
        formCancelerr.addEventListener("click", closeForm);

        // Populate the player select dropdown
        const updatePlayerDropdown = () => {
          const party = getParty();
          const players = getPlayers();
          const playerSelect = document.getElementById("player-select");
          playerSelect.innerHTML = '<option value="">Select User</option>'; // Reset dropdown

          // Get a set of IDs already in the party
          const partyIds = new Set(Object.values(party).filter((id) => id !== null));

          // Add only players not already in the party
          players.forEach((player) => {
            if (!partyIds.has(player.id)) {
              const option = document.createElement("option");
              option.value = player.id;
              option.textContent = `Lv${player.Level} ${player.Name}`;
              playerSelect.appendChild(option);
            }
          });
        };
        updatePlayerDropdown();
        // Handle slot selection
        document.querySelectorAll(".party-member").forEach((slot, index) => {
          slot.addEventListener("click", () => {
            const party = getParty();
            const players = getPlayers();
            const playerSelect = document.getElementById("player-select");
            const selectedPlayerId = playerSelect.value;

            if (!selectedPlayerId) {
              playSound("sounds/Dead.mp3");
              termtext(`<anim:term-red><color:red>ERROR!!!</color> No User Selected.\n`);
              return;
            }

            const slotKey = `slot${index + 1}`;
            if (party[slotKey] === null) {
              let playerId = selectedPlayerId;
              let currentPlayer = players.find((p) => p.id === playerId);
              party[slotKey] = selectedPlayerId;
              //localStorage.setItem("party", JSON.stringify(party));
              setParty(party);
              playSound("sounds/Whistle.mp3", 1);
              termtext(`<anim:term-blue><color:green>Success</color> <color:blue>${currentPlayer.Name}</color> has been summoned.\n`,
              );
              updatePlayerDropdown(); // Update dropdown after adding a player
              populatePartySlots(getPlayers(), getParty(), true);
            } else {
              playSound("sounds/Dead.mp3");
              termtext(`<anim:term-red><color:red>ERROR!!!</color> Slot is already occupied.\n`,
              );
            }
          });
        });
        break;
      case "returnuser":
        termtext(`<color:yellow>Opening</color> Return Program.\n`);
        formDisplay.innerHTML = `
					<div class="form text-white p-4 w-7/8 bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">
					<h2 class="text-center font-bold mb-4">SELECT USER TO RETURN</h2>
						<div class="grid grid-cols-3 gap-2 flex p-4" id="party-list">
							<!-- Party Member Cards -->
							<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-1" tabindex="0"></div>
							<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-2" tabindex="0"></div>
							<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-3" tabindex="0"></div>
							<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-4" tabindex="0"></div>
							<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-5" tabindex="0"></div>
							<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-6" tabindex="0"></div>
						</div>
						<input class="btn btn-sm btn-square place-self-center form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
					</div>`;
        populatePartySlots(getPlayers(), getParty(), true);
        let formCancelerrr = document.getElementById("form-cancel");
        formCancelerrr.addEventListener("click", closeForm);

        document.querySelectorAll(".party-member").forEach((slot, index) => {
          slot.addEventListener("click", () => {
            const party = getParty();
            const players = getPlayers();
            const slotKey = `slot${index + 1}`;
            if (party[slotKey] !== null) {
              let playerId = party[slotKey];
              let currentPlayer = players.find((p) => p.id === playerId);
              playSound("sounds/RunAway.mp3");
              termtext(`<anim:term-blue><color:green>Success</color> User <color:blue>${currentPlayer.Name}</color> has been returned.\n`);
              party[slotKey] = null;
              //localStorage.setItem("party", JSON.stringify(party));
              setParty(party);
              populatePartySlots(getPlayers(), getParty(), true);
            } else {
              playSound("sounds/Dead.mp3", 1);
              termtext(`<anim:term-red><color:red>ERROR!!!</color> Slot is already empty.\n`);
            }
          });
        });
        break;
      case "reorder":
        termtext(`<color:yellow>Opening</color> Swap Program.\n`);
        formDisplay.innerHTML = `
					<div class="form text-white p-4 w-7/8 bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">
						<h2 class="text-center font-bold mb-4">SELECT SLOTS TO SWAP</h2>
							<div class="grid grid-cols-3 gap-2 flex p-4" id="party-list">
								<!-- Party Member Cards -->
								<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-1" data-slot="slot1" tabindex="0"></div>
								<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-2" data-slot="slot2" tabindex="0"></div>
								<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-3" data-slot="slot3" tabindex="0"></div>
								<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-4" data-slot="slot4" tabindex="0"></div>
								<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-5" data-slot="slot5" tabindex="0"></div>
								<div class="party-member bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-6" data-slot="slot6" tabindex="0"></div>
							</div>
							<input class="btn btn-sm btn-square place-self-center form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
						</div>`;
        populatePartySlots(getPlayers(), getParty(), true);
        let formCancelerrrr = document.getElementById("form-cancel");
        formCancelerrrr.addEventListener("click", closeForm);

        let selectedSlots = [];
        document.querySelectorAll(".party-member").forEach((slot) => {
          slot.addEventListener("click", function () {
            const slotId = this.getAttribute("data-slot");

            // Handle selection
            if (selectedSlots.includes(slotId)) {
              // If already selected, deselect it
              selectedSlots = [];
              document
                .querySelectorAll(".party-member")
                .forEach((slot) =>
                  slot.classList.remove("party-member-selected"),
                );
            } else {
              const party = getParty();
              const players = getPlayers();
              // Add the selected slot
              selectedSlots.push(slotId);
              this.classList.add("party-member-selected");

              // If two slots are selected, perform the swap
              if (selectedSlots.length === 2) {
                const [slot1, slot2] = selectedSlots;

                // Swap the values of the selected slots
                const temp = party[slot1];
                party[slot1] = party[slot2];
                party[slot2] = temp;

                // Save the updated party to localStorage
                setParty(party);
                playSound("sounds/Okay.mp3");
                termtext(`<anim:term-blue><color:green>Success</color> Swap complete between <color:blue>${slot1}</color> and <color:blue>${slot2}</color>.\n`);
                // Reset the selection and UI
                selectedSlots = [];
                document.querySelectorAll(".party-member").forEach((slot) => slot.classList.remove("party-member-selected"));
			        	closeForm();
              }
            }
          });
        });
      break;
      case "resetdata":
        formDisplay.innerHTML = `
					<div class="form text-white p-4 justify-items-center shadow-lg bg-gradient-to-b from-accent to- shadow-lg shadow-secondary/50  motion-reduced">  
						<h2 class="text-center font-bold mb-4">Are you sure you want to permanately delete all Data? </h2>
						<div class="w-full justify-center gap-6 flex">
						<input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
						<input class="btn btn-sm btn-square form-input hover-sfx" type="submit" id="form-confirm" value="✔" data-hoversound="sounds/cursor.mp3">
					</div>
				`;
        termtext(`<anim:term-pulse><color:yellow>Opening</color> <color:red>DATA RESET</color>.\n`);
        let formCanceler = document.getElementById("form-cancel");
        formCanceler.addEventListener("click", closeForm);
        playSound("sounds/warning.mp3");
        let confirmation = document.getElementById("form-confirm");
        confirmation.addEventListener("click", clearLocalStorageData);

        function clearLocalStorageData() {
		      ClearImages();
          localStorage.removeItem("players");
          localStorage.removeItem("party");
          localStorage.removeItem("system");
          localStorage.removeItem("skillComp");
          location.reload();
        }
      break;
      case "edituser":
        termtext(`<color:yellow>Opening</color> User Editor.\n`);
        // Initialize form display
        formDisplay.innerHTML = `
					<div class="form text-xs text-white text-bold p-4 max-w-[640px] max-w-none bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">  
						<h2 class="text-center font-bold text-lg mb-4">Edit User</h2>
						<select id="player-select-inclusive" class="select form-input mb-4 w-full">
							<option value="">Select User</option>
						</select>
						<div id="user-form-content" class="hidden"></div>
						<div class="flex justify-center space-x-12 mt-4 p-2">
							<input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="button" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
							<input class="btn btn-sm btn-square form-input hover-sfx hidden" type="submit" id="form-confirm" value="✔" data-hoversound="sounds/cursor.mp3">
						</div>
					</div>
				`;

        const playerSelect = document.getElementById("player-select-inclusive");
        const userFormContent = document.getElementById("user-form-content");
        const formCancellllll = document.getElementById("form-cancel");
        const formconfirmm = document.getElementById("form-confirm");
        formCancellllll.addEventListener("click", closeForm);
        // Function to populate the dropdown
        const updatePlayerDropdowninclusive = () => {
          const party = getParty(); // Retrieve party details
          const players = getPlayers(); // Retrieve player list

          // Reset the dropdown
          playerSelect.innerHTML = '<option value="">Select User</option>';
          players.forEach((player) => {
            const option = document.createElement("option");
            option.value = player.id;
            option.textContent = `Lv${player.Level} ${player.Name}`;
            playerSelect.appendChild(option);
          });
        };

        // Event listener for dropdown selection
        playerSelect.addEventListener("change", (event) => {
          const selectedId = event.target.value;

          if (selectedId) {
            // Display the rest of the form once a user is selected
            playerSelect.classList.add("hidden");
            userFormContent.classList.remove("hidden");
            formconfirmm.classList.remove("hidden");
            userFormContent.innerHTML = `
							<div class="grid grid-cols-2 gap-2> 
								<label for="Name">Edit Username:</label>  
								<input class="input form-input hover-sfx" type="text" id="Name" name="Name" maxlength="24" data-hoversound="sounds/cursor.mp3" placeholder="Your Name Please...">  
							</div>
							<br>
							<div class="grid grid-cols-4 landscape:grid-cols-8 md:grid-cols-8 gap-2">
							<label for="Type">Type:</label>  
								<select class="select select-xs form-input w-20 hover-sfx" id="Type" name="Type" data-hoversound="sounds/cursor.mp3">  
									<option value="Human">Human</option>  
									<option value="Demon">Demon</option>  
									<option value="Other">Other</option> 
								</select>
							<label for="Status">Status</label>  
							<select id="Status" name="Type" class="select select-xs form-input hover-sfx w-20" data-hoversound="sounds/cursor.mp3">  
							   <option>Normal</option>  
							   <option>Low_HP</option>  
							   <option>Bind</option>  
							   <option>Dead</option>  
							   <option>Charm</option>  
							   <option>Cursed</option>  
							   <option>Fly</option>  
							   <option>Freeze</option>  
							   <option>Frog</option>  
							   <option>Happy</option>  
							   <option>Mute</option>  
							   <option>Panic</option>  
							   <option>Poison</option>  
							   <option>Shock</option>  
							   <option>Sleep</option>  
							   <option>Stone</option>  
							   <option>Stun</option>  
							</select>  
							<label for="Level">Level:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Level" name="Level" min="1" max="100" placeholder="1-100" data-hoversound="sounds/cursor.mp3" required> 
							<label for="Initiative">Initiative:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Initiative" name="Initiative" min="0" data-hoversound="sounds/cursor.mp3" required>
							<label for="HP_Max">Max HP:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="HP_Max" name="HP_Max" min="0" data-hoversound="sounds/cursor.mp3" required>
							<label for="HP_Current">Current HP:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="HP_Current" name="HP_Current" min="0" data-hoversound="sounds/cursor.mp3" required>  
							<label for="MP_Max">Max MP:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="MP_Max" name="MP_Max" min="0" data-hoversound="sounds/cursor.mp3" required>  
							<label for="MP_Current">Current MP:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="MP_Current" name="MP_Current" min="0" data-hoversound="sounds/cursor.mp3" required>  
							<label for="Fate_Max">Max Fate:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Fate_Max" name="Fate_Max" min="0" data-hoversound="sounds/cursor.mp3" required>
							<label for="Fate_Current">Current Fate:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Fate_Current" name="Fate_Current" min="0" data-hoversound="sounds/cursor.mp3" required>
							
							<label for="Strength">Strength:</label>				
							<input class="input form-input w-20 hover-sfx" type="number" id="Strength" name="Strength" min="0" data-hoversound="sounds/cursor.mp3" required> 
							<label for="Strength">STR TN:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="STR_TN" name="STR_TN" min="0" data-hoversound="sounds/cursor.mp3" required>
							<label for="Magic">Magic:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Magic" name="Magic" min="0" data-hoversound="sounds/cursor.mp3" required> 
							<label for="Magic">MG TN:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="MG_TN" name="MG_TN" min="0" data-hoversound="sounds/cursor.mp3" required> 
							<label for="Vitality">Vitality:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Vitality" name="Vitality" min="0" data-hoversound="sounds/cursor.mp3" required> 
							<label for="Vitality">VT TN:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="VT_TN" name="VT_TN" min="0" data-hoversound="sounds/cursor.mp3" required>
							<label for="Agility">Agility:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Agility" name="Agility" min="0" data-hoversound="sounds/cursor.mp3" required>
							<label for="Agility">AG TN:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="AG_TN" name="AG_TN" min="0" data-hoversound="sounds/cursor.mp3" required>  
							<label for="Luck">Luck:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Luck" name="Luck" min="0" data-hoversound="sounds/cursor.mp3" required>
							<label for="Luck">LK TN:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="LK_TN" name="LK_TN" min="0" data-hoversound="sounds/cursor.mp3" required> 

							<label for="Melee_Power">Melee Power:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Melee_Power" name="Melee_Power" min="0" data-hoversound="sounds/cursor.mp3" required>  
							<label for="Ranged_Power">Ranged Power:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Ranged_Power" name="Ranged_Power" min="0" data-hoversound="sounds/cursor.mp3" required>  
							<label for="Magic_Power">Magic Power:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Magic_Power" name="Magic_Power" min="0" data-hoversound="sounds/cursor.mp3" required>  
								 
							<label for="Dodge_TN">Dodge TN:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Dodge_TN" name="Dodge_TN" min="0" data-hoversound="sounds/cursor.mp3" required>  
							<label for="Talk_TN">Talk TN:</label>  
							<input class="input form-input w-20 hover-sfx" type="number" id="Talk_TN" name="Talk_TN" min="0" data-hoversound="sounds/cursor.mp3" required>
							</div>  
							
							<div class="mt-2">
							<label for="playerImage">Edit Avatar:</label>
							<input class="file-input form-input file-input-sm hover-sfx" type="file" id="playerImage" data-hoversound="sounds/cursor.mp3">
							<input class="btn btn-sm form-input hover-sfx click-sfx" type="button" id="image-remove" value="Remove" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3">

							</div>
		      	`;
            const players = getPlayers();
            let currentPlayer = players.find((p) => p.id === selectedId);

            document.getElementById("Name").value = currentPlayer.Name;
            document.getElementById("Type").value = currentPlayer.Type;
            document.getElementById("Status").value = currentPlayer.Status; 
            document.getElementById("Level").value = currentPlayer.Level;
            document.getElementById("HP_Max").value = currentPlayer.HP_Max;
            document.getElementById("MP_Max").value = currentPlayer.MP_Max;
            document.getElementById("HP_Current").value = currentPlayer.HP_Current; 
            document.getElementById("MP_Current").value = currentPlayer.MP_Current; 
            document.getElementById("Fate_Max").value = currentPlayer.Fate_Max;
            document.getElementById("Fate_Current").value = currentPlayer.Fate_Current; 
            document.getElementById("Initiative").value = currentPlayer.Initiative;
            document.getElementById("Strength").value = currentPlayer.Strength;
            document.getElementById("STR_TN").value = currentPlayer.STR_TN;
            document.getElementById("Magic").value = currentPlayer.Magic;
            document.getElementById("MG_TN").value = currentPlayer.MG_TN;
            document.getElementById("Vitality").value = currentPlayer.Vitality;
            document.getElementById("VT_TN").value = currentPlayer.VT_TN;
            document.getElementById("Agility").value = currentPlayer.Agility;
            document.getElementById("AG_TN").value = currentPlayer.AG_TN;
            document.getElementById("Luck").value = currentPlayer.Luck;
            document.getElementById("LK_TN").value = currentPlayer.LK_TN;
            document.getElementById("Melee_Power").value = currentPlayer.Melee_Power; 
		      	document.getElementById("Magic_Power").value = currentPlayer.Magic_Power;
            document.getElementById("Ranged_Power").value = currentPlayer.Ranged_Power;
            document.getElementById("Dodge_TN").value = currentPlayer.Dodge_TN;
            document.getElementById("Talk_TN").value = currentPlayer.Talk_TN;

            const removeimage = document.getElementById("image-remove");
            removeimage.addEventListener("click", (event) => {
              deleteImageFromIndexedDB(currentPlayer.id);
              termtext(`User avatar has been <color:red>deleted</color>.\n`);
            });

            // Function to update a player's data
            formconfirmm.addEventListener("click", (event) => {
              const formElements = {
                Name: document.getElementById("Name").value.trim(),
                Type: document.getElementById("Type").value,
                Status: document.getElementById("Status").value, //
                Level: document.getElementById("Level").value,
                Strength: document.getElementById("Strength").value,
                Magic: document.getElementById("Magic").value,
                Vitality: document.getElementById("Vitality").value,
                Agility: document.getElementById("Agility").value,
                Luck: document.getElementById("Luck").value,
                STR_TN: document.getElementById("STR_TN").value,
                MG_TN: document.getElementById("MG_TN").value,
                VT_TN: document.getElementById("VT_TN").value,
                AG_TN: document.getElementById("AG_TN").value,
                LK_TN: document.getElementById("LK_TN").value,
                Melee_Power: document.getElementById("Melee_Power").value,
                Ranged_Power: document.getElementById("Ranged_Power").value,
                Magic_Power: document.getElementById("Magic_Power").value,
                Initiative: document.getElementById("Initiative").value,
                HP_Max: document.getElementById("HP_Max").value,
                HP_Current: document.getElementById("HP_Current").value, 
                MP_Max: document.getElementById("MP_Max").value,
                MP_Current: document.getElementById("MP_Current").value, 
                Fate_Max: document.getElementById("Fate_Max").value,
                Fate_Current: document.getElementById("Fate_Current").value, 
                Dodge_TN: document.getElementById("Dodge_TN").value,
                Talk_TN: document.getElementById("Talk_TN").value,
              };

              const parseValue = (value) => !isNaN(value) && value.trim() !== "" ? parseInt(value, 10) : 0;
              // Helper function to validate numeric inputs
              const validateNumber = (value, min, max) => {
                const num = parseInt(value);
                return !isNaN(num) && num >= min && num <= max;
              };

              const player = {
                id: currentPlayer.id,
                Name: formElements.Name,
                Type: formElements.Type,
                Level: parseInt(formElements.Level),
                Strength: parseInt(formElements.Strength),
                Magic: parseInt(formElements.Magic),
                Vitality: parseInt(formElements.Vitality),
                Agility: parseInt(formElements.Agility),
                Luck: parseInt(formElements.Luck),
                Status: formElements.Status, 
                STR_TN: parseInt(formElements.STR_TN),
                MG_TN: parseInt(formElements.MG_TN),
                VT_TN: parseInt(formElements.VT_TN),
                AG_TN: parseInt(formElements.AG_TN),
                LK_TN: parseInt(formElements.LK_TN),
                Melee_Power: parseInt(formElements.Melee_Power),
                Ranged_Power: parseInt(formElements.Ranged_Power),
                Magic_Power: parseInt(formElements.Magic_Power),
                Initiative: parseInt(formElements.Initiative),
                Dodge_TN: parseInt(formElements.Dodge_TN),
                Talk_TN: parseInt(formElements.Talk_TN),
                HP_Max: parseInt(formElements.HP_Max),
                HP_Current: parseInt(formElements.HP_Current), 
                MP_Max: parseInt(formElements.MP_Max),
                MP_Current: parseInt(formElements.MP_Current), 
                Fate_Max: parseInt(formElements.Fate_Max),
                Fate_Current: parseInt(formElements.Fate_Current), 
              };

              player.HP_Current = Math.min(player.HP_Max, player.HP_Current);
              player.MP_Current = Math.min(player.MP_Max, player.MP_Current);
              player.Fate_Current = Math.min(player.Fate_Max, player.Fate_Current);
              document.getElementById("HP_Current").value = player.HP_Current; 
              document.getElementById("MP_Current").value = player.MP_Current; 
              document.getElementById("Fate_Current").value = player.Fate_Current; 

              const index = players.findIndex((p) => p.id === currentPlayer.id);
              if (index === -1) return console.error("Player not found!");

              if (formElements.Name === "") {
                playSound("sounds/Dead.mp3");
                termtext(`<anim:term-red><color:red>ERROR!!!</color> Missing Name for user.\n`);
                return;
              }
              for (const [key, value] of Object.entries(formElements)) {
                if (key !== "Name" && key !== "Type" && key !== "Status") {
                  if (!validateNumber(value, 0, 9999)) {
                    playSound("sounds/Dead.mp3");
                    termtext(`<anim:term-red><color:red>ERROR!!!</color> ${key} must be between 0-9999.\n`);
                    return;
                  }
                }
              }
			
          playerimage = document.getElementById("playerImage");
          const file = playerimage.files[0];
          if (file)
          {
            if(file.type.match('image.*'))
            {
              saveImageToIndexedDB(player.id, file);
            }
            else
            {
              playSound("sounds/Dead.mp3");
              termtext(`<anim:term-red><color:red>ERROR!!!</color> Avatar must be an image!\n`);
              return;
            }
          }
              players[index] = player;
              setPlayers(players);
              playSound("sounds/Comp.mp3");
              termtext(`<anim:term-blue><color:green>Success</color> User <color:blue>${player.Name}</color> has been updated.\n`);
              closeForm();
            });
          } else {
            // Hide the form if no user is selected
            userFormContent.classList.add("hidden");
            formconfirmm.classList.add("hidden");
            formconfirmm.removeEventListener("click", updatePlayer);
            userFormContent.innerHTML = ``;
          }
        });
        // Populate the dropdown on initialization
        updatePlayerDropdowninclusive();

      break;
      case "deleteuser":
          formDisplay.innerHTML = `
          <div class="form text-white p-4 w-1/2 shadow-lg bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">  
          <h2 class="text-center font-bold mb-4">SELECT USER TO DELETE</h2>
          <select id="player-select-inclusive" class="select form-input mb-4 w-full">
            <option value="">Select User</option>
          </select>
          <div class="w-full justify-center gap-6 flex">
            <input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
            <input class="btn btn-sm btn-square form-input hover-sfx" type="submit" id="form-confirm" value="✔" data-hoversound="sounds/cursor.mp3">
          </div>
          </div>
        `;

        termtext(`<color:yellow>Opening</color> <color:red>User Deletion</color>.\n`);

        const playerSelectt = document.getElementById("player-select-inclusive");
        let formCancelerrrrrrr = document.getElementById("form-cancel");
        let confirmationn = document.getElementById("form-confirm");
        confirmationn.addEventListener("click", () => userdelete());
        formCancelerrrrrrr.addEventListener("click", closeForm);

        const updatePlayerDropdowninclusivee = () => {
          const players = getPlayers(); // Retrieve player list

          // Reset the dropdown
          playerSelectt.innerHTML = '<option value="">Select User</option>';
          players.forEach((player) => {
          const option = document.createElement("option");
          option.value = player.id;
          option.textContent = `Lv${player.Level} ${player.Name}`;
          playerSelectt.appendChild(option);
          });
        };

        // Call the function to populate the dropdown
        updatePlayerDropdowninclusivee();

        function userdelete() {
        const selectedId = playerSelectt.value;
          const players = getPlayers();
          const party = getParty();

          let currentPlayer = players.find((p) => p.id === selectedId);
          if (!currentPlayer) {
          termtext(`<anim:term-red><color:red>ERROR</color> No user selected.\n`);
          playSound("sounds/Dead.mp3");
          return;
          }

          const index = players.findIndex((p) => p.id === selectedId);
          if (index === -1) {
          termtext(`<anim:term-red><color:red>ERROR</color> User not found.\n`);
          playSound("sounds/Dead.mp3");
          return;
          }

          termtext(`<anim:term-shake><color:green>Success</color> <color:blue>${currentPlayer.Name}</color> has been <color:red>deleted</color>.\n`);
          playSound("sounds/Dead.mp3");

          // Update the party slots
          Object.keys(party).forEach((slotKey) => {
          if (party[slotKey] === currentPlayer.id) {
            party[slotKey] = null;
          }
          });
          setParty(party);
          
          // Remove the player
          deleteImageFromIndexedDB(currentPlayer.id);
          players.splice(index, 1);
          localStorage.setItem("players", JSON.stringify(players));

          updatePlayerDropdowninclusivee();
          closeForm();
        }
    break;
      case "cornerdisplay":
      formDisplay.innerHTML = `
					<div class="form text-white p-4 max-w-64 shadow-lg bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">  
						<h2 class="text-center font-bold mb-4">Update Global Data</h2>
						<div class="grid grid-cols-2">
							<!-- Adjust Moon --> 
							<label id="moon-label">Moon</label>  
								<div class="flex justify-start items-center space-x-2 p-2">  
								   <button id="phase-decrease" class="btn form-input btn-xs btn-square hover-sfx" data-hoversound="sounds/cursor.mp3">-</button>  
								   <span id="form-phase" class="mx-2">0</span>  
								   <button id="phase-increase" class="btn form-input btn-xs btn-square hover-sfx" data-hoversound="sounds/cursor.mp3">+</button>   
								</div>  
								
							<!-- Adjust Macca -->  
							<label id="macca-label">Macca</label>
							<div class="space-x-1 space-y-3">    
								  
								<input type="number" id="macca-form" placeholder="Macca" class="input form-input w-full hover-sfx" min="0" data-hoversound="sounds/cursor.mp3">  
								<div class="grid grid-cols-3">
									<button id="macca-decrease" class="btn btn-xs btn-square form-input hover-sfx" data-hoversound="sounds/cursor.mp3">-</button>
									<button id="macca-increase" class="btn btn-xs btn-square form-input hover-sfx" data-hoversound="sounds/cursor.mp3">+</button>
									<button id="macca-equal" class="btn btn-xs btn-square form-input hover-sfx" data-hoversound="sounds/cursor.mp3">=</button>
								</div>
							</div>  
						</div>
						<div class="w-full justify-center gap-6 p-3 flex">
						<input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
						<input class="btn btn-sm btn-square form-input hover-sfx" type="submit" id="form-confirm" value="✔" data-hoversound="sounds/cursor.mp3">
						</div>
					</div>
				`;
        termtext(`<color:yellow>Opening</color> Global Data Edit.\n`);
        const system = getSystem();
        const formCancelerrrrrr = document.getElementById("form-cancel");
        const formconfirmmm = document.getElementById("form-confirm");
        formCancelerrrrrr.addEventListener("click", endform);
        formconfirmmm.addEventListener("click", confirmupdate);
        const moon = document.getElementById("form-phase");
        const phaseIncrease = document.getElementById("phase-increase");
        const phaseDecrease = document.getElementById("phase-decrease");
        const cornerdisplay = document.getElementById("corner-display");
        const maccaChange = document.getElementById("macca-form");
        const maccaIncrease = document.getElementById("macca-increase");
        const maccaDecrease = document.getElementById("macca-decrease");
        const maccaEqual = document.getElementById("macca-equal");
        cornerdisplay.classList.remove("corner-button-selected");
        cornerdisplay.classList.add("corner-button-selected");
        maccaIncrease.addEventListener("click", increase);
        maccaDecrease.addEventListener("click", decrease);
        maccaEqual.addEventListener("click", equal);

        function decrease() {
          if (maccaChange.value === "") {
            maccaChange.value = 0;
          }
          formmacca = formmacca - maccaChange.value;
          document.getElementById("macca-label").innerHTML = `ћ ${formmacca}`;
        }
        function increase() {
          if (maccaChange.value === "") {
            maccaChange.value = 0;
          }
          formmacca = Number(formmacca) + Number(maccaChange.value);
          document.getElementById("macca-label").innerHTML = `ћ ${formmacca}`;
        }
        function equal() {
          if (maccaChange.value === "") {
            maccaChange.value = 0;
          }
          formmacca = formmacca = maccaChange.value;
          document.getElementById("macca-label").innerHTML = `ћ ${formmacca}`;
        }

        function endform() {
          cornerdisplay.classList.remove("corner-button-selected");
          closeForm();
        }

        function getPhase(moon) {
          let phase = moon % 8;
          if (moon == 0) {
            phase = "NEW";
          } else if (phase == 4) {
            phase = "HALF";
          } else if (moon == 8) {
            phase = "FULL";
          } else {
            phase = `${phase}/8`;
          }
          return phase;
        }

        let formmacca = system.macca;
        let formphase = system.moon;
        let phase = getPhase(formphase);
        let moonicon = `${formphase}.gif`;
        document.getElementById("macca-label").innerHTML = `ћ ${formmacca}`;
        document.getElementById("moon-label").innerHTML = `${phase} MOON`;
        moon.innerHTML = `<img src="views/${moonicon}" alt="${formphase}" class="w-8 h-8 rounded-full shadow-secondary/50 outline-secondary outline-double">`;

        phaseIncrease.addEventListener("click", () => {
          if (formphase >= 15) {
            formphase = 0;
          } else {
            formphase++;
          }
          phase = getPhase(formphase);
          document.getElementById("moon-label").innerHTML = `${phase} MOON`;
          moonicon = `${formphase}.gif`;
          moon.innerHTML = `<img src="views/${moonicon}" alt="${formphase}" class="w-8 h-8 rounded-full shadow-secondary/50 outline-secondary outline-double">`;
        });

        phaseDecrease.addEventListener("click", () => {
          if (formphase <= 0) {
            formphase = 15;
          } else {
            formphase--;
          }
          phase = getPhase(formphase);
          document.getElementById("moon-label").innerHTML = `${phase} MOON`;
          moonicon = `${formphase}.gif`;
          moon.innerHTML = `<img src="views/${moonicon}" alt="${formphase}" class="w-8 h-8 rounded-full shadow-secondary/50 outline-secondary outline-double">`;
        });

        function confirmupdate() {
          termtext(`<anim:term-blue><color:green>Success</color> Global Data Saved.\n`);
          playSound("sounds/Okay.mp3");
          system.moon = formphase;
          system.macca = formmacca;
          localStorage.setItem("system", JSON.stringify(system));
          updateCornerDisplay();
          cornerdisplay.classList.remove("corner-button-selected");
          closeForm();
        }

        break;
      case "tnroll":
        switch (mode) {
          case "talk":
            termtext(`<color:yellow>Opening</color> Conversation Program.\n`);
            break;
          case "recover":
            termtext(`<color:yellow>Opening</color> Recovery Program.\n`);
            break;
          case "surprise":
            termtext(`<color:yellow>Opening</color> Encounter Program.\n`);
            break;
          case "evade":
            termtext(`<color:yellow>Opening</color> Evasion Program.\n`);
            break;
          case "ranged":
            termtext(`<color:yellow>Opening</color> Ranged Attack Program.\n`);
            break;
          case "magic":
            termtext(`<color:yellow>Opening</color> Magic Attack Program.\n`);
            break;
          case "melee":
            termtext(`<color:yellow>Opening</color> Melee Attack Program.\n`);
            break;
          case "skill":
            break;
          default:
            termtext(`<color:yellow>Opening</color> Target Number Program.\n`);
        }

        formDisplay.innerHTML = `
				  <div class="form text-white p-4 max-w-[640px] bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">
					<div id="inner-display">
					  <h2 class="text-center font-bold mb-4">SELECT USER TO ROLL</h2>
					  <div class="grid grid-cols-3 gap-2 flex p-4" id="party-list">
						<!-- Party Member Cards -->
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-1" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-2" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-3" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-4" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-5" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-6" tabindex="0"></div>
					  </div>
					</div>
					<div class="flex gap-6 p-4 place-self-center">
						<input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
						<input class="btn btn-sm btn-square form-input hover-sfx hidden" type="submit" id="form-confirm" value="✔" data-hoversound="sounds/cursor.mp3">
					</div>
				</div>
				`;

        populatePartySlots(getPlayers(), getParty(), true);
        const formCancelrd = document.getElementById("form-cancel");
        const formConfirmrd = document.getElementById("form-confirm");
        const innerDisplay = document.getElementById("inner-display");
        formCancelrd.addEventListener("click", closeForm);
        
        document.querySelectorAll(".roll").forEach((slot, index) => {
          slot.addEventListener("click", () => {
            const party = getParty();
            const players = getPlayers();
            const slotKey = `slot${index + 1}`;
            if (party[slotKey] !== null) {
              let playerId = party[slotKey];
              roller(playerId);
            } else {
              playSound("sounds/Dead.mp3");
              termtext(`<anim:term-red><color:red>ERROR!!!</color> Slot is empty.\n`);
            }
          });
        });

        if (mode === "skill"){
            roller(playerid);
        }

          function roller(playerId) {
              let players = getPlayers();
              let currentPlayer = players.find((p) => p.id === playerId);

              // Reset the formula
              let baseTN = 0;
              let fatePoints = 0;
              let bonus = 0;
              let hpCost = 0;
              let mpCost = 0;
              let modifier = "None";
              let criticalBonus = false;

              const updateFormulaDisplay = () => {
                let modifiedTN = Number(baseTN) + Number(bonus) + Number(fatePoints) * 20;
                if (modifier === "Multiply") {
                  modifiedTN *=
                    document.getElementById("multivisor").value || 1;
                } else if (modifier === "Divide") {
                  modifiedTN /=
                    document.getElementById("multivisor").value || 1;
                }
                let formula = `Base (${baseTN}%) + Bonus (${bonus}%) + Fate (${fatePoints * 20}%)`;
                if (modifier !== "None") {
                  document.getElementById("multivisor").classList.remove("hidden");
                  formula += ` ${modifier === "Multiply" ? "×" : "÷"} ${
			            document.getElementById("multivisor").value || 1}`;
                } else {
                  document.getElementById("multivisor").value = 1;
                  document.getElementById("multivisor").classList.add("hidden");
                }
                formula += ` = <strong>${Math.floor(modifiedTN)}</strong>% TN`;
                document.getElementById("formula-display").innerHTML = formula;
              };

              innerDisplay.innerHTML = `
						<h2 class="text-center font-bold mb-4" id="form-title">${currentPlayer.Name}</h2>
						<div id="formula-display" class="form-input p-2 rounded mb-4">
						  Base (${baseTN}%) + Bonus (${bonus}%) + Fate (${fatePoints * 20}%) = <strong>${baseTN}% TN</strong>
						</div>
						<div class="grid grid-cols-3 gap-2 place-items-end">
							<div>
							<label id="basetn-label" for="base_tn">Base TN</label>
							
							<select id="base_tn" name="base_tn" class="select max-w-32 select-xs form-input hover-sfx" data-hoversound="sounds/cursor.mp3">
							  <option value="0">None (0 TN)</option>
							  <option value="${currentPlayer.STR_TN}">Strength TN</option>
							  <option value="${currentPlayer.MG_TN}">Magic TN</option>
							  <option value="${currentPlayer.VT_TN}">Vitality TN</option>
							  <option value="${currentPlayer.AG_TN}">Agility TN</option>
							  <option value="${currentPlayer.LK_TN}">Luck TN</option>
							  <option value="${currentPlayer.Dodge_TN}">Dodge TN</option>
							  <option value="${currentPlayer.Talk_TN}">Talk TN</option>
							</select>
							</div>
							
							<div>
							<label for="form-bonus">Bonus TN</label>
							<input class="input input-xs max-w-16 form-input hover-sfx" type="number" id="form-bonus" name="bonuses" data-hoversound="sounds/cursor.mp3" required>
							</div>
							<div class="flex justify-start items-center gap-2">
							  <label>Use Fate</label>
							  <button id="fate-decrease" class="btn btn-xs form-input hover-sfx" data-hoversound="sounds/cursor.mp3">-</button>
							  <span id="form-fate" class="mx-2">0</span>
							  <button id="fate-increase" class="btn btn-xs form-input hover-sfx" data-hoversound="sounds/cursor.mp3">+</button>
							
							</div>
							<div id="div-hp">
								<label id="hp-cost-label" for="hp-cost">HP Cost</label>
								<input class="input input-xs max-w-16 form-input hover-sfx" type="number" id="hp-cost" name="hp_cost" min="0" data-hoversound="sounds/cursor.mp3" required>
							</div>
							<div id="div-mp">
								<label id="mp-cost-label" for="mp-cost">MP Cost</label>
								<input class="input input-xs max-w-16 form-input hover-sfx" type="number" id="mp-cost" name="mp_cost" min="0" data-hoversound="sounds/cursor.mp3" required>
							</div>
							<div>
							<div id="div-critbonus">
								<input type="checkbox" id="critbonus" name="critbonus" value="critbonus" class="align-middle checkbox checkbox-xs form-input down-14">
								<label for="critbonus">Crit on 1/5</label>
							</div>
							</div>
							</div>
							<fieldset id="div-multivisor" class="flex">
							  <legend>Mod TN by</legend>
							  <div>
								<!-- None Option -->
								<input id="none" class="peer/none radio radio-sm align-middle" type="radio" name="afteropt" value="None" checked />
								<label for="none" class="peer-checked:text-sky-500 cursor-pointer">None</label>

								<!-- Multiply Option -->
								<input id="multiply" class="peer/multiply radio radio-sm align-middle" type="radio" name="afteropt" value="Multiply" />
								<label for="multiply" class="peer-checked:text-sky-500 cursor-pointer">Multiply</label>

								<!-- Divide Option -->
								<input id="divide" class="peer/divide radio radio-sm align-middle" type="radio" name="afteropt" value="Divide" />
								<label for="divide" class="peer-checked:text-sky-500 cursor-pointer">Divide</label>
							  
							  <!-- Multivisor Input -->
								<input class="input form-input w-8 hover-sfx p-1 border border-gray-400 rounded hidden" placeholder="#" type="number" id="multivisor" name="multivisor" min="1" data-hoversound="sounds/cursor.mp3" required/></div>
							</div>
							</fieldset>
					  `;
              formConfirmrd.classList.remove("hidden");
              document.getElementById("form-bonus").value = 0;
              document.getElementById("hp-cost").value = 0;
              document.getElementById("mp-cost").value = 0;

              // Event listeners to update formula dynamically
              document.getElementById("base_tn").addEventListener("change", (e) => {
                  baseTN = parseInt(e.target.value);
                  updateFormulaDisplay();
                });

              document.getElementById("fate-decrease").addEventListener("click", () => {
                  if (fatePoints > 0) fatePoints--;
                  document.getElementById("form-fate").innerText = fatePoints;
                  updateFormulaDisplay();
                });

              document.getElementById("fate-increase").addEventListener("click", () => {
                  if (fatePoints < currentPlayer.Fate_Current) fatePoints++;
                  document.getElementById("form-fate").innerText = fatePoints;
                  updateFormulaDisplay();
                });

              document.getElementById("form-bonus").addEventListener("input", (e) => {
                  bonus = parseInt(e.target.value) || 0;
                  updateFormulaDisplay();
                });

              document.getElementsByName("afteropt").forEach((radio) => radio.addEventListener("change", (e) => {
                  modifier = e.target.value;
                  updateFormulaDisplay();
                }),
              );

              switch (mode) {
                case "talk":
                  baseTN = currentPlayer.Talk_TN;
                  document.getElementById("base_tn").value = currentPlayer.Talk_TN;
                  document.getElementById("form-title").textContent = `Talk Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Talk TN ${currentPlayer.Talk_TN}%`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-hp").classList.add("hidden");
                  document.getElementById("div-mp").classList.add("hidden");
                  document.getElementById("div-critbonus").classList.add("hidden");
                  document.getElementById("div-multivisor").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "recover":
                  baseTN = currentPlayer.VT_TN;
                  document.getElementById("base_tn").value = currentPlayer.VT_TN;
                  document.getElementById("form-title").textContent = `Recovery Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Vitality TN ${currentPlayer.VT_TN}%`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-hp").classList.add("hidden");
                  document.getElementById("div-mp").classList.add("hidden");
                  document.getElementById("div-critbonus").classList.add("hidden");
                  document.getElementById("div-multivisor").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "surprise":
                  baseTN = currentPlayer.LK_TN;
                  document.getElementById("base_tn").value = currentPlayer.LK_TN;
                  document.getElementById("form-title").textContent = `Surprise Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Luck TN ${currentPlayer.LK_TN}%`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-hp").classList.add("hidden");
                  document.getElementById("div-mp").classList.add("hidden");
                  document.getElementById("div-critbonus").classList.add("hidden");
                  document.getElementById("div-multivisor").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "evade":
                  baseTN = currentPlayer.Dodge_TN;
                  document.getElementById("base_tn").value = currentPlayer.Dodge_TN;
                  document.getElementById("form-title").textContent = `Evade Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Dodge TN ${currentPlayer.Dodge_TN}%`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-hp").classList.add("hidden");
                  document.getElementById("div-mp").classList.add("hidden");
                  document.getElementById("div-critbonus").classList.add("hidden");
                  document.getElementById("div-multivisor").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "ranged":
                  baseTN = currentPlayer.AG_TN;
                  document.getElementById("base_tn").value = currentPlayer.AG_TN;
                  document.getElementById("form-title").textContent = `Ranged Attack Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Agility TN ${currentPlayer.AG_TN}%`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-mp").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "magic":
                  baseTN = currentPlayer.MG_TN;
                  document.getElementById("base_tn").value = currentPlayer.MG_TN;
                  document.getElementById("form-title").textContent = `Magic Attack Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Magic TN ${currentPlayer.MG_TN}%`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-hp").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "melee":
                  baseTN = currentPlayer.STR_TN;
                  document.getElementById("base_tn").value = currentPlayer.STR_TN;
                  document.getElementById("form-title").textContent = `Melee Attack Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Strength TN ${currentPlayer.STR_TN}%`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-mp").classList.add("hidden");
                  
                  break;
                case "skill":
                  compendium = getskillComp();
                  let skill = compendium.find((s) => s.id === skillid);
                  document.getElementById("form-title").textContent = `${skill.name}: ${currentPlayer.Name}`;
                  document.getElementById("form-bonus").value = skill.bonusTN;
                  document.getElementById("base_tn").classList.add("hidden");
                  bonus = skill.bonusTN;
                  switch (skill.baseTN) {
                    case "None":
                      document.getElementById("base_tn").value = 0;
                      document.getElementById("basetn-label").textContent = `Skill TN 0%`;
                     break;
                    case "Strength":
                      baseTN = currentPlayer.STR_TN;
                      document.getElementById("base_tn").value = currentPlayer.STR_TN;
                      document.getElementById("basetn-label").textContent = `Strength TN ${currentPlayer.STR_TN}%`;
                    case "Magic":
                      baseTN = currentPlayer.MG_TN;
                      document.getElementById("base_tn").value = currentPlayer.MG_TN;
                      document.getElementById("basetn-label").textContent = `Magic TN ${currentPlayer.MG_TN}%`;
                      break;
                    case "Vitality":
                      baseTN = currentPlayer.VT_TN;
                      document.getElementById("base_tn").value = currentPlayer.VT_TN;
                      document.getElementById("basetn-label").textContent = `Vitality TN ${currentPlayer.VT_TN}%`;
                      break;
                    case "Agility":
                      baseTN = currentPlayer.AG_TN;
                      document.getElementById("base_tn").value = currentPlayer.AG_TN;
                      document.getElementById("basetn-label").textContent = `Agility TN ${currentPlayer.AG_TN}%`;
                      break;
                    case "Luck":
                      baseTN = currentPlayer.LK_TN;
                      document.getElementById("base_tn").value = currentPlayer.LK_TN;
                      document.getElementById("basetn-label").textContent = `Luck TN ${currentPlayer.LK_TN}%`;
                      break;
                    case "Dodge":
                      baseTN = currentPlayer.Dodge_TN;
                      document.getElementById("base_tn").value = currentPlayer.Dodge_TN;
                      document.getElementById("basetn-label").textContent = `Dodge TN ${currentPlayer.Dodge_TN}%`;
                      break;
                    case "Talk":
                      baseTN = currentPlayer.Talk_TN;
                      document.getElementById("base_tn").value = currentPlayer.Talk_TN;
                      document.getElementById("basetn-label").textContent = `Talk TN ${currentPlayer.Talk_TN}%`;
                      break;
                  }
                  switch (skill.costType) {
                    case "HP":
                      document.getElementById("div-mp").classList.add("hidden");
                      document.getElementById("hp-cost").value = skill.costNum;
                      document.getElementById("hp-cost").classList.add("hidden");
                      document.getElementById("hp-cost-label").textContent = `HP Cost ${skill.costNum}`;
                      break;
                    case "MP":
                      document.getElementById("div-hp").classList.add("hidden");
                      document.getElementById("mp-cost").value = skill.costNum;
                      document.getElementById("mp-cost").classList.add("hidden");
                      document.getElementById("mp-cost-label").textContent = `MP Cost ${skill.costNum}`;
                      break;
                    default:
                      document.getElementById("div-hp").classList.add("hidden");
                      document.getElementById("div-mp").classList.add("hidden");             
                    break;
                  }
                  updateFormulaDisplay();
              }

              document.getElementById("multivisor").addEventListener("input", updateFormulaDisplay);
              formConfirmrd.addEventListener("click", () => {
                let result = "Failure";
                let party = getParty();
                let players = getPlayers();
                let system = getSystem();

                if (!currentPlayer) {
                  console.error("No player selected!");
                  return;
                }

                // Get form values
                const rules = system.rules;
                const baseTNType = document.getElementById("base_tn").value;
                const fatePoints = parseInt(document.getElementById("form-fate").textContent,10);
                const bonuses = parseInt(document.getElementById("form-bonus").value,10);
                const hpCost = parseInt(document.getElementById("hp-cost").value,10);
                const mpCost = parseInt(document.getElementById("mp-cost").value,10);
                const modifyBy = document.querySelector("input[name='afteropt']:checked").id;
                const multivisor = parseInt(document.getElementById("multivisor")?.value || "1",10);
                const critBonus = document.getElementById("critbonus").checked;

                // Calculate Base TN
                let baseTN = baseTNType;

                // Apply modifiers
                let finalTN =
                  Number(baseTN) + Number(bonuses) + fatePoints * 20;
                  console.log(`${baseTN} + ${bonuses} + ${fatePoints} * 20`);

                if (modifyBy === "multiply") {
                  finalTN *= Number(multivisor);
                } else if (modifyBy === "divide") {
                  finalTN = Math.floor(finalTN / multivisor);
                }

                // Deduct HP and MP costs
                currentPlayer.HP_Current = Math.max(currentPlayer.HP_Current - hpCost, 0);
                currentPlayer.MP_Current = Math.max(currentPlayer.MP_Current - mpCost,0);
                currentPlayer.Fate_Current -= fatePoints;

                // Perform dice roll
                const roll = Math.floor(Math.random() * 100) + 1;


                // Handle criticals and failures
                if (roll >= 96 && roll <= 99) {
                  result = "Fumble";
                } else if (roll === 100) {
                  result = "Critical Fumble";
                } else if (
                  roll <= Math.floor(finalTN / (critBonus ? 5 : 10)) || roll === 1) {
                  result = "Critical Success";
                } else if (roll <= finalTN) {
                  result = "Success";
                }

                // Check for cursed status
                if (currentPlayer.Status === "Cursed" && roll >= 86 && roll <= 99) {
                  result = "Fumble";
                }

                // Display results
                switch (result) {
                  case "Critical Fumble":
                    switch (mode) {
                      case "talk":
                        termtext(`<anim:term-red><color:Yellow>Talk Roll</color> <color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-pulse><color:darkred>Warning</color> Conversation has fumbled, tensions have greatly increased.\n`);
                        setTimeout(() => {
                          playSound("sounds/Bossdeath.mp3", 1);
                        }, 250);
                        break;
                      case "recover":
                        switch (rules) {
                          case "1":
                            termtext(`<anim:term-red><color:Yellow>Recovery Roll</color> <color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-pulse><color:darkred>Warning</color> Recovery fumbled, <color:blue>${currentPlayer.Name}</color> doesn't feel so good.\n`);
                            setTimeout(() => {
                              playSound("sounds/Bossdeath.mp3", 1);
                            }, 250);
                            break;
                          default:
                            termtext(`<anim:term-red><color:Yellow>Recovery Roll</color> <color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-pulse><color:darkred>Warning</color> Recovery fumbled, <color:blue>${currentPlayer.Name}</color> doesn't feel so good, HP & MP are halved.\n`);
                            currentPlayer.HP_Current = Math.floor(currentPlayer.HP_Current / 2);
                            currentPlayer.MP_Current = Math.floor(currentPlayer.MP_Current / 2);
                            setTimeout(() => {
                              playSound("sounds/Bossdeath.mp3", 1);
                            }, 250);
                        }
                        break;
                      case "surprise":
                        switch (rules) {
                          case "1":
                            termtext(`<anim:term-red><color:Yellow>Encounter Roll</color> <color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-pulse><color:darkred>Warning</color> <color:blue>${currentPlayer.Name}</color> is surprised.\n`);
                            setTimeout(() => {
                              playSound("sounds/Bossdeath.mp3", 1);
                            }, 250);
                            break;
                          default:
                            termtext(`<anim:term-red><color:Yellow>Encounter Roll</color> <color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-pulse><color:darkred>Warning</color> <color:blue>${currentPlayer.Name}</color> is shocked! No power dice given in the Initiative roll.\n`);
                            currentPlayer.Status = "Shock";
                            setTimeout(() => {
                              playSound("sounds/Bossdeath.mp3", 1);
                            }, 250);
                        }
                        break;
                      case "evade":
                        termtext(`<anim:term-red><color:Yellow>Evasion Roll</color> <color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-pulse><color:darkred>Warning</color> Evasion fumbled, <color:blue>${currentPlayer.Name}</color> is wide open for attack.\n`);
                        setTimeout(() => {
                          playSound("sounds/Bossdeath.mp3", 1);
                        }, 250);
                        break;
                      case "ranged":
                        termtext(`<anim:term-red><color:Yellow>Ranged Attack Roll</color> <color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-pulse><color:darkred>Warning</color> Attack fumbled, <color:blue>${currentPlayer.Name}'s</color> fires wildly!\n`);
                        setTimeout(() => {
                          playSound("sounds/Bossdeath.mp3", 1);
                        }, 250);
                        break;
                      case "magic":
                        termtext(`<anim:term-red><color:Yellow>Magic Attack Roll</color> <color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-pulse><color:darkred>Warning</color> Attack fumbled, <color:blue>${currentPlayer.Name}'s</color> casts wildly!\n`);
                        setTimeout(() => {
                          playSound("sounds/Bossdeath.mp3", 1);
                        }, 250);
                        break;
                      case "melee":
                        termtext(`<anim:term-red><color:Yellow>Melee Attack Roll</color> <color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-pulse><color:darkred>Warning</color> Attack fumbled, <color:blue>${currentPlayer.Name}'s</color> swings wildly!\n`);
                        setTimeout(() => {
                          playSound("sounds/Bossdeath.mp3", 1);
                        }, 250);
                        break;
                      default:
                        termtext(`<anim:term-red><color:darkred>Critical Fumble!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:darkred>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n`);
                        setTimeout(() => {
                          playSound("sounds/Bossdeath.mp3", 1);
                        }, 250);
                    }
                    if (rules === "1") {
                      termtext(`<anim:term-red><color:darkred>Warning</color> <color:blue>${currentPlayer.Name}</color> <color:gray>has been cursed.</color>\n`);
                      currentPlayer.Status = "Cursed";
                    }
                    break;
                  case "Fumble":
                    switch (mode) {
                      case "talk":
                        termtext(`<anim:term-red><color:Yellow>Talk Roll</color> <color:red>Automatic Fail!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake><color:red>Warning</color> talk has failed, tensions have increased.\n`);
                        setTimeout(() => {
                          playSound("sounds/Bark.mp3", 1);
                        }, 250);
                        break;
                      case "recover":
                        termtext(`<anim:term-red><color:Yellow>Recovery Roll</color> <color:red>Automatic Fail!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake><color:red>Warning</color> Recovery failed, <color:blue>${currentPlayer.Name}</color> doesn't feel so good.\n`);
                        setTimeout(() => {
                          playSound("sounds/Imp.mp3", 1);
                        }, 250);
                        break;
                      case "surprise":
                        switch (rules) {
                          case "1":
                            termtext(`<anim:term-red><color:Yellow>Encounter Roll</color> <color:red>Automatic Fail!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake><color:red>Warning</color> <color:blue>${currentPlayer.Name}</color> is caught by surprise.\n`);
                            setTimeout(() => {
                              playSound("sounds/Switch.mp3", 1);
                            }, 250);
                            break;
                          default:
                            termtext(`<anim:term-red><color:Yellow>Encounter Roll</color> <color:red>Automatic Fail!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake><color:red>Warning</color> <color:blue>${currentPlayer.Name}</color> is caught by surprise and shocked!\n`);
                            currentPlayer.Status = "Shock";
                            setTimeout(() => {
                              playSound("sounds/Switch.mp3", 1);
                            }, 250);
                        }
                        break;
                      case "evade":
                        termtext(`<anim:term-red><color:Yellow>Evasion Roll</color> <color:red>Automatic Fail!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake><color:red>Warning</color> Evasion failed, <color:blue>${currentPlayer.Name}</color> is unable to get out of the way.\n`);
                        setTimeout(() => {
                          playSound("sounds/Closebig.mp3", 1);
                        }, 250);
                        break;
                      case "ranged":
                        termtext(`<anim:term-red><color:Yellow>Ranged Attack Roll</color> <color:red>Automatic Fail!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake>Attack failed, <color:blue>${currentPlayer.Name}'s</color> shot missed\n`);
                        setTimeout(() => {
                          playSound("sounds/Dirk.mp3", 1);
                        }, 250);
                        break;
                      case "magic":
                        termtext(`<anim:term-red><color:Yellow>Magic Attack Roll</color> <color:red>Automatic Fail!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake>Attack failed, <color:blue>${currentPlayer.Name}'s</color> cast missed.\n`);
                        setTimeout(() => {
                          playSound("sounds/Zap.mp3", 1);
                        }, 250);
                        break;
                      case "melee":
                        termtext(`<anim:term-red><color:Yellow>Melee Attack Roll</color> <color:red>Automatic Fail!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake>Attack failed, <color:blue>${currentPlayer.Name}'s</color> swing missed.\n`);
                        setTimeout(() => {
                          playSound("sounds/Thief.mp3", 1);
                        }, 250);
                        break;
                      default:
                        termtext(`<anim:term-red><color:red> Automatic Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n`);
                        setTimeout(() => {
                          playSound("sounds/Closebig.mp3", 1);
                        }, 250);
                    }
                    break;
                  case "Failure":
                    switch (mode) {
                      case "talk":
                        termtext(`<anim:term-red><color:Yellow>Talk Roll</color> <color:red>Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake><color:red>Warning</color> talk has failed, tensions have increased.\n`);
                        setTimeout(() => {
                          playSound("sounds/Bark.mp3", 1);
                        }, 250);
                        break;
                      case "recover":
                        termtext(`<anim:term-red><color:Yellow>Recovery Roll</color> <color:red>Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake>Recovery failed, <color:blue>${currentPlayer.Name}</color> doesn't feel so good.\n`);
                        setTimeout(() => {
                          playSound("sounds/Imp.mp3", 1);
                        }, 250);
                        break;
                      case "surprise":
                        switch (rules) {
                          case "1":
                            termtext(`<anim:term-red><color:Yellow>Encounter Roll</color> <color:red>Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake><color:red>Warning</color> <color:blue>${currentPlayer.Name}</color> is caught by surprise!\n`);
                            setTimeout(() => {
                              playSound("sounds/Switch.mp3", 1);
                            }, 250);
                            break;
                          default:
                            termtext(`<anim:term-red><color:Yellow>Encounter Roll</color> <color:red>Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake><color:red>Warning</color> <color:blue>${currentPlayer.Name}</color> is caught by surprise and shocked!\n`);
                            currentPlayer.Status = "Shock";
                            setTimeout(() => {
                              playSound("sounds/Switch.mp3", 1);
                            }, 250);
                        }
                        break;
                      case "evade":
                        termtext(`<anim:term-red><color:Yellow>Evasion Roll</color> <color:red>Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake><color:red>Warning</color> Evasion failed, <color:blue>${currentPlayer.Name}</color> is unable to get out of the way.\n`);
                        setTimeout(() => {
                          playSound("sounds/Closebig.mp3", 1);
                        }, 250);
                        break;
                      case "ranged":
                        termtext(`<anim:term-red><color:Yellow>Ranged Attack Roll</color> <color:red>Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake>Attack failed, <color:blue>${currentPlayer.Name}'s</color> shot missed\n`);
                        setTimeout(() => {
                          playSound("sounds/Dirk.mp3", 1);
                        }, 250);
                        break;
                      case "magic":
                        termtext(`<anim:term-red><color:Yellow>Magic Attack Roll</color> <color:red>Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake>Attack failed, <color:blue>${currentPlayer.Name}'s</color> cast missed.\n`);
                        setTimeout(() => {
                          playSound("sounds/Zap.mp3", 1);
                        }, 250);
                        break;
                      case "melee":
                        termtext(`<anim:term-red><color:Yellow>Melee Attack Roll</color> <color:red>Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-shake>Attack failed, <color:blue>${currentPlayer.Name}'s</color> swing missed.\n`);
                        setTimeout(() => {
                          playSound("sounds/Thief.mp3", 1);
                        }, 250);
                        break;
                      default:
                        termtext(`<anim:term-red><color:red>Fail</color> <color:blue>${currentPlayer.Name}</color> rolled <color:red>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n`);
                        setTimeout(() => {
                          playSound("sounds/Closebig.mp3", 1);
                        }, 250);
                    }
                    break;
                  case "Success":
                    switch (mode) {
                      case "talk":
                        termtext(`<anim:term-green><color:Yellow>Talk Roll</color> <color:green>Success!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:green>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-bounce>Talk succeeded, favor has increased by 1.\n`);
                        setTimeout(() => {
                          playSound("sounds/Ting.mp3", 1);
                        }, 250);
                        break;
                      case "recover":
                        termtext(`<anim:term-green><color:Yellow>Recovery Roll</color> <color:green>Success!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:green>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-bounce>${currentPlayer.Name} is feeling better.\n`);
                        currentPlayer.Status = "Normal";
                        setTimeout(() => {
                          playSound("sounds/Heal.mp3", 1);
                        }, 250);
                        break;
                      case "surprise":
                        termtext(`<anim:term-green><color:Yellow>Encounter Roll</color> <color:green>Success!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:green>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-bounce>${currentPlayer.Name} is prepared.\n`);
                        setTimeout(() => {
                          playSound("sounds/Ting.mp3", 1);
                        }, 250);
                        break;
                      case "evade":
                        termtext(`<anim:term-green><color:Yellow>Evasion Roll</color> <color:green>Success!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:green>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-bounce>${currentPlayer.Name} downgrades the attack.\n`);
                        setTimeout(() => {
                          playSound("sounds/RunAway.mp3", 1);
                        }, 250);
                        break;
                      case "ranged":
                        termtext(`<anim:term-green><color:Yellow>Ranged Attack Roll</color> <color:green>Success!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:green>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-bounce>${currentPlayer.Name}'s shot is successful.\n`);
                        setTimeout(() => {
                          playSound("sounds/15Bolt3.mp3", 1);
                        }, 250);
                        break;
                      case "magic":
                        termtext(`<anim:term-green><color:Yellow>Magic Attack Roll</color> <color:green>Success!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:green>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-bounce>${currentPlayer.Name}'s cast is successful.\n`);
                        setTimeout(() => {
                          playSound("sounds/Bolt.mp3", 1);
                        }, 250);
                        break;
                      case "melee":
                        termtext(`<anim:term-green><color:Yellow>Melee Attack Roll</color> <color:green>Success!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:green>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-bounce>${currentPlayer.Name}'s swing is successful.\n`);
                        setTimeout(() => {
                          playSound("sounds/Slash.mp3", 1);
                        }, 250);
                        break;
                      default:
                        termtext(`<anim:term-green><color:green>Success!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:green>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n`);
                        setTimeout(() => {
                          playSound("sounds/Ting.mp3", 1);
                        }, 250);
                        let compendium = getskillComp();
                        let players = getPlayers();
                        let player = players.find((p) => p.id === playerid);
                        let skill = compendium.find((s) => s.id === skillid);
                        if (skill.roll === "Attack") {
                          openForm("proll", "skill", player.id, skill.id);
                        }
                    }
                    break;
                  case "Critical Success":
                    switch (mode) {
                      case "talk":
                        termtext(`<anim:term-green><color:Yellow>Talk Roll</color> <color:lightgreen>Critical Success!!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:lightgreen>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n<anim:term-bounce>Talk succeeded, favor has greatly increased.\n`);
                        setTimeout(() => {
                          playSound("sounds/Saveting.mp3", 1);
                        }, 250);
                        break;
                      case "recover":
                        termtext(`<anim:term-green><color:Yellow>Recovery Roll</color> <color:lightgreen>Critical Success!!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:lightgreen>${roll}%</color> with <color:purple>${finalTN}% TN</color>\n<anim:term-bounce>${currentPlayer.Name} is feeling great!\n`);
                        currentPlayer.Status = "Normal";
                        setTimeout(() => {
                          playSound("sounds/Saveting.mp3", 1);
                        }, 250);
                        break;
                      case "surprise":
                        switch (rules) {
                          case "1":
                            termtext(`<anim:term-green><color:Yellow>Encounter Roll</color> <color:lightgreen>Critical Success!!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:lightgreen>${roll}%</color> with <color:purple>${finalTN}% TN</color>\n<anim:term-bounce>${currentPlayer.Name} is ready for anything.\n`);
                            setTimeout(() => {
                              playSound("sounds/Saveting.mp3", 1);
                            }, 250);
                            break;
                          default:
                            termtext(`<anim:term-green><color:Yellow>Encounter Roll</color> <color:lightgreen>Critical Success!!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:lightgreen>${roll}%</color> with <color:purple>${finalTN}% TN</color>\n<anim:term-bounce>${currentPlayer.Name} is ready for anything (<color:lightgreen>+2d10</color> to Initiative).\n`);
                            setTimeout(() => {
                              playSound("sounds/Saveting.mp3", 1);
                            }, 250);
                        }
                        break;
                      case "evade":
                        termtext(`<anim:term-green><color:Yellow>Evasion Roll</color> <color:lightgreen>Critical Success!!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:lightgreen>${roll}%</color> with <color:purple>${finalTN}% TN</color>\n<anim:term-bounce>${currentPlayer.Name} evades all attacks!\n`);
                        setTimeout(() => {
                          playSound("sounds/Saveting.mp3", 1);
                        }, 250);
                        break;
                      case "ranged":
                        termtext(`<anim:term-green><color:Yellow>Talk Roll</color> <color:lightgreen>Critical Success!!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:lightgreen>${roll}%</color> with <color:purple>${finalTN}% TN</color>\n<anim:term-bounce>${currentPlayer.Name}'s shot is critical, power is doubled and ignores resistance!\n`);
                        setTimeout(() => {
                          playSound("sounds/Deathtoll.mp3", 1);
                        }, 250);
                        break;
                      case "magic":
                        termtext(`<anim:term-green><color:Yellow>Magic Attack Roll</color> <color:lightgreen>Critical Success!!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:lightgreen>${roll}%</color> with <color:purple>${finalTN}% TN</color>\n<anim:term-bounce>${currentPlayer.Name}'s cast is critical, power is doubled and ignores resistance!\n`);
                        setTimeout(() => {
                          playSound("sounds/Dragon.mp3", 1);
                        }, 250);
                        break;
                      case "melee":
                        termtext(`<anim:term-green><color:Yellow>Melee Attack Roll</color> <color:lightgreen>Critical Success!!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:lightgreen>${roll}%</color> with <color:purple>${finalTN}% TN</color>\n<anim:term-bounce>${currentPlayer.Name}'s swing is critical, damage is doubled and ignores resistance!\n`);
                        setTimeout(() => {
                          playSound("sounds/Fighting.mp3", 1);
                        }, 250);
                        break;
                      default:
                        termtext(`<anim:term-green><color:lightgreen>Critical Success!!</color> <color:blue>${currentPlayer.Name}</color> rolled <color:lightgreen>${roll}%</color> with <color:purple>${finalTN}% TN</color>.\n`);
                        setTimeout(() => {
                          playSound("sounds/Saveting.mp3", 1);
                        }, 250);
                        let compendium = getskillComp();
                        let players = getPlayers();
                        let player = players.find((p) => p.id === playerid);
                        let skill = compendium.find((s) => s.id === skillid);
                        if (skill.roll === "Attack") {
                          openForm("proll", "skill", player.id, skill.id);
                        }
                    }
                }
                
                let compendium = getskillComp();
                players = getPlayers();
                let skill = compendium.find((s) => s.id === skillid);
               
                // Update players data in localStorage
                const updatedPlayers = players.map((player) =>
                  player.id === currentPlayer.id ? currentPlayer : player,
                );
                setPlayers(updatedPlayers);

                if (mode === "skill") { populatePartySlots(getPlayers(), getParty()); 
                  if (skill.roll !== "Attack" || (result !== "Success" && result !== "Critical Success")) {closeForm();}
                }
                else{closeForm();}
              });
  
            }
      break;
      case "proll":
        switch (mode) {
          case "initiative":
            termtext(`<color:yellow>Opening</color> Initiative Program.\n`);
            break;
          case "rangedp":
            termtext(`<color:yellow>Opening</color> Ranged Power Program.\n`);
            break;
          case "magicp":
            termtext(`<color:yellow>Opening</color> Magic Power Program.\n`);
            break;
          case "meleep":
            termtext(`<color:yellow>Opening</color> Melee Power Program.\n`);
            break;
          case "skill":
            break;
          default:
            termtext(`<color:yellow>Opening</color> Power Program.\n`);
        }

        formDisplay.innerHTML = `
				  <div class="form text-white p-4 max-w-[640px] bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50  motion-reduced">
					<div id="inner-display">
					  <h2 class="text-center font-bold mb-4">SELECT USER TO ROLL</h2>
					  <div class="grid grid-cols-3 gap-2 flex p-4" id="party-list">
						<!-- Party Member Cards -->
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-1" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-2" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-3" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-4" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-5" tabindex="0"></div>
						<div class="party-member roll bg-gradient-to-br from-primary to- hover:shadow-lg hover:shadow-accent/50" id="party-slot-6" tabindex="0"></div>
					  </div>
					</div>
					<div class="w-full justify-center gap-6 p-4 flex">
					<input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
					<input class="btn btn-sm btn-square form-input hover-sfx hidden" type="submit" id="form-confirm" value="✔" data-hoversound="sounds/cursor.mp3">
					</div>
				  </div>
				`;

        populatePartySlots(getPlayers(), getParty(), true);
        const formCancelrrd = document.getElementById("form-cancel");
        const formConfirmrrd = document.getElementById("form-confirm");
        const innerrDisplay = document.getElementById("inner-display");
        formCancelrrd.addEventListener("click", closeForm);

        document.querySelectorAll(".roll").forEach((slot, index) => {
          slot.addEventListener("click", () => {
            const party = getParty();
            const players = getPlayers();
            const slotKey = `slot${index + 1}`;
            if (party[slotKey] !== null) {
              let playerId = party[slotKey];
              rollerp(playerId);
            } else {
              playSound("sounds/Dead.mp3");
              termtext(`<anim:term-red><color:red>ERROR!!!</color> Slot is empty.\n`);
            }
          });
        });

      if (mode === "skill"){
        rollerp(playerid);
      }

          function rollerp(playerId) {
              let players = getPlayers();
              let currentPlayer = players.find((p) => p.id === playerId);

              // Reset the formula
              let baseTN = 0;
              let dice = 1;
              let bonus = 0;
              let hpCost = 0;
              let mpCost = 0;
              let modifier = "None";
              let criticalBonus = false;

              const updateFormulaDisplay = () => {
                let modifiedTN = baseTN + bonus;
                if (modifier === "Multiply") {
                  modifiedTN *= document.getElementById("multivisor").value || 1;
                } else if (modifier === "Divide") {
                  modifiedTN /= document.getElementById("multivisor").value || 1;
                }
                let formula = `Base (${baseTN}) + Bonus (${bonus})`;
                document.getElementById("multivisor").classList.add("hidden");
                formula += ` = <strong>${Math.floor(modifiedTN)}</strong> + ${dice}d10 Power`;
                if (modifier !== "None") {
                  document.getElementById("multivisor").classList.remove("hidden");
				          formula += ` ${modifier === "Multiply" ? "×" : "÷"} ${document.getElementById("multivisor").value || 1}`;
                }
                document.getElementById("formula-display").innerHTML = formula;
              };

              innerrDisplay.innerHTML = `
                <h2 id="form-title" class="text-center font-bold mb-4">${currentPlayer.Name}</h2>
                <div id="formula-display" class="form-input bg-gray-700 text-white p-2 rounded mb-4">
                  Base (${baseTN}) + Bonus (${bonus}) = <strong>${baseTN} + ${dice}d10 Power</strong>
                </div>
                <div class="grid grid-cols-3 gap-2 place-items-end">
                  <div>
                  <label for="base_tn" id="basetn-label">Base Power</label>
                  <select id="base_tn" name="base_tn" class="select select-xs form-input hover-sfx w-24" data-hoversound="sounds/cursor.mp3">
                    <option value="0">None (0)</option>
                    <option value="${currentPlayer.Melee_Power}">Melee Power</option>
                    <option value="${currentPlayer.Magic_Power}">Magic Power</option>
                    <option value="${currentPlayer.Ranged_Power}">Ranged Power</option>
                    <option value="${currentPlayer.Initiative}">Initiative</option>
                  </select>
                  </div>
                  
                  <div>
                  <label for="form-bonus">Bonus Power</label>
                  <input class="input form-input w-16 hover-sfx" type="number" id="form-bonus" name="bonuses" data-hoversound="sounds/cursor.mp3" required>
                  </div>
                  <div class="flex justify-start items-center gap-2">
                    <label>Dice</label>
                    <button id="dice-decrease" class="btn btn-xs form-input hover-sfx" data-hoversound="sounds/cursor.mp3">-</button>
                    <span id="form-dice" class="mx-2">1d10</span>
                  
                  <button id="dice-increase" class="btn btn-xs form-input hover-sfx" data-hoversound="sounds/cursor.mp3">+</button>
                  </div>
                  <div id="div-hp">
                    <label id="hp-cost-label" for="hp-cost">HP Cost</label>
                    <input class="input form-input w-16 hover-sfx" type="number" id="hp-cost" name="hp_cost" min="0" data-hoversound="sounds/cursor.mp3" required>
                  </div>
                  <div id="div-mp">
                    <label id="mp-cost-label" for="mp-cost">MP Cost</label>
                    <input class="input form-input w-16 hover-sfx" type="number" id="mp-cost" name="mp_cost" min="0" data-hoversound="sounds/cursor.mp3" required>
                  </div>
                
                  </div>
                  <fieldset id="div-multivisor">
                    <legend>Mod Result by</legend>
                    <div class="flex items-center gap-5">
                    <!-- None Option -->
                    <input id="none" class="peer/none radio align-middle" type="radio" name="afteropt" value="None" checked />
                    <label for="none" class="peer-checked:text-sky-500 cursor-pointer">None</label>

                    <!-- Multiply Option -->
                    <input id="multiply" class="peer/multiply radio align-middle" type="radio" name="afteropt" value="Multiply" />
                    <label for="multiply" class="peer-checked:text-sky-500 cursor-pointer">Multiply</label>

                    <!-- Divide Option -->
                    <input id="divide" class="peer/divide radio align-middle" type="radio" name="afteropt" value="Divide" />
                    <label for="divide" class="peer-checked:text-sky-500 cursor-pointer">Divide</label>
                    
                    <!-- Multivisor Input -->
                    <input class="input form-input w-8 hover-sfx p-1 border border-gray-400 rounded hidden" placeholder="#" type="number" id="multivisor" name="multivisor" min="1" data-hoversound="sounds/cursor.mp3" required/></div>
                  </div>
                </fieldset>
              `;
              formConfirmrrd.classList.remove("hidden");
              document.getElementById("form-bonus").value = 0;
              document.getElementById("hp-cost").value = 0;
              document.getElementById("mp-cost").value = 0;

              // Event listeners to update formula dynamically
              document.getElementById("base_tn").addEventListener("change", (e) => {
                  baseTN = parseInt(e.target.value);
                  updateFormulaDisplay();
                });

              document.getElementById("dice-decrease").addEventListener("click", () => {
                  if (dice > 1) dice--;
                  document.getElementById("form-dice").innerText = `${dice}d10`;
                  updateFormulaDisplay();
                });

              document.getElementById("dice-increase").addEventListener("click", () => {
                  if (dice < 9) dice++;
                  document.getElementById("form-dice").innerText = `${dice}d10`;
                  updateFormulaDisplay();
                });

              document.getElementById("form-bonus").addEventListener("input", (e) => {
                  bonus = parseInt(e.target.value) || 0;
                  updateFormulaDisplay();
                });

              document.getElementsByName("afteropt").forEach((radio) => radio.addEventListener("change", (e) => {
                  modifier = e.target.value;
                  updateFormulaDisplay();
                }),
              );

              switch (mode) {
                case "initiative":
                  baseTN = currentPlayer.Initiative;
                  document.getElementById("base_tn").value = currentPlayer.Initiative;
                  document.getElementById("base_tn").tabindex = -1;
                  document.getElementById("form-title").textContent = `Initiative Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Initiative Power ${currentPlayer.Initiative}`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-hp").classList.add("hidden");
                  document.getElementById("div-mp").classList.add("hidden");
                  document.getElementById("div-multivisor").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "rangedp":
                  baseTN = currentPlayer.Ranged_Power;
                  document.getElementById("base_tn").value = currentPlayer.Ranged_Power;
                  document.getElementById("form-title").textContent = `Ranged Power Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Ranged Power ${currentPlayer.Ranged_Power}`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-hp").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "magicp":
                  baseTN = currentPlayer.Magic_Power;
                  document.getElementById("base_tn").value = currentPlayer.Magic_Power;
                  document.getElementById("form-title").textContent = `Magic Power Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Magic Power ${currentPlayer.Magic_Power}`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-hp").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "meleep":
                  baseTN = currentPlayer.Melee_Power;
                  document.getElementById("base_tn").value = currentPlayer.Melee_Power;
                  document.getElementById("form-title").textContent = `Melee Power Roll: ${currentPlayer.Name}`;
                  document.getElementById("basetn-label").textContent = `Melee Power ${currentPlayer.Melee_Power}`;
                  document.getElementById("base_tn").classList.add("hidden");
                  document.getElementById("div-hp").classList.add("hidden");
                  updateFormulaDisplay();
                  break;
                case "skill":
                  compendium = getskillComp();
                  let skill = compendium.find((s) => s.id === skillid);
                  document.getElementById("form-title").textContent = `${skill.name}: ${currentPlayer.Name}`;
                  document.getElementById("form-bonus").value = skill.bonusPower;
                  document.getElementById("base_tn").classList.add("hidden");
                  bonus = skill.bonusPower;
                  switch (skill.basePower) {
                    case "None":
                      document.getElementById("base_tn").value = 0;
                      document.getElementById("basetn-label").textContent = `Power 0`;
                    break;
                    case "Melee":
                      baseTN = currentPlayer.Melee_Power;
                      document.getElementById("base_tn").value = currentPlayer.Melee_Power;
                      document.getElementById("basetn-label").textContent = `Melee Power ${currentPlayer.Melee_Power}`;
                    case "Magic":
                      baseTN = currentPlayer.Magic_Power;
                      document.getElementById("base_tn").value = currentPlayer.Magic_Power;
                      document.getElementById("basetn-label").textContent = `Magic Power ${currentPlayer.Magic_Power}`;
                      break;
                    case "Ranged":
                      baseTN = currentPlayer.Ranged_Power;
                      document.getElementById("base_tn").value = currentPlayer.Ranged_Power;
                      document.getElementById("basetn-label").textContent = `Ranged Power ${currentPlayer.Ranged_Power}`;
                      break;
                    case "Initiative":
                      baseTN = currentPlayer.Initiative;
                      document.getElementById("base_tn").value = currentPlayer.Initiative;
                      document.getElementById("basetn-label").textContent = `Initiative ${currentPlayer.Initiative}`;
                      break;
                  }
                    switch (skill.costType) {
                      case "HP":
                        document.getElementById("div-mp").classList.add("hidden");
                        document.getElementById("hp-cost").value = skill.costNum;
                        document.getElementById("hp-cost").classList.add("hidden");
                        document.getElementById("hp-cost-label").textContent = `HP Cost ${skill.costNum}`;
                        break;
                      case "MP":
                        document.getElementById("div-hp").classList.add("hidden");
                        document.getElementById("mp-cost").value = skill.costNum;
                        document.getElementById("mp-cost").classList.add("hidden");
                        document.getElementById("mp-cost-label").textContent = `MP Cost ${skill.costNum}`;
                        break;
                      default:
                        document.getElementById("div-hp").classList.add("hidden");
                        document.getElementById("div-mp").classList.add("hidden");             
                      break;
                    }
                    updateFormulaDisplay();
                  break;
              }

              document.getElementById("multivisor").addEventListener("input", updateFormulaDisplay);
              formConfirmrrd.addEventListener("click", () => {
                const party = getParty();
                const players = getPlayers();

                if (!currentPlayer) {
                  console.error("No player selected!");
                  return;
                }

                // Get form values
                const baseTNType = document.getElementById("base_tn").value;
                let dice = parseInt(document.getElementById("form-dice").textContent,10);
                const bonuses = parseInt(document.getElementById("form-bonus").value,10);
                const hpCost = parseInt(document.getElementById("hp-cost").value,10);
                const mpCost = parseInt(document.getElementById("mp-cost").value,10);
                const modifyBy = document.querySelector("input[name='afteropt']:checked").id;
                const multivisor = parseInt(document.getElementById("multivisor")?.value || "1",10);

                // Calculate Base TN
                let baseTN = baseTNType;

                // Apply modifiers
                let finalTN = Number(baseTN) + Number(bonuses);
                console.log(`${baseTN} + ${bonuses}`);

                // Deduct HP and MP costs
                currentPlayer.HP_Current = Math.max(currentPlayer.HP_Current - hpCost,0);
                currentPlayer.MP_Current = Math.max(currentPlayer.MP_Current - mpCost,0);

                let result = 0;
                let roll = 0;
                // Handle criticals and failures
                while (dice > 0) {
                  roll = Math.floor(Math.random() * 10) + 1;
                  result = Number(roll) + Number(result);
                  if (roll === 10) {
                    termtext(`<anim:term-bounce><color:lightgreen>Critical!</color> <color:blue>${currentPlayer.Name}</color> rolled a <color:lightgreen>${roll}</color>! Added another d10.\n`);
                    dice++;
                  } else {
                    termtext(`<anim:term-bounce><color:blue>${currentPlayer.Name}</color> rolled a <color:green>${roll}</color>.\n`);
                  }

                  dice--;
                }
                result = Number(result) + Number(finalTN);

                termtext(`With an added power of <color:purple>${finalTN}</color>.\n`);
                if (modifyBy === "multiply") {
                  result *= Number(multivisor);
                  termtext(`<color:lightgreen> Multiplied</color> result by <color:purple>${multivisor}</color>.\n`);
                } else if (modifyBy === "divide") {
                  result = Math.floor(result / multivisor);
                  termtext(`<color:darkred> Divided</color> result by <color:purple>${multivisor}</color>.\n`);
                }

                switch (mode) {
                  case "initiative":
                    termtext(`<anim:term-blue><color:yellow>Initiative Roll</color> Resulting in a total initiative of <color:lightgreen>${result} Power</color>.\n`);
                    setTimeout(() => {
                      playSound("sounds/Boots.mp3", 1);
                    }, 250);

                    break;
                  case "rangedp":
                    termtext(`<anim:term-blue><color:yellow>Ranged Power Roll</color> Resulting in a total ranged attack of <color:lightgreen>${result} Power</color>.\n`);
                    setTimeout(() => {
                      playSound("sounds/15Bolt3.mp3", 1);
                    }, 250);
                    break;
                  case "magicp":
                    termtext(`<anim:term-blue><color:yellow>Magic Power Roll</color> Resulting in a total magic attack of <color:lightgreen>${result} Power</color>.\n`);
                    setTimeout(() => {
                      playSound("sounds/Bolt.mp3", 1);
                    }, 250);
                    break;

                  case "meleep":
                    termtext(`<anim:term-blue><color:yellow>Melee Power Roll</color> Resulting in a total melee attack of <color:lightgreen>${result} Power</color>.\n`);
                    setTimeout(() => {
                      playSound("sounds/Slash.mp3", 1);
                    }, 250);
                    break;
                  default:
                    termtext(`<anim:term-blue><color:yellow>Power Roll</color> Resulting in a total of <color:lightgreen>${result} Power</color>.\n`);
                    setTimeout(() => {
                      playSound("sounds/Saveting.mp3", 1);
                    }, 250);
                }

                // Update players data in localStorage
                const updatedPlayers = players.map((player) =>
                  player.id === currentPlayer.id ? currentPlayer : player,
                );
                setPlayers(updatedPlayers);
                if (mode === "skill") { populatePartySlots(getPlayers(), getParty(), true); }
                closeForm();
              });
            
          }
      break;
      case "config":
        formDisplay.innerHTML = `
					<div class="form text-white p-4 w-1/2 shadow-lg bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50">  
						<h2 class="text-center font-bold mb-4">Configure System </h2>
						<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<div>
							<label for="username">Username</label>
							<input class="input form-input w-full hover-sfx" type="text" id="username" data-hoversound="sounds/cursor.mp3" maxlength="16" required>
							</div>
							<div>
							<label for="system">Version</label>
								<select id="system" name="system" class="select select-xs form-input hover-sfx w-full" data-hoversound="sounds/cursor.mp3">
								  <option value="0">Devil City Tokyo</option>
								  <option value="1">Tokyo Conception</option>
								</select>
							</div>

             <div class="dropdown" id="theme">
              <div tabindex="0" role="button" class="btn btn-sm form-input m-1 hover-sfx click-sfx" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3">
                Pick Theme
                <svg width="12px" height="12px" class="inline-block h-2 w-2 fill-current opacity-60" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                  <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
              </div>
              <ul tabindex="0" class="dropdown-content bg-base-300 rounded-box z-[1] w-52 p-2 shadow-2xl max-h-60 overflow-y-auto">
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="DDS-NET" value="ddsnet"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Diamond Realm" value="diamondrealm"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Tokyo Conception" value="tokyoconception"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Mikado Samurai" value="mikadosamurai"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Nahonbino" value="nahobino"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Arctic Journey" value="arcticjourney"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Velvet Moonlight" value="velvetmoonlight"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Golden Glow" value="goldenglow"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Phantom Thief" value="phantomthief"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Business" value="business"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Synthwave" value="synthwave"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Halloween" value="halloween"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Forest" value="forest"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Coffee" value="coffee"></li>
                <li><input type="radio" name="theme-dropdown" class="theme-controller btn btn-sm btn-block btn-ghost justify-start" aria-label="Sunset" value="sunset"></li>
                </ul>
            </div>
						</div>

						<div class="w-full justify-center gap-6 p-4 flex">
							<input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
							<input class="btn btn-sm btn-square form-input hover-sfx" type="submit" id="form-confirm" value="✔" data-hoversound="sounds/cursor.mp3">
						</div>
					</div>
				   `;
        let formCancelerrrrrrrre = document.getElementById("form-cancel");
        termtext(`<color:yellow>Opening</color> System Configuration.\n`);
        const formconfirmmme = document.getElementById("form-confirm");
        formCancelerrrrrrrre.addEventListener("click", closeForm);
        formconfirmmme.addEventListener("click", systemupdate);
        const systeminfo = getSystem();

        document.getElementById("system").value = systeminfo.rules;
        document.getElementById("username").value = systeminfo.username;

        function systemupdate() {
          const selectedThemeElement = document.querySelector('input[name="theme-dropdown"]:checked');
          const setTheme = selectedThemeElement ? selectedThemeElement.value : systeminfo.config1;
          const formElements = {
            username: document.getElementById("username").value.trim(),
            rules: document.getElementById("system").value,
            theme: setTheme,
          };

          const system = {
            username: formElements.username,
            rules: formElements.rules,
            macca: systeminfo.macca,
            moon: systeminfo.moon,
            macca: systeminfo.macca,
            config1: formElements.theme,
            config2: systeminfo.config2,
            config3: systeminfo.config3,
            config4: systeminfo.config4,
            config5: systeminfo.config5,
            config6: systeminfo.config6,
            config7: systeminfo.config7,
            config8: systeminfo.config8,
            config9: systeminfo.config9,
          };

          if (formElements.username === "") {
            playSound("sounds/Dead.mp3");
            termtext(`<anim:term-red><color:red>ERROR!!!</color> Missing username.\n`);
            return;
          }

          localStorage.setItem("system", JSON.stringify(system));
          updateCornerDisplay();
          playSound("sounds/Comp.mp3");
          termtext(`<anim:term-blue><color:green>Success</color> System info for <color:blue>${formElements.username}</color> has been updated.\n`);
		      location.reload();
          console.log(formElements.theme)
          console.log(system.config1)
          closeForm();
        }

      break;
      case "skillcomp":
        formDisplay.innerHTML = `
        <div class="form text-white p-4 max-w-[640px] bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50">  
          <h1 class="text-center font-bold mb-2">Skill Compendium</h1>
          
          <div class="mb-2 flex gap-2 justify-center items-center">
            <label for="search-skill">Search</label>
            <input class="input form-input w-1/4 hover-sfx" type="text" id="search-skill" placeholder="Skill Name" data-hoversound="sounds/cursor.mp3">
          </div>

          <div id="compendium-display"></div>

          <div class="w-full justify-center gap-6 p-4 flex">
            <input class="btn btn-sm form-input hover-sfx click-sfx" type="submit" id="form-create" value="Create Skill" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3">
            <div class="tooltip tooltip-secondary" data-tip="Download Skill Compendium"><input class="btn btn-sm form-input hover-sfx click-sfx" type="submit" id="form-export" value="Export" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Comp.mp3"></div>
            <div class="tooltip tooltip-secondary" data-tip="Overwrite Skill Compendium"><input class="btn btn-sm form-input hover-sfx click-sfx" type="submit" id="form-import" value="Import" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3"></div>
            <input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
          </div>
        </div>
         `;
        let formCancelered = document.getElementById("form-cancel");
        termtext(`<color:yellow>Opening</color> Skill Compendium Program.\n`);
        formCancelered.addEventListener("click", closeForm);
        let compendiumDisplay = document.getElementById("compendium-display");
        searchSkillInput = document.getElementById("search-skill");
        
        function refreshcomp(searchTerm = "") {
          let compendium = getskillComp();
          // Sort compendium by type and then by name
          compendium.sort((a, b) => {
            if (a.type < b.type) return -1;
            if (a.type > b.type) return 1;
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          // Filter compendium based on search term
          if (searchTerm) {
            compendium = compendium.filter(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
          }
          compendiumDisplay.innerHTML = `
          <div class="card grid grid-cols-1 p-12 gap-2 bg-base-300 border-neutral border-2 max-h-80 overflow-y-auto">
            ${compendium.map((skill) => `
              <div class="btn grid grid-cols-2 bg-gradient-to-br from-primary to- hover:border-accent hover:border-single hover:border-2 hover:shadow-lg hover:shadow-accent/50 p-2 tooltip tooltip-secondary" data-tip="${skill.description}">
          <div class="flex gap-2 justify-start items-center">
              <img alt="${skill.Type}" class="size-8 rounded-full drop-shadow-lg" src="views/${skill.type}.png">
          <h3 class="font-bold truncate text-sm text-left">${skill.name}</h3>
          </div>
          
          
          <div class="flex gap-2 justify-end items-center">
          <p id="cost-label-${skill.id}" class="opacity-80 rounded-full p-1 place-self-center text-xs text-right w-16 sm:w-20 bg-base-300 border-neutral border-2">${skill.costNum} <span class="text-yellow-400">${skill.costType}</span></p>
            <input class="btn btn-xs sm:btn-sm form-input hover-sfx place-self-center click-sfx" type="submit" id="form-edit-${skill.id}" value="Edit" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3">
            <div class="tooltip tooltip-secondary tooltip-bottom" data-tip="Delete"><input class="btn btn-xs sm:btn-sm btn-square form-input place-self-end hover-sfx click-sfx" type="submit" id="form-delete-${skill.id}" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3"></div>
          </div>
              </div>
            `).join("")}
          </div>
          `;
          // Hide cost label if no cost
          compendium.forEach((skill) => {
          if (skill.costType === "None") {
            document.querySelector(`#cost-label-${skill.id}`).classList.add("opacity-0");
          }
          });
          // Add event listeners for delete buttons
          compendium.forEach((skill) => {
            document.getElementById(`form-delete-${skill.id}`).addEventListener('click', () => {
              deleteSkill(skill.id);
              refreshcomp(searchTerm);
            });
            document.getElementById(`form-edit-${skill.id}`).addEventListener('click', () => {
              editSkill(skill.id);
            });
          });
        }

        searchSkillInput.addEventListener("input", (event) => {
          refreshcomp(event.target.value);
        });

        refreshcomp();

        function editSkill(skillId) {
          let compendium = getskillComp();
          let skill = compendium.find(skill => skill.id === skillId);

          if (!skill) {
            skill = {
              id: skillId,
              name: "New Skill",
              type: "Physical",
              costNum: 0,
              costType: "None",
              description: "Describe the skill here.",
              baseTN: "None",
              bonusTN: 0,
              basePower: 0,
              bonusPower: 0,
              roll: "Attack"
            };
            compendium.push(skill);
          }

          termtext(`<color:yellow>Editing</color> <color:purple>${skill.name}</color>.\n`);
          formDisplay.innerHTML = `
            <div class="form text-white max-w-[640px] p-4 bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50">
              <h2 class="text-center font-bold mb-4">Edit Skill</h2>
              <div class="grid grid-cols-2 gap-2 place-items-start">
          <div>
            <label for="skill-name">Skill Name</label>
            <input class="input form-input hover-sfx" type="text" id="skill-name" data-hoversound="sounds/cursor.mp3" value="${skill.name}" required>
          </div>
              
          <div class="justify-items-center tooltip tooltip-primary" data-tip="Only Changes Icon Displayed">
            <label for="skill-type">Affinity
            <select id="skill-type" name="skill-type" class="select select-xs form-input hover-sfx w-24" data-hoversound="sounds/cursor.mp3">
              <option value="Physical">Physical</option>
              <option value="Fire">Fire</option>
              <option value="Ice">Ice</option>
              <option value="Electric">Electric</option>
              <option value="Force">Force</option>
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
              <option value="Almighty">Almighty</option>
              <option value="Ailment">Ailment</option>
              <option value="Ruin">Ruin</option>
              <option value="Nerve">Nerve</option>
              <option value="Recovery">Recovery</option>
              <option value="Support">Support</option>
              <option value="Special">Special</option>
              <option value="Passive">Passive</option>
            </select>
          </label>
          </div>
          <div>
            <label for="skill-cost">Skill Cost</label>
            <input class="input form-input w-16 hover-sfx" type="number" id="skill-cost" data-hoversound="sounds/cursor.mp3" value="${skill.costNum}" required>
          </div>
          <div>
            <label for="skill-cost-type">Cost Type</label>
            <select id="skill-cost-type" name="skill-cost-type" class="w-20 select select-xs form-input hover-sfx" data-hoversound="sounds/cursor.mp3">
              <option value="HP">HP</option>
              <option value="MP">MP</option>
              <option value="FATE">FATE</option>
              <option value="CARD">CARD</option>
              <option value="None">None</option>
            </select>
          </div>
              </div>
              <br>
          <fieldset id="roll-type" class="flex place-self-center">
           <legend class="text-center w-full">Roll Type</legend>
           <div role="tablist" class="tabs tabs-bordered">
            <input type="radio" name="rollType" value="Attack" role="tab" class="tab" aria-label="Attack (TN & POW)">
            <div role="tabpanel" class="tab-content p-2">
            <p class="text-center text-sm">Performs a TN roll, followed by a Power roll on success.</p><br>
            <div class="grid grid-cols-2 gap-2 place-items-end">
              <div>
                <label id="attack_basetn-label" for="attack_base_tn">Base TN
                <select id="attack_base_tn" name="attack_base_tn" class="select max-w-32 select-xs form-input hover-sfx" data-hoversound="sounds/cursor.mp3">
                  <option value="None">None (0 TN)</option>
                  <option value="Strength">Strength TN</option>
                  <option value="Magic">Magic TN</option>
                  <option value="Vitality">Vitality TN</option>
                  <option value="Agility">Agility TN</option>
                  <option value="Luck">Luck TN</option>
                  <option value="Dodge">Dodge TN</option>
                  <option value="Talk">Talk TN</option>
                </select></label>
              </div>

              <div>
                <label for="attack_bonus_tn">Bonus TN</label>
                <input class="input form-input w-16 hover-sfx" type="number" id="attack_bonus_tn" data-hoversound="sounds/cursor.mp3" value="">
              </div>

              <div>
                <label id="attack_basepow-label" for="attack_base_pow">Base Power
                <select id="attack_base_pow" name="attack_base_pow" class="select select-xs form-input hover-sfx w-24" data-hoversound="sounds/cursor.mp3">
                  <option value="None">None (0)</option>
                  <option value="Melee">Melee Power</option>
                  <option value="Magic">Magic Power</option>
                  <option value="Ranged">Ranged Power</option>
                  <option value="Initiative">Initiative</option>
                </select></label>
              </div>

                <div>
            <label for="attack_bonus_pow">Bonus Power</label>
            <input class="input form-input w-16 hover-sfx" type="number" id="attack_bonus_pow" data-hoversound="sounds/cursor.mp3" value="">
                </div>
              </div>
            </div>

            <input type="radio" name="rollType" value="TN" role="tab" class="tab" aria-label="Target Number">
            <div role="tabpanel" class="tab-content p-2">
              <div class="grid grid-cols-2 gap-2 place-items-end">

                <div>
            <label id="basetn-label" for="base_tn">Base TN
            <select id="base_tn" name="base_tn" class="select max-w-32 select-xs form-input hover-sfx" data-hoversound="sounds/cursor.mp3">
              <option value="None">None (0 TN)</option>
              <option value="Strength">Strength TN</option>
              <option value="Magic">Magic TN</option>
              <option value="Vitality">Vitality TN</option>
              <option value="Agility">Agility TN</option>
              <option value="Luck">Luck TN</option>
              <option value="Dodge">Dodge TN</option>
              <option value="Talk">Talk TN</option>
            </select></label>
                </div>

                <div>
            <label for="bonus_tn">Bonus TN</label>
            <input class="input form-input w-16 hover-sfx" type="number" id="bonus_tn" data-hoversound="sounds/cursor.mp3" value="">
                </div>
              </div>
            </div>

            <input type="radio" name="rollType" value="Power" role="tab" class="tab" aria-label="Power">
            <div role="tabpanel" class="tab-content p-2">
              <div class="grid grid-cols-2 gap-2 place-items-end">
                <div>
              <label id="basepow-label" for="base_pow">Base Power
              <select id="base_pow" name="base_pow" class="select select-xs form-input hover-sfx w-24" data-hoversound="sounds/cursor.mp3">
                <option value="None">None (0)</option>
                <option value="Melee">Melee Power</option>
                <option value="Magic">Magic Power</option>
                <option value="Ranged">Ranged Power</option>
                <option value="Initiative">Initiative</option>
              </select></label>
            </div>

            <div>
              <label for="bonus_pow">Bonus Power</label>
              <input class="input form-input w-16 hover-sfx" type="number" id="bonus_pow" data-hoversound="sounds/cursor.mp3" value="">
            </div>
                
                </div>

              </div>

              <input type="radio" name="rollType" value="Passive" role="tab" class="tab" aria-label="None (Auto)">
              <div role="tabpanel" class="tab-content p-2">No Roll Needed</div>
            </div>
          </fieldset>        

          <div>
              <label for="skill-description">Skill Description</label>
              <textarea class="textarea form-input w-full hover-sfx" id="skill-description" data-hoversound="sounds/cursor.mp3" required>${skill.description}</textarea>
            </div>
          <div class="w-full justify-center gap-6 p-4 flex">
            <input class="btn btn-sm form-input hover-sfx click-sfx" type="submit" id="form-save" value="Save" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3">
            <input class="btn btn-sm form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="Cancel" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
          </div>
              </div>
            </div>
          `;
          // Loading Values
          document.getElementById("skill-type").value = skill.type;
          document.getElementById("skill-cost-type").value = skill.costType;
          document.getElementById("attack_base_tn").value = skill.baseTN;
          document.getElementById("attack_bonus_tn").value = skill.bonusTN;
          document.getElementById("attack_base_pow").value = skill.basePower;
          document.getElementById("attack_bonus_pow").value = skill.bonusPower;
          document.getElementById("base_tn").value = skill.baseTN;
          document.getElementById("bonus_tn").value = skill.bonusTN;
          document.getElementById("base_pow").value = skill.basePower;
          document.getElementById("bonus_pow").value = skill.bonusPower;
          const rollTypeInput = document.querySelector(`input[name="rollType"][value="${skill.roll}"]`);
          if (rollTypeInput) {
            rollTypeInput.checked = true;
          }

          document.getElementById("form-save").addEventListener("click", () => {
            skill.name = document.getElementById("skill-name").value;
            skill.type = document.getElementById("skill-type").value;
            skill.costNum = document.getElementById("skill-cost").value;
            skill.costType = document.getElementById("skill-cost-type").value;
            skill.description = document.getElementById("skill-description").value;
            skill.baseTN = document.getElementById("base_tn").value;
            skill.bonusTN = document.getElementById("bonus_tn").value;
            skill.basePower = document.getElementById("base_pow").value;
            skill.bonusPower = document.getElementById("bonus_pow").value;
            skill.roll = document.querySelector('input[name="rollType"]:checked').value;
            if (skill.costType === "None") {
              skill.costNum = 0;
            }
            switch (skill.roll) {
              case "Attack":
          skill.baseTN = document.getElementById("attack_base_tn").value;
          skill.bonusTN = document.getElementById("attack_bonus_tn").value;
          skill.basePower = document.getElementById("attack_base_pow").value;
          skill.bonusPower = document.getElementById("attack_bonus_pow").value;
              break;
              case "TN":
          skill.baseTN = document.getElementById("base_tn").value;
          skill.bonusTN = document.getElementById("bonus_tn").value;
          skill.basePower = 0;
          skill.bonusPower = 0;
              break;
              case "Power":
          skill.basePower = document.getElementById("base_pow").value;
          skill.bonusPower = document.getElementById("bonus_pow").value;
          skill.baseTN = 0;
          skill.bonusTN = 0;
              break;
              case "Passive":
          skill.basePower = 0;
          skill.bonusPower = 0;
          skill.baseTN = 0;
          skill.bonusTN = 0;
            }
            localStorage.setItem('skillComp', JSON.stringify(compendium));
            termtext(`<anim:term-blue><color:green>Success</color> <color:purple>${skill.name}</color> has been updated.\n`);
            closeForm();
          });

          document.getElementById("form-cancel").addEventListener("click", closeForm);
        }


        function deleteSkill(skillId) {
          let compendium = getskillComp();
          let skill = compendium.find(skill => skill.id === skillId);
          termtext(`<anim:term-shake><color:green>Success</color> <color:purple>${skill.name}</color> has been <color:red>deleted</color>.\n`);
          playSound("sounds/Dead.mp3");
          compendium = compendium.filter(skill => skill.id !== skillId);
          localStorage.setItem('skillComp', JSON.stringify(compendium));
        }

        document.getElementById(`form-create`).addEventListener('click', () => {
          editSkill(Date.now());
        });

        document.getElementById(`form-export`).addEventListener('click', () => {
          let compendium = getskillComp();
          let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(compendium));
          let downloadAnchorNode = document.createElement('a');
          downloadAnchorNode.setAttribute("href", dataStr);
          downloadAnchorNode.setAttribute("download", "skillComp.json");
          document.body.appendChild(downloadAnchorNode); // required for firefox
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
          termtext(`<anim:term-bounce><color:green>Success</color> Exported Skill Compendium.\n`);

        });

        document.getElementById(`form-import`).addEventListener('click', () => {
          let input = document.createElement('input');      
          input.type = 'file';
          input.accept = '.json';
          input.click();
          input.onchange = e => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file,'UTF-8');
            reader.onload = readerEvent => {
              let content = readerEvent.target.result;
              let compendium = JSON.parse(content);
              localStorage.setItem('skillComp', JSON.stringify(compendium));
              refreshcomp();
              playSound("sounds/Comp.mp3");
              termtext(`<anim:term-bounce><color:green>Success</color> Imported Skill Compendium.\n`);
            }
          };
        });
          
      break;
      case "assign":
        formDisplay.innerHTML = `
          <div class="form text-white p-4 max-w-[640px] bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50">  
            <h1 class="text-center font-bold mb-2">Assign Skills</h1>
            <h3 class="text-center font-bold mb-2">Select User for Assignment</h3>
            <div>
              <div class="mb-2">
                <label for="search-player">Search</label>
                <input class="input form-input w-1/4 hover-sfx" type="text" id="search-player" placeholder="Player Name" data-hoversound="sounds/cursor.mp3">
              </div>
            </div>
            <div id="assign-display"></div>
            <div class="w-full justify-center gap-6 p-4 flex">
              <input class="btn btn-sm form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
            </div>
          </div>
        `;
        let formCancelerrrrrrrrr = document.getElementById("form-cancel");
        termtext(`<color:yellow>Opening</color> Skill Assignment.\n`);
        formCancelerrrrrrrrr.addEventListener("click", closeForm);
        let assignDisplay = document.getElementById("assign-display");
        searchSkillInput = document.getElementById("search-skill");
        searchPlayerInput = document.getElementById("search-player");

        function refreshAssign(searchTerm = "") {
          let players = getPlayers();
          // Filter players based on search term
          if (searchTerm) {
            players = players.filter(player => player.Name.toLowerCase().includes(searchTerm.toLowerCase()));
          }
            assignDisplay.innerHTML = `
            <div class="card grid grid-cols-1 p-12 gap-2 bg-base-300 border-neutral border-2 max-h-80 overflow-y-auto">
            ${players.map((player) => `
              <div class="btn grid grid-cols-2 bg-gradient-to-br from-primary to- hover:border-accent hover:border-single hover:border-2 hover:shadow-lg hover:shadow-accent/50 p-2">
              <div class="flex gap-2 justify-start items-center">
                <img alt="${player.Name}" class="pic card xs:min-w-6 sm:size-7 sm:min-w-7 md:min-w-8 md:size-8 size-6 border-4 border-double border-neutral" id="avatar-${player.id}">
                <h3 class="font-bold truncate text-sm text-left"><i>Lv<b>${player.Level}</b></i> ${player.Name}</h3>
              </div>
              <div class="flex gap-2 justify-end items-center">
                <input class="btn btn-sm form-input hover-sfx place-self-center click-sfx" type="submit" id="form-assign-${player.id}" value="Assign" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3">
              </div>
              </div>
            `).join("")}
            </div>
            `;

            // Load avatars from IndexedDB
            players.forEach(async (player) => {
            const file = await getImageFromIndexedDB(player.id);
            if (file) {
              const url = URL.createObjectURL(file);
              const avatar = document.getElementById(`avatar-${player.id}`);
              avatar.src = url;
            }
            else {
              document.getElementById(`avatar-${player.id}`).classList.add("opacity-0");
            }
            });
          // Add event listeners for assign buttons
          players.forEach((player) => {
            document.getElementById(`form-assign-${player.id}`).addEventListener('click', () => {
              assignSkills(player.id);
            });
          });
        }

        searchPlayerInput.addEventListener("input", (event) => {
          refreshAssign(event.target.value);
        });

        refreshAssign();

        function assignSkills(playerId) {
          let players = getPlayers();
          let player = players.find(player => player.id === playerId);
          if (!player.skills) {
            player.skills = [];
            localStorage.setItem('players', JSON.stringify(players));
          }
          termtext(`<anim:term-blue><color:yellow>Assigning</color> Skills to <color:blue>${player.Name}</color>.\n`);
          formDisplay.innerHTML = `
            <div class="form text-white max-w-[640px] p-4 bg-gradient-to-b from-secondary to- shadow-lg shadow-secondary/50">
              <h2 class="text-center font-bold mb-4">Assign Skills to ${player.Name}</h2>
              <div class="grid grid-cols-2 gap-2 place-items-start">
          <div class="mb-2">
            <label for="search-skill">Search</label>
            <input class="input form-input hover-sfx" type="text" id="search-skill" placeholder="Skill Name" data-hoversound="sounds/cursor.mp3">
          </div>
              </div>
              <div id="assign-skill-display"></div>
              <div class="w-full justify-center gap-6 p-4 flex">
          <input class="btn btn-sm btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
              </div>
            </div>
          `;
          let assignSkillDisplay = document.getElementById("assign-skill-display");
          searchSkillInput = document.getElementById("search-skill");

          function refreshAssignSkills(searchTerm = "") {
            let compendium = getskillComp();
            let players = getPlayers();
            let player = players.find(player => player.id === playerId);
            // Sort compendium by type and then by name
            compendium.sort((a, b) => {
              if (a.type < b.type) return -1;
              if (a.type > b.type) return 1;
              if (a.name < b.name) return -1;
              if (a.name > b.name) return 1;
              return 0;
            });
            // Filter compendium based on search term
            if (searchTerm) {
              compendium = compendium.filter(skill => skill.name.toLowerCase().includes(searchTerm.toLowerCase()));
            }
            assignSkillDisplay.innerHTML = `
              <div class="card grid grid-cols-1 p-12 gap-2 bg-base-300 border-neutral border-2 max-h-80 overflow-y-auto">
              ${compendium.map((skill) => {
          const isAssigned = player.skills.includes(skill.id);
          return `
            <div class="btn grid grid-cols-2 bg-gradient-to-br from-primary to- hover:border-accent hover:border-single hover:border-2 hover:shadow-lg hover:shadow-accent/50 p-2 tooltip tooltip-secondary" data-tip="${skill.description}">
              <div class="flex gap-2 justify-start items-center">
                <img alt="${skill.Type}" class="size-8 rounded-full drop-shadow-lg" src="views/${skill.type}.png">
                <h3 class="font-bold truncate text-sm text-left">${skill.name}</h3>
              </div>
              <div class="flex gap-2 justify-end items-center">
                <p id="cost-label-${skill.id}" class="opacity-80 rounded-full p-1 place-self-center text-xs text-right w-16 sm:w-20 bg-base-300 border-neutral border-2">${skill.costNum} <span class="text-yellow-400">${skill.costType}</span></p>
                <input class="btn btn-sm w-24 form-input hover-sfx place-self-center click-sfx" type="submit" id="form-assign-${skill.id}" value="${isAssigned ? 'X' : 'Assign'}" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Okay.mp3">
              </div>
            </div>
          `;
              }).join("")}
              </div>
            `;
            // Hide cost label if no cost
            compendium.forEach((skill) => {
              if (skill.costType === "None") {
                document.querySelector(`#cost-label-${skill.id}`).classList.add("opacity-0");
              }
            });
            // Add event listeners for assign buttons
            compendium.forEach((skill) => {
              document.getElementById(`form-assign-${skill.id}`).addEventListener('click', () => {
                toggleSkillAssignment(player.id, skill.id);
                refreshAssignSkills(searchSkillInput.value);
              });
            });
          }
          
          searchSkillInput.addEventListener("input", (event) => {
            refreshAssignSkills(event.target.value);
          });

          function toggleSkillAssignment(playerid, skillid) {
            let players = getPlayers();
            let player = players.find(player => player.id === playerid);
            let compendium = getskillComp();
            let skill = compendium.find(skill => skill.id === skillid);
            if (player.skills.includes(skill.id)) {
              player.skills = player.skills.filter(id => id !== skill.id);
              termtext(`<anim:term-blue><color:green>Success</color> <color:purple>${skill.name}</color> has been removed from <color:blue>${player.Name}</color>.\n`);
            } else {
              player.skills.push(skill.id);
              termtext(`<anim:term-blue><color:green>Success</color> <color:purple>${skill.name}</color> has been assigned to <color:blue>${player.Name}</color>.\n`);
            }
            localStorage.setItem('players', JSON.stringify(players));
          }
          
          document.getElementById("form-cancel").addEventListener("click", closeForm);
          refreshAssignSkills();
        }
      break;
      default:
        formDisplay.innerHTML = `
					<div class="form text-white rounded-lg rounded-tl-3xl p-4 w-1/2 bg-gradient-to-b from-accent to- shadow-lg shadow-secondary/50">  
						<h2 class="align-text-center font-bold mb-4">Sorry! This feature isn't ready yet. </h2>
						<input class="btn btn-sm place-self-center btn-square form-input hover-sfx click-sfx" type="submit" id="form-cancel" value="X" data-hoversound="sounds/cursor.mp3" data-clicksound="sounds/Negative.mp3">
					</div>
				   `;
        let formCancelerrrrrrrr = document.getElementById("form-cancel");
        termtext(`<anim:term-pulse><color:red>Debug</color> Section unfinished.\n`);
        formCancelerrrrrrrr.addEventListener("click", closeForm);
    }
  }

  function setupFormEventListenersQuick() {
    const fateIncrease = document.getElementById("fate-increase");
    const fateDecrease = document.getElementById("fate-decrease");
    const formCancel = document.getElementById("form-cancel");
    const formConfirm = document.getElementById("form-confirm");

    fateIncrease.addEventListener("click", () => {
      if (currentPlayer && currentPlayer.Fate_Current < currentPlayer.Fate_Max) {
        currentPlayer.Fate_Current++;
        document.getElementById("form-fate").textContent = currentPlayer.Fate_Current;
      }
    });

    fateDecrease.addEventListener("click", () => {
      if (currentPlayer && currentPlayer.Fate_Current > 0) {
        currentPlayer.Fate_Current--;
        document.getElementById("form-fate").textContent = currentPlayer.Fate_Current;
      }
    });

    formConfirm.addEventListener("click", () => {
      if (currentPlayer) {
        const players = getPlayers();
        const formHP = document.getElementById("form-hp");
        const formMP = document.getElementById("form-mp");
        const formStatus = document.getElementById("form-status");

        // Update currentPlayer's stats
        currentPlayer.HP_Current = Math.min(currentPlayer.HP_Max, Math.max(0, currentPlayer.HP_Current - formHP.value));
        currentPlayer.MP_Current = Math.min(currentPlayer.MP_Max, Math.max(0, currentPlayer.MP_Current - formMP.value));
        currentPlayer.Status = formStatus.value;

        // Check and update player status
        if (currentPlayer.Status !== "Dead" && currentPlayer.HP_Current === 0) {
          playSound("sounds/Dead.mp3", 1);
          currentPlayer.Status = "Dead";
          termtext(`<anim:term-pulse> <color:red>WARNING!!!</color> <color:blue>${currentPlayer.Name}</color> has been <color:red>killed</color>.\n`);
        } else if (
          currentPlayer.Status === "Normal" &&
          currentPlayer.HP_Current <= currentPlayer.HP_Max / 2
        ) {
          playSound("sounds/Attack.mp3", 0.5);
          currentPlayer.Status = "Low_HP";
          termtext(`<anim:term-shake><color:red>WARNING!!!</color> <color:blue>${currentPlayer.Name}</color> is in critical condition.\n`);
        } else if (
          currentPlayer.Status === "Dead" &&
          currentPlayer.HP_Current > 0
        ) {
          playSound("sounds/Raise.mp3", 1);
          termtext(`<anim:term-green><color:blue>${currentPlayer.Name}</color> has been <color:green>revived</color>.\n`);
          currentPlayer.Status = currentPlayer.HP_Current <= currentPlayer.HP_Max / 2 ? "Low_HP": "Normal";
        } else if (
          currentPlayer.Status === "Low_HP" &&
          currentPlayer.HP_Current > currentPlayer.HP_Max / 2
        ) {
          playSound("sounds/Heal.mp3", 1);
          termtext(`<anim:term-bounce><color:blue>${currentPlayer.Name}</color> is no longer in critical condition.\n`);
          currentPlayer.Status = "Normal";
        }

        // Save updated players to local storage
        const updatedPlayers = players.map((player) => player.id === currentPlayer.id ? currentPlayer : player);
        setPlayers(updatedPlayers);

        // Refresh party slots
        populatePartySlots();
      }

      termtext(`<anim:term-blue><b>Data Updated</b>.\n`);
      closeForm();
	  updateBottomDisplay("None");
    });

    formCancel.addEventListener("click", closeForm);
  }

  function updateFormValuesQuick(player) {
    document.getElementById("form-player-name").textContent = player.Name;
    document.getElementById("form-hp").value = 0;
    document.getElementById("form-mp").value = 0;
    document.getElementById("form-fate").textContent = player.Fate_Current;
    document.getElementById("form-status").value = player.Status;
  }

  function updateCornerDisplay() {
    const system = getSystem();
    const cornerdisplay = document.getElementById("corner-display");
    moonimage = document.getElementById("moonimage");
    maccadisplay = document.getElementById("macca-display").textContent = maccadisplay = `${system.macca}`;

    let phase = system.moon % 8;
    if (system.moon == 0) {
      phase = "NEW";
    } else if (phase == 4) {
      phase = "HALF";
    } else if (system.moon == 8) {
      phase = "FULL";
    } else {
      phase = `${phase}/8`;
    }

    let moonicon = `${system.moon}.gif`;
    moondisplay = document.getElementById("phase-display").innerHTML = `${phase}<br>MOON`;
    moonimage.innerHTML = `<img src="views/${moonicon}" alt="${system.moon}" class="w-8 h-8 rounded-full shadow-lg ring-2 ring-secondary">`;
  }

  const menuTabs = document.querySelectorAll(".tab-button");
  const menuOps = document.querySelectorAll(".menu-option");
  let currentIndex = 0;

  // Set initial focus
  menuTabs[currentIndex].focus();

  // Helper to update active tab
  const updateTabSelection = (newIndex) => {
    menuTabs[currentIndex].setAttribute("aria-selected", "false");
    menuTabs[currentIndex].setAttribute("tabindex", "-1");
    currentIndex = newIndex;

    menuTabs[currentIndex].setAttribute("aria-selected", "true");
    menuTabs[currentIndex].setAttribute("tabindex", "0");
    menuTabs[currentIndex].focus();
  };

  // Keyboard navigation
  document.addEventListener("keydown", (event) => {
    const key = event.key;
    const menuOptions = document.querySelectorAll(".menu-option");
    const activeForm = document.querySelector("#player-form:not(.hidden)"); // Check if the form is open
    const partySlots = document.querySelectorAll(".party-member");
    const isMenuActive = menuOptions.length > 0;
    const isFormActive = !!activeForm;
    const formElements = activeForm ? activeForm.querySelectorAll("input, button, select, textarea, [tabindex]:not([tabindex='-1'])"): null;
    const focusedPartySlot = document.activeElement;
    const partySlotsArray = Array.from(partySlots);
    const currentPartyIndex = partySlotsArray.indexOf(focusedPartySlot);

    if (isFormActive) {
      const formElements = Array.from(
        activeForm.querySelectorAll(
          "input, button, select, textarea, [tabindex]:not([tabindex='-1'])",
        ),
      );

      const focusableElements = formElements.filter((el) => {
        return (
          el.offsetParent !== null &&
          !el.classList.contains("hidden") &&
          el.getAttribute("tabindex") !== "-1"
        );
      });

      // Focus trap logic for the form
      if (key === "Tab") {
        event.preventDefault();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        if (event.shiftKey) {
          // Move focus backward
          if (document.activeElement === firstElement) {
            lastElement.focus();
          } else {
            const index =
              Array.from(focusableElements).indexOf(document.activeElement) - 1;
            focusableElements[Math.max(0, index)].focus();
          }
        } else {
          // Move focus forward
          if (document.activeElement === lastElement) {
            firstElement.focus();
          } else {
            const index =
              Array.from(focusableElements).indexOf(document.activeElement) + 1;
            focusableElements[
              Math.min(focusableElements.length - 1, index)
            ].focus();
          }
        }
      } else if (key === "Escape") {
        // Allow closing the form with Escape
        event.preventDefault();
        playSound("sounds/Negative.mp3");
        formclose();
      } else if (key === "Enter") {
        event.preventDefault();
        document.activeElement.click(); // Simulate a click on the focused menu option
      }
      return; // Prevent further handling when form is active
    }

    if (isMenuActive) {
      // Handle keystrokes for the menu navigation
      const focusedMenuOption = document.activeElement;
      const menuOptionsArray = Array.from(menuOptions);
      const currentMenuIndex = menuOptionsArray.indexOf(focusedMenuOption);

      if (key === "ArrowRight") {
        event.preventDefault();
        const nextIndex = (currentMenuIndex + 1) % menuOptionsArray.length;
        menuOptionsArray[nextIndex].focus();
      } else if (key === "ArrowLeft") {
        event.preventDefault();
        const prevIndex =
          (currentMenuIndex - 1 + menuOptionsArray.length) %
          menuOptionsArray.length;
        menuOptionsArray[prevIndex].focus();
      } else if (key === "ArrowUp") {
        event.preventDefault();
        const prevIndex =
          (currentMenuIndex - 2 + menuOptionsArray.length) %
          menuOptionsArray.length;
        menuOptionsArray[prevIndex].focus();
      } else if (key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = (currentMenuIndex + 2) % menuOptionsArray.length;
        menuOptionsArray[nextIndex].focus();
      } else if (key === "Enter") {
        event.preventDefault();
        focusedMenuOption.click(); // Simulate a click on the focused menu option
      } else if (key === "Escape") {
        // Close the menu and return focus to the tab
        playSound("sounds/Negative.mp3");
        event.preventDefault();
        closeMenu();
      }
      if (key === "Tab") {
        event.preventDefault();
        if (event.shiftKey) {
          // Move focus backward
          const prevIndex =
            (currentMenuIndex - 1 + menuOptionsArray.length) % menuOptionsArray.length;
          menuOptionsArray[prevIndex].focus();
        } else {
          const nextIndex = (currentMenuIndex + 1) % menuOptionsArray.length;
          menuOptionsArray[nextIndex].focus();
        }
      }

      return; // Prevent further handling
    }

    // Default behavior for navigating tabs
    if (key === "ArrowRight") {
      event.preventDefault();
      const nextTabIndex = (currentIndex + 1) % menuTabs.length;
      updateTabSelection(nextTabIndex);
    } else if (key === "ArrowLeft") {
      event.preventDefault();
      const prevTabIndex =
        (currentIndex - 1 + menuTabs.length) % menuTabs.length;
      updateTabSelection(prevTabIndex);
    } else if (key === "ArrowDown") {
      // Navigate to the first party slot
      if (currentPartyIndex === -1 && partySlots.length > 0) {
        event.preventDefault();
        partySlots[0].focus();
      } else if (currentPartyIndex !== -1) {
        // Move to the next party slot
        event.preventDefault();
        const nextPartyIndex = (currentPartyIndex + 1) % partySlotsArray.length;
        partySlots[nextPartyIndex].focus();
      }
    } else if (key === "ArrowUp") {
      // Move to the previous party slot
      if (currentPartyIndex === -1 && partySlots.length > 0) {
        event.preventDefault();
        partySlots[5].focus();
      } else if (currentPartyIndex > 0) {
        event.preventDefault();
        const prevPartyIndex =
          (currentPartyIndex - 1 + partySlotsArray.length) %
          partySlotsArray.length;
        partySlots[prevPartyIndex].focus();
      } else {
        // Return focus to the tabs
        event.preventDefault();
        menuTabs[currentIndex].focus();
      }
    } else if (key === "Enter") {
      if (currentPartyIndex !== -1) {
        // Handle party slot interaction
        event.preventDefault();
        partySlots[currentPartyIndex].click();
      } else {
        // Simulate tab click
        event.preventDefault();
        menuTabs[currentIndex].click();
      }
    } else if (key === "Escape") {
      event.preventDefault();
      openForm("cornerdisplay");
      playSound("sounds/Okay.mp3");
      menuTabs[currentIndex].focus();
    } else if (key === "Tab") {
      event.preventDefault();
      if (event.shiftKey) {
        // Move focus backward
        const nextTabIndex = (currentIndex + 3) % menuTabs.length;
        updateTabSelection(nextTabIndex);
      }
      const nextTabIndex = (currentIndex + 1) % menuTabs.length;
      updateTabSelection(nextTabIndex);
    }
  });

  // Helper function to close the menu
  function closeMenu() {
    updateBottomDisplay("None"); // Clear menu content
    menuTabs[currentIndex].focus(); // Restore focus to the active tab
  }

  // Helper function to close the form
  function formclose() {
    closeForm();
    const menuOptions = document.querySelectorAll(".menu-option");
    if (menuOptions.length > 0) {
      menuOptions[0].focus(); // Return focus to the first menu option
    }
  }
  
function openDatabase() {
	const DB_NAME = "UserImages";
	const STORE_NAME = "avatar";
	
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, 1);
		request.onupgradeneeded = (event) => {
		const db = event.target.result;
			if (!db.objectStoreNames.contains(STORE_NAME)) {
				db.createObjectStore(STORE_NAME, { keyPath: "id" });
			}
		};
		
		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

function saveImageToIndexedDB(id, file) {
	return new Promise(async (resolve, reject) => {
		const DB_NAME = "UserImages";
		const STORE_NAME = "avatar";
		const db = await openDatabase();
		const transaction = db.transaction(STORE_NAME, "readwrite");
		const store = transaction.objectStore(STORE_NAME);

		const request = store.put({ id, file });
		request.onsuccess = () => resolve(true);
		request.onerror = () => reject(request.error);
	});
}

function getImageFromIndexedDB(id) {
      return new Promise(async (resolve, reject) => {
		const DB_NAME = "UserImages";
		const STORE_NAME = "avatar";
        const db = await openDatabase();
        const transaction = db.transaction(STORE_NAME, "readonly");
        const store = transaction.objectStore(STORE_NAME);

        const request = store.get(id);
        request.onsuccess = () => resolve(request.result ? request.result.file : null);
        request.onerror = () => reject(request.error);
      });
    }
	
	function deleteImageFromIndexedDB(id) {
  return new Promise(async (resolve, reject) => {
    try {
	const DB_NAME = "UserImages";
	const STORE_NAME = "avatar";
      const db = await openDatabase();
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      // Delete the image by `id`
      const request = store.delete(id);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    } catch (error) {
      console.error("Error deleting image:", error);
      reject(error);
    }
  });
}


function ClearImages() {
  return new Promise(async (resolve, reject) => {
    try {
	const DB_NAME = "UserImages";
	const STORE_NAME = "avatar";
    const db = await openDatabase();
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

      // Clear all records
      const request = store.clear();
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error);
    } catch (error) {
      console.error("Error clearing images:", error);
      reject(error);
    }
  });
}
});
