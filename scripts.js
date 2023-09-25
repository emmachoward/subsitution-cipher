let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
let randomizedAlphabet = alphabet.map(value =>({value, sort: Math.random()})).sort((a, b) => a.sort - b.sort).map(({value}) => value);

//matches the alphabet with the radomizedAlphabet to form a key for the message
let key = []
for (let i in alphabet) {
    key[i] = alphabet[i] + " = " + randomizedAlphabet[i];
}

//gets the message from the form when submitted
$("form").submit(function(event){
    event.preventDefault();

    let userInput = $("#userInput").val();
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

    //writes to the page only after the form is submitted
    //https://www.w3schools.com/jquery/jquery_dom_set.asp
    $("#output").html(message.join("") + "<br /><br />" + encodedMessage.join("").toUpperCase() + "<br /><br />" + key.join("<br />"))
        .slideDown(); //Slide Down Not Working!
};


//https://www.w3schools.com/jquery/jquery_hide_show.asp
$("#helpButton").click(function(){
    $("#help").fadeToggle();
  }); 
