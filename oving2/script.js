let myButton = document.querySelector("#submit-button");

myButton.addEventListener("click", event => {
    getValue();
});


function changeColor(value) {
    if (value == 0) {
        document.body.style.backgroundColor = "red";
    } else if (value == 1) {
        document.body.style.backgroundColor = "red";
    } else if (value == 2) {
        document.body.style.backgroundColor = "yellow";
    } else if (value == 3) {
        document.body.style.backgroundColor = "lightgreen";
    } else if (value == 4) {
        document.body.style.backgroundColor = "green";
    }
}

function getValue() {
    let myInput = document.getElementById('input').value;
    
    let url = "http://bigdata.stud.iie.ntnu.no/sentiment/webresources/sentiment/log?api-key=Happy!!!";
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({ sentence: myInput })
    })
    .then(response => response.json())
    .then(json => changeColor(json.value))
    .catch(error => console.error("Error: ", error));
    console.log(value);
}
