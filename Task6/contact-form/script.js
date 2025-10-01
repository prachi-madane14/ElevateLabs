// Form elements
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');
const successMessage = document.getElementById('successMessage');
const charCount = document.getElementById('charCount');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

// Email validation regex
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Character counter for message
messageInput.addEventListener('input', function () {
  const length = this.value.length;
  const maxLength = 500;
  charCount.textContent = `${length}/${maxLength} characters`;

  if (length > maxLength * 0.9) {
    charCount.className = 'character-count warning';
  } else if (length === maxLength) {
    charCount.className = 'character-count error';
  } else {
    charCount.className = 'character-count';
  }
});

// Validation functions
function validateName() {
  const name = nameInput.value.trim();

  if (name === '') {
    showError(nameInput, nameError, 'Name is required');
    return false;
  } else if (name.length < 2) {
    showError(nameInput, nameError, 'Name must be at least 2 characters long');
    return false;
  } else if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    showError(nameInput, nameError, 'Name can only contain letters, spaces, hyphens, and apostrophes');
    return false;
  } else {
    showSuccess(nameInput, nameError);
    return true;
  }
}

function validateEmail() {
  const email = emailInput.value.trim();

  if (email === '') {
    showError(emailInput, emailError, 'Email is required');
    return false;
  } else if (!emailRegex.test(email)) {
    showError(emailInput, emailError, 'Please enter a valid email address');
    return false;
  } else if (email.length > 254) {
    showError(emailInput, emailError, 'Email address is too long');
    return false;
  } else {
    showSuccess(emailInput, emailError);
    return true;
  }
}

function validateMessage() {
  const message = messageInput.value.trim();

  if (message === '') {
    showError(messageInput, messageError, 'Message is required');
    return false;
  } else if (message.length < 10) {
    showError(messageInput, messageError, 'Message must be at least 10 characters long');
    return false;
  } else if (message.length > 500) {
    showError(messageInput, messageError, 'Message cannot exceed 500 characters');
    return false;
  } else {
    showSuccess(messageInput, messageError);
    return true;
  }
}

// Helper functions
function showError(input, errorElement, message) {
  input.classList.add('input-error');
  input.classList.remove('input-success');
  errorElement.textContent = message;
  errorElement.style.display = 'block';
}

function showSuccess(input, errorElement) {
  input.classList.remove('input-error');
  input.classList.add('input-success');
  errorElement.style.display = 'none';
}

function hideSuccess() {
  successMessage.style.display = 'none';
}

// Real-time validation event listeners
nameInput.addEventListener('blur', validateName);
nameInput.addEventListener('input', function () {
  if (this.value.trim() !== '') {
    validateName();
  }
});

emailInput.addEventListener('blur', validateEmail);
emailInput.addEventListener('input', function () {
  if (this.value.trim() !== '') {
    validateEmail();
  }
});

messageInput.addEventListener('blur', validateMessage);
messageInput.addEventListener('input', function () {
  if (this.value.trim() !== '') {
    validateMessage();
  }
});

// Form submission handler
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent form submission
  hideSuccess();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      successMessage.style.display = 'block';
      form.reset();
      charCount.textContent = '0/500 characters';
      charCount.className = 'character-count';

      nameInput.classList.remove('input-success');
      emailInput.classList.remove('input-success');
      messageInput.classList.remove('input-success');

      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;

      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 5000);
    }, 1500);
  } else {
    const firstError = document.querySelector('.input-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
  }
});

// Clear success message when typing again
[nameInput, emailInput, messageInput].forEach(input => {
  input.addEventListener('input', hideSuccess);
});
