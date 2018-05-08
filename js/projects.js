(function(){

const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const btnLogout = document.getElementById("btnLogout");
const btnProfile = document.getElementById("btnProfile");
const addProjectButton = document.getElementById('addProjectButton');

var authStatus;


		btnProfile.style.display = "none";
		btnLogout.style.display = "none";
		addProjectButton.style.display = "none";
		txtEmail.style.display = "none";
		txtPassword.style.display = "none";
		btnLogin.style.display = "none";
		btnSignup.style.display = "none";

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
});

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
		authStatus = true;
		console.log(firebaseUser);
		btnProfile.style.display = "inline";
		btnLogout.style.display = "inline";	
		addProjectButton.style.display = "inline";

		txtEmail.style.display = "none";
		txtPassword.style.display = "none";
		btnLogin.style.display = "none";
		btnSignup.style.display = "none";
	}else{
		authStatus = false;
		console.log("Not logged in");
		btnProfile.style.display = "none";
		btnLogout.style.display = "none";
		addProjectButton.style.display = "none";

		txtEmail.style.display = "inline";
		txtPassword.style.display = "inline";
		btnLogin.style.display = "inline";
		btnSignup.style.display = "inline";
	}
});





//Database
var projectParentRow = document.getElementsByClassName('projects');

var projectRef = firebase.database().ref('projects');
projectRef.on('child_added',function(data){
	addProject();
});

function addProject(){
	
	var projectDiv = document.creatElement('div');
	projectDiv.setAttribute('class','col-md-4');
}

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}





//Adding Project
var skills = ['C++','Java','Python','HTML/CSS','Js','Php','Node','MySQL','Android SDK','Android NDK','Kotlin','iOS SDK','Swift','C#','.NET','OpenGL','Firebase','JQuery','Bootstrap']
const skillSelect = document.getElementById("skillSelect");

for (i = 0; i<skills.length; i++) {
	var option = document.createElement('option');
	option.setAttribute('value',i+1);
	option.textContent = skills[i];
	skillSelect.appendChild(option);
}


const inputParent = document.getElementById('skillsMastery');

var addSkillTool = document.getElementById('addSkillTool');

var addSkillToolN = document.getElementById('addSkillToolN');

var clickCount = 1;

addSkillTool.addEventListener('click',e=>{
	addRow();
});

function addRow(){
	if (clickCount==1) {
		var cloneInput = document.getElementById('cloneRowSkill');

	}else if(clickCount<=5){
		var cloneInput = document.getElementById('cloneRowSkill'+(clickCount-1));
	}else{
		return;
	}
	var clone = cloneInput.cloneNode(true);

	clone.id = 'cloneRowSkill' + clickCount;

	clone.getElementsByTagName('button')[0].id = 'addSkillTool' + clickCount;

	addSkillTool.style.display = 'none' 
	
	inputParent.appendChild(clone);

	addSkillTool = document.getElementById('addSkillTool'+clickCount);

	if (clickCount==5) {
		addSkillTool.style.display = 'none' 
	}

	addSkillTool.addEventListener('click', e=>{
		clickCount = clickCount+1;
		addRow();
	});
}



}())