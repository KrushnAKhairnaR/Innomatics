let balance = 0;
const balanceElement = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");

function addTransaction() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    // Adjust balance
    if (type === "income") {
        balance += amount;
    } else {
        balance -= amount;
    }
    balanceElement.textContent = `$${balance.toFixed(2)}`;

    // Create transaction row
    const transactionRow = document.createElement("tr");
    transactionRow.innerHTML = `
        <td>${description}</td>
        <td>${amount.toFixed(2)}</td>
        <td class="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</td>
        <td><button class="delete-btn" onclick="deleteTransaction(this, ${amount}, '${type}')">X</button></td>
    `;

    // Append to transaction list
    transactionList.appendChild(transactionRow);

    // Clear input fields
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function deleteTransaction(button, amount, type) {
    button.parentElement.parentElement.remove();

    // Adjust balance when deleting a transaction
    if (type === "income") {
        balance -= amount;
    } else {
        balance += amount;
    }
    balanceElement.textContent = `$${balance.toFixed(2)}`;
}
