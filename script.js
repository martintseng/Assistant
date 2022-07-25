var firstTime = true;
var typingTimeout;
var isTyping = false;
var isEnglish = true;
var isChatBoxOpen = false;

function init(){


	
	var language = document.getElementById("language").innerText;
	
	if (language == ""){
		var ENLength = document.getElementsByClassName("EN").length;
		isEnglish = ENLength;
		
		
	} else {
		
		//On the website, so the language is not hidden
		if (language == "Français"){
			isEnglish = true;
		} else {
			isEnglish = false;
		}
	}
	

	
	
	
	var message = document.createElement("p");
	if (isEnglish){
		message.innerText = "Hello, my name is Lit. How may I help you today?";
	}else {
		message.innerText = "Bonjour, mon nom est Lit. Comment puis-je vous aider?";
	}
	assistantTypes(message);
}

//user can type in messsage bar and send message here.
function sendMessage(){
	//textbox is the message bar.
	var textboxMessage = document.getElementById("textbox").value;
	if (textboxMessage != ""){
		var messageParts = textboxMessage.split(" ");

		var message = document.createElement("p");
		message.innerText = textboxMessage;
		userTypes(message);
		document.getElementById("textbox").value = "";
	
		var nbQuestions = document.getElementById("questions").getElementsByTagName("button").length;
		var foundKeyword = false

		for (let i = 0; i < nbQuestions; i++) {
			var keywords = (document.getElementById("questions").getElementsByClassName("keywords")[i].innerText);

			if (isMatchKeywords(messageParts, keywords)){
				if (!foundKeyword){
					//if we find a matching keyword we hide all answers ONE TIME for the user.
					hideAllQuestions()
				}
				//foundKeyword will be set to true, see below.
				foundKeyword = true;
				document.getElementById("questions").getElementsByTagName("button")[i].style.visibility = 'visible';
				document.getElementById("questions").getElementsByTagName("button")[i].style.display = 'block';
			}
		}
		
		if (foundKeyword){
			var message = document.createElement("p");

			if (isEnglish){
				message.innerText = "I may have found some information related to your keyword(s). Please find the information located on the right hand side.";
			}else {
				message.innerText = "J’ai peut-être trouvé de l'information liée à votre mot-clé. Veuillez SVP la retrouver à droite de l'écran.";
			}
			
			
			
			
			
			//set to firstTime to true to avoid the message: "is there anything I can help you with today" // will modify later.
			firstTime = true;
			
			//Display List of initial options
			document.getElementById("built-in-questions").getElementsByTagName("button")[0].style.visibility = 'visible';
			document.getElementById("built-in-questions").getElementsByTagName("button")[0].style.display = 'block';
			
			//Display List all options
			document.getElementById("built-in-questions").getElementsByTagName("button")[1].style.visibility = 'visible';
			document.getElementById("built-in-questions").getElementsByTagName("button")[1].style.display = 'block';
			
			assistantTypes(message);
		}else {
			var message = document.createElement("p");
			
			if (isEnglish){
				message.innerText = "I am sorry, I did not find any information related to these keywords. Care to try again?";
			}else {
				message.innerText = "Désolé, je n'ai pas trouvé de l'information liée à ces mots-clés. Voulez-vous réessayer ?";
			}
			
			assistantTypes(message);
		}
	}
	
	scrollDownOfDiv("conversationDiv");
	
}

function isMatchKeywords(messageParts, keywords) {
	
	//Checking if the message sent by user has any matching keywords to our answers.
	for (let i = 0; i < messageParts.length; i++) {
		if (messageParts[i].length > 3){
			var messagePartLcase = messageParts[i].toLowerCase();
			var keywordsLcase = keywords.toLowerCase();
			if (keywordsLcase.search(messagePartLcase) >= 0 ){ 
				return true;
			}
		}
	}
	
	return false;
}


function hideAllQuestions(){
	var nbQuestions = document.getElementById("questions").getElementsByTagName("button").length;
	for (let i = 0; i < nbQuestions; i++) {
		document.getElementById("questions").getElementsByTagName("button")[i].style.visibility = 'hidden';
		document.getElementById("questions").getElementsByTagName("button")[i].style.display = 'none';
	}
}


function hideAllBuiltInQuestions(){
	var nbQuestions = document.getElementById("built-in-questions").getElementsByTagName("button").length;
	
	for (let i = 0; i < nbQuestions; i++) {
		document.getElementById("built-in-questions").getElementsByTagName("button")[i].style.visibility = 'hidden';
		document.getElementById("built-in-questions").getElementsByTagName("button")[i].style.display = 'none';
	}
}


function listInitialQuestions(){
	var nbQuestions = document.getElementById("questions").getElementsByTagName("button").length;
	

	
	for (let i = 0; i < nbQuestions; i++) {

		if (document.getElementById("questions").getElementsByTagName("button")[i].classList == "bubble question hidden"){
			//hide
			document.getElementById("questions").getElementsByTagName("button")[i].style.visibility = 'hidden';
			document.getElementById("questions").getElementsByTagName("button")[i].style.display = 'none';
		}else {
			//display
			document.getElementById("questions").getElementsByTagName("button")[i].style.visibility = 'visible';
			document.getElementById("questions").getElementsByTagName("button")[i].style.display = 'block';
		}
	}
	document.getElementById("built-in-questions").getElementsByTagName("button")[0].style.visibility = 'hidden';
	document.getElementById("built-in-questions").getElementsByTagName("button")[0].style.display = 'none';
	document.getElementById("built-in-questions").getElementsByTagName("button")[1].style.visibility = 'visible';
	document.getElementById("built-in-questions").getElementsByTagName("button")[1].style.display = 'block';
}




function listAllQuestions(){
	displayAllQuestions();
	document.getElementById("built-in-questions").getElementsByTagName("button")[0].style.visibility = 'visible';
	document.getElementById("built-in-questions").getElementsByTagName("button")[0].style.display = 'block';
	document.getElementById("built-in-questions").getElementsByTagName("button")[1].style.visibility = 'hidden';
	document.getElementById("built-in-questions").getElementsByTagName("button")[1].style.display = 'none';
	//displayBuiltInQuestions();
	
	var nbQuestions = document.getElementById("built-in-questions").getElementsByTagName("button").length;
	for (let i = 0; i < nbQuestions; i++) {
		if (document.getElementById("built-in-questions").getElementsByTagName("button")[i].innerHTML == "List all options."){
			document.getElementById("built-in-questions").getElementsByTagName("button")[i].style.visibility = 'hidden';
			document.getElementById("built-in-questions").getElementsByTagName("button")[i].style.display = 'none';
		}
	}
}


function displayAllQuestions(){
	var nbQuestions = document.getElementById("questions").getElementsByTagName("button").length;
	for (let i = 0; i < nbQuestions; i++) {
		document.getElementById("questions").getElementsByTagName("button")[i].style.visibility = 'visible';
		document.getElementById("questions").getElementsByTagName("button")[i].style.display = 'block';
	}
}


function sendQuestion(x) {
	
	var questionElement = document.getElementById("questions").getElementsByTagName("button")[x - 1];
	var question = document.createElement("p");
	question.innerText = questionElement.innerText;
	userTypes(question);

	var answerElement = document.getElementById("answers").getElementsByClassName("answer")[x - 1];
	var answer = document.createElement("p");
	answer.innerHTML = answerElement.innerHTML;
	
	assistantTypes(answer);
	
	//Scroll down of the div.
	scrollDownOfDiv("conversationDiv")
	
}  

function scrollDownOfDiv(DivName){
	//Scroll down of the div.
	var objDiv = document.getElementById(DivName);
	objDiv.scrollTop = objDiv.scrollHeight;
}

function userTypes(elmt){
	
	
	
	
	elmt.classList.add("bubble");
	elmt.classList.add("user");
	elmt.classList.add("inlineblock");

	var rows = document.getElementById("QNA").getElementsByTagName("tr").length;
	var row = document.getElementById("QNA").insertRow(rows);
	var cell = row.insertCell(0);
	cell.classList.add("userBubble");
	
		
	const img = document.createElement("img");
	img.classList.add("userIcon");
	img.src = "https://raw.githubusercontent.com/EIA-LIT/Assistant/main/user.png";
	img.alt = "";
	const td1 = document.createElement("td");
	
	td1.appendChild(elmt);
	cell.appendChild(td1);
			
	const td2 = document.createElement("td")
	td2.classList.add("userIconTD")
	td2.appendChild(img);	
	cell.appendChild(td2);
	
	
	
	
	
	
}



function assistantTypes(elmt){
	
	elmt.classList.add("bubble");
	elmt.classList.add("assistant");
	elmt.classList.add("inlineblock");
	
	document.getElementById("typingBubble").style.visibility = 'visible';
	document.getElementById("typingBubble").style.display = 'inline';
	

	typingTimeout = setTimeout(() => {
		
	if (isTyping == false){
			isTyping = true
			document.getElementById("typingBubble").style.visibility = 'hidden';
			document.getElementById("typingBubble").style.display = 'none';
			//Create new row, and new celldata, and append answer.
			var rows = document.getElementById("QNA").getElementsByTagName("tr").length;
			var row = document.getElementById("QNA").insertRow(rows);
			var cell = row.insertCell(0);
			
			
			const img = document.createElement("img");
			img.classList.add("userIcon");
			img.src = "https://raw.githubusercontent.com/EIA-LIT/Assistant/main/avatar.png";
			img.alt = "";
			
			const td1 = document.createElement("td");
			td1.classList = "assistantIconTD"
			td1.appendChild(img);
			cell.appendChild(td1);
			
			const td2 = document.createElement("td")
			//assistant will write the answer of the question here.
			td2.appendChild(elmt);
			cell.appendChild(td2);
			
			
			if (firstTime == true){
				firstTime = false;
			}else {
				var message = document.createElement("p");
				message.classList.add("bubble");
				message.classList.add("assistant");
				message.classList.add("inlineblock");
			
			
				if (isEnglish){
					message.innerText = "Is there anything else that I can help you with?";
				}else {
					message.innerText = "Y a-t-il autre chose que je peux vous aider ?";
				}
			
				
				
				var rows = document.getElementById("QNA").getElementsByTagName("tr").length;
				var row = document.getElementById("QNA").insertRow(rows);
				var cell = row.insertCell(0);
				
				const td1 = document.createElement("td");
				td1.classList = "userIconTD"
				
				cell.appendChild(td1);
				const td2 = document.createElement("td")
				td2.appendChild(message);	
				cell.appendChild(td1);
				cell.appendChild(td2);

				
				
				scrollDownOfDiv("conversationDiv");
			}
			
		}
		
		
		
	}, 600); 
	isTyping = false
	
	
	
}


function toggleChatBox(){
		//toggle open and close chat box.
	document.getElementById("typing").style.visibility = 'visible';
	document.getElementById("typing").style.display = 'block';
	if (isChatBoxOpen){
		//chat is currently open. closing chatbox
		
		
		document.getElementById("outerVirtualAssistantDiv").style.visibility = 'hiddden';
		document.getElementById("outerVirtualAssistantDiv").style.display = 'none';
		document.getElementById("closeChatButton").style.visibility = 'hiddden';
		document.getElementById("closeChatButton").style.display = 'none';
		document.getElementById("openChatButton").style.visibility = 'visible';
		document.getElementById("openChatButton").style.display = 'block';


		
		isChatBoxOpen = false;
	} else {
		//chat is currently closed. open chatbox
		document.getElementById("outerVirtualAssistantDiv").style.visibility = 'visible';
		document.getElementById("outerVirtualAssistantDiv").style.display 	= 'block';
		document.getElementById("closeChatButton").style.visibility = 'visible';
		document.getElementById("closeChatButton").style.display = 'block';
		document.getElementById("openChatButton").style.visibility = 'hiddden';
		document.getElementById("openChatButton").style.display = 'none';
		

		isChatBoxOpen = true;
	}
}

function openChatBox(){
	
	toggleChatBox();
}

function closeChatBox(){

	toggleChatBox();
}