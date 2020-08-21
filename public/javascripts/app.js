$('.tablinks').click(function() {
    $('.tablinks').each(function() {
        $(this).removeClass('active');
    })

    $('.tabcontent').each(function() {
        $(this).hide();
    })
    $(this).addClass('active');
    var tabid = $(this).data('toggle');
    $('#' + tabid).show();
})