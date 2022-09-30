var n_images;
var n_img_done = 0;
var time_img;
var time_experiment_start;
var answer_t_end
var answer_t_start
var all_answers = [];
//results in an array for each stimuli: {estimated_density,time , target type (static|dynamic), confidence level}
var results = [];
var answers = {};
var current_density;
var target_type;
var list_density_targets;
var list_position_matches;
var slider_moved = false;
var time;
var loadedtimeRef = -1;
var loadedtimeMatch = -1;
var first_time_loaded = true;
confidence_phase = false;


var list_imgs = [
	{"filename": "density_0.0.png", "density" : "0.0"},
	{"filename": "density_2.5.png", "density" : "2.5"},
	{"filename": "density_5.0.png", "density" : "5.0"},
	{"filename": "density_7.5.png", "density" : "7.5"}];


function isInt(n) {
	return n % 1 === 0;
}

function generateDataToPass(user_id,iteration,target_type,shuffled_list){
	var new_data = {'uid':user_id,
	'it_n':iteration,
	'target_type':target_type,
	'path_l': shuffled_list}
	var new_json_data = JSON.stringify(new_data);
	localStorage.setItem('json_dict', new_json_data);
	return new_json_data;
}

function NextSection(){
	var json_dict = JSON.parse(localStorage.getItem('json_dict'));
	var iteration = parseInt(json_dict['it_n']);
	var user_id = json_dict['uid'];
	var shuffled_list = json_dict['path_l'];
	var target_type = json_dict['target_type'];
	
	iteration += 1;
	console.log("iter " + iteration);
	var new_json_data = generateDataToPass(user_id,iteration,target_type,shuffled_list);
	
	//location.href = 'assymetric_test.php?uid=' + user_id+"&it_n=" + 0 + "&path_l="+new_shuffle(path_list), true;
	location.href = 'assymetric_test.php?data=' + new_json_data, true;
}

function collectUserData(gender, age, cg_exp, art_exp, user_id,user_consent) {
	document.cookie = "gender=" + gender;
	document.cookie = "age=" + age;
	document.cookie = "cg_exp=" + cg_exp;
	document.cookie = "art_exp=" + art_exp;
	document.cookie = "user_id=" + user_id;
	document.cookie = "user_consent=" + user_consent;
}

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
}


	var user_id = getCookie("user_id");
	xhr.setRequestHeader("Content-Type", "application/json");
	console.log("user id is " + user_id);
	var data = JSON.stringify({"user_id":user_id,"iterations":list_targets.length})

	xhr.send(data);
	
}



function getPf(){
	var json_dict = JSON.parse(localStorage.getItem('json_dict'));
	var shuffled_list = json_dict['path_l'];
	var it_n = parseInt(json_dict['it_n']);
	return shuffled_list[it_n];
}

function sendData() {
	
	var xhr = new XMLHttpRequest();
	var url = "insertion.php";

	xhr.open("POST", url, true);
	var user_id = getCookie("user_id");
	userData = { "gender": getCookie("gender"), "age": getCookie("age"), "cg_exp": getCookie("cg_exp"), "art_exp": getCookie("art_exp"),"user_consent": getCookie("user_consent"), }
	xhr.setRequestHeader("Content-Type", "application/json");
	
	var second_trial = JSON.parse(localStorage.getItem('secondSession'));
	real_data = {"answers": results, "time_start": time_experiment_start, "time_end": new Date().getTime(), "userData": userData, "user_id": user_id }
	var data = JSON.stringify([second_trial,real_data]);
	xhr.send(data);
}

//called at the end of the session
function submit_results() {
	if (n_img_done == n_images) {
		sendData();
		$("#asymmetric_experiment").hide();
		var json_dict = JSON.parse(localStorage.getItem('json_dict'));
		var iteration = parseInt(json_dict['it_n']);
		var max_it = 3
		if(iteration < max_it-1){
			$("#section_completed").show();
		}else{
			$("#finish").show();
		}
				
	}

}

//check if the training images are in the correct order. You might want to check also drop() and functions
function check_answers(){
	sorted_densities = ['0.0','2.5','5.0','7.5'];
	for (var i = 0; i < 4; i++){
		var val = document.getElementById("parent_drag"+i).getAttribute("data-density-child");
		if(val != sorted_densities[i]){
			return false;
		}
	}
	return true;
}

function validateTraining(){
	ready = check_answers();

	//ready = true
	if(ready){
		answer_t_start = new Date().getTime();
		if(loadedtimeMatch!=-1){
			loadedtimeMatch = answer_t_start;
			first_time_loaded = false;
		}
		if(loadedtimeRef!=-1){
			loadedtimeRef = answer_t_start;			
		}
		console.log("answer t_start " + answer_t_start);

		confidence_phase = false;
		
		$("#trainingBlock").hide();
		newStimulusAsymmetricMatching();
		$('.suggestions').css("display", "none");
		$("#asymmetric_experiment").show();

		$('.userRating').css("visibility", "hidden");
		

	}else{
		set_suggestions_text("Please order the images from the most translucent on the left, (glass-like) to the most opaque on the right (marble-like)")
	}
	

}

function allowDrop (ev) {
	ev.preventDefault ();
 }
 
 function drag (ev) {
   ev.dataTransfer.setData ("src", ev.target.id);
 }
 /*
 swap the images and the data contained in their parents div.
 Each img has an attribute "data-density" in which we store the density related to that image
 Each img has also a parent object. This parent obj stores also an attribute "data-density-child". 
 This function swaps the attribute of the parents
 This last attribute,"data-density-child is the one that we actually use to check the answers 
 */
 function drop (ev) {


   ev.preventDefault ();
   var src = document.getElementById (ev.dataTransfer.getData ("src"));
   var srcParent = src.parentNode;
   var tgt = ev.currentTarget.firstElementChild;
   	
   var src_density = document.getElementById(src.id).getAttribute("data-density");
   var tgt_id = ev.currentTarget.firstElementChild.id;
   
   
   var tgt_density = document.getElementById(tgt_id).getAttribute("data-density");
   document.getElementById(tgt.parentNode.id).setAttribute("data-density-child",src_density);
   document.getElementById(srcParent.id).setAttribute("data-density-child",tgt_density);
 
   ev.currentTarget.replaceChild (src, tgt);
   srcParent.appendChild (tgt);
 }


function set_suggestions_text(text) {
	$('.suggestions').css("display", "block");
	$('.suggestions_text').html(text);
}

function read_user_data() {
	// check that they have been added
	if (!gender) {
		set_suggestions_text('Please, fill the Data Survey. Gender has not been selected!');
		return false;
	}
	if (!age) {
		set_suggestions_text('Please, fill the Data Survey. Age has not been selected!');
		return false;
	}
	if (age < 14) {
		set_suggestions_text('Please, fill the Data Survey. Age cannot be lower than 14!');
		return false;
	}
	if (age > 110) {
		set_suggestions_text('Please, fill the Data Survey. Age cannot be higher than 110!');
		return false;
	}
	if (!cg_exp) {
		set_suggestions_text('Please, fill the Data Survey. Experience in Computer Graphics and/or Image Processing has not been selected!');
		return false;
	}
	if (!art_exp) {
		set_suggestions_text('Please, fill the Data Survey. Experience in Art and/or Design has not been selected!');
		return false;
	}
	if (!user_id) {
		set_suggestions_text('Please, fill the Data Survey. Your ID has not been selected.\n Note that you need to put your ID even if it is the first time that you try this experiment');
		return false;
	}

	if (user_id < 0) {
		set_suggestions_text('Please, fill the Data Survey. ID cannot be lower than 0!');
		return false;
	}
	if (user_id > 100) {
		set_suggestions_text('Please, fill the Data Survey. ID cannot be higher than 100!');
		return false;
	}
	if (!user_consent) {
		set_suggestions_text('Before continuing we need your approvation for your data treatment. Please check the tickbox to give your consent');
		return false;
	}

	return true;
}


function new_shuffle(array) {
	var currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle...
	while (currentIndex != 0) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
  
	return array;
  }

function validateuserData() {

	gender = $('input[name=gender]:checked').val();
	age = $('#age').val();
	cg_exp = $('input[name=experienceCG]:checked').val();
	art_exp = $('input[name=experienceArt]:checked').val();
	user_id = $('#user_id').val();
	user_consent = $('input[name=user_consent]:checked').val();
	var file_exists,result_data;
	if (user_id && user_consent == "approved") {
		path_to_previous_test = './data/' + user_id + '.json'
		//file_exists = checkFileExist(path_to_previous_test);
		file_exists = getJsonFile(path_to_previous_test);

				
	} else {
		file_exists = false;
	}

	ready = read_user_data();
	//ready = true	
	if (file_exists || ready) {

		collectUserData(gender, age, cg_exp, art_exp, user_id,user_consent);


		if (!file_exists)
			user_id = -1;
		path_list = [9,12,0];
		shuffled_list = new_shuffle(path_list);
		
		
		var  data = generateDataToPass(user_id,"0",target_type,shuffled_list);
		
		//location.href = 'assymetric_test.php?uid=' + user_id+"&it_n=" + 0 + "&path_l="+new_shuffle(path_list), true;
		location.href = 'assymetric_test.php?data=' + data, true;
	} else {
		if (!file_exists && !ready) {
			if (user_id) {
				if(!user_consent){
					set_suggestions_text('Before continuing we need your approval for data treatment. Please check the tickbox to give your consent');
				}else{
					set_suggestions_text('The sistem do not have any data about this ID. \n Are you sure that it is your second time? If not, please fill the form above', false);
				}
			} 
		}

	}

}

function measure_time() {
	answer_t_end = new Date().getTime();
	time = answer_t_end - answer_t_start;
	console.debug(time)
}

function checkFileExist(urlToFile) {
	var xhr = new XMLHttpRequest();
	xhr.open('HEAD', urlToFile, false);
	xhr.send();

	if (xhr.status == "404") {
		return false;
	} else {
		return true;
	}
}

function getJsonFile(urlToFile) {	
	var xmlhttp = new XMLHttpRequest();
	file_exists = false;
	exit = false;
	xmlhttp.onreadystatechange = function() {
    if (this.status == 200) {
        myObj = JSON.parse(this.responseText);
		file_exists = true;
        console.log("Json parsed data is: " + JSON.stringify(myObj));
		target_type = myObj[0]['answers'][0][0]['target_type'];
		if(target_type=='dynamic')
			target_type = 'static';
		else
			target_type = 'dynamic';
		var json_dict = JSON.parse(localStorage.getItem('json_dict'));
		var iteration = parseInt(json_dict['it_n']);
		var user_id = json_dict['uid'];
		var shuffled_list = json_dict['path_l'];
		generateDataToPass(user_id,iteration,target_type,shuffled_list);
		localStorage.setItem('secondSession',true);
		
       }else{
	//	localStorage.setItem(JSON.stringify({'secondSession':False}));
	localStorage.setItem('secondSession',false);
	r = Math.floor(Math.random()*2);
	if(r == 0)	
		target_type = 'static';
	else
		target_type = 'dynamic';
	   }

    };
xmlhttp.open("GET", urlToFile, false);
xmlhttp.send();
if (xmlhttp.status == "200") {
	return true;
} else {
	return false;
}
/*if ( xmlhttp.status == 200) {
	myObj = JSON.parse(this.responseText);
	file_exists = true;
	console.log("Json parsed data is: " + JSON.stringify(myObj));
   }
*/

}

function loadReference(){
	loadedtimeRef =  new Date().getTime();
	console.debug("Ref time "+ loadedtimeRef);
}
function loadMatch(){
	if(first_time_loaded){
		
		loadedtimeMatch =  new Date().getTime();
		first_time_loaded = false;
		console.debug("Match time "+ loadedtimeMatch);
	}
}

function validateSlider() {
	cookie_val = document.cookie
	nextImageToMatch()
	
}
function getTimeForLoading(){
	l = Math.max(loadedtimeMatch,loadedtimeRef);
	loadedtimeMatch =-1;
	loadedtimeRef = -1;
	
	first_time_loaded = true;
	console.log("loading time is " + l);
	return l;
}

function saveAnswer() {

	answers.estimated_density = current_density;
	answers.match_position = list_position_matches[n_img_done];
	answers.target_density = list_density_targets[n_img_done];
	answers.time = time;
	answers.loadedtime = getTimeForLoading();
	answers.target_type = target_type;
	answers.confidence = user_confidence;
	answers.pf = getPf();
	var answer_copy = Object.assign({}, answers)
	console.debug("est density " + current_density)
	console.debug("real density " + list_density_targets[n_img_done])
	results.push(answer_copy);
}


function nextImageToMatch() {
	measure_time();
	confidence_phase = true;
	slider_moved = false;
	document.getElementById("btn-next").disabled = !slider_moved;
	$('.next-btn').css("background-color", " rgb(100, 100, 100)");
	//uncomment next line to get the slider back
	//$("#sliders").css("visibility", "hidden");
	$('#userRating').show();
	$('#userRating').css("visibility", "visible");
}

function read_user_rating() {	
	user_confidence = $('input[name=confidence]:checked').val();
	//user_confidence = true
	if (!user_confidence) {
		set_suggestions_text('Please, tell us how confident you are.', false);
		return true;
	}
}

function to_survey() {
	$("#intro_text").hide();
	$("#data_survey").show();
}

function validateuserRating() {
	//if the user rated his own question we can save and pass and the next stimulus or end the test
	if (!read_user_rating()) {
		saveAnswer();
		answer_t_start = new Date().getTime();
		
		$('.suggestions').css("display", "none");
		if (n_img_done < n_images)
			confidence_phase = false;

		n_img_done++;
		if (n_img_done == n_images) {
			submit_results();
		} else {
			//hide the userRating form, show a new stimulus, and start to measure the time spend by the user

			//uncomment next line to get the slider back. 
			//$('#sliders').css("visibility", "visible");
			$('#userRating').css("visibility", "hidden");
			newStimulusAsymmetricMatching();
			answer_t_start = new Date().getTime();
		}

	}

}


function changeImage(new_val) {
	//if new_val is an int we truncate it (i.e. from 1.0 => 1 .This because we don't have an imag called density_1.0.png but instead we have density_1.png)
	if (isInt(parseFloat(new_val))) {
		new_val = parseFloat(new_val).toFixed(1);
	}
	$('#target_image').attr("src", "./" + list_matches[n_img_done][new_val]);
}

//this function is called to update the match image, when the slider is moved
function updateImageDensity() {

	var current_val = $("#sliderDensity").val();
	//update the current image accordingly to the value selected by the user
	changeImage(current_val);
	current_density = current_val;

	//allow the user to click on the next button and update ui
	slider_moved = true
	document.getElementById("btn-next").disabled = !slider_moved;
	$('.next-btn').css("background-color", " rgb(255, 255, 255)");
}

function shuffle(array) {
	var currentIndex = array.length,  randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex--;
  
	  // And swap it with the current element.
	  [array[currentIndex], array[randomIndex]] = [
		array[randomIndex], array[currentIndex]];
	}
	return array;
  }


function getRandomTrainingImages(){
	
	shuffle(list_imgs);
	index = 0;
	var list_positions = ['back','front','side_left','side_right'];
	//for the training select also a random position
	randomIndex = Math.floor(Math.random() * 4);
	//it might happens that the shuffling algorithms generate a valid solution. We then check it, if this is true then we iterate another time.
	//We iterate up to 10 times, the probability that the solution is correct should be minimum
	for( var i= 0;i<10;i++){
		for(var img in list_imgs) {
			var value = list_imgs[img];
			$('#drag'+index).attr("src", "./training/" + list_positions[randomIndex] + "/" + value['filename']);
			$('#drag'+index).attr("data-density", value['density']);
			$('#parent_drag'+index).attr("data-density-child", value['density']);
			index = index +1 ;
		}
		already_solved = check_answers(); 
		if (!already_solved){
			break;
		}
	}	
}

function newStimulusAsymmetricMatching() {

	//if the target is dynamic we hide the target image and show the target video. 
	//Other way around if we want to shown only static targets.
	if (list_targets_types[n_img_done] == "dynamic") {

		document.getElementById("ref_image").style.display = "none";
		document.getElementById("ref_vid").style.display = "block";
		$('#ref_vid').attr("src", './' + list_targets[n_img_done]);
	}
	else {
		document.getElementById("ref_vid").style.display = "none";
		document.getElementById("ref_image").style.display = "block";
		$('#ref_image').attr("src", './' + list_targets[n_img_done]);
	}
	target_type = list_targets_types[n_img_done];
	
	//reset UI
	current_density = 5.0
	$('#target_image').attr("src", "./" + list_matches[n_img_done]['5.0']);

	//uuh finding the solution for this was actually painful
	var input = document.getElementById("sliderDensity");
	input.value = 5.0

	//uncheck radio button from the confidence questionaire
	$("input:radio").prop("checked", false);

	//updateProgressBar
	progressBar((n_img_done) + 1, n_images, $('#progressBar'))
}

function startIntro() {
	$("#data_survey").hide();
}

function updateCurrentDensity(val){
	if(!confidence_phase){
		current_density += val;
		current_density = Math.min(current_density,10.0);
		current_density = Math.max(current_density,0.0);
		changeImage(current_density);
		slider_moved = true;
	}
// Variable to hold request
var request;

// Bind to the submit event of our form
$("#foo").submit(function(event){

    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();

    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);
	$form['uid'] = 14;
    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    $inputs.prop("disabled", true);

    // Fire off the request to /form.php

	request = $.post('/form.php', serializedData, function(response) {
    // Log the response to the console
    console.log("Response: "+response);
});
    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
        console.log("Hooray, it worked!");
    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
        console.error(
            "The following error occurred: "+
            textStatus, errorThrown
        );
    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);
    });

});
}

function start() {
	//hide everything except for the training block
	$("#finish").hide();
	$("#section_completed").hide();
	confidence_phase = true;
	//$("#userRating").hide();
	$("#asymmetric_experiment").hide();
	$('#userRating').css("visibility", "hidden");
	//uncomment next line to get the slider back
	$('#sliders').css("visibility", "hidden");
	//collect data from session
	sessions_data = JSON.parse($('#sessions').text().trim());
	
	//sessions contain: list_matches, list_targets, list_density_targets,list_position_matches
	list_matches = sessions_data['list_matches'];
	list_targets = sessions_data['list_targets'];
	list_density_targets = sessions_data['list_density_targets'];
	list_position_matches = sessions_data['list_position_matches'];
	list_targets_types = sessions_data['list_targets_types'];

	//initialize some variables and then start the training phase
	n_img_done = 0
	n_images = list_targets.length;
	document.getElementById("btn-next").disabled = true;
	time_experiment_start = new Date().getTime();
	
	getRandomTrainingImages();	
	document.addEventListener('keydown', (event) => {
		var name = event.key;
		var code = event.code;
		var stepInc = 0.25;
		switch(event.code ){
			case "ArrowLeft":
				updateCurrentDensity(-stepInc)
				break;
			case "ArrowRight":
				updateCurrentDensity(stepInc)
					break;
			case "Enter":
				if(slider_moved && !confidence_phase){
					console.debug("Next Img to Match");
					nextImageToMatch();
				}
				break;
			default:
				console.debug("Garbage pressed");
		}

	});
}

