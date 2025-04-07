document.addEventListener("DOMContentLoaded", () => {
  const ExpenseForm = document.getElementById("Expense-form");
  const ExpenseName = document.getElementById("Expense-name");
  const ExpenseAmount = document.getElementById("Expense-amount");
  const addExpenseBtn = document.getElementById("addexpense-btn");
  const ExpenseList = document.getElementById("Expense-list");
  const TotalPrice = document.getElementById("Total-price");

  // Load expenses from localStorage
  let Expense = JSON.parse(localStorage.getItem("Expense")) || [];

  // Update total amount on page load
  TotalPriceAmount();
  renderExpense();

  ExpenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = ExpenseName.value.trim();
    const amount = parseFloat(ExpenseAmount.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpenses = {
        id: Date.now(),
        Name: name,
        Amount: amount, // Fixed case
      };

      Expense.push(newExpenses);
      SaveExpenseToLocal();
      TotalPriceAmount();
      renderExpense();

      // Clear the input fields
      ExpenseAmount.value = "";
      ExpenseName.value = "";
    }
  });
  function renderExpense() {
    ExpenseList.textContent = "";
    Expense.forEach((element) => {
      const li = document.createElement("li");
      li.innerHTML = `
      ${element.Name}-$${element.Amount}
      <button data-id="${element.id}">delete</button>
      `;
      ExpenseList.appendChild(li);
    });
  }
  function SaveExpenseToLocal() {
    localStorage.setItem("Expense", JSON.stringify(Expense));
  }

  function calculateTotal() {
    return Expense.reduce((sum, expense) => sum + expense.Amount, 0); // Fixed case
  }

  function TotalPriceAmount() {
    let totalamount = calculateTotal();
    TotalPrice.textContent = totalamount.toFixed(2); // Fixed function case
  }
  ExpenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const ExpenseId = parseInt(e.target.getAttribute("data-id"));
      Expense = Expense.filter(expenses => expenses.id !== ExpenseId);
      SaveExpenseToLocal();
      TotalPriceAmount();
      renderExpense();
    }
  });
});
