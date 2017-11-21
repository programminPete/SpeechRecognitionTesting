var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent


// Grab component to Listen to:
var addTodo = document.querySelector('button');
var boolean = false;

let p = [];

function addParagraphs(){
    
    let recognition = new SpeechRecognition();
    recognition.interimresults = true;
    // var time0 = Date.now(); growth --> if time > 10 seconds, stop recording..
    // while(addTodo.disabled === false){
    console.log('here 0: ', recognition);
    console.log('boolean outside while: ', boolean);
    while(boolean === false){
        // addTodo.disabled = true;
        recognition.start();
        console.log('here 1: ', recognition)
        
        let p = document.createElement('p');
        const words = document.querySelector('.words');
        words.appendChild(p);


        recognition.addEventListener('result', (e) => {
            const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')
            p.textContent = transcript;
            if (e.results[0].isfinal){
                p = document.createElement('p');
                words.appendChild(p);
            }
        });
        recognition.onerror = function(event){
            addTodo.disabled = false;
            addTodo.textContent = 'push to start listening';
            console.log('error message: ', event.error);
            diagnosticMsg.textContent = 'Error occurred in recognition: ' + event.error;
        }

        recognition.addEventListener('end', recognition.start);
        addTodo.addEventListener('click', function(boolean){
            boolean=true;
        });
    }
}
console.log('here 3: ', recognition)

// if count 0 --> click starts listening, 
// if count 1 --> click stops listening;   alternating from there 
let count = 0;   
addTodo.addEventListener('click', function(e, boolean){
    count++;
    console.log('boolean 0: ', boolean)
    if(count === 1){
        boolean = false;
        addTodo.textContent = "Listening...";   
        diagnosticMsg = '...';        
        console.log('boolean 1: ', boolean)
        addParagraphs();
    } else{
        boolean = true;
        count = 0;
        addTodo.textContent = 'push to start listening';        
    }
});