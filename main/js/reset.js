(function(){
const txtEmail = document.getElementById("txtEmail");

//Login Event
btnReset.addEventListener('click',e => {
	//get email and password
	const email = txtEmail.value;
	const auth = firebase.auth();
	auth.sendPasswordResetEmail(email).then(function() {
    window.alert("Email Sent, Check your emails to reset password");
}).catch(function(error) {
    window.alert("Error");
});
});


}())