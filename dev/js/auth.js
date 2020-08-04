$(function() {
    // toggle
    $('.switch-button').on('click', function (e) {
        e.preventDefault();
        $('input').val('');
        $('.login').toggle();
        $('.register').toggle();
    });
});