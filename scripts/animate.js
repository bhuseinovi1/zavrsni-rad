// Obični anim
const anim = (iznos, sipka, visina, boja, factorAnim = delay) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina;
    }, (c += factorAnim));
};

// Animate za Heap Sort
const animateHeap = (kontejnerHeap, iznos, sipka, visina, boja, factorAnim = delay) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina;
        kontejnerHeap.style.backgroundColor = boja;
        kontejnerHeap.innerHTML = visina;

        if (boja == sortiranBoja) {
            kontejnerHeap.style.visibility = "hidden";
            kontejnerHeap.style.position = "absolute";
        }
    }, (c += factorAnim));
};

// Animate za Address Sort
const animateAddress = (elementiListe, elementListe, kontejner_kljuc, iznos, sipka, visina, boja, factorAnim = delay) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina;
        kontejner_kljuc.style.backgroundColor = boja;
        elementListe.innerHTML = visina;
        elementiListe.appendChild(elementListe);
        elementListe.style.backgroundColor = boja;
        //console.log(elementListe.previousSibling);
        if (elementListe.previousElementSibling != null) {
            let line = new LeaderLine(
                LeaderLine.pointAnchor(elementListe.previousSibling, { x: 60, y: 18}),
                elementListe,
                { startPlug: 'square', color: 'red', size: 3 }
            );
            linije[0].push(line)
        }
    }, (c += factorAnim));
};

const animateAddressRemove = (elementiListe, kontejner_kljuc, boja, factorAnim = delay) => {
    setTimeout(() => {
        elementiListe.innerHTML = '';
        kontejner_kljuc.style.backgroundColor = boja;
        for(let k = 0; k < linije[0].length; k++) {
            linije[0][k].hide();
        }
    }, (c += factorAnim));
};

// Animate za Merge Sort
const animateMerge = (zaSortirati, kontejnerMerge, iznos, sipka, visina, boja, factorAnim = delay) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina;
        kontejnerMerge.style.backgroundColor = boja;
        
        if (Boolean(zaSortirati)) {
            let matches = kontejnerMerge.innerHTML.toString().match(/\d+/g);
            kontejnerMerge.innerHTML = "";
            matches.sort(function (a, b) { return a - b });
            for (let i = 0; i < matches.length; i++) {
                if (i != matches.length - 1) kontejnerMerge.innerHTML += matches[i] + ",";
                else kontejnerMerge.innerHTML += matches[i];
            }
        }
    }, (c += factorAnim));
};

const animateMergeSplit = (kontejnerMerge, sipka1, sipka2, boja, factorAnim = delay) => {
    setTimeout(() => {
        sipka1.style.backgroundColor = boja;
        sipka2.style.backgroundColor = boja;
        kontejnerMerge.style.backgroundColor = boja;
    }, (c += factorAnim));
};
