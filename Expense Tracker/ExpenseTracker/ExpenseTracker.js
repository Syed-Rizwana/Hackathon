var ExpenseTracker = /** @class */ (function () {
    function ExpenseTracker() {
        var _a;
        this.expenses = [];
        this.amountInput = document.getElementById("amountInput");
        this.categoryInput = document.getElementById("catInput");
        this.dateInput = document.getElementById("dateInput");
        this.tableBody = document.getElementById("expenseTableBody");
        this.summary = document.getElementById("summary");
        (_a = document.getElementById('expenseForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', this.addExpense.bind(this));
    }
    ExpenseTracker.prototype.addExpense = function (event) {
        event.preventDefault();
        var amount = parseFloat(this.amountInput.value);
        var category = this.categoryInput.value;
        var date = new Date(this.dateInput.value);
        var expense = { amount: amount, category: category, date: date };
        this.expenses.push(expense);
        this.renderTable();
        this.renderSummary();
        this.clearForm();
    };
    ExpenseTracker.prototype.deleteExpense = function (index) {
        this.expenses.splice(index, 1);
        this.renderTable();
        this.renderSummary();
    };
    ExpenseTracker.prototype.editExpense = function (index) {
        var expense = this.expenses[index];
        this.amountInput.value = expense.amount.toString();
        this.categoryInput.value = expense.category;
        this.dateInput.value = expense.date.toISOString();
        this.deleteExpense(index);
    };
    ExpenseTracker.prototype.renderTable = function () {
        var _this = this;
        this.tableBody.innerHTML = '';
        this.expenses.forEach(function (expense, index) {
            var row = document.createElement('tr');
            row.innerHTML = "\n                <td>".concat(expense.amount, "</td>\n                <td>").concat(expense.category, "</td>\n                <td>").concat(expense.date.toDateString(), "</td>\n                <td>\n                    <button onclick=\"expenseTracker.editExpense(").concat(index, ")\">Edit</button>\n                    <button onclick=\"expenseTracker.deleteExpense(").concat(index, ")\">Delete</button>\n                </td>\n            ");
            _this.tableBody.appendChild(row);
        });
    };
    ExpenseTracker.prototype.renderSummary = function () {
        var summary = this.expenses.reduce(function (acc, expense) {
            if (!acc[expense.category]) {
                acc[expense.category] = 0;
            }
            acc[expense.category] += expense.amount;
            return acc;
        }, {});
        this.summary.innerHTML = '<h3>Expense Summary by Category</h3>';
        for (var category in summary) {
            var p = document.createElement('p');
            p.textContent = "".concat(category, ": $").concat(summary[category].toFixed(2));
            this.summary.appendChild(p);
        }
    };
    ExpenseTracker.prototype.clearForm = function () {
        this.amountInput.value = '';
        this.categoryInput.value = '';
        this.dateInput.value = '';
    };
    return ExpenseTracker;
}());
var expenseTracker = new ExpenseTracker();
