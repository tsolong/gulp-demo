//芝麻授信
$(function () {
    $('#goToNext').on('click', function () {

        //表单验证
        var delivery_name = $.trim($('#delivery_name').val());
        var idCard = $.trim($('#idCard').val());
        var userType = $('input[name="userType"]:checked');

        if (delivery_name == '') {
            layer.msg('请输入您的真实姓名');
            $('#delivery_name').focus();
            return false;
        }

        if (idCard == '') {
            layer.msg('请输入您本人的身份证号码');
            $('#idCard').focus();
            return false;
        }

        if (!(/^((\d{15})|(\d{18})|(\d{17}(\d|X|x)))$/.test(idCard))) {
            layer.msg('您所填写的身份证号码有误');
            $('#idCard').focus();
            return false;
        }

        if (userType.length == 0) {
            layer.msg('请选择您的身份');
            return false;
        }
        
    });
});
