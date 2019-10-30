$(document).ready(function(){
	$("#submit").click(function(e){
		e.preventDefault();
		var fname = $("#firstname").val();
		var lname = $("#lastname").val();
		var phone_number=$("#phone_number").val();
		var email = $("#email").val();
		var address = $("#address").val();
		var purpose = $("#purpose").val();
		$("#firstname").click(function(){
		  $("#firstname").css('background-color','white')
		});
		$("#lastname").click(function(){
		  $("#lastname").css('background-color','white')
		});
		$("#phone_number").click(function(){
		  $("#phone_number").css('background-color','white')
		});
		$("#email").click(function(){
		  $("#email").css('background-color','white')
		});
		$("#address").click(function(){
		  $("#address").css('background-color','white')
		});
		$("#purpose").click(function(){
		  $("#purpose").css('background-color','white')
		});
		var flag=0;
		if(fname=="")
		{
		  $("#firstname").css('background-color','#ff8080');
		  flag=1;
		}
		if(lname=="")
		{
		  $("#lastname").css('background-color','#ff8080');
		  flag=1;
		}
		if(phone_number=="")
		{
			$("#phone_number").css('background-color','#ff8080');
			flag=1;
		}
		if(email=="")
		{
			$("#email").css('background-color','#ff8080');
			flag=1;
		}
		if(address=="")
		{
			$("#address").css('background-color','#ff8080');
			flag=1;
		}
		if(purpose=="")
		{
			$("#purpose").css('background-color','#ff8080');
			flag=1;
		}
		if(flag!=0)
		{
			alert("All fileds are mandatory");
			return flase;
		}
		if($('#mycheck').is(':checked')==false)
		{
		  alert("Check box not checked");
		  flag=1;
		}
		if(flag==0)
		{
			console.log("First Name: "+fname);
			console.log("Last Name: "+lname);
			console.log("Email: "+email);
			console.log("Phone Number: "+phone_number);
			console.log("Address: "+address);
			console.log("Purpose: "+purpose);
		}
		
		grecaptcha.ready(function() {
			//Please insert your site key here in the place of 6LdGy74UAAAAAP5yXlrRT4yUPovGNBdrebwsD8r7
		grecaptcha.execute('6LdGy74UAAAAAP5yXlrRT4yUPovGNBdrebwsD8r7', {action: 'headstorm_page'}).then(function(token) {
			$('#headstorm_form').prepend('<input type="hidden" name="token" value="' + token + '">');
			$('#headstorm_form').prepend('<input type="hidden" name="action" value="headstorm_page">');
			$('#headstorm_form').unbind('submit').submit();
		});
		});
		
	});
	
});
