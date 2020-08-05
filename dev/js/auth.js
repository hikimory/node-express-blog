$(function() {
    
    function removeErrors() {
        $('form.login p.error, form.register p.error').remove();
        $('form.login input, form.register input').removeClass('error');
    }
    
    // toggle
    $('.switch-button').on('click', function (e) {
        e.preventDefault();
        
        $('input').val('');
        removeErrors();

        $('.login').toggle();
        $('.register').toggle();
    });

    function printRegError(data){
        $('.register h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('input[name=' + item + ']').addClass('error');
          });
        }
    }

    function printAuthError(data){
        $('.login h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('input[name=' + item + ']').addClass('error');
          });
        }
    }

    // clear
    $('form.login input, form.register input').on('focus', function() {
        removeErrors();
    });

    $('.register-button').on('click', function(e) {
        e.preventDefault();
        removeErrors();
    
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

            printRegError({error: 'Все поля должны быть заполнены!',
            fields})
        } else if (!/^[a-zA-Z0-9]+$/.test(data.login)) {
            printRegError({error: 'Только латинские буквы и цифры!',
            fields: ['login']})
        } else if (data.login.length < 3 || data.login.length > 16) {
            printRegError({error: 'Длина логина от 3 до 16 символов!',
            fields: ['login']})
        } else if (data.password !== data.passwordConfirm) {
            printRegError({error: 'Пароли не совпадают!',
            fields: ['password', 'passwordConfirm']}) 
        } else if (data.password.length < 5) {
            printRegError({error: 'Минимальная длина пароля 5 символов!',
            fields: ['password']})
        } else {
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/api/auth/register'
              }).done(function(data) {
                if (!data.ok) {
                    printRegError(data)
                  } else {
                    $(location).attr('href', '/');
                  }
              });
        } 
    });

    // login
    $('.login-button').on('click', function(e) {
        e.preventDefault();
        removeErrors();

        const data = {
        login: $('#login-login').val(),
        password: $('#login-password').val()
        };

        if (!data.login || !data.password) {
            const fields = [];
            if (!data.login) fields.push('login');
            if (!data.password) fields.push('password');
        
            printAuthError({error: 'Все поля должны быть заполнены!', fields})
        } else{
            $.ajax({
                type: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json',
                url: '/api/auth/login'
            }).done(function(data) {
                if (!data.ok) {
                    printAuthError(data)
                } else {
                    $(location).attr('href', '/');
                }
            });
        }
    });

});