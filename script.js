// script.js
// JavaScript Fundamentals Demo
// - Variables & conditionals
// - Functions (reusable logic)
// - Loops (for, forEach, while)
// - DOM interactions (select, listen, create, update)

// ----------------------
// Sample data: items with prices
// ----------------------
const sampleItems = [
  { id: 1, name: "Notebook", price: 1200 },
  { id: 2, name: "Pen Pack", price: 250 },
  { id: 3, name: "USB Drive", price: 2500 }
];

// ----------------------
// Helper functions (Part 2)
// ----------------------

// formatName: takes first and last name, returns capitalized full name
function formatName(first, last) {
  if (!first && !last) return "Anonymous";
  // simple capitalization
  const cap = s => s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
  return `${cap(first)} ${cap(last)}`.trim();
}

// calculateTotal: takes array of items and quantity map, returns sum
// We will show both a 'for' loop and forEach in different places.
function calculateTotal(items, qtyMap) {
  let total = 0;
  // Using a 'for' loop to iterate items (Part 3 requirement)
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const qty = Number(qtyMap[it.id] || 0);
    total += it.price * qty;
  }
  return total;
}

// ----------------------
// DOM helpers & interactions (Part 4)
// ----------------------

// 1) Select elements
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const ageInput = document.getElementById("age");
const greetBtn = document.getElementById("greetBtn");
const greetingOutput = document.getElementById("greetingOutput");

const itemsList = document.getElementById("itemsList");
const calcBtn = document.getElementById("calcBtn");
const addItemBtn = document.getElementById("addItemBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");
const totalOutput = document.getElementById("totalOutput");

const countdownBtn = document.getElementById("countdownBtn");
const countdownOutput = document.getElementById("countdownOutput");
const generatedCards = document.getElementById("generatedCards");

// Keep track of quantities in a map: { itemId: qty }
const qtyMap = {};

// ----------------------
// Render items (use forEach to generate DOM nodes)
// ----------------------
function renderItems(items) {
  itemsList.innerHTML = ""; // clear
  // forEach loop to create each item row (Part 3 loop example)
  items.forEach(item => {
    // create DOM nodes
    const row = document.createElement("div");
    row.className = "item-row";

    const label = document.createElement("span");
    label.textContent = `${item.name} - ₦${item.price}`;

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = 0;
    qtyInput.value = qtyMap[item.id] || 0;
    qtyInput.className = "qty";

    // when quantity changes, update qtyMap
    qtyInput.addEventListener("input", () => {
      qtyMap[item.id] = qtyInput.value;
      console.debug("qtyMap updated:", qtyMap);
    });

    row.appendChild(label);
    row.appendChild(qtyInput);
    itemsList.appendChild(row);
  });
}

// initial render
renderItems(sampleItems);

// ----------------------
// Greet button: variables & conditionals (Part 1)
// ----------------------
greetBtn.addEventListener("click", () => {
  const first = firstNameInput.value.trim();
  const last = lastNameInput.value.trim();
  const age = Number(ageInput.value);

  const fullName = formatName(first, last); // function call
  // conditional check: are you an adult?
  if (Number.isFinite(age) && age >= 0) {
    if (age >= 18) {
      greetingOutput.textContent = `Hello ${fullName}! You are ${age} — you are an adult.`;
    } else {
      greetingOutput.textContent = `Hi ${fullName}! You are ${age} — you are a young learner.`;
    }
  } else {
    greetingOutput.textContent = `Hello ${fullName}! Please enter a valid age.`;
  }

  console.log("Greeted:", fullName, age);
});

// ----------------------
// Calculate total button (uses function + for loop)
// ----------------------
calcBtn.addEventListener("click", () => {
  // Use calculateTotal (which uses a for loop) — part 2 + 3
  const items = sampleItems;
  const total = calculateTotal(items, qtyMap);
  totalOutput.textContent = `Total: ₦${total.toLocaleString()}`;

  // also show a small forEach example: list items with qty > 0
  const purchased = [];
  items.forEach(it => {
    const q = Number(qtyMap[it.id] || 0);
    if (q > 0) purchased.push(`${it.name} x${q}`);
  });
  console.log("Purchased items:", purchased);
});

// ----------------------
// Add Random Item (creates element on the fly) — DOM creation
// ----------------------
addItemBtn.addEventListener("click", () => {
  // create a random new item
  const newId = sampleItems.length + 1;
  const newItem = { id: newId, name: `Item ${newId}`, price: Math.floor(Math.random() * 3000) + 100 };
  sampleItems.push(newItem);

  // re-render items
  renderItems(sampleItems);

  // create a small visual card that shows the new item (DOM creation)
  const card = document.createElement("div");
  card.className = "card-small";
  card.textContent = `${newItem.name} — ₦${newItem.price}`;
  generatedCards.prepend(card); // show newest first

  console.debug("Added new item:", newItem);
});

// ----------------------
// Toggle Theme: changes class on document.body (DOM manipulation)
// ----------------------
toggleThemeBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark"); // toggles .dark class (CSS can style it)
  console.log("Toggled theme. Dark mode active:", document.documentElement.classList.contains("dark"));
});

// ----------------------
// Countdown using while loop (Part 3 extra)
// ----------------------
countdownBtn.addEventListener("click", () => {
  let count = 5;
  countdownOutput.textContent = ""; // clear
  // use a while loop to countdown and create step nodes
  while (count >= 0) {
    // small pause simulated with setTimeout to visualize (closure)
    ((c, delay) => {
      setTimeout(() => {
        const line = document.createElement("div");
        line.textContent = `Countdown: ${c}`;
        countdownOutput.appendChild(line);
      }, (5 - c) * 400);
    })(count, 0);
    count--;
  }
});

// ----------------------
// Extra: generate example cards from sampleItems using forEach
// ----------------------
(function generateInitialCards() {
  generatedCards.innerHTML = "";
  sampleItems.forEach(it => {
    const el = document.createElement("div");
    el.className = "card-small";
    el.textContent = `${it.name} — ₦${it.price}`;
    generatedCards.appendChild(el);
  });
})();
