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





//Database Listen
var projectParentRow = document.getElementsByClassName('projects');

var projectRef = firebase.database().ref('projects');
projectRef.on('child_added',function(data){

	console.log(data.val());
	addProjectDiv(data.val());
});

function addProjectDiv(val){
	var parentProjectDiv = document.getElementById('projects');
	var projectDivCloneInput = document.getElementById('project-div-abst');
	var projectDiv = projectDivCloneInput.cloneNode(true);

	projectDiv.style.display = "block";
	parentProjectDiv.appendChild(projectDiv);


	$('.div-title:last').html(val.projectTitle);
	$('.div-abstract:last').html(val.projectAbstract);

	$('.div-desc:last').html(val.projectDesciption);
	
	console.log(val.projectSkills.length);
	var divparent = document.getElementById('div-skills');
	while (divparent.hasChildNodes()) {
	    divparent.removeChild(divparent.lastChild);
	}
	for(var i = 0; i<val.projectSkills.length; i++){

		var div = document.createElement('div');
		div.setAttribute('class', 'bg-info card-skill div-skill-item');
		divparent.appendChild(div);
		div.textContent = val.projectSkills[i] + " : " + val.projectMastery[i];
		console.log(val.projectMastery[i]);
		console.log(val.projectSkills[i]);
		
	}
	
	console.log(val.projectTitle);


}



//Adding Project
var skills = ['C++','Java','Python','HTML/CSS','Js','Php','Node','MySQL','Android SDK','Android NDK','Kotlin','iOS SDK','Swift','C#','.NET','OpenGL','Firebase','JQuery','Bootstrap'];
const skillSelect = document.getElementById("skillSelect");

for (i = 0; i<skills.length; i++) {
	var option = document.createElement('option');
	option.setAttribute('value',skills[i]);
	option.textContent = skills[i];
	skillSelect.appendChild(option);
}


const inputParent = document.getElementById('skillsMastery');

var addSkillTool = document.getElementById('addSkillTool');

var addSkillToolN = document.getElementById('addSkillToolN');

var clickCount = 1;var rowCount = 1;

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

	addSkillTool.style.display = 'none';
	
	inputParent.appendChild(clone);
	rowCount = rowCount+1;

	addSkillTool = document.getElementById('addSkillTool'+clickCount);

	if (clickCount==5) {
		addSkillTool.style.display = 'none';
	}

	addSkillTool.addEventListener('click', e=>{
		clickCount = clickCount+1;
		addRow();
	});
}

//Adding to Database
var validation = document.getElementById('validation');
var addProjectToDb = document.getElementById('addProjectToDb');
addProjectToDb.addEventListener('click', e=>{
	var id = guid();
	var title = document.getElementById('addProjectTitle').value;
	if (title=="") {
		validation.innerHTML = "Please Add Title";
		return;
	}
	var abstract = document.getElementById('addProjectAbstract').value;
	if (abstract=="") {
		validation.innerHTML = "Please Add Abstract";
		return;
	}
	
	var skillsA=[]; var masteriesA=[];
	for (var i = 1; i <= rowCount; i++) {
		if (i==1) {
			var parent = document.getElementById('cloneRowSkill');

			var skill = parent.getElementsByTagName('select')[0].value;
			var mastery = parent.getElementsByTagName('select')[1];
			var strmastery = mastery.options[mastery.selectedIndex].text;
			if (skill=="Aimed Skill/Tool") {
				validation.innerHTML = "Please Choose Atleast One Skill";
				return;
			}else {
				skillsA.push(skill);
				console.log(skillsA);
			}
			if (mastery == "Mastery Level") {
				validation.innerHTML = "Please Choose Mastery for the Skill";
				return;
			}else{
				masteriesA.push(strmastery);
			}	
		}else{
			var parent = document.getElementById('cloneRowSkill'+(i-1));

			var skill = parent.getElementsByTagName('select')[0].value;
			var mastery = parent.getElementsByTagName('select')[1];
			var strmastery = mastery.options[mastery.selectedIndex].text;
			if (skill=="Aimed Skill/Tool") {
				//
			}else{
				skillsA.push(skill);
				console.log(skillsA);
			}
			if (mastery == "Mastery Level") {
				validation.innerHTML = "Please Choose Mastery for the Skill";
				return;
			}else{
				masteriesA.push(strmastery);
			}	
		}

		var description = document.getElementById('addProjectDescription').value;
		console.log(description);
		if (description=="") {
			validation.innerHTML = "Please Add Description"
			return;
		}

		validation.innerHTML = "";

	}

	projectRef.child(id).set({
		projectId: id,
		projectTitle: title,
		projectAbstract: abstract,
		projectSkills: skillsA,
		projectMastery: masteriesA,
		projectDesciption: description
	});

	var closeButton = document.getElementById('closeButton').click();
});

function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

}())