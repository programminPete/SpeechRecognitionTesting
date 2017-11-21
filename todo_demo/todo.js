var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
// future growth - buttons should be callback function in other module

// var todo = document.querySelector('.todo');
// var result = document.querySelector('.result');
var diagnosticMsg = document.querySelector('.output');


var wakeWord = "master mind" | "mastermind";
var grammar = '#JSGF V1.0; grammar phrase; public <wakeWord> = ' + wakeWord + ';';
// *  - note at bottom
// voice command add variable
var addTodo = document.querySelector('#add-todo');

// button add variable
const input = document.querySelector('#input')
const submit = document.querySelector('#submit');
// const delTodo = document.querySelector('#del-todo');                 -- delete todo future growth

let todos = [];
let counter = 0;

// ADD TO DO LIST ITEM on regular click event

submit.addEventListener('click', event => {
    // grab text in input
    let currentTodo = document.getElementById('input').value;
    if(currentTodo){
    // create new list item to put the text in
    let node = document.createElement('li')
    todos[counter] = document.createTextNode(currentTodo)
    node.className = 'todo-item';
    node.setAttribute("id", counter)
    node.appendChild(todos[counter])
    document.getElementById('list-section').appendChild(node)
    counter++;
    console.log('todo length: ', todos.length);    
    }
})

// // DELETE TO DO LIST ITEM on regular click event                  -- delete todo future growth
// need to add an index parameter first before you can delete
// delTodo.addEventListener('click', event => {
//     // grab text in input
//     let currentTodo = document.getElementById('input').value;
//     if(currentTodo){
//     // create new list item to put the text in
//     let node = document.createElement('li')
//     todos[counter] = document.createTextNode(currentTodo)
//     node.className = 'todo-item';
//     node.setAttribute("id", counter)
//     node.appendChild(todos[counter])
//     document.getElementById('list-section').appendChild(node)
//     counter++;
//     console.log('todo length: ', todos.length);    
//     }
// })

// if wake word, stop, then start again and just record everything.

function addNewTodo(){
    // var time0 = Date.now(); growth --> if time > 10 seconds, stop recording..
    addTodo.disabled = true;
    addTodo.textContent = "Listening...";
    diagnosticMsg = '...';

    let recognition = new SpeechRecognition();
    let speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);    
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
//    recognition.continuous = false;

    recognition.start();
    

    recognition.addEventListener('result', function(event){
    // recognition.onresult = function(event){     
        let speechResult = event.results[0][0].transcript;
        diagnosticMsg.textContent = "I heard: " + speechResult + ".";
        console.log(speechResult);

        // log a new paragraph
        let p = document.createElement('p');
        const words = document.querySelector('#paragraph-col');
        words.appendChild(p);

        console.log('speechResult: ', speechResult)
        p.textContent = speechResult;
        p = document.createElement('p');
        words.appendChild(p);
        
        // end logging paragraph
        // IF 'TASK' IS in speech result - we will put a new to do list item 
        if(speechResult.indexOf('task') !== -1){
            let taskIndex = speechResult.indexOf('task');
            let element = speechResult.slice(taskIndex+4).trim()
            console.log('remaining: ', speechResult.slice(taskIndex+4).trim());
            console.log('speechResult after: ', element)

            // attempting to add new todo item by SPEECH
            let currentTodo = element;
            if(currentTodo){
            // create new list item to put the text in
            let node = document.createElement('li')
            todos[counter] = document.createTextNode(currentTodo)
            node.className = 'todo-item';
            node.setAttribute("id", counter)
            node.appendChild(todos[counter])
            document.getElementById('list-section').appendChild(node)
            counter++;
            console.log('todo length: ', todos.length);
            }
        }
            //todoList.push(speechResult.slice(x, x));
            //if "add" - push; if "delete" - pop()
        if(speechResult.indexOf('delete') !== -1){
            let deleteIndex = speechResult.indexOf('delete');
            let delElement = speechResult.slice(taskIndex+6).trim()
            console.log('delElement: ', delElement);
        }
            //"mastermind, add the task wash my car and assign date to thursday"
        
        console.log('Confidence: ' + event.results[0][0].confidence);   
    });
    recognition.addEventListener('end', recognition.start);
    // recognition.onspeechend = function() {
        // recognition.stop();
        // addTodo.disabled = false;   
        // addTodo.textContent = 'push to start listening';
    // }

    // recognition.onerror = function(event){
    //     addTodo.disabled = false;
    //     addTodo.textContent = 'push to start listening';
    //     console.log('error message: ', event.error);
    //     diagnosticMsg.textContent = 'Error occurred in recognition: ' + event.error;
    // }
}

addTodo.addEventListener('click', addNewTodo);

addTodo.addEventListener('click', function(){
    addTodo.disabled = false;
});





// *
// var helloArray = ['hey', 'hi', 'hello', 'what up', 'whats up', 'what\'s up', 'yo'];
// var wakeWord = helloArray + "MJ";
// if(wakeWord){
  

// }
// wake word should be future growth 
// - let's just start with clicking a button
// i think it would work like this though...
// 1) recognitionWake = new instance of Speech...blah blah/
// 2) if recognitionWake sees wakeWord - it invokes a function add to do.
// 3) addToDo stops wake word invocation, and starts new invocation:
// 4) recognitionParseTodo
// 5) afte recognitionParseTodo is finished, it stops and restarts the recognitionWake word.
// let speechRecognitionWakeWord = new SpeechGrammarList();
// let recognition2 = new SpeechRecognition();