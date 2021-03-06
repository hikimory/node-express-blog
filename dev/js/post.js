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
  $('.publish-button, .save-button').on('click', function(e) {
    e.preventDefault();
    removeErrors();

    let isDraft =
      $(this)
        .attr('class')
        .split(' ')[0] === 'save-button';

    const data = {
      title: $('#post-title').val(),
      body: $('#post-body').val(),
      isDraft: isDraft,
      postId: $('#post-id').val()
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
        if (isDraft) {
          $(location).attr('href', '/post/edit/' + data.post.id);
        } else {
          $(location).attr('href', '/posts/' + data.post.url);
        }
      }
    });
  }
});

  // upload
  $('#file').on('change', function() {
    // e.preventDefault();

    let formData = new FormData();
    formData.append('postId', $('#post-id').val());
    formData.append('file', $('#file')[0].files[0]);

    $.ajax({
      type: 'POST',
      url: '/upload/image',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data) {
        console.log(data);
        $('#fileinfo').prepend(
          '<div class="img-container"><img src="/uploads' +
            data.filePath +
            '" alt="" /></div>'
        );
      },
      error: function(e) {
        console.log(e);
      }
    });

  });

  // inserting image
  $('.img-container').on('click', function() {
    let imageId = $(this).attr('id');
    let txt = $('#post-body');
    let caretPos = txt[0].selectionStart;
    let textAreaTxt = txt.val();
    let txtToAdd = '<img src="'+ imageId +'" alt="img">';
    txt.val(
      textAreaTxt.substring(0, caretPos) +
        txtToAdd +
        textAreaTxt.substring(caretPos)
    );
  });
});