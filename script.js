const cardOptions = [
  "One-word title",
  "Published in the last year",
  "Set in a country you want to visit",
  "Has a color in the title",
  "Classic novel",
  "Female author",
  "Mystery or thriller",
  "Non-human protagonist",
  "Author from a different continent",
  "Nice cover",
  "Based on a true story",
  "Movie or TV adaptation",
  "Includes magic or fantasy",
  "Graphic novel",
  "Originally in another language",
  "Set during a specific historical event",
  "Romance plot",
  "Memoir or autobiography",
  "Number in the title",
  "Explores social issues",
  "Friend suggested",
  "Twist ending",
  "Set in the future",
  "Won a literary award",
  "Finished in a weekend",
  "Over 500 pages",
  "Young adult novel",
  "Short story collection",
  "Debut author",
  "Multiple time periods",
  "Road trip",
  "Set in space",
  "Villain protagonist",
  "Family-centered plot",
  "Small town setting",
  "Hidden identity",
  "Animal companion",
  "Outsider protagonist",
  "Mental health issues",
  "Diary or letter format",
  "Time travel element",
  "Island setting",
  "Non-linear narrative",
  "Unreliable narrator",
  "Holiday setting",
  "Adventure plot",
  "Superpowers",
  "Dystopian world",
  "Set in the past",
  "Coming-of-age story",
  "Friendship-centered plot",
  "Large city setting",
  "Written in verse or poetry",
  "Elements of horror",
  "Detective protagonist",
  "Themes of identity",
  "Non-English speaking country",
  "Secret society",
  "Love triangle",
  "School or university setting",
  "Heist or robbery",
  "Influencer suggested",
  "Strong female lead",
  "Supernatural creature",
  "Winter or holiday setting",
  "Wilderness or nature setting",
  "Prophecy",
  "Espionage or spies",
  "Crime-focused plot",
  "Anti-hero protagonist",
  "Castle or mansion setting",
  "High fantasy world",
  "Food or cooking focus",
  "Older protagonist",
  "Fate or destiny",
  "Advanced technology",
  "Twist on a fairy tale",
  "Unexpected friendship",
  "Journey of self-discovery",
  "Summer setting",
  "Historical figure as a character",
  "Cultural or religious themes",
  "Forbidden or complex love",
  "Unexpected mystery solution",
  "Jungle or rainforest setting",
  "Character transformation",
  "Alternate reality",
  "Courtroom drama",
  "Futuristic dystopia",
  "Reluctant hero",
  "Author you've never read before",
  "Feud or rivalry",
  "Revenge story",
  "Desert or arid setting",
  "Survival or stranded plot",
  "Grand family saga",
  "Non-traditional narrative",
  "Utopian society",
  "War setting",
  "Unlikely friendship",
  "Fictional town or city",
  "Sports competition or team",
  "Haunted house setting",
  "Famous landmark",
  "Morally gray character",
  "Treasure hunt or quest",
  "Nature or environment focus",
  "Conspiracy or cover-up",
  "Political theme",
  "Political unrest",
  "Celebration or festival",
  "Water setting",
  "High school or college setting",
  "Scientist or inventor protagonist",
  "Mental or physical challenge",
  "Journey of escape",
  "Tropical or exotic setting",
  "Time loops or parallel universes",
  "Major betrayal",
  "Author from an unfamiliar country",
  "Secret or hidden romance",
  "Farm or rural setting",
  "Immortal or long-lived character",
  "Belonging or fitting in theme",
  "Significant historical event",
  "Magical school or academy",
  "Freedom or independence theme",
  "Moral dilemma",
  "Leader or ruler protagonist",
  "Unusual hobby or interest",
  "Custom time period",
  "Dangerous journey or expedition",
  "Decaying or dying world",
  "Hidden truth plot",
  "Hospital or medical setting",
  "Redemption arc",
  "Search for a lost artifact",
  "Shared initials with the author",
  "Major life event or turning point",
];

function generateCard() {
  const size = document.getElementById("cardSize").value;
  const blankCenter = document.getElementById("blankCenter").checked;
  const cardContainer = document.getElementById("bingoCard");
  cardContainer.innerHTML = "";

  const rows = size === "5x5" ? 5 : 4;
  const cols = rows;

  cardContainer.style.gridTemplateColumns = `auto repeat(${cols}, 1fr)`;

  // Add blank top-left cell
  const blankCell = document.createElement("div");
  blankCell.classList.add("bingo-cell");
  cardContainer.appendChild(blankCell);

  // Add header row
  const labels = size === "5x5" ? "BINGO" : "READ";

  for (let j = 0; j < cols; j++) {
    const headerCell = document.createElement("div");
    headerCell.classList.add("bingo-cell", "bingo-header");
    headerCell.textContent = labels[j];
    cardContainer.appendChild(headerCell);
  }

  const usedOptions = new Set();

  for (let i = 0; i < rows; i++) {
    // Add row index
    const indexCell = document.createElement("div");
    indexCell.classList.add("bingo-cell", "bingo-index");
    indexCell.textContent = i + 1; // Row numbers
    cardContainer.appendChild(indexCell);

    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("div");
      cell.classList.add("bingo-cell");

      if (
        size === "5x5" &&
        blankCenter &&
        i === Math.floor(rows / 2) &&
        j === Math.floor(cols / 2)
      ) {
        cell.textContent = "Free";
        cell.classList.add("free-space");
      } else {
        let option;

        do {
          option = getRandomOption();
        } while (usedOptions.has(option));

        usedOptions.add(option);
        cell.textContent = option; // Fill with random option
      }

      cardContainer.appendChild(cell);
    }
  }
}

function getRandomOption() {
  return cardOptions[Math.floor(Math.random() * cardOptions.length)];
}

document
  .getElementById("generateButton")
  .addEventListener("click", generateCard);

document.getElementById("downloadButton").addEventListener("click", () => {
  html2canvas(document.getElementById("bingoCard")).then((canvas) => {
    const ctx = canvas.getContext("2d");

    // Set watermark properties
    ctx.font = "30px Pacifico";
    ctx.fillStyle = "rgba(255, 105, 180, 0.5)"; // Soft pink with transparency
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Calculate position for watermark
    const x = canvas.width / 2;
    const y = canvas.height - 30; // Position near the bottom

    // Draw the watermark on the canvas
    ctx.fillText("Biblingo", x, y);

    // Create download link
    const link = document.createElement("a");
    link.download = "book-bingo-card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

// Generate default card on page load
document.addEventListener("DOMContentLoaded", generateCard);
