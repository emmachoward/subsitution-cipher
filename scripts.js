let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let randomizedAlphabet = alphabet.map(value =>({value, sort: Math.random()})).sort((a, b) => a.sort - b.sort).map(({value}) => value);
//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 

let key = []
for (let i in alphabet) {
    key[i] = alphabet[i] + " = " + randomizedAlphabet[i];
}

let defaultMessage = "Default Message...";
let message =  defaultMessage;

let form = document.querySelector("form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let userInput = form.elements["userInput"].value;
    message = userInput.split("");
    encodeMessage(message);
});

function encodeMessage (message) {
    console.log(message);
    let encodedMessage = [];
    for (let character in message) {
        let letterIndex = alphabet.indexOf(message[character].toLowerCase());
        if (letterIndex !== -1) {
            encodedMessage.push(randomizedAlphabet[letterIndex]);
        } else {
            encodedMessage.push(message[character]);
        };
    };
    console.log(encodedMessage.join("").toUpperCase());

    document.getElementById("output").innerHTML = key.join("<br />") + "<br /><br />" + message.join("") + "<br /><br />" + encodedMessage.join("").toUpperCase();;
    //return 
   
};




//console.log(key.join("\n"),"\n", input, "\n", encodedMessage.join("").toUpperCase());
