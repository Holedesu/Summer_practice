document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const birthDay = document.getElementById('birth-day');
    const formButton = document.getElementById('form-button');

    function validateName(name) {
        const namePattern = /^[A-Za-zА-Яа-яЁё]+$/;
        return namePattern.test(name) && name.length >= 2 && name.length <= 30;
    }

    function validateEmail(email) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailPattern.test(email);
    }

    function validatePassword(password) {
        const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
        return passwordPattern.test(password);
    }

    function validateAge(birthDate) {
        const ageDiff = Date.now() - new Date(birthDate).getTime();
        const ageDate = new Date(ageDiff);
        return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
    }

    function validateField(input, validateFunction, errorMessage) {
        const value = input.value.trim();
        const errorSpan = document.getElementById(`${input.id}-error`);

        if (!validateFunction(value)) {
            input.classList.remove('valid');
            input.classList.add('invalid');
            errorSpan.textContent = errorMessage;
        } else {
            input.classList.remove('invalid');
            input.classList.add('valid');
            errorSpan.textContent = '';
        }

        validateForm();
    }

    function validateForm() {
        const isFormValid = document.querySelectorAll('.invalid').length === 0 &&
            firstName.value && lastName.value &&
            email.value && password.value &&
            passwordConfirm.value && birthDay.value;
        formButton.disabled = !isFormValid;
    }

    firstName.addEventListener('blur', () => validateField(firstName, validateName, 'Недопустимое имя'));
    lastName.addEventListener('blur', () => validateField(lastName, validateName, 'Недопустимая фамилия'));
    email.addEventListener('blur', () => validateField(email, validateEmail, 'Недопустимый email'));
    password.addEventListener('blur', () => validateField(password, validatePassword,
        'Пароль должен быть минимум 8 символов, содержать минимум одну цифру, одну заглавную и строчную буквы и один символ.'));
    passwordConfirm.addEventListener('blur', () => {
        const errorSpan = document.getElementById('password-confirm-error');
        if (password.value !== passwordConfirm.value) {
            passwordConfirm.classList.remove('valid');
            passwordConfirm.classList.add('invalid');
            errorSpan.textContent = 'Пароли не совпадают';
        } else {
            passwordConfirm.classList.remove('invalid');
            passwordConfirm.classList.add('valid');
            errorSpan.textContent = '';
        }
        validateForm();
    });
    birthDay.addEventListener('blur', () => validateField(birthDay, validateAge, 'Вам должно быть не менее 18 лет'));

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alert('Форма успешно отправлена!');
    });
});


