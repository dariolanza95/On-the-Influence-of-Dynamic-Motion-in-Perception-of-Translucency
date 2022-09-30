<html>

<head>

	<title> Survey </title>
	<link rel="stylesheet" type="text/css" href="css/surveycss.css?1812" />
	<link rel="stylesheet" type="text/css" href="css/style-tinybox.css" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<script type="text/javascript" src="http://code.jquery.com/jquery-1.7.0.min.js"></script>
	<script type="text/javascript" src="js/jquery.tooltipster.min.js"></script>
	<script type="text/javascript" src="js/tinybox.js"></script>
	<script type="text/javascript" src="js/main.js?1512"></script>
	<script type="text/javascript" src="js/progressbar.js"></script>

	<script>
		$(document).ready(function() {

			$('.tooltip').tooltipster({
				contentAsHTML: true,
				interactive: true,
				hideOnClick: true
			});
		});
	</script>


</head>

<body id="output" onload="start()">
	<?php


	#shuffle a dictionnary while keeping the keys
	function shuffle_array($arr)
	{
		$keys = array_keys($arr);
		shuffle($keys);
		$new_array = array();
		foreach ($keys as $i) {
			$new_arr[$i] = $arr[$i];
		}
		return $new_arr;
	}
	function debug_to_console($data)
	{

		echo '<script> console.log(' . json_encode($data) . ')</script>';
	}
	#measure time in microseconds
	function microtime_float()
	{
		list($usec, $sec) = explode(" ", microtime());
		return ((float)$usec + (float)$sec);
	}
	//this function parse a json file in which all the possible combinations of stimuli are enumerated. 
	//During one session the user will be shown with dynamic or static targets (no interleaving of them in same session).
	//We then discard all the combinations of stimuli in which the target is static targets if we want that user see only see dynamic targets

	function select_stimuli($n_im)
	{

		$list_of_folders = ['./pf_9/final.json', './pf_12/final.json', './PrototypeFolderStructureAsymetric/final.json'];
		$data = $_GET["data"];
		$myObj = json_decode($data, true);
		$uid = $myObj["uid"];
		$iteation_n = $myObj["it_n"];
		$path_list = $myObj["path_l"];

		debug_to_console($path_list[0]);
		debug_to_console($path_list[1]);
		debug_to_console($path_list[2]);
		$name = './pf_' . $path_list[$iteation_n] . '/final.json';
		debug_to_console($name);
		$fid = fopen($name, "c+");
		flock($fid, LOCK_EX);
		$file = fread($fid, filesize($name));
		$data = json_decode($file, true);

		$sorted_counts = shuffle_array($data["counts"]);
		asort($sorted_counts);
		$selection = array_slice($sorted_counts, 0, $n_im, true);
		$img_array = array_keys($selection);

		global $desired_target_type;
		$desired_target_type = $myObj['target_type'];

		//collect data only for the selected target type (dynamic| static)
		$index = 0;
		for ($i = 0; $i < $n_im; $i++) {
			$target_type = $data["views"][$img_array[$i]]['target']['target_type'];
			if ($desired_target_type == $target_type) {
				$list_matches[$index] = $data["views"][$img_array[$i]]['match']['match_imgs'];
				$list_targets[$index] = $data["views"][$img_array[$i]]['target']['target_src'];
				$list_position_matches[$index] = $data["views"][$img_array[$i]]['match']['position'];
				$list_target_density[$index] =  $data["views"][$img_array[$i]]['target']['density'];
				$list_targets_types[$index] =  $target_type;
				$index = $index + 1;
			}
		}

		ftruncate($fid, 0);
		rewind($fid);
		$encoded_data = json_encode($data);
		fwrite($fid, $encoded_data);
		flock($fid, LOCK_UN);
		fclose($fid);

		//Push control images in shuffled order
		debug_to_console($list_matches);
		debug_to_console($list_targets);
		debug_to_console($list_targets_types);
		$SESSION['list_matches'] = $list_matches;
		$SESSION['list_targets'] = $list_targets;
		$SESSION['list_position_matches'] = $list_position_matches;
		$SESSION['list_density_targets'] =  $list_target_density;
		$SESSION['list_targets_types'] =  $list_targets_types;
		$SESSION['array_images'] = $img_array;
		$SESSION['n_images'] = $n_im;

		return $SESSION;
	}


	?>

	<?php
	//better leave this number as it is.
	$SESSION = select_stimuli(24);

	?>
	<input style="visibility:hidden" id="token" type="text" value="<?php echo $token ?>">




	<div class="Experiment2" id="trainingBlock" style="visibility:show">
		<h2>

			<center><b>

					<font style='text-align: justify; text-justify: inter-word; padding-left:50px; padding-right:50px; font-size:30;'> Before starting the real test we would like to ask you to sort these images
						by their degree of translucency. Use drag-and-drop to order these four images from more translucent (glass-like) on the left side to less translucent (marble-like) on the right side.</font>

				</b></center>
		</h2>
		<div>
			<div class="inline-block-training-div" ondrop="drop(event)" ondragover="allowDrop(event)" id="parent_drag0" data-density-child="0.0">
				<img id="drag0" draggable="true" ondragstart="drag(event)" width="350" height="350" data-density="0.0">
			</div>
			<div class="inline-block-training-div" ondrop="drop(event)" ondragover="allowDrop(event)" id="parent_drag1" data-density-child="0.0">
				<img id="drag1" draggable="true" ondragstart="drag(event)" width="350" height="350" data-density="0.0">
			</div>
			<div class="inline-block-training-div" ondrop="drop(event)" ondragover="allowDrop(event)" id="parent_drag2" data-density-child="0.0">
				<img id="drag2" draggable="true" ondragstart="drag(event)" width="350" height="350" data-density="0.0">
			</div>
			<div class="inline-block-training-div" ondrop="drop(event)" ondragover="allowDrop(event)" id="parent_drag3" data-density-child="0.0">
				<img id="drag3" draggable="true" ondragstart="drag(event)" width="350" height="350" data-density="0.0">
			</div>
		</div>
		<br> <br>

		<button id="btn-training" class="button next-btn" style="margin-left:25px; margin-right:25px; font-size : 25px;" class="btn btn-primary" onclick="validateTraining()" value="Next!">Next </button>

		<div class="suggestions" style="display: none">
			<div class="row" style="margin: 0px;">
				<h3>
					<br>
					<p align="center" class="suggestions_text" style='text-align: center; text-justify: inter-word; font-size:25;'>
						this is just a text that is for nothing
					</p>
				</h3>
			</div>
		</div>


	</div>



	<div class="Experiment2" id="asymmetric_experiment" style="visibility:show">
		<h2>
			<b>

				<font style='text-align: justify; justify-content: center; text-justify: inter-word;  font-size:25;'>
					<?php
					if ($GLOBALS['desired_target_type'] == 'static') {
						echo "Goal: Adjust the appearance of the material on the right image (Match), until it matches that of the left image (Reference).";
					} else {
						echo "Goal: Adjust the appearance of the material on the right image (Match), until it matches that of the left video (Reference).";
					}
					?>
					<!-- You can use the slider on the right to change the appearance of the Match image. -->
					Use the left and right arrows to change the appearance of the Match image. Press 'Enter' when you are satisfied and ready for the next trial.
				</font>
			</b>
		</h2>
		<div>


			<div class="inline-block2">
				<div class="column">
					<h3 class="stimulus-text" style="padding-left: 170px">Reference </h3>

					<div id="div_vid">
						<video src="./loading.gif" onload="loadReference()" id="ref_vid" height="512px" width="512px" preload="auto" autoplay loop>
					</div>
					<div id="div_img">
						<img src="./loading.gif" onload="loadReference()" id="ref_image" height="512px" width="512px"> </img>
					</div>
				</div>
			</div>
			<div class="inline-block2">
				<div class="column">
					<h3 class="stimulus-text">Match </h3>
					<img id="target_image" onload="loadMatch()" height="512px" width="512px"> </img>
				</div>
			</div>
			<!-- comment display none if you want to use the slider back -->
			<div class="inline-block-slider" id="sliders" style="display:none">

				<div class="centerslider" style="margin-bottom:150px">
					<label for="sliderDensity" style="margin-left:45px; margin-bottom:5px; font-size : 30px;"> Appearance </label></br>
					<input type="range" class="slider" id="sliderDensity" type="range" min="0" max="10.0" step="0.25" value="0" oninput="updateImageDensity()">
				</div>

				<div>
					<button id="btn-next" class="button next-btn" style=" left: 25%; top: -45; margin-left:25px; margin-right:25px; font-size : 25px;" class="btn btn-primary" onclick="validateSlider()" value="Next!">Next </button>
				</div>
			</div>

		</div>


		<div id="userRating" style="visibility:hidden">
			<h2> How satisfied are you with your answer? </h2>

			<div class="row-user-rating">
				<fieldset>
					<div class="user-rating-radio-buttons">

						<input type="radio" id="c1" name="confidence" value="strongly_satisfied" style="margin-left: 8px;">
						<label for="c1">strongly satisfied</label>

						<input type="radio" id="c2" name="confidence" value="satisfied" style="margin-left: 8px;">
						<label for="c2">satisfied</label>

						<input type="radio" id="c3" name="confidence" value="more_or_less_satisfied" style="margin-left: 8px;">
						<label for="c3">more or less satisfied</label>

						<input type="radio" id="c4" name="confidence" value="neutral" style="margin-left: 8px;">
						<label for="c4">neutral</label>

						<input type="radio" id="c5" name="confidence" value="more_or_less_unsatisfied" style="margin-left: 8px;">
						<label for="c5">more or less unsatisfied</label>

						<input type="radio" id="c6" name="confidence" value="unsatisfied" style="margin-left: 8px;">
						<label for="c6">unsatisfied</label>

						<input type="radio" id="c7" name="confidence" value="strongly_unsatisfied" style="margin-left: 8px;">
						<label for="c7">strongly unsatisfied</label>
					</div>
				</fieldset>
			</div>

			<button type="button" id="butt_submit" style="margin-left:25px; margin-right:25px; font-size : 20px; padding: 10; bottom: 15;" data-action='submit' onclick="validateuserRating()">Next image</button>

			<div class="suggestions" style="display: inline-block">
				<div class="row" style="margin: 0px;">
					<p align="center" class="suggestions_text">
						this is just a text that is for nothing
					</p>
				</div>
			</div>
		</div>





	</div>
	<div id="error" style="visibility:hidden; position: fixed;top: 30px;left: 30px;width:800px;">
		<table style="width:70%;background-color: #ffffff;border-style: groove;">
			<tr>
				<td style="text-align:center"> An error has occurred. Please return to the beggining.<br><br><br><br>
					<button type="button" style="position: fixed;top: 60px;left: 250px;" onclick="location.href='index.php'">Continue</button>
				</td>
			</tr>
		</table>
	</div>

	<!-- only displayed at the end of the test -->

	</div>
	<div id="section_completed" class="Intro">
		<div class=".inline-finishedSection">
		<h3> Section completed! </h3>
		
		<p> You have successfully completed a section of the experiment. Take a small break before continuing and when you are ready again click the button below   </p>
		<button type="button" style="left: 700px;" 
		onclick="NextSection()">Start again!
		</button>
		</div>
		</div>



	<div id="finish" class="Intro">
		<h2> Done! </h2>

		<p> Thank you for your time! You have successfully completed the survey and submitted your answers. </p>
		<!--<p>If you have any comments or questions, please email us at: <a style="color:#457dd8" href="mailto:anase@unizar.es">anase@unizar.es</a>.</p>-->
	</div>
</body>

</html>

<!-- this is to communicate the content of $SESSION to javascript -->

<script type='text/json' id='sessions'>
	<?php echo json_encode($SESSION); ?>
</script>