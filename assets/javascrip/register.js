// Đối tượng Validator


function Validator(options){
    // hàm thực hiện validator
        function validate(inputElement,rule){
            var errorElement = inputElement.parentElement.querySelector('.form-message');
            var rerrorMessage = rule.test(inputElement.value);
            if (rerrorMessage){
                errorElement.innerText= rerrorMessage;
                inputElement.parentElement.classList.add('invalid');
            }else{
                errorElement.innerText='';
                inputElement.parentElement.classList.remove('invalid');
            }
        }
    //  lấy element của form cần validate
        var fromElement = document.querySelector(options.from);
        if(fromElement){
          
            options.rules.forEach(function(rule){
              var inputElement = fromElement.querySelector(rule.selector);
           
    
              if(inputElement){
                inputElement.onblur=function(){
                  // Xủ lý trường hợp Blur ra khỏi input
                 validate(inputElement,rule);
                 // xử lý sự kiện khi người dùng đang nhập input
                 inputElement.oninput= function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText='';
                    inputElement.parentElement.classList.remove('invalid');
                 }
    
                }
              }
            });
        }
    }
    
    // định nghĩa các rules
    // nguyên tắc của các lules
    //1. khi có lỗi => trả ra messae lỗi
    //2. khi hợp lệ ==> không trả ra gì cả (undefined)
    Validator.isRequired = function(selector , message){
     return {
        selector: selector,
        test : function(value){
            return value.trim() ? undefined:  message || 'Vui lòng nhập trường này !'
             
        }
     };
    }
    Validator.isEmail = function(selector , message){
        return {
            selector: selector,
            test : function(value){
        var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(value) ? undefined: message || ' Trường này phải là email !'
            }
         };
    }
    
    Validator.minLength = function(selector, min ,message) {
        return {
            selector: selector,
            test: function(value) {
                return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự!`;
            }
        };
    }


    
    Validator.isConfirmed = function(selector,getCofirmValue,message){
        return{
            selector: selector,
            test : function(value){
                 return value=== getCofirmValue() ? undefined : message || 'Giá trị nhập không chính xác';
    
            }
        }
    }
    
    Validator.isSdt = function(selector, min ,message) {
        return {
            selector: selector,
            test: function(value) {
                return (value.length <= min && value.length > min - 5) ? undefined : message || `Vui lòng nhập tối thiểu ${min} ký tự!`;
            }
        };
    }
    

    