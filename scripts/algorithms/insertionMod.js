function insertionSortModificirani() {
    // Privremeni element
    {
        // Kreiranje šipke
        sipke_B_visina[0] = 0;
        sipke_B_div[0] = document.createElement("div");
        sipke_B_div[0].classList.add("sipka");
        sipke_B_div[0].style.height = "0px";
        sipkeKontejner.appendChild(sipke_B_div[0]);

        // Vrijednost elementa
        iznosi_B[0] = document.createElement("p");
        iznosi_B[0].classList.add("iznosi");
        iznosi_B[0].innerHTML = 0;
        sipke_B_div[0].appendChild(iznosi_B[0]);

        // Indeks elementa
        indeksi_B[0] = document.createElement("p");
        indeksi_B[0].classList.add("indeksi");
        indeksi_B[0].innerHTML = 'priv';
        sipke_B_div[0].appendChild(indeksi_B[0]);
    }

    // Insertion Sort Modificirani
    for (let i = 1; i < n; i++) {
        let priv = sipke_visina[i];
        anim(iznosi[i], sipke_div[i], sipke_visina[i], privremeniBoja);
        sipke_B_visina[0] = sipke_visina[i];
        anim(iznosi_B[0], sipke_B_div[0], sipke_B_visina[0], privremeniBoja);
        let j = i - 1;
        let l = 0;
        let r = j;
        let privL = l;
        let mid;
        // Binarna pretraga
        while (r >= l) {
            mid = l + Math.floor((r - l) / 2);
            anim(iznosi[mid], sipke_div[mid], sipke_visina[mid], iteracijaBoja);
            if (sipke_visina[mid] > priv) {
                if (mid - 1 < privL) {
                    j = -1;
                    break;
                }
                else if (sipke_visina[mid - 1] <= priv) {
                    j = mid - 1;
                    break;
                }
                else {
                    anim(iznosi[mid], sipke_div[mid], sipke_visina[mid], resetirajBoja);
                    r = mid - 1;
                }
            }
            else {
                anim(iznosi[mid], sipke_div[mid], sipke_visina[mid], resetirajBoja);
                l = mid + 1;
            }
        }
        for (let k = i; k > j + 1; k--) {
            sipke_visina[k] = sipke_visina[k - 1];
            anim(iznosi[k], sipke_div[k], sipke_visina[k], helperBoja);
        }
        sipke_visina[j + 1] = priv;
        if (i != j + 1) {
            anim(iznosi[j + 1], sipke_div[j + 1], sipke_visina[j + 1], privremeniBoja);
        } else {
            anim(iznosi[j + 1], sipke_div[j + 1], sipke_visina[j + 1], resetirajBoja);
        }
        sipke_B_visina[0] = 0;
        anim(iznosi_B[0], sipke_B_div[0], sipke_B_visina[0], resetirajBoja);
        for (let k = Math.max(0, j); k <= i; k++) {
            anim(iznosi[k], sipke_div[k], sipke_visina[k], resetirajBoja, 100);
        }
    }
}