const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");
const backspace = document.getElementById("backspace");

let currentInput = "";

// Ripple effect function
function createRipple(event) {
  const button = event.currentTarget;

  const oldRipple = button.querySelector(".ripple");
  if (oldRipple) oldRipple.remove();

  const ripple = document.createElement("span");
  ripple.classList.add("ripple");

  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;

  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

// Main logic
buttons.forEach(button => {
  button.addEventListener("click", (event) => {
    createRipple(event);
    const value = button.dataset.value;

    // Clear
    if (button.id === "clear") {
      currentInput = "";
      display.value = "";
      return;
    }

    // Backspace
    if (button.id === "backspace") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
      return;
    }

    // Equal
    if (button.id === "equal") {
      try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
      } catch {
        display.value = "Error";
        currentInput = "";
      }
      return;
    }

    // Append input
    currentInput += value;
    display.value = currentInput;
  });
});
