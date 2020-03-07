// $(function() {
//   var userTable = window.localStorage.getItem('userTable')
// })

;(function (global, factory) {
  var blockValidation = {
    userTable: {
      name: 'nzhang'
    },
    initDom: function initDom() {
      /*==================================================================
      [ Focus input ]*/
      $('.input100').each(function () {
        $(this).on('blur', function () {
          if ($(this).val().trim() != "") {
            $(this).addClass('has-val');
          }
          else {
            $(this).removeClass('has-val');
          }
        })
      })

      if($('.submit-btn').length>0) {
        var input = $('.validate-input .input100');
        $('.submit-btn').on('click', function() {
          var check = true;
          for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
              showValidate(input[i]);
              check = false;
            }
          }

          var userName = $('input[name="username"]').val()
          window.localStorage.setItem('userName', userName)
          if(check) {
            window.location.replace('/index')
          }
        })
      }

      $('.validate-form .input100').each(function () {
        $(this).focus(function () {
          hideValidate(this);
        });
      });

      function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
          if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            return false;
          }
        }
        else {
          if ($(input).val().trim() == '') {
            return false;
          }
        }
      }

      function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
      }

      function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
      }

      if($("#demoform-3").length>0) {
        this.menuPage()
      }

    },
    menuPage: function() {
      var indexUser = window.localStorage.getItem('userName')
      $('.user_block').text(indexUser)
      $(".show-menu").on('click', function(){
        $(".page-lf-contain").show()
      })

      $(".page-lf-ul li").on('click', function(){
        var clasname = $(this).attr('class'), containerFluid = $('.container-fluid');
        $(this).parent().parent().hide()
        $('.' + clasname).show().siblings('.panel').hide()
      })

      if($("#demoform-3").length>0) {
        $("#demoform-3").Validform({
          tiptype:2,
          usePlugin:{
            datepicker:{},//日期控件校验;
            passwordstrength:{
              minLen:6,//设置密码长度最小值，默认为0;
              maxLen:18,//设置密码长度最大值，默认为30;
              trigger:function(obj,error){
                //该表单元素的keyup和blur事件会触发该函数的执行;
                //obj:当前表单元素jquery对象;
                //error:所设密码是否符合验证要求，验证不能通过error为true，验证通过则为false;
                //console.log(error);
                if(error){
                  obj.parent().find(".Validform_checktip").show();
                  obj.parent().find(".passwordStrength").hide()}else{
                  obj.parent().find(".passwordStrength").show()}
              }
            }
          }
        })
      }

      $('.delivery-submit').on('click', function() {
        var num = $('.input-number').val().trim(), addr = $('.input-addr').val().trim(),
          order = $('.input-order').val().trim();

        $.ajax({
          url: '',
          data: {

          },
          dataType:'json',
          type:'GET',
          timeout:2000,
          success: function() {

          },
          error: function() {
            
          }

        })
      })
      
      $('.take-delivery-submit').on('click', function() {
        var order = $('.input-take-delivery').val().trim();

        $.ajax({
          url: '',
          data: {

          },
          dataType:'json',
          type:'GET',
          timeout:2000,
          success: function() {

          },
          error: function() {

          }

        })
      })
    }
  }

  blockValidation.initDom()
})(typeof window !== "undefined" ? window : this, function (window, $, noGlobal) { }) 