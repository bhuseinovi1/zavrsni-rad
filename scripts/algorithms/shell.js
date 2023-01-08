function shellSort(razmaci) {
    disable();

    let matches = [];
    // Ako se proslijedilo prazno polje pretpostavlja se da niz razmaka ima jedan element - 1, tako da se vrši običan Insertion Sort
    if (razmaci == '') {
        matches[0] = 1;
    }
    else {
        matches = razmaci.match(/\d+/g);
    }

    for (let index = 0; index < matches.length; index++) {
        let h = parseInt(matches[index], 10);
        for (let brojac = 0; brojac < h; brojac++) {
            for (let i = brojac + h; i < n; i = i + h) {
                let priv = sipke_visina[i];
                anim(iznosi[i], sipke_div[i], sipke_visina[i], privremeniBoja);
                let j = i - h;
                while (j >= 0) {
                    anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja);
                    if (sipke_visina[j] <= priv) {
                        anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja);
                        break;
                    }
                    sipke_visina[j + h] = sipke_visina[j];
                    anim(iznosi[j + h], sipke_div[j + h], sipke_visina[j + h], helperBoja);
                    j = j - h;
                }
                sipke_visina[j + h] = priv;
                if (i != j + h) {
                    anim(iznosi[j + h], sipke_div[j + h], sipke_visina[j + h], privremeniBoja);
                } else {
                    anim(iznosi[j + h], sipke_div[j + h], sipke_visina[j + h], resetirajBoja);
                }
                for (let k = (j > 0) ? j : j + h; k <= i; k = k + h) {
                    anim(iznosi[k], sipke_div[k], sipke_visina[k], resetirajBoja, 100);
                }
            }
        }
    }
}
