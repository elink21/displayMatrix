$(document).ready(function () {
    $("input.counter").characterCounter();
});

$(document).ready(function () {
    $('select').formSelect();
});


//Scrolling effect

let original = "Much more";
let forShowing = "";
let characterLimit = 14;
let step = 0;
let previewText = document.querySelector("#previewText");
let cleaning = false;
let speed = + (document.querySelector("#speedSelect").value);
let reminder;


function writingFunction() {
    if (!cleaning) {
        forShowing = "";
        for (let i = 0; i < (characterLimit - step); i++) {
            forShowing += "&nbsp;"
        }
        forShowing += original.slice(0, step);
        previewText.innerHTML = forShowing;
        if (step >= characterLimit) {
            forShowing = original.slice(step - characterLimit, step);
            previewText.innerHTML = forShowing;
        }
        step += 1;
        if (step > original.length) {
            step = 0;
            cleaning = true;
            original.length > characterLimit ? reminder = forShowing : reminder = original;
        }
    }
    else {
        forShowing = "";
        forShowing += reminder.slice(step,);

        previewText.innerHTML = forShowing;
        step += 1;
        if (forShowing === "") {
            cleaning = false;
            step = 0;
        }
    }


}

let interval = setInterval(writingFunction, speed);

function updateInterval() {
    original = document.querySelector(".counter").value;
    forShowing = "";

    step = 0;
    previewText = document.querySelector("#previewText");
    cleaning = false;
    speed = + (document.querySelector("#speedSelect").value);

    clearInterval(interval);
    interval = setInterval(writingFunction, speed)
}


function sendData(reset) {
    let text = "";
    let speed = + (document.querySelector("#speedSelect").value);

    reset === 1 ? text = document.querySelector(".counter").value : text = "";
    //Disabling buttons
    let buttonA = document.querySelector('#upload');
    let buttonB = document.querySelector('#reset');
    //By adding disabled class
    buttonA.classList.add("disabled");
    buttonB.classList.add("disabled");

    $.ajax(
        {
            url: "sendData",
            data: {
                text: text,
                speed: speed,
            },
            success: function (data) {
                console.table(data);
                buttonA.classList.remove("disabled");
                buttonB.classList.remove("disabled");
                M.toast({ html: 'Mensaje configurado ✅' })
            }
        });
}