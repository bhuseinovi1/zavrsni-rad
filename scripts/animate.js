// Obični anim
const anim = (iznos, sipka, visina, boja, factorAnim = factorAnimVrijednost) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina
    }, (c += delay - factorAnim));
};

// Animate za Heap Sort
const animateHeap = (kontejnerHeap, iznos, sipka, visina, boja, factorAnim = factorAnimVrijednost) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina
        kontejnerHeap.style.backgroundColor = boja

        kontejnerHeap.innerHTML = visina;

        if (boja == sortiranBoja) {
            kontejnerHeap.style.visibility = "hidden"
            kontejnerHeap.style.position = "absolute"
        }
    }, (c += delay - factorAnim));
};

// Animate za Address Sort
const animateAddress = (elementiListe, elementListe, kontejner_kljuc, iznos, sipka, visina, boja, factorAnim = factorAnimVrijednost) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina
        kontejner_kljuc.style.backgroundColor = boja
        elementListe.innerHTML = visina
        elementiListe.appendChild(elementListe)
        elementListe.style.backgroundColor = boja;
    }, (c += delay - factorAnim));
};

const animateAddressRemove = (elementiListe, kontejner_kljuc, boja, factorAnim = factorAnimVrijednost) => {
    setTimeout(() => {
        elementiListe.innerHTML = '';
        kontejner_kljuc.style.backgroundColor = boja;
    }, (c += delay - factorAnim));
};



// Animate za Merge Sort
const animateMerge = (zaSortirati, kontejnerMerge, iznos, sipka, visina, boja, factorAnim = factorAnimVrijednost) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina
        kontejnerMerge.style.backgroundColor = boja
        if (Boolean(zaSortirati)) {
            let matches = kontejnerMerge.innerHTML.toString().match(/\d+/g);
            kontejnerMerge.innerHTML = ""
            matches.sort(function (a, b) { return a - b });
            for (let i = 0; i < matches.length; i++) {
                if (i != matches.length - 1) kontejnerMerge.innerHTML += matches[i] + ","
                else kontejnerMerge.innerHTML += matches[i]
            }
        }
    }, (c += delay - factorAnim));
};

const animateMergeSplit = (kontejnerMerge, sipka1, sipka2, boja, factorAnim = factorAnimVrijednost) => {
    setTimeout(() => {
        sipka1.style.backgroundColor = boja;
        sipka2.style.backgroundColor = boja;
        kontejnerMerge.style.backgroundColor = boja
    }, (c += delay - factorAnim));
};
