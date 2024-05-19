interface ManageExpense {
    amount: number;
    category: string;
    date: Date;
}

class ExpenseTracker {
    private expenses: ManageExpense[] = [];
    private amountInput: HTMLInputElement;
    private categoryInput: HTMLInputElement;
    private dateInput: HTMLInputElement;
    private tableBody: HTMLElement;
    private summary: HTMLElement;

    constructor() {
        this.amountInput = document.getElementById("amountInput") as HTMLInputElement;
        this.categoryInput = document.getElementById("catInput") as HTMLInputElement;
        this.dateInput = document.getElementById("dateInput") as HTMLInputElement;
        this.tableBody = document.getElementById("expenseTableBody") as HTMLElement;
        this.summary = document.getElementById("summary") as HTMLElement;

        document.getElementById('expenseForm')?.addEventListener('submit', this.addExpense.bind(this));
    }

    private addExpense(event: Event) {
        event.preventDefault();
        const amount = parseFloat(this.amountInput.value);
        const category = this.categoryInput.value;
        const date = new Date(this.dateInput.value);
        const expense: ManageExpense = { amount, category, date };
        this.expenses.push(expense);
        this.renderTable();
        this.renderSummary();
        this.clearForm();
    }

    private deleteExpense(index: number) {
        this.expenses.splice(index, 1);
        this.renderTable();
        this.renderSummary();
    }

    private editExpense(index: number) {
        const expense = this.expenses[index];
        this.amountInput.value = expense.amount.toString();
        this.categoryInput.value = expense.category;
        this.dateInput.value = expense.date.toISOString();
        this.deleteExpense(index);
    }

    private renderTable() {
        this.tableBody.innerHTML = '';
        this.expenses.forEach((expense, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.amount}</td>
                <td>${expense.category}</td>
                <td>${expense.date.toDateString()}</td>
                <td>
                    <button onclick="expenseTracker.editExpense(${index})">Edit</button>
                    <button onclick="expenseTracker.deleteExpense(${index})">Delete</button>
                </td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    private renderSummary() {
        const summary = this.expenses.reduce((acc, expense) => {
            if (!acc[expense.category]) {
                acc[expense.category] = 0;
            }
            acc[expense.category] += expense.amount;
            return acc;
        }, {} as { [key: string]: number });

        this.summary.innerHTML = '<h3>Expense Summary by Category</h3>';
        for (const category in summary) {
            const p = document.createElement('p');
            p.textContent = `${category}: $${summary[category].toFixed(2)}`;
            this.summary.appendChild(p);
        }
    }

    private clearForm() {
        this.amountInput.value = '';
        this.categoryInput.value = '';
        this.dateInput.value = '';
    }
}

const expenseTracker = new ExpenseTracker();
