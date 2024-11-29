// Path to your CSV file
const csvFilePath = "Table_Input.csv";

// fetch and parse CSV
function loadCSV(filePath, callback) {
  fetch(filePath)
    .then((response) => response.text())
    .then((data) => {
      const rows = data.split("\n").map((row) => row.split(","));
      callback(rows);
    })
}

// Populate Table 1
function populateTable1(data) {
  const table1 = document.getElementById("table1");
  data.forEach(([index, value]) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${index}</td><td>${value}</td>`;
    table1.appendChild(row);
  });
}

// Calculate and Populate Table 2
function populateTable2(data) {
  const table2 = document.getElementById("table2");

  // Convert data to an object 
  const dataObj = Object.fromEntries(data.map(([key, value]) => [key, Number(value)]));

  const alpha = dataObj.A5 + dataObj.A20; // A5 + A20
  const beta = dataObj.A15 / dataObj.A7;  // A15 / A7
  const charlie = dataObj.A13 * dataObj.A12; // A13 * A12

  const rows = [
    { category: "Alpha", value: alpha },
    { category: "Beta", value: beta },
    { category: "Charlie", value: charlie },
  ];

  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${row.category}</td><td>${row.value}</td>`;
    table2.appendChild(tr);
  });
}

// Initialize Tables
loadCSV(csvFilePath, (rows) => {
  populateTable1(rows); // Populate Table 1
  populateTable2(rows); // Populate Table 2
});
