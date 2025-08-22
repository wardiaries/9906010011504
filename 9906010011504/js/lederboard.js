document.addEventListener("DOMContentLoaded", function() {
    const stageGroupSelect = document.getElementById("stageGroupSelect");
    const tbody = document.querySelector("#leaderboard tbody");

    // 1️⃣ Google Sheets CSV links per group
    const csvFiles = {
      "Eliminations Group A": "YOUR_CSV_URL_FOR_GROUP_A",
      "Eliminations Group B": "YOUR_CSV_URL_FOR_GROUP_B",
      "Eliminations Group C": "YOUR_CSV_URL_FOR_GROUP_C",
      "Eliminations Group D": "YOUR_CSV_URL_FOR_GROUP_D",
      "Semi Finals Group A": "YOUR_CSV_URL_FOR_SEMI_A",
      "Semi Finals Group B": "YOUR_CSV_URL_FOR_SEMI_B",
      "Finals Group A": "YOUR_CSV_URL_FOR_FINAL_A"
    };

    // 2️⃣ Populate dropdown
    Object.keys(csvFiles).forEach(optText => {
        const option = document.createElement("option");
        option.value = optText;
        option.text = optText;
        stageGroupSelect.appendChild(option);
    });

    M.FormSelect.init(stageGroupSelect); // initialize Materialize

    // 3️⃣ Load CSV and display leaderboard
    function loadLeaderboard(option) {
        const csvUrl = csvFiles[option];
        fetch(csvUrl)
          .then(res => res.text())
          .then(data => {
            const rows = data.trim().split("\n").slice(1); // skip header
            tbody.innerHTML = "";
            rows.forEach(row => {
                const [rank, team, kill, placement, overall] = row.split(",");
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${rank}</td><td>${team}</td><td>${kill}</td><td>${placement}</td><td>${overall}</td>`;
                tbody.appendChild(tr);
            });
          })
          .catch(err => console.error("Error loading leaderboard:", err));
    }

    // 4️⃣ Initial load
    stageGroupSelect.selectedIndex = 0;
    loadLeaderboard(stageGroupSelect.value);

    // 5️⃣ On change
    stageGroupSelect.addEventListener("change", () => {
        loadLeaderboard(stageGroupSelect.value);
    })
