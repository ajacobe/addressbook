<?php

if($_SERVER['REQUEST_METHOD'] == "POST" || $_SERVER['REQUEST_METHOD'] == "GET"){
	if($_SERVER['HTTP_ORIGIN'] == "http://localhost:8080"){
		header('Access-Control-Allow-Origin: http://localhost:8080');
		header('Content-Type: application/json');
		
		if(isset($_REQUEST['action']) && $_REQUEST['action'] != ''){
			$all_functions = get_defined_functions();
			$function = $_REQUEST['action'];
			
			if(in_array(strtolower($function), $all_functions['user'])){
				
				$function();
			}
		}
	}
}else{
	if($_SERVER['HTTP_ORIGIN'] == "http://localhost:8080"){
		header('Access-Control-Allow-Origin: http://localhost:8080');
		header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
		header('Access-Control-Max-Age: 3600');
		header('Content-Type: application/json');
	}else{
		header('HTTP/1.1 403 Access Forbidden');
		header('Content-Type: application/json');
		die();
	}
}

function fetchFileContent($file){
	return file_get_contents($file);
}


function fetch(){
	echo fetchFileContent('data.json');
	die();
}
function update_profile() {
	$jsonData = file_get_contents('php://input');
	$data = json_decode($jsonData);

	if(isset($data->persons_data)){
		
		file_put_contents('data.json',json_encode($data->persons_data));
	}
	if(isset($data->file) && isset($data->title)){
		$fileContent = $data->file;
		$fileName = $data->title;
		
		list(, $content) = explode(",", $fileContent);
		$dir = "public/img/";
		if(file_exists($dir)){
			
			mkdir("public/img", 644,true);	
			file_put_contents($dir . $fileName, base64_decode($content));

		}
	}

	echo json_encode(array('status' => true));
}
