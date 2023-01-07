// Radix sort 
function radixSort() {
    disable()

    for (let i = 0; i < n; i++) { // NIZ B
        sipke_B_visina[i] = 0;
        sipke_B_div[i] = document.createElement("div");
        sipke_B_div[i].classList.add("sipka");

        // Ako ima vise od 15 elemenata, napravi razmak
        if (n > 15) sipke_B_div[i].style.marginLeft = "15px"

        sipkeKontejnerB.appendChild(sipke_B_div[i]);
        sipke_B_div[i].style.height = sipke_B_visina[i] + "px"; // dodati neki faktor za height

        iznosi_B[i] = document.createElement("p");
        iznosi_B[i].classList.add("iznosi");
        iznosi_B[i].innerHTML = sipke_B_visina[i];
        sipke_B_div[i].appendChild(iznosi_B[i]);

        // indeksi elemenata
        indeksi_B[i] = document.createElement("p");
        indeksi_B[i].classList.add("indeksi")
        indeksi_B[i].innerHTML = i;
        sipke_B_div[i].appendChild(indeksi_B[i]);
    }

    // Fiktivni element visine 500px
    var fiktivni = document.createElement("div")
    fiktivni.classList.add("sipka")
    fiktivni.style.height = "500px"
    fiktivni.style.visibility = "hidden"
    sipkeKontejnerB.appendChild(fiktivni)

    let najveciBroj = Math.max(...sipke_visina)
    let brojCifara = najveciBroj.toString().length

    let index = 0
    for (let k = 0; k < brojCifara; k++) {
        for (let znamenka = 0; znamenka <= 9; znamenka++) {
            for (let i = 0; i < n; i++) {
                anim(iznosi[i], sipke_div[i], sipke_visina[i], iteracijaBoja)
                let broj = Math.floor(sipke_visina[i] / Math.pow(10, k))
                if (broj % 10 == znamenka) {
                    anim(iznosi[i], sipke_div[i], sipke_visina[i], privremeniBoja)
                    sipke_B_visina[index] = sipke_visina[i]
                    anim(iznosi_B[index], sipke_B_div[index], sipke_B_visina[index], privremeniBoja)
                    index = index + 1
                }
                anim(iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja)
                if (index == n) break;
            }
            // Prekid ako je vec popunjen pomocni niz
            if (index == n) break;
        }
        for (let i = 0; i < n; i++) {
            sipke_visina[i] = sipke_B_visina[i]
            anim(iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja, 100)
        }
        for (let i = 0; i < n; i++) {
            sipke_B_visina[i] = 0
            anim(iznosi_B[i], sipke_B_div[i], sipke_B_visina[i], resetirajBoja, 100)
        }
        index = 0;
    }
}