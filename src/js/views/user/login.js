//登录
$(function () {
    $('#toclick').on('click', function () {

        if (!$.trim($('#logPhone').val())) {
            layer.msg('输入11位手机号');
            $('#logPhone').focus();
            return false;
        }

        location.href = '../credit/creditCheck.html';

    });
});
