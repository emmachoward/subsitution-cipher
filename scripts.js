let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
let randomizedAlphabet = alphabet.map(value =>({value, sort: Math.random()})).sort((a, b) => a.sort - b.sort).map(({value}) => value);

//matches the alphabet with the radomizedAlphabet to form a key for the message
let key = []
for (let i in alphabet) {
    key[i] = alphabet[i] + " = " + randomizedAlphabet[i];
}

//gets the message from the form when submitted
let form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();

    let userInput = form.elements["userInput"].value;
    message = userInput.split("");
    encodeMessage(message);
});

//encodes the message that came from the form
function encodeMessage (message) {
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

    //writes to the page only after the form is submitted
    document.getElementById("output").innerHTML = message.join("") + "<br /><br />" + encodedMessage.join("").toUpperCase() + "<br /><br />" + key.join("<br />"); 
};
