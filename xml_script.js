var isChatBoxOpen = false;


function toggleChatBox(){
	
	if(isChatBoxOpen){
		isChatBoxOpen = false
		document.getElementById("assistantContainer").style.visibility = 'hiddden';
		document.getElementById("assistantContainer").style.display = 'none';
	}else{
		isChatBoxOpen = true
		document.getElementById("assistantContainer").style.visibility = 'visible';
		document.getElementById("assistantContainer").style.display = 'block';
	}

}
