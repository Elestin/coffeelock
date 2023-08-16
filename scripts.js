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
    let totalSorceryPoints = baseSorceryPoints + conversionCost;

    // Output the result
    document.getElementById("output").innerHTML = "You will have " + totalSorceryPoints + " sorcery points after " + numberOfShortRests + " short rests.";
}