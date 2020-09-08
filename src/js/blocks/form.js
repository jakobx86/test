$('form').on('submit', function (e) {
    e.preventDefault();

    let context = this,
        form = $(context).closest('form'),
        inputs = form.find('.cm-input input, .cm-input textarea, .cm-uploader input');

    inputs.each(function (index, element) {

        CustomValidation(element);
    });

    if (!inputs.hasClass('invalid')) {

    }

});

$(document).on('click', '.modal-form__delete', function () {

    $(this).closest('.modal-form__goods').remove();
    changeButtonRemoveVisibility();
});

$(window).on('click', '.modal-form__add', function () {

    let template = $('.cm-template.goods').find('.modal-form__goods').clone();

    $(this).before(template);
    template.find('.cm-select select').styler();
    changeButtonRemoveVisibility();
});

function changeButtonRemoveVisibility () {
    let deleteBtn = $('.modal-form .modal-form__delete');

    if (deleteBtn.length < 2) {
        deleteBtn.attr('disabled', true);
    } else {
        deleteBtn.attr('disabled', false);
    }
}

$(document).on('focusout change', '.cm-input__field', function (e) {

    CustomValidation(e.target);
});

function CustomValidation (input) {

    let element = $(input),
        elementContainer = element.closest('.cm-input, .cm-uploader'),
        value = element.val(),
        type = element.data('type'),
        errorContainer = elementContainer.find('.error'),
        errors = [],
        rules = {
            name: [
                {
                    isInvalid: function () {
                        let illegalCharacters = /^[^\d]+$/.test(value);
                        return !illegalCharacters;
                    },
                    invalidityMessage: 'Допустимы только буквы',
                },
                {
                    isInvalid: function () {
                        let illegalCharacters = /^[^!@#$%^&*()_№"']+$/.test(value);
                        return !illegalCharacters;
                    },
                    invalidityMessage: 'Спец. символы запрещены (напр. №,$,%,!)',
                },
                {
                    isInvalid: function () {
                        return value.length < 3;
                    },
                    invalidityMessage: 'Количество символов не менее 3',
                },
            ],
            text: [
                {
                    isInvalid: function () {
                        let illegalCharacters = /^[^!@#$%^&*()_№"']+$/.test(value);
                        return !illegalCharacters;
                    },
                    invalidityMessage: 'Спец. символы запрещены (напр. №,$,%,!)',
                },
            ],
            phone: [
                {
                    isInvalid: function () {
                        let regPhone = /^\+?\d+(-\d+)*$/;
                        return !regPhone.test(value);
                    },
                    invalidityMessage: 'Неправильний формат номера телефону',
                },
                {
                    isInvalid: function () {
                        return value.length < 9;
                    },
                    invalidityMessage: 'Длина номера должна быть не менее 9 символов',
                },
            ],
            email: [
                {
                    isInvalid: function () {
                        let illegalCharacters = /^[^\/!@#$%^&*()_"']+@[^\s\.]+\.[\D]+$/.test(value);
                        return !illegalCharacters;
                    },
                    invalidityMessage: 'Неправильный формат email адреса',
                },
            ],
            number: [
                {
                    isInvalid: function () {
                        let illegalCharacters = /^[\d]+$/.test(value);
                        return !illegalCharacters;
                    },
                    invalidityMessage: 'Допустимы только цифры',
                },
            ],
        };

    let inputRules = rules[type];

    if (!!element.attr('required') && !value) {
        errors.push('Поле не должно быть пустым');
    } else {

        for (let i = 0; i < inputRules.length; i++) {

            if (inputRules[i].isInvalid()) {
                errors.push(inputRules[i].invalidityMessage);
            }
        }
    }

    if (errors.length) {
        elementContainer.removeClass('valid').addClass('invalid');
        errorContainer.html('<span class="cm-small-text">' + errors[0] + '</span>')
    } else {
        elementContainer.removeClass('invalid').addClass('valid');
        errorContainer.html('');
    }
}
