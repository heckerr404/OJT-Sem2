// --- 1. Light and Dark Mode Toggle ---
// Get the button element from the HTML
var themeBtn = document.getElementById("theme-btn");

// Function to switch between dark and light themes
function toggleTheme() {
    var bodyElement = document.body;
    
    // Toggle the class "dark" on the body element
    bodyElement.classList.toggle("dark");
    
    // Change the text inside the button based on the current theme
    if (bodyElement.classList.contains("dark")) {
        themeBtn.textContent = "Light Mode";
    } else {
        themeBtn.textContent = "Dark Mode";
    }
}

// When the user clicks the theme button, run the toggleTheme function
themeBtn.onclick = toggleTheme;


// --- 2. Contact Form Validation ---
// Get the form element and the success message container
var contactForm = document.getElementById("contact-form");
var successMsg = document.getElementById("form-success");

// Function to check if the input fields are filled out correctly
function validateForm(event) {
    // Prevent the webpage from reloading when the submit button is clicked
    event.preventDefault();

    // Get the input fields
    var nameInput = document.getElementById("user-name");
    var emailInput = document.getElementById("user-email");
    var messageInput = document.getElementById("user-message");

    // Get the error message text blocks
    var nameError = document.getElementById("name-error");
    var emailError = document.getElementById("email-error");
    var messageError = document.getElementById("message-error");

    // Assume the form is correct to start with
    var isValid = true;

    // Check Name: if empty, show error, else hide it
    if (nameInput.value.trim() === "") {
        nameError.style.display = "block"; // Show error text
        isValid = false;
    } else {
        nameError.style.display = "none";  // Hide error text
    }

    // Check Email: if empty, show error, else hide it
    if (emailInput.value.trim() === "") {
        emailError.style.display = "block";
        isValid = false;
    } else {
        emailError.style.display = "none";
    }

    // Check Message: if empty, show error, else hide it
    if (messageInput.value.trim() === "") {
        messageError.style.display = "block";
        isValid = false;
    } else {
        messageError.style.display = "none";
    }

    // If all inputs are filled in, show the green success box and reset the form
    if (isValid) {
        successMsg.style.display = "block";
        contactForm.reset(); // Clear all fields
    } else {
        successMsg.style.display = "none";
    }
}

// When the form is submitted, run the validateForm function
contactForm.onsubmit = validateForm;
