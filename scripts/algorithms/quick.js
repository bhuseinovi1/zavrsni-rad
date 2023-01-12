function particija(prvi, zadnji) {
    let pivot = sipke_visina[prvi];
    anim(iznosi[prvi], sipke_div[prvi], sipke_visina[prvi], pivotBoja);
    let p = prvi + 1;
    while (p <= zadnji) {
        anim(iznosi[p], sipke_div[p], sipke_visina[p], iteracijaBoja);
        if (sipke_visina[p] >= pivot) break;
        anim(iznosi[p], sipke_div[p], sipke_visina[p], resetirajBoja);
        p = p + 1;
    }
    if (p <= zadnji) {
        anim(iznosi[p], sipke_div[p], sipke_visina[p], privremeniBoja);
    }
    for (let i = p + 1; i <= zadnji; i++) {
        anim(iznosi[i], sipke_div[i], sipke_visina[i], iteracijaBoja);
        if (sipke_visina[i] < pivot) {
            [sipke_visina[i], sipke_visina[p]] = [sipke_visina[p], sipke_visina[i]];
            anim(iznosi[p], sipke_div[p], sipke_visina[p], zamijeniBoja);
            anim(iznosi[i], sipke_div[i], sipke_visina[i], zamijeniBoja);
            anim(iznosi[p], sipke_div[p], sipke_visina[p], resetirajBoja);
            anim(iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja);
            p = p + 1;
            anim(iznosi[p], sipke_div[p], sipke_visina[p], privremeniBoja);
        }
        else {
            anim(iznosi[i], sipke_div[i], sipke_visina[i], resetirajBoja);
        }
    }
    if (p <= zadnji) {
        anim(iznosi[p], sipke_div[p], sipke_visina[p], resetirajBoja);
    }
    if (prvi != p - 1) {
        let store_h = sipke_visina[prvi];
        sipke_visina[prvi] = sipke_visina[p - 1];
        sipke_visina[p - 1] = store_h;
        anim(iznosi[p - 1], sipke_div[p - 1], sipke_visina[p - 1], zamijeniBoja);
        anim(iznosi[prvi], sipke_div[prvi], sipke_visina[prvi], zamijeniBoja);
        anim(iznosi[p - 1], sipke_div[p - 1], sipke_visina[p - 1], sortiranBoja);
        anim(iznosi[prvi], sipke_div[prvi], sipke_visina[prvi], resetirajBoja);
    }
    else {
        anim(iznosi[prvi], sipke_div[prvi], sipke_visina[prvi], sortiranBoja);
    }
    return p - 1;
}

function quickSortStart(prvi, zadnji) {
    if (prvi >= zadnji) {
        if (prvi == zadnji) {
            anim(iznosi[prvi], sipke_div[prvi], sipke_visina[prvi], sortiranBoja);
            return -1;
        }
        return -1;
    }
    let j = particija(prvi, zadnji);
    quickSortStart(prvi, j - 1);
    quickSortStart(j + 1, zadnji);
}

function quickSort(prvi, zadnji) {
    disable();
    quickSortStart(prvi, zadnji);
}