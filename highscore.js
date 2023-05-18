const display = document.getElementById("HS-Display");
const allScores = JSON.parse(localStorage.getItem("allScores")) || [];

// Sort the scores array in descending order
const sortedScores = Object.entries(allScores).sort((a, b) => b[1] - a[1]);

for (let i = 0; i < sortedScores.length; i++) {
  const p = document.createElement("p");
  p.textContent = `${sortedScores[i][0]} - ${sortedScores[i][1]} pts`;
  p.className = "is-size-4";
  display.appendChild(p);
}