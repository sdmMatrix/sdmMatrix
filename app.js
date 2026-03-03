const STORAGE_KEY = 'erpLiteData';

const state = loadState();

const inventoryForm = document.getElementById('inventoryForm');
const salesForm = document.getElementById('salesForm');
const employeeForm = document.getElementById('employeeForm');
const seedBtn = document.getElementById('seedBtn');
const clearBtn = document.getElementById('clearBtn');

inventoryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('productName').value.trim();
  const qty = Number(document.getElementById('productQty').value);
  const price = Number(document.getElementById('productPrice').value);

  state.inventory.push({ id: crypto.randomUUID(), name, qty, price });
  inventoryForm.reset();
  persistAndRender();
});

salesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ref = document.getElementById('saleRef').value.trim();
  const amount = Number(document.getElementById('saleAmount').value);

  state.sales.push({ id: crypto.randomUUID(), ref, amount, date: new Date().toISOString() });
  salesForm.reset();
  persistAndRender();
});

employeeForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('employeeName').value.trim();
  const role = document.getElementById('employeeRole').value.trim();

  state.employees.push({ id: crypto.randomUUID(), name, role });
  employeeForm.reset();
  persistAndRender();
});

seedBtn.addEventListener('click', () => {
  state.inventory = [
    { id: crypto.randomUUID(), name: 'Laptop', qty: 10, price: 800 },
    { id: crypto.randomUUID(), name: 'Printer', qty: 4, price: 230 }
  ];
  state.sales = [
    { id: crypto.randomUUID(), ref: 'INV-1001', amount: 1200, date: new Date().toISOString() },
    { id: crypto.randomUUID(), ref: 'INV-1002', amount: 750, date: new Date().toISOString() }
  ];
  state.employees = [
    { id: crypto.randomUUID(), name: 'Ravi Perera', role: 'Store Manager' },
    { id: crypto.randomUUID(), name: 'Nisha Silva', role: 'Accountant' }
  ];
  persistAndRender();
});

clearBtn.addEventListener('click', () => {
  state.inventory = [];
  state.sales = [];
  state.employees = [];
  persistAndRender();
});

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return { inventory: [], sales: [], employees: [] };
  }

  try {
    return JSON.parse(raw);
  } catch {
    return { inventory: [], sales: [], employees: [] };
  }
}

function persistAndRender() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  render();
}

function removeItem(collection, id) {
  state[collection] = state[collection].filter((item) => item.id !== id);
  persistAndRender();
}

function money(value) {
  return `$${value.toFixed(2)}`;
}

function render() {
  const inventoryTable = document.getElementById('inventoryTable');
  const salesList = document.getElementById('salesList');
  const employeeList = document.getElementById('employeeList');

  inventoryTable.innerHTML = state.inventory.map((item) => `
    <tr>
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${money(item.price)}</td>
      <td>${money(item.qty * item.price)}</td>
      <td><button class="mini-btn" onclick="window.removeInventory('${item.id}')">Delete</button></td>
    </tr>
  `).join('');

  salesList.innerHTML = state.sales.map((sale) => `
    <li>
      <span>${sale.ref} — ${money(sale.amount)}</span>
      <button class="mini-btn" onclick="window.removeSale('${sale.id}')">Delete</button>
    </li>
  `).join('');

  employeeList.innerHTML = state.employees.map((emp) => `
    <li>
      <span>${emp.name} (${emp.role})</span>
      <button class="mini-btn" onclick="window.removeEmployee('${emp.id}')">Delete</button>
    </li>
  `).join('');

  const stockValue = state.inventory.reduce((sum, item) => sum + item.qty * item.price, 0);
  const totalSales = state.sales.reduce((sum, sale) => sum + sale.amount, 0);

  document.getElementById('totalProducts').textContent = state.inventory.length;
  document.getElementById('stockValue').textContent = money(stockValue);
  document.getElementById('totalSales').textContent = money(totalSales);
  document.getElementById('totalEmployees').textContent = state.employees.length;
}

window.removeInventory = (id) => removeItem('inventory', id);
window.removeSale = (id) => removeItem('sales', id);
window.removeEmployee = (id) => removeItem('employees', id);

render();
