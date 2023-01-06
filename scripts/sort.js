
// Sortiraj dugme
let sortBtn = document.getElementById("sortBtn");

//Sorting Button
sortBtn.addEventListener("click", () => {
    // Validacija Address Sort
    if (trenutniAlgoritam == "Address Sort") {
        // Validiraj funkciju
        let funkcija = document.getElementById("funkcijaInput").value;
        if (funkcija == "") {
            prikaziAlert("Niste unijeli izraz!")
            return;
        }
        // Funkcija mora biti validna za sve ulaze
        let fija = funkcija.toString()
        try {
            sipke_visina.forEach(function (item) {
                eval(fija.replace(/x/g, "(" + item + ")"))
            })
        }
        catch {
            prikaziAlert("Uneseno polje nije izraz koji se može evaluirati!")
            return;
        }
        if (!sipke_visina.every(function (item) {
            return Number.isFinite(eval(fija.replace(/x/g, "(" + item + ")")))
        })) {
            prikaziAlert("Postoje članovi niza nad kojima primjena date funkcije nije definisana!")
            return;
        }
        // Dijeljenje Sorting sekcije na dvije podsekcije
        document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocniKontejner")[0].style.position = "relative";
        document.getElementsByClassName("sipkeCon")[0].style.width = "50%";
        document.getElementsByClassName("pomocniKontejner")[0].style.width = "50%";
    }
    else if (trenutniAlgoritam == "Shell Sort") {
        // Validacija niza razmaka
        var razmakValidacija = document.getElementById('razmakInput').value
        var razmakRegex = /^[0-9]+(,[0-9]+)*$/
        if (!razmakRegex.test(razmakValidacija) && razmakValidacija != '') {
            prikaziAlert("Unesite opcije u validnom obliku!")
            return
        }
    }
    else if (trenutniAlgoritam == "Counting Sort") {
        if (window.innerWidth <= 1600) document.documentElement.style.setProperty("--width", "20px");
        //document.documentElement.style.setProperty("--width", "20px");
        // Dijeljenje Sorting sekcije na tri podsekcije
        document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocniKontejner")[0].style.position = "relative";
        document.getElementsByClassName("sipkeCon3")[0].style.visibility = "visible";
        document.getElementsByClassName("sipkeCon3")[0].style.position = "relative";
        document.getElementsByClassName("sipkeCon")[0].style.width = "33%";
        document.getElementsByClassName("pomocniKontejner")[0].style.width = "33%";
        document.getElementsByClassName("sipkeCon3")[0].style.width = "33%";
    }
    else if (trenutniAlgoritam == "Radix Sort") {
        // Dijeljenje Sorting sekcije na dvije podsekcije
        document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocniKontejner")[0].style.position = "relative";
        document.getElementsByClassName("sipkeCon")[0].style.width = "50%";
        document.getElementsByClassName("pomocniKontejner")[0].style.width = "50%";
    }
    else if (trenutniAlgoritam == "Heap Sort" || trenutniAlgoritam == "Merge Sort") {
        // Dijeljenje Sorting sekcije na dvije podsekcije, jedna ispod druge
        document.getElementsByClassName("pomocniKontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocniKontejner")[0].style.position = "relative";
        document.getElementsByClassName("sipkeCon")[0].style.width = "100%";
        document.getElementsByClassName("pomocniKontejner")[0].style.width = "100%";
        /*
        document.querySelectorAll(".bar").forEach(function (element) {
          element.style.marginTop = "0px";
        });
        */
    }
    sortiranjeUToku = 1;
    // Sakrivanje sekcije za opcije metode sortiranja, veličine niza...
    document.getElementsByClassName("opcije")[0].style.visibility = "hidden"
    document.getElementsByClassName("opcije")[0].style.position = "absolute"
    // Proširenje sorting sekcije na cijeli ekran
    document.getElementsByClassName("sortiranje")[0].classList.add("col-12");
    document.getElementsByClassName("sortiranje")[0].style.borderRight = "none";
    document.getElementsByClassName("sortiranje")[0].style.borderLeft = "none";
    document.getElementsByClassName("sortiranje")[0].style.borderRadius = "0px"
    document.getElementsByClassName("sortiranje")[0].style.visibility = "visible";
    document.getElementsByClassName("sortiranje")[0].style.position = "relative";


    // Popuniti Input sa vrijednostima iz barsHeight
    var preklopiSadrzaj = new String("")
    for (let i = 0; i < n; i++) {
        preklopiSadrzaj += sipke_visina[i]
        if (i != n - 1) preklopiSadrzaj += ','
    }
    document.getElementById('nizInput').value = preklopiSadrzaj;

    // Postavi Sorting sekciju na sredinu
    document.getElementsByClassName("sortiranje")[0].classList.remove("me-5")

    // Odabir algoritma
    switch (trenutniAlgoritam) {
        case "Address Sort":
            let funkcija = document.getElementById("funkcijaInput").value;
            addressSort(funkcija);
            break;
        case "Bubble Sort":
            bubbleSort();
            break;
        case "Bubble Sort Modified":
            bubbleSortModificirani();
            break;
        case "Selection Sort":
            selectionSort();
            break;
        case "Insertion Sort":
            insertionSort();
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
            let razmakString = document.getElementById("razmakInput").value;
            shellSort(razmakString);
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

    if (trenutniAlgoritam != 'Counting Sort') { // Niz A nije sortiran kod Counting Sorta
        for (let i = n - 1; i >= 0; i--) {
            anim(iznosi[i], sipke_div[i], sipke_visina[i], sortiranBoja, 100)
        }
    }
    c = 0;
});
