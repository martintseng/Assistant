var isEnglish = true;
var typingTimeout;
var isTyping = false;



//General approach: We usually display all questions, and then hide as we go.
//We do NOT do the opposite: hiding all, display questions as we go.

function init(){
	setLanguage();
	displayIntroMessage();
}

function setLanguage(){
	var language = document.getElementById("language").innerText;
	
	if (language == ""){
		var ENLength = document.getElementsByClassName("EN").length;
		isEnglish = ENLength;
	} else {
		//On the website, so the language is not hidden
		if (language == "Français"){
			isEnglish = true;
		} else {
			//Used to be false.
			isEnglish = false;
		}
	}
	
}

function displayIntroMessage(){
	var message = document.createElement("p");
	if (isEnglish){
		message.innerText = "Hello, I am your Saba Virtual Assistant!\n\nTo begin, please select one of the questions to the right, or enter a keyword or enquiry in the message bar below.";
	}else {
		message.innerText = "Bonjour, je suis votre spécialiste en assistance virtuelle !\n\nPour commencer, veuillez sélectionner l’une des questions à la droite ou saisir un mot-clé ou une demande dans la barre de message ci-dessous.";
	}
	
	//Uncomment if you want to ask UserType.
	assistantTypes(message, false);
}

//when a user press enter in the textbox, it will fire this function.
function sendMessage(){
	
	//textbox is the message bar.
	var textboxMessage = document.getElementById("textbox").value;
	if (textboxMessage != ""){
		
		//Split the message by parts to search for keywords.
		var messageParts = textboxMessage.split(" ");

		var message = document.createElement("p");
		message.innerText = textboxMessage;
		userTypes(message);
		document.getElementById("textbox").value = "";
	
		var nbQuestions = document.getElementById("questions").getElementsByTagName("button").length;
		var foundKeyword = false;
	
		//Filter Questions by Keywords.
		for (let i = 0; i < nbQuestions; i++) {
			var keywords = (document.getElementById("questions").getElementsByClassName("keywords")[i].innerText);

			if (isMatchKeywords(messageParts, keywords)){
				
				if (foundKeyword == false){
					//Since we found a matching keyword, we will hide the answers only 1 time.
					//The only time we will hide all questions.
					hideAllQuestions()
				}
				//foundKeyword will be set to true, see below.
				foundKeyword = true;
				var htmlButton = document.getElementById("questions").getElementsByTagName("button")[i];
				htmlButton.style.visibility = 'visible';
				htmlButton.style.display = 'block';
			}
		}
		
		if (foundKeyword){
			var message = document.createElement("p");

			if (isEnglish){
				message.innerText = "I think I can help you with that! Please find information related to your keyword or enquiry to the right of this chat box.";
			}else {
				message.innerText = "Je crois pouvoir vous aider avec ceci! Veuillez trouver les informations relatives à votre mot-clé ou à votre demande à la droite de cette boîte de dialogue.";
			}
			
			//Display List of initial options
			showInitialQuestionsButton();
			//Display List all options
			showAllQuestionsButton();
			
			assistantTypes(message, false);
		}else {
			var message = document.createElement("p");
			
			if (isEnglish){
				message.innerText = "I’m sorry, I could not find any information on this. Please try a different keyword or enquiry.";
			}else {
				message.innerText = "Je suis désolé, je n’ai trouvé aucune information à ce sujet. Veuillez essayer un autre mot-clé ou une autre question. ";
			}
			
			assistantTypes(message, true);
		}
	}
	
	//We need to scroll down now as we need to see the user's message.
	//Once the assistant finishes typing, it will scroll down again.
	scrollDownOfDiv("conversationDiv");
}

function isMatchKeywords(messageParts, keywords) {
	
	//Checking if the message sent by user has any matching keywords to our answers.
	for (let i = 0; i < messageParts.length; i++) {
		if (messageParts[i].length > 1){
			var messagePartLcase = messageParts[i].toLowerCase();
			var keywordsLcase = keywords.toLowerCase();
			if (keywordsLcase.search(messagePartLcase) >= 0 ){ 
				return true;
			}
		}
	}
	
	return false;
}

function showInitialQuestionsButton(){
	var hmtlButton = document.getElementById("initialQuestions")
	hmtlButton.style.visibility = 'visible';
	hmtlButton.style.display = 'block';
}

function hideInitialQuestionsButton(){
	var hmtlButton = document.getElementById("initialQuestions")
	hmtlButton.style.visibility = 'hidden';
	hmtlButton.style.display = 'none';
}

function showAllQuestionsButton(){
	var hmtlButton = document.getElementById("allQuestions")
	hmtlButton.style.visibility = 'visible';
	hmtlButton.style.display = 'block';
}

function hideAllQuestionsButton(){
	var hmtlButton = document.getElementById("allQuestions")
	hmtlButton.style.visibility = 'hidden';
	hmtlButton.style.display = 'none';
}

//THIS IS A FUNCTION RELATED TO THE LIST INITIAL QUESTIONS BUTTON.
function listAllQuestions(){
	displayAllQuestions();	
}

//THIS IS A FUNCTION RELATED TO THE LIST INITIAL QUESTIONS BUTTON.
function listInitialQuestions(){
	var nbQuestions = document.getElementById("questions").getElementsByTagName("button").length;

	for (let i = 0; i < nbQuestions; i++) {
		var htmlButton = document.getElementById("questions").getElementsByTagName("button")[i];
		var classList = htmlButton.classList;
		
		if (classList.contains("hidden")){
			//hide
			htmlButton.style.visibility = 'hidden';
			htmlButton.style.display = 'none';
		}
		else{
			//display
			htmlButton.style.visibility = 'visible';
			htmlButton.style.display = 'block';
		}

	}
	hideInitialQuestionsButton();
	showAllQuestionsButton();
}

function hideAllQuestions(){
	var nbQuestions = document.getElementById("questions").getElementsByTagName("button").length;
	for (let i = 0; i < nbQuestions; i++) {
		document.getElementById("questions").getElementsByTagName("button")[i].style.visibility = 'hidden';
		document.getElementById("questions").getElementsByTagName("button")[i].style.display = 'none';
	}
}

function displayAllQuestions(){
	var nbQuestions = document.getElementById("questions").getElementsByTagName("button").length;
	for (let i = 0; i < nbQuestions; i++) {
		document.getElementById("questions").getElementsByTagName("button")[i].style.visibility = 'visible';
		document.getElementById("questions").getElementsByTagName("button")[i].style.display = 'block';
	}
	showInitialQuestionsButton();
	hideAllQuestionsButton();
}

function findAnswer(x) {
	var questionElement = document.getElementById("Q" + x.toString());
	var question = document.createElement("p");
	question.innerText = questionElement.innerText;
	userTypes(question);

	var answerElement = document.getElementById("A" + x.toString());
	var answer = document.createElement("p");
	answer.innerHTML = answerElement.innerHTML;
	assistantTypes(answer, true);
	//Scroll down of the div.
	scrollDownOfDiv("conversationDiv");
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

function assistantTypes(elmt, withCloseMessage){
	
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
			
			
			
			if (withCloseMessage){
				add_closeMessage();
			}			
			
			scrollDownOfDiv("conversationDiv");
		}
		
	}, 600); 
	isTyping = false
}

//adds the close message (for more assistance, survey)
function add_closeMessage(){
	//This code that is commented was to put a note on each answer so to let the user know that they can send an email to NSD
	var message = document.createElement("p");
	message.classList.add("bubble");
	message.classList.add("assistant");
	message.classList.add("inlineblock");
	var nationalLink = document.createElement('a');
	nationalLink.target = 'blank';
	
	if (isEnglish){
		message.innerText = "If you require more assistance, contact the ";
		nationalLink.href = 'https://iservice.prv/eng/imit/nsd/index.shtml';
		nationalLink.textContent = 'National Service Desk';
	}else {
		message.innerText = "Si vous avez besoin d’assistance supplémentaire, communiquez avec l'";
		nationalLink.href = 'https://iservice.prv/fra/giti/isn/index.shtml';
		nationalLink.textContent = 'InfoService national';
	}
		message.appendChild(nationalLink);
		message.append(".");
		
		//Start of the Questionnaire code. Comment this block if you want to omit the questionnaire.
		var messageBreak1 = document.createElement("br");
		var messageBreak2 = document.createElement("br")
		message.appendChild(messageBreak1);
		message.appendChild(messageBreak2);
				
		var surveyMessage = document.createElement("p");
		var surveyLink = document.createElement('a');
				
		surveyLink.href = 'https://forms.office.com/Pages/ResponsePage.aspx?id=RljVnoGKRkKs2LGgGr_A0Rpgr_uBAAVNpXqsYz-z7BlUOVg5NDdIVUhDN1g1OEpGNEZVT1RYVlhOQi4u';
		surveyLink.target = 'blank';
				
		if (isEnglish){
			surveyMessage.append("How did I do? Please take this short ");
			surveyLink.textContent = 'survey';
		}else {
			surveyMessage.append("Que pensez-vous de mon travail ? Répondez à ce court ");
			surveyLink.textContent = 'questionnaire';
		}
				
		surveyMessage.appendChild(surveyLink);
		message.append(surveyMessage);
		
		if (isEnglish){
			surveyMessage.append(" to help me improve and serve you better! In the upper right-hand corner of the survey, you will find options to select the language of your choice and/or using the immersive reader.");
		}else {
			surveyMessage.append(" pour m'aider à m'améliorer et à mieux vous servir ! Dans le coin supérieur droit du questionnaire, vous trouverez des options pour sélectionner la langue de votre choix et/ou en utilisant le lecteur immersif.");
		}
		
		//adjust the format of the table 
		var rows = document.getElementById("QNA").getElementsByTagName("tr").length;
		var row = document.getElementById("QNA").insertRow(rows);
		var cell = row.insertCell(0);
				
		const td1 = document.createElement("td");
		td1.classList = "userIconTD"
		cell.appendChild(td1);
				
		//This appends the note below the answer.
		const td2 = document.createElement("td")
		td2.appendChild(message);
		cell.appendChild(td1);
		cell.appendChild(td2);		
		//End  of questionnaire code.
}


