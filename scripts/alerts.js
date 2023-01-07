var prikaziAlert = function (poruka) {
    document.getElementsByClassName("alert")[1].style.display = "block"
    document.getElementById("alert").innerHTML = poruka
}

var ukloniAlert = function () {
    document.getElementsByClassName("alert")[1].style.display = "none";
}

var prikaziUpozorenje = function (poruka) {
    document.getElementsByClassName("alert")[0].style.display = "block"
    document.getElementById("warning").innerHTML = poruka
}

var ukloniUpozorenje = function () {
    document.getElementsByClassName("alert")[0].style.display = "none";
}
