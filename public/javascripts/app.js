$(document).ready(function () {
    $(document).on('click', '.cb-all', function () {
        var checked = $(this).is(":checked")

        $('.tb-statistic').find('input[name=id]').each(function () {
            $(this).prop('checked', checked)
        })
    })

    $(document).on('click', 'input[name=id]', function () {
        var checked = $(this).is(":checked")
        var len1 = $('input[name=id]:checked').length
        var len2 = $('input[name=id]').length
        if (len1 == len2) {
            $('.cb-all').prop('checked', true)
        } else {
            $('.cb-all').prop('checked', false)
        }
    })
})