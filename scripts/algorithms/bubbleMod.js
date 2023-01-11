function bubbleSortModificirani() {
    disable();

    let sortirajDo = n;
    let sortirajOd = n - 1;
    // Bubble Sort Modificirani
    do {
        let i = sortirajDo - 1;
        sortirajDo = 0;
        for (let j = 1; j <= i; j++) {
            anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja);
            anim(iznosi[j - 1], sipke_div[j - 1], sipke_visina[j - 1], iteracijaBoja);
            if (sipke_visina[j - 1] > sipke_visina[j]) {
                [sipke_visina[j - 1], sipke_visina[j]] = [sipke_visina[j], sipke_visina[j - 1]];
                anim(iznosi[j], sipke_div[j], sipke_visina[j], zamijeniBoja);
                anim(iznosi[j - 1], sipke_div[j - 1], sipke_visina[j - 1], zamijeniBoja);
                sortirajDo = j;
            }
            anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja);
            anim(iznosi[j - 1], sipke_div[j - 1], sipke_visina[j - 1], resetirajBoja);
            for (let h = 0; h < sortirajDo; h++) {
                anim(iznosi[h], sipke_div[h], sipke_visina[h], resetirajBoja, 10);
            }
            if (sortirajDo != 0) anim(iznosi[sortirajDo], sipke_div[sortirajDo], sipke_visina[sortirajDo], zadnjiPromijenjeniBoja);
        }
        for (let k = sortirajOd; k >= sortirajDo; k--) {
            anim(iznosi[k], sipke_div[k], sipke_visina[k], sortiranBoja);
        }
        sortirajOd = sortirajDo - 1;
    } while (sortirajDo != 0);
}