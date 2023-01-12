let sortBtn = document.getElementById("sortBtn");

sortBtn.addEventListener('click', () => {
    // Validacija Address Sort
    if (trenutniAlgoritam == "Address Sort") {
        // Validacije funkcije
        let funkcija = document.getElementById("funkcijaInput").value;
        if (funkcija == "") {
            prikaziAlert("Niste unijeli izraz!");
            return;
        }
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

        // Dijeljenje 'Sorting' sekcije na dvije podsekcije
        document.getElementsByClassName("pomocni-kontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocni-kontejner")[0].style.position = "relative";
        if (isMobileDevice()) {
            document.getElementsByClassName("sipke-kontejner")[0].style.width = "100%";
            document.getElementsByClassName("pomocni-kontejner")[0].style.width = "100%";
        }
        else {
            document.getElementsByClassName("sipke-kontejner")[0].style.width = "50%";
            document.getElementsByClassName("pomocni-kontejner")[0].style.width = "50%";
        }
    }
    // Validacija Shell Sort i Radix Sort
    else if (trenutniAlgoritam == "Shell Sort" || trenutniAlgoritam == "Radix Sort") {
        // Validacija niza razmaka
        if (trenutniAlgoritam == "Shell Sort") {
            var razmaciValidacija = document.getElementById("razmaciInput").value;
            var razmaciRegex = /^[0-9]+(,[0-9]+)*$/;
            if (!razmaciRegex.test(razmaciValidacija) && razmaciValidacija != "") {
                prikaziAlert("Unesite opcije u validnom obliku!");
                return;
            }
        }

        if (window.innerWidth <= 1600) {
            if (n > 15) document.documentElement.style.setProperty("--width", "14px");
            else document.documentElement.style.setProperty("--width", "20px");
        }
        else {
            if (n > 15) {
                if (trenutniAlgoritam == "Shell Sort") document.documentElement.style.setProperty("--width", "20px");
                document.documentElement.style.setProperty("--width", "22px");
            }
        }

        document.getElementsByClassName("pomocni-kontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocni-kontejner")[0].style.position = "relative";

        if (isMobileDevice()) {
            document.getElementsByClassName("sipke-kontejner")[0].style.width = "100%";
            document.getElementsByClassName("pomocni-kontejner")[0].style.width = "100%";
        }
        else {
            document.getElementsByClassName("sipke-kontejner")[0].style.width = "50%";
            document.getElementsByClassName("pomocni-kontejner")[0].style.width = "50%";
        }
    }
    else if (trenutniAlgoritam == "Counting Sort") {
        if (window.innerWidth <= 1600) document.documentElement.style.setProperty("--width", "18px");

        // Dijeljenje 'Sorting' sekcije na tri podsekcije
        document.getElementsByClassName("pomocni-kontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocni-kontejner")[0].style.position = "relative";
        document.getElementsByClassName("counting-kontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("counting-kontejner")[0].style.position = "relative";
        if (isMobileDevice()) {
            document.getElementsByClassName("sipke-kontejner")[0].style.width = "100%";
            document.getElementsByClassName("pomocni-kontejner")[0].style.width = "100%";
            document.getElementsByClassName("counting-kontejner")[0].style.width = "100%";
        }
        else {
            document.getElementsByClassName("sipke-kontejner")[0].style.width = "calc(100% / 3)";
            document.getElementsByClassName("pomocni-kontejner")[0].style.width = "calc(100% / 3)";
            document.getElementsByClassName("counting-kontejner")[0].style.width = "calc(100% / 3)";
        }
    }
    else if (trenutniAlgoritam == "Heap Sort" || trenutniAlgoritam == "Merge Sort") {
        document.getElementsByClassName("pomocni-kontejner")[0].style.visibility = "visible";
        document.getElementsByClassName("pomocni-kontejner")[0].style.position = "relative";
        document.getElementsByClassName("sipke-kontejner")[0].style.width = "100%";
        document.getElementsByClassName("pomocni-kontejner")[0].style.width = "100%";
    }
    else if (trenutniAlgoritam == "Insertion Sort" || trenutniAlgoritam == "Insertion Sort Modificirani") {
        if (n > 15 && window.innerWidth <= 1200) document.documentElement.style.setProperty("--width", "20px");
    }

    // Signal da je sortiranje u toku
    sortiranjeUToku = 1;

    // Sakrivanje sekcije 'Opcije'
    document.getElementsByClassName("opcije")[0].style.visibility = "hidden";
    document.getElementsByClassName("opcije")[0].style.position = "absolute";

    // Proširenje 'Sorting' sekcije na širinu pretraživača
    fullWidthSection("sortiranje");

    // Popuniti polje za unos niza sa vrijednostima zadnjeg validnog unosa
    var vrijednosti_visina = new String("")
    for (let i = 0; i < n; i++) {
        vrijednosti_visina += sipke_visina[i];
        if (i != n - 1) vrijednosti_visina += ",";
    }
    document.getElementById("nizInput").value = vrijednosti_visina;

    // Onemogućivanje slider-a, dugmadi i opcija
    {
        document.querySelector(".dropdown-toggle").classList.add("disabled");
        sortBtn.classList.add("disabled");
        stopBtn.classList.remove("disabled");
        brzinaSortiranja.setAttribute("disabled", "");
        velicinaNiza.setAttribute("disabled", "");
        faktorSkaliranjaRange.setAttribute("disabled", "");

        // Posebno za specifične algoritme
        document.getElementsByClassName("funkcija-div")[0].style.visibility = "hidden";
        document.getElementsByClassName("funkcija-div")[0].style.position = "absolute";

        document.getElementsByClassName("razmaci-div")[0].style.visibility = "hidden";
        document.getElementsByClassName("razmaci-div")[0].style.position = "absolute";

        document.getElementsByClassName("counting-div")[0].style.visibility = "hidden";
        document.getElementsByClassName("counting-div")[0].style.position = "absolute";
    }

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
    if (trenutniAlgoritam != "Counting Sort") {
        for (let i = n - 1; i >= 0; i--) {
            anim(iznosi[i], sipke_div[i], sipke_visina[i], sortiranBoja, 100);
        }
    }
    pocetakAnimacije = 0;
});
