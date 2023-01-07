function insertionSort() {
    disable();
    for (let i = 1; i < n; i++) {
        let priv = sipke_visina[i];
        anim(iznosi[i], sipke_div[i], sipke_visina[i], privremeniBoja);
        let j = i - 1;
        while (j >= 0) {
            anim(iznosi[j], sipke_div[j], sipke_visina[j], iteracijaBoja);
            if (sipke_visina[j] <= priv) {
                anim(iznosi[j], sipke_div[j], sipke_visina[j], resetirajBoja);
                break;
            }
            sipke_visina[j + 1] = sipke_visina[j];
            anim(iznosi[j + 1], sipke_div[j + 1], sipke_visina[j + 1], helperBoja);
            j = j - 1;
        }
        sipke_visina[j + 1] = priv;
        if (i != j + 1) {
            anim(iznosi[j + 1], sipke_div[j + 1], sipke_visina[j + 1], privremeniBoja);
        } else {
            anim(iznosi[j + 1], sipke_div[j + 1], sipke_visina[j + 1], resetirajBoja);
        }
        for (let k = Math.max(0, j); k <= i; k++) {
            anim(iznosi[k], sipke_div[k], sipke_visina[k], resetirajBoja, 100);
        }
    }
}