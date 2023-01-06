// Selektivno sortiranje 
function selectionSort() {
    disable();
    for (let i = 0; i < n - 1; i++) {
        anim(iznosi[i], sipke_div[i], sipke_visina[i], pivotBoja); // element sa kojim se poredi
        let min = sipke_visina[i];
        let pmin = i;

        for (let j = i + 1; j < n; j++) {
            anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja); // elementi u nizu

            if (sipke_visina[j] < min) {
                if (pmin != i) {
                    anim(iznosi[pmin], sipke_div[pmin], sipke_visina[pmin], resetirajBoja, 100); // resetiranje prethodno nadjenog najmanjeg elementa
                }
                min = sipke_visina[j];
                pmin = j;
                anim(iznosi[pmin], sipke_div[pmin], sipke_visina[pmin], privremeniBoja); // oznavacanje najmanjeg
            } else {
                anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja, 100); // resetiranje ako broj nije manji od trenutno najmanjeg
            }
        }

        if (i != pmin) {
            [sipke_visina[i], sipke_visina[pmin]] = [sipke_visina[pmin], sipke_visina[i]];
            anim(iznosi[pmin], sipke_div[pmin], sipke_visina[pmin], zamijeniBoja);
            anim(iznosi[i], sipke_div[i], sipke_visina[i], zamijeniBoja);
        }

        anim(iznosi[pmin], sipke_div[pmin], sipke_visina[pmin], resetirajBoja, 100);
        anim(iznosi[i], sipke_div[i], sipke_visina[i], sortiranBoja);
    }
    anim(iznosi[n - 1], sipke_div[n - 1], sipke_visina[n - 1], sortiranBoja);
}