$(function() {
    // toggle
    $('.switch-button').on('click', function (e) {
        e.preventDefault();
        $('input').val('');
        $('.login').toggle();
        $('.register').toggle();
    });

    function printError(data){
        $('p.error').remove();
        $('.register h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('input[name=' + item + ']').addClass('error');
          });
        }
    }

    // clear
    $('input').on('focus', function() {
        $('p.error').remove();
        $('input').removeClass('error');
    });

    $('.register-button').on('click', function(e) {
        e.preventDefault();
    
        const data = {
          login: $('#register-login').val(),
          password: $('#register-password').val(),
          passwordConfirm: $('#register-password-confirm').val()
        };

        if (!data.login || !data.password || !data.passwordConfirm) {
            const fields = [];
            if (!data.login) fields.push('login');
            if (!data.password) fields.push('password');
            if (!data.passwordConfirm) fields.push('passwordConfirm');

            printError({error: 'Все поля должны быть заполнены!',
            fields})
        } else if (!/^[a-zA-Z0-9]+$/.test(data.login)) {
            printError({error: 'Только латинские буквы и цифры!',
            fields: ['login']})
        } else if (data.login.length < 3 || data.login.length > 16) {
            printError({error: 'Длина логина от 3 до 16 символов!',
            fields: ['login']})
        } else if (data.password !== data.passwordConfirm) {
            printError({error: 'Пароли не совпадают!',
            fields: ['password', 'passwordConfirm']}) 
        } else if (data.password.length < 5) {
            printError({error: 'Минимальная длина пароля 5 символов!',
            fields: ['password']})
        } else {
            console.log("Send")
        } 
    });
});