// ===============================
// Google Apps Script Web App URL
// ===============================
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyOSEuCu7eSPq8JxU_HkrTJW1-Y_G75cDlnXg4ncdWCSDQdOySAxU7QDrpZiGWXS2gGBA/exec";

// ===============================
// Form Selector References
// ===============================
const formBuy = document.getElementById("myForm");
const formSell = document.getElementById("myForm2");

const successBuy = document.getElementById("successMessage");
const successSell = document.getElementById("successMessage2");

// ===============================
// Helper Function: Submit Form Data
// ===============================
async function submitToGoogleSheet(formElement, successElement) {
    const formData = new FormData(formElement);

    try {
        const response = await fetch(WEB_APP_URL, {
            method: "POST",
            mode: "no-cors",
            body: formData
        });

        // Show success message
        successElement.classList.add("show");
        formElement.style.display = "none";

        // Reset after 4 seconds
        setTimeout(() => {
            formElement.reset();
            successElement.classList.remove("show");
            formElement.style.display = "block";
        }, 4000);

    } catch (error) {
        console.error("Error submitting form:", error);
        alert("There was an error submitting your form. Please try again.");
    }
}

// ===============================
// Buy Form Listener
// ===============================
if (formBuy) {
    formBuy.addEventListener("submit", function (e) {
        e.preventDefault();
        submitToGoogleSheet(formBuy, successBuy);
    });
}

// ===============================
// Sell Form Listener
// ===============================
if (formSell) {
    formSell.addEventListener("submit", function (e) {
        e.preventDefault();
        submitToGoogleSheet(formSell, successSell);
    });
}

// ===============================
// Slider Value Display
// ===============================
const sqftSlider = document.getElementById("sqft-slider");
const sqftValue = document.getElementById("sqft-value");
const priceSlider = document.getElementById("price-slider");
const priceValue = document.getElementById("price-value");

if (sqftSlider && sqftValue) {
    sqftSlider.addEventListener("input", () => {
        sqftValue.textContent = `${sqftSlider.value} sq ft`;
    });
}

if (priceSlider && priceValue) {
    priceSlider.addEventListener("input", () => {
        priceValue.textContent = `$${parseInt(priceSlider.value).toLocaleString()}`;
    });
}

// ===============================
// Floating Label Fixes
// ===============================
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });

    if (input.value !== '') {
        input.parentElement.classList.add('focused');
    }
});
