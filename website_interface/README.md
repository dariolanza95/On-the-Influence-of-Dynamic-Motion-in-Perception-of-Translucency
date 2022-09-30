# userstudy_dynamic_translucency

# Introduction
Goal of this project is to study how the perception of translucency is affect in a dynamic lighitng environment


# Usage
To run the page locally (on Ubuntu) just use the command:
	'php -S 127.0.0.1:8000'
This command will run the the page with Ip '127.0.0.1' using port '8000'


## Folder Description
There are 4 php files:
* 'index.php' holds the main static page and it is in charge of collecting the (anonymous) data from users. It is also where the stimuli are shuffled and other variables are initialized. Once people pass the training section, where users are asked to order images by their degree of thickness, the page will call 'assymetric_test.php'. 
* 'assymetric_test.php' is where the asymmetric test happen. Depending on the data passed by 'index.php' we will present to the user a set of stimuli rendered with the same phase function. This is why there are three folders named 'pf_0','pf_9' and 'pf_12'. In these folders we store the targets (Reference) and the matches (Match) stimuli images.
	* 'targets' contains 4 more folders depending on the density level required. In each folder there are a static and a dynamic image. 
	* matches is composed by three folders: 'back','front','side_left'. This because it is an asymmetric task and we want to change the main illumination direction. 40 images are stored in each folder, the images have a density ranging from 0 to 10 in log2 scale. These images are used by the user to estimate the density of the Match. 

### Other folders
* 'training' is used to store the source data for the training session
* 'data' is where the data of the user are stored. Note that the we ask users to participate to **two** experiments. Hence, there will be two files associated with each id: One for the first experiment, the second one for the second experiment. Inside this folder there is another folder, storing the .txt file of users' eye gaze.


## Contact
For any doubts, contact me at: dlanza@unizar.es
