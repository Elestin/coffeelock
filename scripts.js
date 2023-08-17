let spellSlots = {};
let totalSorceryPoints = 0;


function calculate() {
    let sorcererLevel = parseInt(document.getElementById("sorcererLevel").value, 10);
    let warlockLevel = parseInt(document.getElementById("warlockLevel").value, 10);
    let numberOfShortRests = parseInt(document.getElementById("shortRests").value, 10);
    let adjustPoints = parseInt(document.getElementById("adjustPoints").value, 10);

    // Base sorcery points (including adjustment from magical items)
    let baseSorceryPoints = sorcererLevel + adjustPoints;

    // Calculating Warlock spell slot conversion
    let warlockSpellSlotLevel = (warlockLevel >= 3) ? 2 : 1;
    let warlockSpellSlots = (warlockLevel >= 11) ? 3 : (warlockLevel >= 2) ? 2 : 1;
    let conversionCost = warlockSpellSlotLevel * warlockSpellSlots * numberOfShortRests;

    // Total sorcery points
    totalSorceryPoints = baseSorceryPoints + conversionCost;

    console.log("Calculate function executed. Total sorcery points:", totalSorceryPoints);

    // Output the result
    totalSorceryPoints = baseSorceryPoints + conversionCost;
    document.getElementById("output").innerHTML = "You will have " + totalSorceryPoints + " sorcery points after " + numberOfShortRests + " short rests.";


    console.log("Initialized spell slots:", spellSlots);

    // Initialize the spellSlots based on the Sorcerer level
    spellSlots = getSpellSlotsBasedOnLevel(sorcererLevel);
    
    // Update the UI elements
    updateSpellSlotsTable(spellSlots);
    updateSpellDropdown(spellSlots);
}

// ... previous function ...

// A function to update the spell slots table
function updateSpellSlotsTable(spellSlots) {
    let table = document.getElementById('spellSlotsTable');
    let newRow, levelCell, slotsCell;

    // Clear existing rows (except header)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Populate the table with the data from spellSlots object
    for (let level in spellSlots) {
        newRow = table.insertRow();
        levelCell = newRow.insertCell(0);
        slotsCell = newRow.insertCell(1);
        
        levelCell.textContent = level;
        slotsCell.textContent = spellSlots[level];
    }
    console.log("Updated spell slots table with data:", spellSlots);

}


// A function to update the dropdown based on available spell slots
function updateSpellDropdown(spellSlots) {
  const dropdown = document.getElementById("spellLevelDropdown");
  
  // Clear current options
  dropdown.innerHTML = "";

  for (let level in spellSlots) {
    let option = document.createElement("option");
    option.value = level;
    option.text = level + " Level";
    dropdown.add(option);
  }
  console.log("Updated spell dropdown with data:", spellSlots);

}

// A function to "cast" a spell
function castSpell() {
  const selectedLevel = document.getElementById("spellLevelDropdown").value;
  
  if(document.getElementById("useSorceryPoints").checked) {
    // Deduct the spell's level (in sorcery points) from total sorcery points.
    let spellCostInPoints = parseInt(selectedLevel.charAt(0)); // Assuming "1st" => 1, "2nd" => 2, etc.
    
    // Check if the user has enough sorcery points
    // Now we just directly use the totalSorceryPoints variable.

    
    if(totalSorceryPoints >= spellCostInPoints) {
        totalSorceryPoints -= spellCostInPoints;
        document.getElementById("output").innerHTML = "You will have " + totalSorceryPoints + " sorcery points left.";
    } else {
        alert("Not enough sorcery points!");
        return;
    }
  } else {
    // Deduct one from the appropriate spell slot
    if (spellSlots[selectedLevel] && spellSlots[selectedLevel] > 0) {
      spellSlots[selectedLevel] -= 1;
    } else {
      alert("No available spell slots for that level!");
      return;
    }
  }

  // Update the display
  updateSpellSlotsTable(spellSlots);
  updateSpellDropdown(spellSlots);
}

function getSpellSlotsBasedOnLevel(level) {
    if (level === 1) {
        return { "1st": 2 };
    } else if (level === 2) {
        return { "1st": 3 };
    } else if (level === 3) {
        return { "1st": 4, "2nd": 2 };
    } else if (level === 4) {
        return { "1st": 4, "2nd": 3 };
    } else if (level === 5) {
        return { "1st": 4, "2nd": 3, "3rd": 2 };
    } else if (level === 6 || level === 7) {
        return { "1st": 4, "2nd": 3, "3rd": 3 };
    } else if (level === 8) {
        return { "1st": 4, "2nd": 3, "3rd": 3, "4th": 1 };
    } else if (level === 9) {
        return { "1st": 4, "2nd": 3, "3rd": 3, "4th": 2 };
    } else if (level === 10 || level === 11) {
        return { "1st": 4, "2nd": 3, "3rd": 3, "4th": 2, "5th": 1 };
    } else if (level === 12 || level === 13) {
        return { "1st": 4, "2nd": 3, "3rd": 3, "4th": 2, "5th": 1, "6th": 1 };
    } else if (level === 14 || level === 15) {
        return { "1st": 4, "2nd": 3, "3rd": 3, "4th": 3, "5th": 2, "6th": 1 };
    }
    // ... continue for higher levels if needed
}

function populateDropdownWithNumbers(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    
    for (let i = 1; i <= 20; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        dropdown.appendChild(option);
    }
}

populateDropdownWithNumbers("sorcererLevel");
populateDropdownWithNumbers("warlockLevel");
