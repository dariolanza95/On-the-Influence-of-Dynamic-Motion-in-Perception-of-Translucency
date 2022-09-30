<html>

<head>
	<title> Survey </title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<link rel="stylesheet" type="text/css" href="css/style-tinybox.css" />
	<link rel="stylesheet" type="text/css" href="css/surveycss.css?1812" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.0.min.js"></script>
	<script type="text/javascript" src="js/tinybox.js"></script>
	<script type="text/javascript" src="js/main.js?1512"></script>
	<script type="text/javascript" src="js/jquery.tooltipster.min.js"></script>
	<script src="https://www.google.com/recaptcha/api.js" async defer></script>
	<script>
		$(document).ready(function() {
			//document.getElementById("butt_submit").disabled = true;
			$('.tooltip').tooltipster({
				contentAsHTML: true,
				interactive: true,
				hideOnClick: true
			});
		});
	</script>
</head>

<body onload="startIntro()">
	
	<div class="Intro" id="intro_text">
		<h2>Thank you for taking the time to participate in our user study.</h2>

		<h2>Translucent Appearance</h2>
		<p> Translucent materials are a class of materials that are quite common in our dailylives. Think, for example, about food,
			organic tissues like skin, but also inorganic materials such as marble and jade.

			Even if they are quite common in our dailylives, these materials have not been studied deeply in literature.
			Today, with your help, we would like to have some further insight on them.
		</p>

		<h2>How does the test work?</h2>
		<p> In each trial, you will see a short video that will act as a reference, and a static image for which you will be able to adjust its
			appearance through a slider. Your task is to adjust the slider until the appearance of the object in the static image matches that of the object in the reference video. </p>
		<p> Once you are finished with a trial, there will be a question on how satisfied you are with the result. Once you answer it, you will be able to move on to the next trial. </p>
		<!-- <p> Note that even if the reference video might all look the same they actually have different physical properties </p> -->
		<p> There is no time limit per trial, nor for the whole experiment. On average, it takes around 10 to 15 minutes. </p>


		<h2>Final (important) remarks</h2>

		<p> Try to stay seated at 50cm away from your screen (about your arm length) during the test. </p>
		<p> This study should be conducted using high screen resolution (&#8805; 1500x850). </p>
		<p><b>Please <font color="#a23e3e">do not refresh the browser nor click back</font> while in the middle of the survey!<br>
				If you do so, you will have to start over.</b> </p>
		<p> Remember that you can leave the the experiment whenever you need to. This, however will not count as a complete trial. 

		<!-- <p><center>This captcha is only used to avoid bots to enter the test and has nothing to do with us and the study. <br>Please validate it and click on "Begin". </center></p> -->
		<br><br>
		<button type="button" id="to_survey" onclick="to_survey()">Next</button>

		<form id='myform' action="index.php" method="POST" style="text-align:left;">
			<!-- <div class="g-recaptcha" data-sitekey="6Lc7ev4ZAAAAAIx6HpZphv-Cd1y1L-DYFPB15z4z" data-callback="displayButton" style="padding-left: 280px;"></div> -->


			<!-- <input type="submit" value="Begin survey" name="begin"> -->


		</form>
	</div>
	<div class="Intro" id="data_survey" style="display: none">
		<h5> Data survey</h5>

		We will collect some (anonymous) user details before the test.
		If it is your second time here skip this part by simply putting only your ID.
		<br> <br>

		- Gender
		<div id="gender">
			<br>
			<input type="radio" id="g1" name="gender" value="Female" style="margin-left: 8px;"><label for="g1"> Female</label>
			<input type="radio" id="g2" name="gender" value="Male" style="margin-left: 8px;"><label for="g2"> Male</label>
			<input type="radio" id="g3" name="gender" value="not_selected" style="margin-left: 8px;"><label for="g3"> I prefer not answer</label>
		</div>
		<br> <br>

		- Age: 
		<input autocomplete="off" type="number" min=16 max=110 id="age" name="age">
		<br> <br>

		- Do you have previous experience in Computer Graphics and/or Image Processing?
		<div id="experienceCG">
			<br>
			<input type="radio" id="e1" name="experienceCG" value="No_experience" style="margin-left: 8px;"><label for="e1"> No
				experience</label>
			<input type="radio" id="e2" name="experienceCG" value="Beginner" style="margin-left: 8px;"><label for="e2"> Beginner</label>
			<input type="radio" id="e3" name="experienceCG" value="Intermediate" style="margin-left: 8px;"><label for="e3">
				Intermediate</label>
			<input type="radio" id="e4" name="experienceCG" value="Professional" style="margin-left: 8px;"><label for="e4">
				Professional</label>

		</div>
		<br><br>
		- Do you have previous experience in Art and/or Design?
		<div id="experienceCG">
			<br>
			<input type="radio" id="ea1" name="experienceArt" value="No_experience" style="margin-left: 8px;"><label for="ea1"> No
				experience</label>
			<input type="radio" id="ea2" name="experienceArt" value="Beginner" style="margin-left: 8px;"><label for="ea2"> Beginner</label>
			<input type="radio" id="ea3" name="experienceArt" value="Intermediate" style="margin-left: 8px;"><label for="ea3">
				Intermediate</label>
			<input type="radio" id="ea4" name="experienceArt" value="Professional" style="margin-left: 8px;"><label for="ea4">
				Professional</label>
			<br>
		</div>
		<form action="/action_page.php">
			<br>
			<label for="id">Please insert you ID:</label>
			<input autocomplete="off" type="text" id="user_id" name="id"><br>
		</form>
		<div id="DataAnonymizationDiv">
			<b>Data Anonymization </b> <br> <br>
			Your data will be treated anonymously and only for statistical purposes. <br> <br>
			<input type="checkbox" id="user_consent" name="user_consent" value="approved"><label for="user_consent">I give my consent to the data treatment</label>
			<br> 	 <br>
		</div>

		<br>
		
		



		<!--
			<div>
			<h2>Drag and Drop</h2>
			<p>Drag the image back and forth between the two div elements.</p>

			<div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)">
				<img src="img_logo.png" draggable="true" ondragstart="drag(event)" id="drag1" width="88" height="31">
			</div>
			<div id="div2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
		</div>
-->
		<button type="button" id="butt_submit" data-action='submit' onclick="validateuserData()">Begin</button>
		<br><br>
		<div class="suggestions" style="display: none">
			<div class="row" style="margin: 0px;">
				<p align="center" class="suggestions_text">
					this is just a text that is for nothing
				</p>
			</div>
		</div>





	</div>





</body>

</html>
<script type="text/javascript">
	// 		function onSubmit() {
	// 			console.log("ok2")
	// 			// ICI Validation Javascript du formulaire  
	// 			document.getElementById("myform").submit();
	// 		}
	// 		function displayButton() {
	// 			console.log("ok")
	// 			document.getElementById("butt_submit").disabled = false;
	// 		}
</script>