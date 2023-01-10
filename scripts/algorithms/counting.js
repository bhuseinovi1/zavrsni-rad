function countingSort() {
    disable();

    // Najveći element niza
    let K = Math.max(...sipke_visina);

    // Kreiranje pomoćnog niza B
    for (let i = 0; i < n; i++) {
        // Kreiranje šipki
        sipke_B_visina[i] = 0;
        sipke_B_div[i] = document.createElement("div");
        sipke_B_div[i].classList.add("sipka");
        sipke_B_div[i].style.height = "0px";
        if (n > 15) sipke_B_div[i].style.marginLeft = "14px";
        sipkeKontejnerB.appendChild(sipke_B_div[i]);

        // Vrijednosti elemenata
        iznosi_B[i] = document.createElement("p");
        iznosi_B[i].classList.add("iznosi");
        iznosi_B[i].innerHTML = sipke_B_visina[i];
        sipke_B_div[i].appendChild(iznosi_B[i]);

        // Indeksi elemenata
        indeksi_B[i] = document.createElement("p");
        indeksi_B[i].classList.add("indeksi");
        indeksi_B[i].innerHTML = i;
        sipke_B_div[i].appendChild(indeksi_B[i]);
    }
    // Fiktivni element visine 500px
    var fiktivni1 = document.createElement("div");
    fiktivni1.classList.add("sipka");
    fiktivni1.style.height = "500px";
    fiktivni1.style.visibility = "hidden";
    sipkeKontejnerB.appendChild(fiktivni1);

    // Kreiranje pomoćnog niza C
    for (let i = 0; i <= K; i++) {
        // Kreiranje šipki
        sipke_C_visina[i] = 0;
        sipke_C_div[i] = document.createElement("div");
        sipke_C_div[i].classList.add("sipka");
        sipke_C_div[i].style.height = "0px";
        if (n > 15) sipke_C_div[i].style.marginLeft = "14px";
        sipkeKontejnerC.appendChild(sipke_C_div[i]);

        // Vrijednosti elemenata
        iznosi_C[i] = document.createElement("p");
        iznosi_C[i].classList.add("iznosi");
        iznosi_C[i].innerHTML = sipke_C_visina[i];
        sipke_C_div[i].appendChild(iznosi_C[i]);

        // Indeksi elemenata
        indeksi_C[i] = document.createElement("p");
        indeksi_C[i].classList.add("indeksi");
        indeksi_C[i].innerHTML = i;
        sipke_C_div[i].appendChild(indeksi_C[i]);
    }
    // Fiktivni element visine 500px
    var fiktivni2 = document.createElement("div");
    fiktivni2.classList.add("sipka");
    fiktivni2.style.height = "500px";
    fiktivni2.style.visibility = "hidden";
    sipkeKontejnerC.appendChild(fiktivni2);

    // Prva faza algoritma - za svako X iz niza A, povećati vrijednost na indeksu X niza C
    for (let j = 0; j < n; j++) {
        anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja);
        sipke_C_visina[sipke_visina[j]] = sipke_C_visina[sipke_visina[j]] + 1;
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], helperBoja);
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], resetirajBoja);
        anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja);
    }

    // Druga faza algoritma - svaki element niza C je jednak zbiru samog sebe sa prethodnim elementom
    for (let i = 1; i <= K; i++) {
        anim(iznosi_C[i], sipke_C_div[i], sipke_C_visina[i], iteracijaBoja);
        anim(iznosi_C[i - 1], sipke_C_div[i - 1], sipke_C_visina[i - 1], privremeniBoja);
        sipke_C_visina[i] = sipke_C_visina[i] + sipke_C_visina[i - 1];
        anim(iznosi_C[i], sipke_C_div[i], sipke_C_visina[i], helperBoja);
        anim(iznosi_C[i - 1], sipke_C_div[i - 1], sipke_C_visina[i - 1], resetirajBoja);
        anim(iznosi_C[i], sipke_C_div[i], sipke_C_visina[i], resetirajBoja);
    }

    // Treća faza - svako X iz niza A smjesti na odgovarajući indeks niza B koji se određuje tako što se uzima vrijednost iz niza C koja odgovara elementu X umanjena za 1
    for (let j = n - 1; j >= 0; j--) {
        anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja);
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], privremeniBoja)
        sipke_C_visina[sipke_visina[j]] = sipke_C_visina[sipke_visina[j]] - 1;
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], helperBoja);
        sipke_B_visina[sipke_C_visina[sipke_visina[j]]] = sipke_visina[j];
        anim(iznosi_B[sipke_C_visina[sipke_visina[j]]], sipke_B_div[sipke_C_visina[sipke_visina[j]]], sipke_B_visina[sipke_C_visina[sipke_visina[j]]], sortiranBoja);
        anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja);
        anim(iznosi_C[sipke_visina[j]], sipke_C_div[sipke_visina[j]], sipke_C_visina[sipke_visina[j]], resetirajBoja);
    }
}