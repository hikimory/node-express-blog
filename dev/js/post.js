$(function() {

  function removeErrors() {
    $('.post-form p.error').remove();
    $('.post-form input, #post-body').removeClass('error');
  }

    // clear
    $('.post-form input, #post-body').on('focus', function() {
        removeErrors();
    });

    function printError(data)
    {
        $('.post-form h2').after('<p class="error">' + data.error + '</p>');
        if (data.fields) {
          data.fields.forEach(function(item) {
            $('#post-' + item).addClass('error');
          });
        }
    }

    // publish
    $('.publish-button').on('click', function(e) {
    e.preventDefault();
    removeErrors();

    const data = {
      title: $('#post-title').val(),
      body: $('#post-body').val()
    };

    if (!data.title || !data.body) {
        const fields = [];
        if (!data.title) fields.push('title');
        if (!data.body) fields.push('body');
        printError({error: 'Все поля должны быть заполнены!', fields})
    } else if (data.title.length < 3 || data.title.length > 64) {
        printError({error: 'Длина заголовка от 3 до 64 символов!', fields: ['title']})
    } else if (data.body.replace(/<\/?[^>]+(>|$)/g, "").length < 3) {
        printError({error: 'Текст не менее 3х символов!', fields: ['body']})
    }
    else {
        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/post/add'
          }).done(function(data) {
            console.log(data);
            if (!data.ok) {
              printError(data)
            } else {
              $(location).attr('href', '/');
            }
        });
    }
  });

  // upload
  $('#fileinfo').on('submit', function(e) {
    e.preventDefault();
  
    const formData = new FormData(this);
  
    $.ajax({
      type: 'POST',
      url: '/upload/image',
      data: formData,
      processData: false,
      contentType: false,
      success: (r) => console.log(r),
      error: (e) => console.log(e)
    });
  });

});