(function(){

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");
const btnProfile = document.getElementById("btnProfile");

//Login Event
btnLogin.addEventListener('click',e => {
	//get email and password
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
	const promise = auth.signInWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));
});

//Signup Event
btnSignup.addEventListener('click',e=>{
	//get email and password
	const email = txtEmail.value;
	const pass = txtPassword.value;
	const auth = firebase.auth();
	const promise = auth.createUserWithEmailAndPassword(email,pass);
	promise.catch(e => console.log(e.message));
})

//Logout Event
btnLogout.addEventListener('click',e => {
	firebase.auth().signOut();
});

btnProfile.addEventListener('click',e=>{
	window.open("https://programmerme.github.io/profile.html","_self");
});

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
		btnProfile.style.display = "inline";
		btnLogout.style.display = "inline";	

		txtEmail.style.display = "none";
		txtPassword.style.display = "none";
		btnLogin.style.display = "none";
		btnSignup.style.display = "none";
	}else{
		console.log("Not logged in");
		btnProfile.style.display = "none";
		btnLogout.style.display = "none";

		txtEmail.style.display = "inline";
		txtPassword.style.display = "inline";
		btnLogin.style.display = "inline";
		btnSignup.style.display = "inline";
	}
});

}())