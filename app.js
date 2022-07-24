const form = document.querySelector('#form')
const username = document.querySelector('#username')
const email = document.querySelector('#email')
const password = document.querySelector('#password')
const password2 = document.querySelector('#password2')

// show error message
function showError(input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control error'
  const small = formControl.querySelector('small')
  small.innerText = message
}

// show success
function showSuccess(input, message) {
  const formControl = input.parentElement
  formControl.className = 'form-control success'
}

// email validation
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (re.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, 'Email is not valid')
  }
}

//check required fields
function checkRequired(inputsArr) {
  inputsArr.forEach((input) => {
    if (input.value === '') {
      showError(input, `${getInputName(input)} must be filled`)
    } else {
      showSuccess(input)
    }
  })
}

// check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getInputName(input)} must be at least ${min} character`)
  } else if (input.value.length > max) {
    showError(input, `${getInputName(input)} cannot exceed ${max} characters`)
  } else {
    showSuccess(input)
  }
}

// do passwords match ?
function passwordsMatch(input1, input2) {
  if (input2.value !== input1.value) {
    showError(input2, 'passords must match')
  }
}

// capitolize input name
function getInputName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

//form event listener
form.addEventListener('submit', (e) => {
  e.preventDefault()
  checkRequired([username, email, password, password2])
  checkLength(username, 3, 15)
  checkLength(password, 6, 15)
  checkEmail(email)
  passwordsMatch(password, password2)
})
