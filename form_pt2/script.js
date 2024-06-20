document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        let isValid = validateForm();

        if (isValid) {
            sendForm();
        }
    });

    function validateForm() {
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });

        // Validate first name
        if (firstName.value.trim() === '') {
            showError('firstNameError', 'Имя обязательно для заполнения');
            isValid = false;
        }

        // Validate last name
        if (lastName.value.trim() === '') {
            showError('lastNameError', 'Фамилия обязательна для заполнения');
            isValid = false;
        }

        // Validate email
        if (email.value.trim() === '') {
            showError('emailError', 'Почта обязательна для заполнения');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError('emailError', 'Некорректный формат почты');
            isValid = false;
        }

        // Validate phone
        if (phone.value.trim() === '') {
            showError('phoneError', 'Номер телефона обязателен для заполнения');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError('phoneError', 'Некорректный формат номера телефона');
            isValid = false;
        }

        // Validate message
        if (message.value.trim() === '') {
            showError('messageError', 'Сообщение обязательно для заполнения');
            isValid = false;
        }

        return isValid;
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function isValidPhone(phone) {
        const regex = /^\+?\d{10,15}$/;
        return regex.test(phone);
    }

    function sendForm() {
        const formData = new FormData(form);

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                responseMessage.textContent = 'Форма успешно отправлена!';
                responseMessage.style.display = 'block';
            })
            .catch(error => {
                responseMessage.textContent = 'Ошибка при отправке формы. Попробуйте еще раз.';
                responseMessage.style.display = 'block';
            });
    }
});

