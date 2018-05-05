(function(){
	// Initialize Firebase
const config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
firebase.initializeApp(config);
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");

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

//Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser){
		console.log(firebaseUser);
		btnLogout.classList.remove('invisible');
	}else{
		console.log("Not logged in");
		btnLogout.classList.add('visible');
	}
});

}())