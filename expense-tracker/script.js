// script.js - Expense Tracker
// Uses only college syllabus topics: localStorage, JSON.parse/stringify,
// filter, reduce, forEach, createElement, appendChild, template literals,
// addEventListener, getElementById

// Load saved transactions from localStorage, or start with an empty array
let transactions = JSON.parse(localStorage.getItem("expenses")) || [];

// Calculates income, expense, and balance, then updates the summary boxes
function updateSummary() {
  const income = transactions
    .filter(function (t) { return t.type === "income"; })
    .reduce(function (sum, t) { return sum + t.amount; }, 0);

  const expense = transactions
    .filter(function (t) { return t.type === "expense"; })
    .reduce(function (sum, t) { return sum + t.amount; }, 0);

  const balance = income - expense;

  document.getElementById("balance").textContent       = "\u20B9" + balance.toFixed(2);
  document.getElementById("total-income").textContent  = "\u20B9" + income.toFixed(2);
  document.getElementById("total-expense").textContent = "\u20B9" + expense.toFixed(2);
}

// Builds and displays all transaction items in the list using createElement
function renderList() {
  const list = document.getElementById("transaction-list");
  list.innerHTML = "";

  if (transactions.length === 0) {
    list.innerHTML = "<p style='color:#555;font-size:0.88rem;'>No transactions yet.</p>";
    return;
  }

  transactions.forEach(function (t) {
    const item = document.createElement("div");
    item.className = "tx-item " + t.type;
    const sign = t.type === "income" ? "+" : "-";
    item.innerHTML = `
      <span class="tx-desc">${t.description}</span>
      <span class="tx-amount">${sign}\u20B9${t.amount.toFixed(2)}</span>
      <button class="tx-delete" onclick="deleteTransaction(${t.id})">\u2715</button>
    `;
    list.appendChild(item);
  });
}

// Reads form inputs, validates them, and adds a new transaction
function addTransaction() {
  const desc   = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type   = document.getElementById("type").value;
  const errEl  = document.getElementById("error-msg");

  // Both fields must be valid before adding
  if (!desc || isNaN(amount) || amount <= 0) {
    errEl.textContent = "Please enter a valid description and amount.";
    setTimeout(function () { errEl.textContent = ""; }, 2000);
    return;
  }

  transactions.push({ id: Date.now(), description: desc, amount: amount, type: type });
  localStorage.setItem("expenses", JSON.stringify(transactions));

  // Clear the input fields after adding
  document.getElementById("desc").value   = "";
  document.getElementById("amount").value = "";
  errEl.textContent = "";

  updateSummary();
  renderList();
}

// Removes a transaction by id using filter(), then saves and re-renders
function deleteTransaction(id) {
  transactions = transactions.filter(function (t) { return t.id !== id; });
  localStorage.setItem("expenses", JSON.stringify(transactions));
  updateSummary();
  renderList();
}

// Apply saved theme and show existing transactions when the page loads
applyTheme();
updateSummary();
renderList();
