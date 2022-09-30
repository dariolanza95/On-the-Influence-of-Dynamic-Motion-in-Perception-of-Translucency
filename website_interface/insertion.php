<?php 
$str_results = file_get_contents('php://input');
$res = json_decode($str_results,true);
#error_log($str_results);
$real_data = $res[1];

#$name_previous_test = './data/'.$real_data['user_id'].'.json';
#$previous_test = readfile($name_previous_test);

#$fid = fopen($name_previous_test, "c+");

#flock($fid, LOCK_EX);

#flock($previous_test, LOCK_EX);
#$previous_test = fread($fid, filesize($name_previous_test));
$data_previous_test = null; #json_decode($previous_test, true);

if($res[0]){
    $filename = "./data/".$real_data['user_id']."_second_trial.json";
}else{    
    $filename = "./data/".$real_data['user_id'].".json";       
}

    $previous_test = file_get_contents($filename);
if($previous_test == FALSE){
    $tempArray = $real_data;
    $array_time_starts = $tempArray["time_start"];
    $array_time_end = $tempArray["time_end"];
    $array_answers = $tempArray["answers"];

    $real_data["time_start"] = [$array_time_starts];
    $real_data["time_end"] = [$array_time_end];
    $real_data["answers"] = [$array_answers];
    file_put_contents($filename,json_encode([$real_data]));
}else{
   
    $tempArray = json_decode($previous_test,true);
    $array_answers = $tempArray[0]["answers"];
    $array_time_starts = $tempArray[0]["time_start"];
    $array_time_end = $tempArray[0]["time_end"];
    array_push($array_answers,$real_data["answers"]);
    array_push($array_time_starts,$real_data["time_start"]);
    array_push($array_time_end,$real_data["time_end"])    ;   
    $tempArray[0]["answers"] = $array_answers;
    $tempArray[0]["time_end"] = $array_time_end;
    $tempArray[0]["time_start"] = $array_time_starts;
    #array_push($tempArray, $real_data);
    file_put_contents($filename,json_encode($tempArray));
    #$append_data = [json_decode($previous_test),$real_data];
    #file_put_contents($filename,json_encode($append_data));
}
?>

