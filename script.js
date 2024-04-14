const inputs = document.querySelectorAll("input, select");
const errorIcons = document.querySelectorAll(".bi-exclamation-circle");
const errorTexts = document.querySelectorAll(
  ".bi-exclamation-circle .tooltiptext"
);
const ageGroup = document.querySelector("#age-group");
const overallIncome = document.querySelector("#overall-income");
const resultDiv = document.querySelector("#result");
const closeButton = document.querySelector(".close");
const submitButton = document.querySelector(".submit");
const taxText = document.querySelector("#tax-text");

let overAllIncome = 0;
const incomeLimit = 800000;

const inputChecker = (input, errorIcon, errorText) => {
  if (input.value.length === 0) {
    displayError(errorIcon, errorText, "This input field is mandatory");
  } else if (isNaN(input.value) && input !== ageGroup) {
    displayError(errorIcon, errorText, "Please enter numbers only");
  } else if (Number(input.value) < 0) {
    displayError(errorIcon, errorText, "Please enter numbers only");
  } else {
    hideError(errorIcon);
  }
};

const displayError = (errorIcon, errorText, message) => {
  errorIcon.style.display = "flex";
  errorIcon.style.color = "red";
  errorText.innerText = message;
};

const hideError = (errorIcon) => {
  errorIcon.style.display = "none";
};

const submitChecker = () => {
  const checkedInputs = Array.from(inputs).filter((inp) =>
    inp === ageGroup
      ? inp.value.length > 0
      : inp.value.length > 0 && !isNaN(inp.value) && inp.value >= 0
  );

  return checkedInputs.length === inputs.length;
};

const taxCalculator = () => {
  const incomeAfterDeductions =
    Number(inputs[0].value) + Number(inputs[1].value) - Number(inputs[3].value);

  overAllIncome =
    incomeAfterDeductions <= incomeLimit
      ? Number(inputs[0].value) + Number(inputs[1].value)
      : taxedIncomeCalculator(incomeAfterDeductions);

  overallIncome.innerText = "₹ " + overAllIncome;
  taxText.innerText =
    incomeAfterDeductions <= incomeLimit
      ? "No tax applicable"
      : "After tax deductions";
};

const taxedIncomeCalculator = (incomeAfterDeductions) => {
  const taxableIncome = incomeAfterDeductions - incomeLimit;
  const taxRate =
    ageGroup.value === "lessthan40"
      ? 0.3
      : ageGroup.value === "between40and60"
      ? 0.4
      : 0.1;
  const taxAmount = taxRate * taxableIncome;

  return incomeAfterDeductions - taxAmount;
};

closeButton.addEventListener("click", () => {
  resultDiv.style.display = "none";
});

inputs.forEach((input, index) => {
  input.addEventListener("change", () => {
    inputChecker(input, errorIcons[index], errorTexts[index]);
  });

  input.addEventListener("focus", () => {
    inputChecker(input, errorIcons[index], errorTexts[index]);
  });
});

submitButton.addEventListener("click", () => {
  if (submitChecker()) {
    taxCalculator();
    resultDiv.style.display = "flex";
    inputs.forEach((input) => (input.value = ""));
  } else {
    inputs.forEach((input, index) => {
      inputChecker(input, errorIcons[index], errorTexts[index]);
    });
  }
});
