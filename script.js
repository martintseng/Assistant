var firstTime = true;
var firstTimeOpenBox = true;
var isChatBoxOpen = false;
var typingTimeout;


function closeChatBox(){
OpenChatBox()
}

function OpenChatBox(){

if (firstTimeOpenBox){
firstTimeOpenBox = false;
//first time will display hello how may I help you
if (firstTime) {
var message = document.createElement("p");
message.innerText = "Hello, my name is Lit. How may I help you today?";
//If assistant successfully types, it will set FirstTime to false.
assistantTypes(message);
}
}



//toggle open and close chat box.
if (isChatBoxOpen){
document.getElementById("chatbox").style.display = 'none';
document.getElementById("chatbox").style.visibility = 'hiddden';
document.getElementById("openChatButton").style.visibility = 'visible';
document.getElementById("openChatButton").style.display = 'block';


isChatBoxOpen = false;
} else {
document.getElementById("chatbox").style.visibility = 'visible';
document.getElementById("chatbox").style.display = 'block';
document.getElementById("openChatButton").style.visibility = 'hiddden';
document.getElementById("openChatButton").style.display = 'none';



isChatBoxOpen = true;
}


}


function sendMessage(){
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
//hide the no thank you response
document.getElementById("questions").getElementsByTagName("button")[2].style.visibility = 'hidden';
document.getElementById("questions").getElementsByTagName("button")[2].style.display = 'none';
//foundKeyword will be set to true, see below.
}
foundKeyword = true;
document.getElementById("questions").getElementsByTagName("button")[i].style.visibility = 'visible';
document.getElementById("questions").getElementsByTagName("button")[i].style.display = 'block';
}


}



if (foundKeyword){
var message = document.createElement("p");
message.innerText = "I may have found some information related to your keywords. Please see below.";
//set to firstTime to true to avoid the message: "is there anything I can help you with today" // will modify later.
firstTime = true;
assistantTypes(message);
}else {
var message = document.createElement("p");
message.innerText = "I am sorry, I did not find any information related to these keywords. Care to try again?";
assistantTypes(message);
}




}



}

function isMatchKeywords(messageParts, keywords) {
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
document.getElementById("questions").getElementsByTagName("button")[i].style.visibility = 'hidden';
document.getElementById("questions").getElementsByTagName("button")[i].style.display = 'none';
}
}

/*
nbQuestions = document.getElementById("built-in-questions").getElementsByTagName("button").length;
for (let i = 0; i < nbQuestions; i++) {
document.getElementById("built-in-questions").getElementsByTagName("button")[i].style.visibility = 'hidden';
document.getElementById("built-in-questions").getElementsByTagName("button")[i].style.display = 'none';
}*/

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
/*
function displayBuiltInQuestions(){
var nbQuestions = document.getElementById("built-in-questions").getElementsByTagName("button").length;
for (let i = 0; i < nbQuestions; i++) {
document.getElementById("built-in-questions").getElementsByTagName("button")[i].style.visibility = 'visible';
document.getElementById("built-in-questions").getElementsByTagName("button")[i].style.display = 'block';
}

}
*/

function sendQuestion(x) {


var questionElement = document.getElementById("questions").getElementsByTagName("button")[x - 1];
var question = document.createElement("p");
question.innerText = questionElement.innerText;
userTypes(question);


var answerElement = document.getElementById("answers").getElementsByTagName("p")[x - 1];
var answer = document.createElement("p");
answer.innerHTML = answerElement.innerHTML;

//const answer = document.createElement("p");
assistantTypes(answer);


document.getElementsByClassName("scrollbox")[0].scroll = -10;



}  


function userTypes(elmt){
elmt.classList.add("bubble");
elmt.classList.add("user");
elmt.classList.add("inlineblock");

var rows = document.getElementById("QNA").getElementsByTagName("tr").length;
var row = document.getElementById("QNA").insertRow(rows);
var cell = row.insertCell(0);
cell.classList.add("right");
cell.appendChild(elmt);
}



function assistantTypes(elmt){



elmt.classList.add("bubble");
elmt.classList.add("assistant");
elmt.classList.add("inlineblock");


document.getElementById("typingBubble").style.visibility = 'visible';
document.getElementById("typingBubble").style.display = 'inline';






typingTimeout = setTimeout(() => {
document.getElementById("typingBubble").style.visibility = 'hidden';
document.getElementById("typingBubble").style.display = 'none';

//Create new row, and new celldata, and append answer.
var rows = document.getElementById("QNA").getElementsByTagName("tr").length;
var row = document.getElementById("QNA").insertRow(rows);
var cell = row.insertCell(0);
cell.appendChild(elmt);


var message = document.createElement("p");
message.classList.add("bubble");
message.classList.add("assistant");
message.classList.add("inlineblock");
if (firstTime == true){
firstTime = false;
}else {
message.innerText = "Is there anything else that I can help you with?"
cell.appendChild(message);

//display 'no thank you option'
document.getElementById("built-in-questions").getElementsByTagName("button")[2].style.visibility = 'visible';
document.getElementById("built-in-questions").getElementsByTagName("button")[2].style.display = 'block';
}
}, 2000); 




}
