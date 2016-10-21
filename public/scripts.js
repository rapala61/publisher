const form = document.getElementsByClassName('main-form')[0];

/**
 * Checks if the value has a length or "exists"
 * @param  {string} value
 * @return {boolean}
 */
function validateExists(value) {
  const isString = typeof value === 'string';
  return isString && !!value.length;
}

/**
 * Checks if the passwords match and are over 6 chars in length
 * @param  {string} pwd
 * @param  {string} confirm
 * @return {boolean}
 */
function validatePwd(pwd, confirm) {
  const same = pwd === confirm;
  const valid = pwd.length >= 6;
  return same && valid;
}

/**
 * Runs the form validators
 * @return {boolean}
 */
function validateForm() {
  const pwd = form.querySelector('[name=password]').value;
  const confirm = form.querySelector('[name=password_confirm]').value;
  const email = form.querySelector('[name=email]').value;
  const name = form.querySelector('[name=name]').value;
  const dob = form.querySelector('[name=dob]').value;
  const validPwd = validatePwd(pwd, confirm);
  const validEmail = validateExists(email);
  const validName = validateExists(name);
  const validDob = validateExists(dob);
  return validPwd && validName && validEmail && validDob;
}

/**
 * Registers a listener to the submit event.
 * It will submit only if all validations pass.
 */
function setUpFormListener() {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValidSubmission = validateForm();
    if (isValidSubmission) {
      form.submit();
    } else {
      alert('Your submission has errors. Please try again.');
    }
  });
}

function initialize() {
  setUpFormListener();
}

initialize();
