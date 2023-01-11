function shellSort(razmaci) {
    disable();

    // Privremeni element
    {
        // Kreiranje šipke
        sipke_B_visina[0] = 0;
        sipke_B_div[0] = document.createElement("div");
        sipke_B_div[0].classList.add("sipka");
        sipkeKontejner.appendChild(sipke_B_div[0]);
        sipke_B_div[0].style.height = "0px";

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

    // Niz tabela potrebnih za vizuelizaciju
    let niz_tabela = [];

    // Niz za vrijednosti razmaka
    let matches = [];

    // Ako je niz razmaka prazan - obaviti obični Inserion Sort
    if (razmaci == '') {
        matches[0] = 1;
    }
    // U suprotnom - popuniti niz sa odgovarajućim vrijednostima
    else {
        matches = razmaci.match(/\d+/g);
    }

    // Kreiranje struktura svih potrebnih tabela
    for (let index = 0; index < matches.length; index++) {
        niz_tabela[index] = document.createElement("table");
        niz_tabela[index].classList.add("tabela-kontejner");
        pomocniKontejner.appendChild(niz_tabela[index]);
        let h = parseInt(matches[index], 10);
        // Posljednju tabelu predstaviti kao vektor zbog praktičnosti
        if (h == 1) {
            let _red = niz_tabela[index].insertRow();
            for (let j = 0; j < n; j++) {
                let celija = _red.insertCell();
                celija.classList.add("celija-kontejner");
            }
        }
        // U suprotnom - kreiraj tabelu sa odgovarajućim brojem redova i kolona
        else {
            for (let i = 0; i < Math.ceil(n / h); i++) {
                let _red = niz_tabela[index].insertRow();
                _red.classList.add("red-kontejner");
                for (let j = i * h; j < (i + 1) * h; j++) {
                    let celija = _red.insertCell();
                    celija.classList.add("celija-kontejner");
                }
            }
        }
    }

    for (let index = 0; index < matches.length; index++) {
        let h = parseInt(matches[index], 10);
        // Dodavanje elemenata u ćelije organizirane kao vektor
        if (h == 1) {
            let _red = niz_tabela[index].insertRow();
            for (let j = 0; j < n; j++) {
                animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[0].cells[j], dodajCelijuBoja, 50);
                animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[0].cells[j], resetirajBoja, 50);
            }
        }
        // Dodavanje elemenata u ćelije organizirane kao tabela
        else {
            for (let i = 0; i < Math.ceil(n / h); i++) {
                let _red = niz_tabela[index].insertRow();
                _red.classList.add("red-kontejner");
                for (let j = i * h; j < (i + 1) * h; j++) {
                    if (j < n) {
                        animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[i].cells[j % h], dodajCelijuBoja, 50);
                        animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[i].cells[j % h], resetirajBoja, 50);
                    }
                }
            }
        }

        // Shell Sort
        for (let brojac = 0; brojac < h; brojac++) {
            for (let i = brojac + h; i < n; i = i + h) {
                let priv = sipke_visina[i];
                if (h == 1) animCell(iznosi[i], sipke_div[i], sipke_visina[i], niz_tabela[index].rows[0].cells[i], privremeniBoja);
                else animCell(iznosi[i], sipke_div[i], sipke_visina[i], niz_tabela[index].rows[Math.floor(i / h)].cells[i % h], privremeniBoja);
                sipke_B_visina[0] = sipke_visina[i];
                anim(iznosi_B[0], sipke_B_div[0], sipke_B_visina[0], privremeniBoja);
                let j = i - h;
                while (j >= 0) {
                    if (h == 1) animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[0].cells[j], iteracijaBoja);
                    else animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[Math.floor(j / h)].cells[j % h], iteracijaBoja);
                    if (sipke_visina[j] <= priv) {
                        if (h == 1) animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[0].cells[j], resetirajBoja);
                        else animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[Math.floor(j / h)].cells[j % h], resetirajBoja);
                        break;
                    }
                    sipke_visina[j + h] = sipke_visina[j];
                    if (h == 1) animCell(iznosi[j + h], sipke_div[j + h], sipke_visina[j + h], niz_tabela[index].rows[0].cells[j + h], helperBoja);
                    else animCell(iznosi[j + h], sipke_div[j + h], sipke_visina[j + h], niz_tabela[index].rows[Math.floor((j + h) / h)].cells[(j + h) % h], helperBoja);
                    j = j - h;
                }
                sipke_visina[j + h] = priv;
                if (i != j + h) {
                    if (h == 1) animCell(iznosi[j + h], sipke_div[j + h], sipke_visina[j + h], niz_tabela[index].rows[0].cells[j + h], privremeniBoja);
                    else animCell(iznosi[j + h], sipke_div[j + h], sipke_visina[j + h], niz_tabela[index].rows[Math.floor((j + h) / h)].cells[(j + h) % h], privremeniBoja);
                } else {
                    if (h == 1) animCell(iznosi[j + h], sipke_div[j + h], sipke_visina[j + h], niz_tabela[index].rows[0].cells[j + h], resetirajBoja);
                    else animCell(iznosi[j + h], sipke_div[j + h], sipke_visina[j + h], niz_tabela[index].rows[Math.floor((j + h) / h)].cells[(j + h) % h], resetirajBoja);
                }
                sipke_B_visina[0] = 0;
                anim(iznosi_B[0], sipke_B_div[0], sipke_B_visina[0], resetirajBoja);
                for (let k = (j > 0) ? j : j + h; k <= i; k = k + h) {
                    if (h == 1) animCell(iznosi[k], sipke_div[k], sipke_visina[k], niz_tabela[index].rows[0].cells[k], resetirajBoja, 100);
                    else animCell(iznosi[k], sipke_div[k], sipke_visina[k], niz_tabela[index].rows[Math.floor(k / h)].cells[k % h], resetirajBoja, 100);
                }
            }
        }
    }
}
