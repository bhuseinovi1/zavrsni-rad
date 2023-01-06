// Counting sort
function countingSort() {
    disable()

    let K = Math.max(...sipke_visina)

    for (let i = 0; i < n; i++) { // NIZ B
        sipke_B_visina[i] = 0;
        sipke_B_div[i] = document.createElement("div");
        sipke_B_div[i].classList.add("sipka");

        // Ako ima vise od 15 elemenata, napravi razmak
        if (n > 15) sipke_B_div[i].style.marginLeft = "15px"

        sipkeKontejnerB.appendChild(sipke_B_div[i]);
        sipke_B_div[i].style.height = sipke_B_visina[i] + "px";

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
    var fiktivni1 = document.createElement("div")
    fiktivni1.classList.add("sipka")
    fiktivni1.style.height = "500px"
    fiktivni1.style.visibility = "hidden"
    sipkeKontejnerB.appendChild(fiktivni1)


    for (let i = 0; i <= K; i++) { // NIZ C
        sipke_C_visina[i] = 0;
        sipke_C_div[i] = document.createElement("div");
        sipke_C_div[i].classList.add("sipka");

        // Ako ima vise od 15 elemenata, napravi razmak
        if (n > 15) sipke_C_div[i].style.marginLeft = "15px"

        sipkeKontejnerC.appendChild(sipke_C_div[i]);
        sipke_C_div[i].style.height = sipke_C_visina[i] + "px";

        iznosi_C[i] = document.createElement("p");
        iznosi_C[i].classList.add("iznosi");
        iznosi_C[i].innerHTML = sipke_C_visina[i];
        sipke_C_div[i].appendChild(iznosi_C[i]);

        // indeksi elemenata
        indeksi_C[i] = document.createElement("p");
        indeksi_C[i].classList.add("indeksi")
        indeksi_C[i].innerHTML = i;
        sipke_C_div[i].appendChild(indeksi_C[i]);
    }
    // Fiktivni element visine 500px
    var fiktivni2 = document.createElement("div")
    fiktivni2.classList.add("sipka")
    fiktivni2.style.height = "500px"
    fiktivni2.style.visibility = "hidden"
    sipkeKontejnerC.appendChild(fiktivni2)
    //let K = parseInt(k,10)

    for (let j = 0; j < n; j++) {
        anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja)

        sipke_C_visina[sipke_visina[j]] = sipke_C_visina[sipke_visina[j]] + 1
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], iteracijaBoja)
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], resetirajBoja)

        anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja)
    }

    for (let i = 1; i <= K; i++) {
        anim(iznosi_C[i], sipke_C_div[i], sipke_C_visina[i], iteracijaBoja)
        anim(iznosi_C[i - 1], sipke_C_div[i - 1], sipke_C_visina[i - 1], privremeniBoja)
        sipke_C_visina[i] = sipke_C_visina[i] + sipke_C_visina[i - 1]
        anim(iznosi_C[i], sipke_C_div[i], sipke_C_visina[i], iteracijaBoja)
        anim(iznosi_C[i - 1], sipke_C_div[i - 1], sipke_C_visina[i - 1], resetirajBoja)
        anim(iznosi_C[i], sipke_C_div[i], sipke_C_visina[i], resetirajBoja)
    }

    for (let j = n - 1; j >= 0; j--) {
        anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja)
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], iteracijaBoja)
        sipke_C_visina[sipke_visina[j]] = sipke_C_visina[sipke_visina[j]] - 1
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], privremeniBoja)

        sipke_B_visina[sipke_C_visina[sipke_visina[j]]] = sipke_visina[j]
        anim(iznosi_B[sipke_C_visina[sipke_visina[j]]], sipke_B_div[sipke_C_visina[sipke_visina[j]]], sipke_B_visina[sipke_C_visina[sipke_visina[j]]], sortiranBoja)
        anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja)
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], resetirajBoja)
    }
}