let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array 
let randomizedAlphabet = alphabet.map(value =>({value, sort: Math.random()})).sort((a, b) => a.sort - b.sort).map(({value}) => value);

//matches the alphabet with the radomizedAlphabet to form a key for the message
let key = []
for (let i in alphabet) {
    key[i] = alphabet[i] + " = " + randomizedAlphabet[i].toUpperCase();
}

//gets the message from the form when submitted
$("form").submit(function(event){
    event.preventDefault();

    if ($("#jokecheck:checked").val() === "telljoke") {
        let jokeInput = getjoke()
        .then(joke => encodeMessage(joke.joke.split(""))) 
        .catch(error => {console.log("error: ") + error});
        console.log(jokeInput);
    } else {
        let userInput = $("#userInput").val();
        message = userInput.split("");
        encodeMessage(message);
    }
    
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

    //loading animation
    $(".loading").slideDown(400).animate({left: '-=100px'})
    .animate({left: '+=200px'})
    .animate({left: '-=100px'})
    .slideUp(400, function () {

        //writes to the page only after the form is submitted
        $("#output").html(message.join("") + "<br /><br />" + encodedMessage.join("").toUpperCase() + "<br /><br />" + key.join("<br />"))
        .slideDown(400);
    });
};

//https://www.w3schools.com/jquery/jquery_hide_show.asp
$("#helpButton").click(function(){
    $("#help").fadeToggle();
});

//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
async function getjoke() {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
            "User-Agent": "My Website: (https://ciphering.app/) My Contact: (https://emmachoward.com/)"
        },
    });
    const jokeJSON = await response.json();
    //console.log(jokeJSON);
    return(jokeJSON);
}

//Disables form input if joke is checked
function updateCheckbox(){
    if ($("#jokecheck").is(":checked")){
        $("#userInput").prop("disabled", true);
    } else {
        $("#userInput").prop("disabled", false);
    }
}

$("#jokecheck").click(function(){
    updateCheckbox();
})

//updated every page load
updateCheckbox();
