$(function() {
    const editor = new MediumEditor('#post-body', {
        placeholder: {
          text: '',
          hideOnClick: true
        }
    });

    // publish
  $('.publish-button').on('click', function(e) {
    e.preventDefault();

    const data = {
      title: $('#post-title').val(),
      body: $('#post-body').html()
    };

    console.log(data)

    $.ajax({
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json',
      url: '/post/add'
    }).done(function(data) {
      console.log(data);
      if (!data.ok) {
        
      } else {
        
      }
    });
  });
});