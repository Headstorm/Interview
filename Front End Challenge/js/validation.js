
function validation(){
$('.error_msg').html('');
var y=document.getElementsByClassName("required");
//alert(c);
var r=true;
 for(var i=0;i<y.length;i++){
   
   if(y[i].value.trim()==""){
     y[i].previousElementSibling.textContent=" * required";
     y[i].classList.add("validate_input");
     r=false;
     //alert("1");
   }
   else{
     y[i].previousElementSibling.textContent="";
     y[i].classList.remove("validate_input");
     //alert("2");
   }
 }

   var name=document.getElementsByClassName("name-validate");
   var name_rgex = new RegExp(/^[a-zA-Z ]*$/);
   for(var i=0;i<name.length;i++){
     if(name[i].previousElementSibling.textContent==""){
       // alert(name[i].value);
       // alert(name_rgex.test("3344"));
       //  alert(name_rgex.test("ddvfr"));
       // alert(name_rgex.test(name[i].value));
       if(!name_rgex.test(name[i].value)){
         name[i].previousElementSibling.textContent=" Only alphabets allowed.";
         name[i].classList.add("validate_input");
         r=false;
         //alert("2");
       }
       else{
        //  alert("m");
         name[i].previousElementSibling.textContent="";
         name[i].classList.remove("validate_input");
       }
     }
   }
   var num = document.getElementsByClassName("number-validate");
   var num_reg = new RegExp(/^[0-9]*$/);
   for(var i=0;i<num.length;i++){
     if(num[i].previousElementSibling.textContent==""){
       // alert(name[i].value);
       // alert(name_rgex.test("3344"));
       //  alert(name_rgex.test("ddvfr"));
       // alert(name_rgex.test(name[i].value));
       if(!num_reg.test(num[i].value)){
         num[i].previousElementSibling.textContent=" Only Numbers allowed.";
         num[i].classList.add("validate_input");
         r=false;
         //alert("2");
       }
       else{
        //  alert("m");
         num[i].previousElementSibling.textContent="";
         num[i].classList.remove("validate_input");
       }
     }
   }


   var num = document.getElementsByClassName("amount-validate");
   var num_reg = new RegExp(/^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/);
   for(var i=0;i<num.length;i++){
     if(num[i].previousElementSibling.textContent==""){
       // alert(name[i].value);
       // alert(name_rgex.test("3344"));
       //  alert(name_rgex.test("ddvfr"));
       // alert(name_rgex.test(name[i].value));
       if(!num_reg.test(num[i].value)){
         num[i].previousElementSibling.textContent=" Only 2 place decimal amount.";
         num[i].classList.add("validate_input");
         r=false;
         //alert("2");
       }
       else{
        //  alert("m");
         num[i].previousElementSibling.textContent="";
         num[i].classList.remove("validate_input");
       }
     }
   }

   var alphanumname=document.getElementsByClassName("alphanumeric-validate");
   var name_rgex2 = new RegExp(/^[a-zA-Z0-9]*$/);
   for(var i=0;i<alphanumname.length;i++){
     if(alphanumname[i].previousElementSibling.textContent==""){
       if(!name_rgex2.test(alphanumname[i].value)){
         alphanumname[i].previousElementSibling.textContent=" Only alphanumeric value allowed.";
         alphanumname[i].classList.add("validate_input");
         r=false;
         //alert("3");
       }
       else{
        //  alert("m");
         alphanumname[i].previousElementSibling.textContent="";
         alphanumname[i].classList.remove("validate_input");
       }
     }
   }

   // var date_value=document.getElementsByClassName("date-validate");
   // var date_reg = new RegExp(/^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/ );
   // for(var i=0;i<date_value.length;i++){
   //   if(date_value[i].previousElementSibling.textContent==""){
   //     if(!date_reg.test(date_value[i].value)){
   //       date_value[i].previousElementSibling.textContent=" Date format should be mm/dd/yyyy.";
   //       date_value[i].classList.add("validate_input");
   //       r=false;
   //       //alert("3");
   //     }
   //     else{
   //      //  alert("m");
   //       date_value[i].previousElementSibling.textContent="";
   //       date_value[i].classList.remove("validate_input");
   //     }
   //   }
   // }

   var mailv=document.getElementsByClassName("email-validate");
   var email_rgex = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
   for(var i=0;i<mailv.length;i++){
     if(mailv[i].previousElementSibling.textContent==""){
       // alert(mailv[i].value);
       // alert(email_rgex.test(mailv[i].value));
       // alert(email_rgex.test("deep15197"));
       // alert(email_rgex.test("deep@gmail.com"));
       if(!email_rgex.test(mailv[i].value)){
         mailv[i].previousElementSibling.textContent=" Enter valid email address.";
         mailv[i].classList.add("validate_input");
         r=false;
         //alert("4");
       }
       else{
        //  alert("m");
         mailv[i].previousElementSibling.textContent="";
         mailv[i].classList.remove("validate_input");
       }
     }
   }

   var psw=document.getElementsByClassName("psw-validate");
   var psw_rgex = new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,}$/);
   for(var i=0;i<psw.length;i++){
     if(psw[i].previousElementSibling.textContent==""){
       // alert(mailv[i].value);
       // alert(email_rgex.test(mailv[i].value));
       // alert(email_rgex.test("deep15197"));
       // alert(email_rgex.test("deep@gmail.com"));
       //alert(psw[i].value=="")
       if(!psw_rgex.test(psw[i].value) && psw[i].value!=""){
         psw[i].previousElementSibling.textContent=" Enter valid password string.";
         psw[i].classList.add("validate_input");
         r=false;
         //alert("5");
       }
       else{
        //  alert("m");
         psw[i].previousElementSibling.textContent="";
         psw[i].classList.remove("validate_input");
       }
     }
   }

var original_psw=document.getElementsByClassName("original_psw");
var confirm_psw=document.getElementsByClassName("confirm_psw");
for(var i=0;i<original_psw.length;i++){
  if(original_psw[i].value!=""){
    //alert(original_psw[i].value+"="+confirm_psw[i].value);
    //alert(original_psw[i].value!=confirm_psw[i].value);
    if(original_psw[i].value!="" && confirm_psw[i].value==""){
      confirm_psw[i].classList.add("validate_input");
      confirm_psw[i].previousElementSibling.textContent=" * required.";
      r=false;
      //alert("6");
    }
    else if(original_psw[i].value!=confirm_psw[i].value){
      confirm_psw[i].classList.add("validate_input");
      confirm_psw[i].previousElementSibling.textContent=" Password not matching.";
      r=false;
    }
    else{
      confirm_psw[i].previousElementSibling.textContent="";
      confirm_psw[i].classList.remove("validate_input");
      original_psw[i].previousElementSibling.textContent="";
      original_psw[i].classList.remove("validate_input");
    }
  }
}

var start_date=document.getElementsByClassName("start-date");
var end_date=document.getElementsByClassName("end-date");
//alert(start_date[0].value);
for(var i=0;i<start_date.length && i<end_date.length;i++){
  if(start_date[i].value!=""){
    //alert(original_psw[i].value+"="+confirm_psw[i].value);
    //alert(original_psw[i].value!=confirm_psw[i].value);
    //alert(start_date[i].value>end_date[i].value);
    if(start_date[i].value>end_date[i].value){
      end_date[i].classList.add("validate_input");
      end_date[i].previousElementSibling.textContent=" End date < Start date.";
      r=false;
    }
    else{
      end_date[i].previousElementSibling.textContent="";
      end_date[i].classList.remove("validate_input");
      start_date[i].previousElementSibling.textContent="";
      start_date[i].classList.remove("validate_input");
    }
  }
}


//alert(r);
 return r;
}
