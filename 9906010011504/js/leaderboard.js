document.addEventListener("DOMContentLoaded", function() {
    const stageGroupSelect = document.getElementById("stageGroupSelect");
    const tbody = document.querySelector("#leaderboard tbody");

    const csvFiles = {
      "PRIZEPOOL": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuEm4t4q12zxixW0AZ7K3bxTsQJWrVM5Di8Iu3gglHbfiI2dJ1ANNWfs2vYioZHsSQNoHK4BDFyPpJ/pub?gid=183262307&single=true&output=csv",
      "FUNDING": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRuEm4t4q12zxixW0AZ7K3bxTsQJWrVM5Di8Iu3gglHbfiI2dJ1ANNWfs2vYioZHsSQNoHK4BDFyPpJ/pub?gid=0&single=true&output=csv",
    };

    // Populate dropdown
    Object.keys(csvFiles).forEach(optText => {
        const option = document.createElement("option");
        option.value = optText;
        option.text = optText;
        stageGroupSelect.appendChild(option);
    });

    // Initialize Materialize select with dropdown below input
    M.FormSelect.init(stageGroupSelect, { coverTrigger: false });

    // Load CSV & display leaderboard
    function loadLeaderboard(option) {
        const csvUrl = csvFiles[option];
        fetch(csvUrl)
          .then(res => res.text())
          .then(data => {
            const rows = data.trim().split("\n").slice(1);
            tbody.innerHTML = "";
            rows.forEach(row => {
                const [rank, team] = row.split(",");
                const tr = document.createElement("tr");
                tr.innerHTML = `<td>${rank}</td><td>${team}</td>`;
                tbody.appendChild(tr);
            });
          })
          .catch(err => console.error("Error loading leaderboard:", err));
    }

    // Initial load
    stageGroupSelect.selectedIndex = 0;
    loadLeaderboard(stageGroupSelect.value);

    // Update on change
    stageGroupSelect.addEventListener("change", () => {
        loadLeaderboard(stageGroupSelect.value);
    });
});
