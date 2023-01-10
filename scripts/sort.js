let sortBtn = document.getElementById("sortBtn");

sortBtn.addEventListener("click", () => {
    // Validacija Address Sort
    if (trenutniAlgoritam == "Address Sort") {
        // Validiraj funkciju
        let funkcija = document.getElementById("funkcijaInput").value;
        if (funkcija == "") {
            prikaziAlert("Niste unijeli izraz!");
            return;
        }

        // Funkcija mora biti validna za sve ulaze
        try {
            sipke_visina.forEach(function (item) {
                eval(funkcija.toString().replace(/x/g, "(" + item + ")"));
            })
        }
        catch {
            prikaziAlert("Uneseno polje nije izraz koji se može evaluirati!");
            return;
        }
        if (!sipke_visina.every(function (item) {
            return Number.isFinite(eval(funkcija.toString().replace(/x/g, "(" + item + ")")));
        })) {
            prikaziAlert("Postoje članovi niza nad kojima primjena date funkcije nije definisana!");
            return;
        }

        if (window.innerWidth <= 1600) {
            if (n > 15) document.documentElement.style.setProperty("--width", "14px");
            else document.documentElement.style.setProperty("--width", "20px");
        }
        else {
            if (n > 15) document.documentElement.style.setProperty("--width", "22px");
        }

        // Dijeljenje Sorting sekcije na dvije podsekcije
        document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocniKontejner")[0].style.position = "relative";
        if (isMobileDevice()) {
            document.getElementsByClassName("sipkeCon")[0].style.width = "100%";
            document.getElementsByClassName("pomocniKontejner")[0].style.width = "100%";
        }
        else {
            document.getElementsByClassName("sipkeCon")[0].style.width = "50%";
            document.getElementsByClassName("pomocniKontejner")[0].style.width = "50%";
        }
    }
    // Validacija Shell Sort
    else if (trenutniAlgoritam == "Shell Sort") {
        // Validacija niza razmaka
        var razmaciValidacija = document.getElementById('razmaciInput').value;
        var razmaciRegex = /^[0-9]+(,[0-9]+)*$/;
        if (!razmaciRegex.test(razmaciValidacija) && razmaciValidacija != '') {
            prikaziAlert("Unesite opcije u validnom obliku!");
            return;
        }
    }
    else if (trenutniAlgoritam == "Counting Sort") {
        if (window.innerWidth <= 1600) document.documentElement.style.setProperty("--width", "20px");

        // Dijeljenje Sorting sekcije na tri podsekcije
        document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocniKontejner")[0].style.position = "relative";
        document.getElementsByClassName("sipkeCon3")[0].style.visibility = "visible";
        document.getElementsByClassName("sipkeCon3")[0].style.position = "relative";
        if (isMobileDevice()) {
            document.getElementsByClassName("sipkeCon")[0].style.width = "100%";
            document.getElementsByClassName("pomocniKontejner")[0].style.width = "100%";
            document.getElementsByClassName("sipkeCon3")[0].style.width = "100%";
        }
        else {
            document.getElementsByClassName("sipkeCon")[0].style.width = "calc(100% / 3)";
            document.getElementsByClassName("pomocniKontejner")[0].style.width = "calc(100% / 3)";
            document.getElementsByClassName("sipkeCon3")[0].style.width = "calc(100% / 3)";
        }
    }
    else if (trenutniAlgoritam == "Radix Sort") {
        if (window.innerWidth <= 1600) {
            if (n > 15) document.documentElement.style.setProperty("--width", "14px");
            else document.documentElement.style.setProperty("--width", "20px");
        }
        else {
            if (n > 15) document.documentElement.style.setProperty("--width", "22px");
        }

        // Dijeljenje Sorting sekcije na dvije podsekcije
        document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocniKontejner")[0].style.position = "relative";
        if (isMobileDevice()) {
            document.getElementsByClassName("sipkeCon")[0].style.width = "100%";
            document.getElementsByClassName("pomocniKontejner")[0].style.width = "100%";
        }
        else {
            document.getElementsByClassName("sipkeCon")[0].style.width = "50%";
            document.getElementsByClassName("pomocniKontejner")[0].style.width = "50%";
        }
    }
    else if (trenutniAlgoritam == "Heap Sort" || trenutniAlgoritam == "Merge Sort") {
        // Dijeljenje Sorting sekcije na dvije podsekcije, jedna ispod druge
        document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocniKontejner")[0].style.position = "relative";
        document.getElementsByClassName("sipkeCon")[0].style.width = "100%";
        document.getElementsByClassName("pomocniKontejner")[0].style.width = "100%";
    }
    else if (trenutniAlgoritam == "Insertion Sort" || trenutniAlgoritam == "Insertion Sort Modificirani") {
        if (n > 15 && window.innerWidth <= 1200) document.documentElement.style.setProperty("--width", "20px");
    }

    // Zastava da je sortiranje u toku
    sortiranjeUToku = 1;

    // Sakrivanje sekcije Opcije
    document.getElementsByClassName("opcije")[0].style.visibility = "hidden"
    document.getElementsByClassName("opcije")[0].style.position = "absolute"

    // Proširenje Sorting sekcije na cijeli ekran
    fullWidthSection("sortiranje");

    // Popuniti Input sa vrijednostima zadnjeg validnog unosa
    var upisiUInputPolje = new String("")
    for (let i = 0; i < n; i++) {
        upisiUInputPolje += sipke_visina[i];
        if (i != n - 1) upisiUInputPolje += ',';
    }
    document.getElementById('nizInput').value = upisiUInputPolje;

    // Odabir algoritma za sortiranje
    switch (trenutniAlgoritam) {
        case "Address Sort":
            let funkcija = document.getElementById("funkcijaInput").value;
            addressSort(funkcija);
            break;
        case "Bubble Sort":
            bubbleSort();
            break;
        case "Bubble Sort Modificirani":
            bubbleSortModificirani();
            break;
        case "Selection Sort":
            selectionSort();
            break;
        case "Insertion Sort":
            insertionSort();
            break;
        case "Insertion Sort Modificirani":
            insertionSortModificirani();
            break;
        case "Merge Sort":
            mergeSort(0, n - 1);
            break;
        case "Heap Sort":
            heapSort();
            break;
        case "Quick Sort":
            quickSort(0, n - 1);
            break;
        case "Shell Sort":
            let razmaci = document.getElementById("razmaciInput").value;
            shellSort(razmaci);
            break;
        case "Counting Sort":
            countingSort();
            break;
        case "Radix Sort":
            radixSort();
            break;
        default:
            bubbleSort();
    }

    // Niz A nije sortiran kod Counting Sort-a
    if (trenutniAlgoritam != 'Counting Sort') {
        for (let i = n - 1; i >= 0; i--) {
            anim(iznosi[i], sipke_div[i], sipke_visina[i], sortiranBoja, 100)
        }
    }
    c = 0;
});
