var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

const colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
let grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ';'

let recognition = new SpeechRecognition();
let speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// handlers
let recording = false;
let diagnostic = document.querySelector('.output');
let bg = document.querySelector('html');
let hints = document.querySelector('.hints');

let colorHTML = '';
colors.forEach( (v,i,a) => {
    console.log(v,i);
    colorHTML += '<span style="background-color:' + v + ';"> ' + v + '</span>';
})
hints.innerHTML = 'Tap/click then say a color to change the background color. Try ' + colorHTML + '.';

document.body.onclick = function(){
    if(recording === false){
        recording = true;        
        recognition.start();
        console.log('Give me colors, yo:');
    }
    else{
        recording = false;        
        recognition.stop();
        console.log('enough of that');
    }
}

recognition.onresult = function(event){
    let last = event.results.length - 1;
    let color = event.results[last][0].transcript;
    diagnostic.textContent = 'Result received: ' + color + '.';
    bg.style.backgroundColor = color;
    console.log(' diagnostic.textContent: ',  diagnostic.textContent)
    console.log('bg.style.backgroundColor: ', bg.style.backgroundColor)
    console.log('Confidence: ' + event.results[0][0].confidence);
}
// recognition.onspeechend = function(){
//     recognition.stop();
// }
recognition.onnomatch = function(){
    console.log('I didn\'t recognise that color.');
    diagnostic.textContent = 'I didn\'t recognise that color.';
}

recognition.onerror = function(event){
    console.log('Error occured in recognition: ' + event.error)
    diagnostic.textContent = 'Error occured in recognition: ' + event.error;
}