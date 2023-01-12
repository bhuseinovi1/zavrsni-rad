// Obični animate
const anim = (iznos, sipka, visina, boja, kasnjenje = kasnjenjeAnimacije) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina;
        iznos.style.color = boja;
        iznos.style.borderColor = boja;
    }, (pocetakAnimacije += kasnjenje));
};

// Animate za Shell Sort
const animCell = (iznos, sipka, visina, celija, boja, kasnjenje = kasnjenjeAnimacije) => {
    setTimeout(() => {
        celija.innerHTML = '';
        celija.appendChild(document.createTextNode(visina));
        celija.style.backgroundColor = boja;
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina;
        iznos.style.color = boja;
        iznos.style.borderColor = boja;
    }, (pocetakAnimacije += kasnjenje));
};

// Animate za Heap Sort
const animateHeap = (kontejnerHeap, iznos, sipka, visina, boja, kasnjenje = kasnjenjeAnimacije) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina;
        iznos.style.color = boja;
        iznos.style.borderColor = boja;
        kontejnerHeap.style.backgroundColor = boja;
        kontejnerHeap.innerHTML = visina;

        if (boja == sortiranBoja) {
            kontejnerHeap.style.visibility = "hidden";
            kontejnerHeap.style.position = "absolute";
        }
    }, (pocetakAnimacije += kasnjenje));
};

// Animate za Address Sort
const animateAddress = (elementiListe, elementListe, kontejner_kljuc, iznos, sipka, visina, linije, boja, kasnjenje = kasnjenjeAnimacije) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina;
        iznos.style.color = boja;
        iznos.style.borderColor = boja;
        kontejner_kljuc.style.backgroundColor = boja;

        if (boja != resetirajBoja) {
            elementListe.innerHTML = visina;
            let children = elementiListe.querySelectorAll("*");
            if (children.length == 0) {
                elementListe.style.backgroundColor = boja;
            }
            else {
                let flag = 0;
                for (let i = 0; i < children.length; i++) {
                    if (Number(children[i].innerHTML) > Number(elementListe.innerHTML)) {
                        let sadrzaj = children[i].innerHTML;
                        children[i].innerHTML = elementListe.innerHTML;
                        elementListe.innerHTML = sadrzaj;
                        if (flag == 0) children[i].style.backgroundColor = boja;
                        flag = 1;
                    }
                }
                if (flag == 0) elementListe.style.backgroundColor = boja;
                else elementListe.style.backgroundColor = resetirajBoja;
            }
            elementiListe.appendChild(elementListe);
            try {
                if (elementListe.previousElementSibling != null && elementListe != null) {
                    let line = new LeaderLine(
                        LeaderLine.pointAnchor(elementListe.previousSibling, { x: 60, y: 18 }),
                        elementListe,
                        { startPlug: 'square', color: 'red', size: 3 }
                    );
                    linije.push(line)
                }
            }
            catch {
                console.log("Linija nije uspješno unesena");
            }
        }
        else {
            let children = elementiListe.querySelectorAll("*");
            children.forEach(function (child) {
                child.style.backgroundColor = boja;
            });
        }
    }, (pocetakAnimacije += kasnjenje));
};

const animateAddressRemove = (elementiListe, kontejner_kljuc, linije, boja, kasnjenje = kasnjenjeAnimacije) => {
    setTimeout(() => {
        elementiListe.innerHTML = '';
        kontejner_kljuc.style.backgroundColor = boja;
        try {
            for (let k = 0; k < linije.length; k++) {
                linije[k].remove();
            }
        }
        catch {
            console.log("Linija nije uspješno obrisana");
        }
    }, (pocetakAnimacije += kasnjenje));
};

// Animate za Merge Sort
const animateMerge = (zaSortirati, kontejnerMerge, iznos, sipka, visina, boja, kasnjenje = kasnjenjeAnimacije) => {
    setTimeout(() => {
        sipka.style.height = visina * faktorSkaliranja + "px";
        sipka.style.backgroundColor = boja;
        iznos.innerHTML = visina;
        iznos.style.color = boja;
        iznos.style.borderColor = boja;
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
    }, (pocetakAnimacije += kasnjenje));
};

const animateMergeSplit = (kontejnerMerge, iznos1, iznos2, sipka1, sipka2, boja, kasnjenje = kasnjenjeAnimacije) => {
    setTimeout(() => {
        sipka1.style.backgroundColor = boja;
        sipka2.style.backgroundColor = boja;
        iznos1.style.color = boja;
        iznos1.style.borderColor = boja;
        iznos2.style.color = boja;
        iznos2.style.borderColor = boja;
        kontejnerMerge.style.backgroundColor = boja;
    }, (pocetakAnimacije += kasnjenje));
};
