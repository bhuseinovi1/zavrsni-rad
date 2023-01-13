function shellSort(razmaci) {
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

    // Niz tabela potrebnih za vizuelizaciju
    let niz_tabela = [];

    // Kreiranje struktura svih potrebnih tabela
    for (let index = 0; index < razmaci.length; index++) {
        niz_tabela[index] = document.createElement("table");
        niz_tabela[index].classList.add("tabela-kontejner");
        pomocniKontejner.appendChild(niz_tabela[index]);

        let razmak = parseInt(razmaci[index], 10);

        // Posljednju tabelu predstaviti kao vektor zbog praktičnosti
        if (razmak == 1) {
            let _red = niz_tabela[index].insertRow();
            for (let j = 0; j < n; j++) {
                let celija = _red.insertCell();
                celija.classList.add("celija-kontejner");
            }
        }
        // U suprotnom - kreirati tabelu sa odgovarajućim brojem redova i kolona
        else {
            for (let i = 0; i < Math.ceil(n / razmak); i++) {
                let _red = niz_tabela[index].insertRow();
                _red.classList.add("red-kontejner");
                for (let j = i * razmak; j < (i + 1) * razmak; j++) {
                    let celija = _red.insertCell();
                    celija.classList.add("celija-kontejner");
                }
            }
        }
    }

    for (let index = 0; index < razmaci.length; index++) {
        let razmak = parseInt(razmaci[index], 10);

        // Dodavanje elemenata u ćelije organizirane kao vektor
        if (razmak == 1) {
            let _red = niz_tabela[index].insertRow();
            for (let j = 0; j < n; j++) {
                animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[0].cells[j], dodajCelijuBoja, 50);
                animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[0].cells[j], resetirajBoja, 50);
            }
        }
        // Dodavanje elemenata u ćelije organizirane kao tabela
        else {
            for (let i = 0; i < Math.ceil(n / razmak); i++) {
                let _red = niz_tabela[index].insertRow();
                _red.classList.add("red-kontejner");
                for (let j = i * razmak; j < (i + 1) * razmak; j++) {
                    if (j < n) {
                        animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[i].cells[j % razmak], dodajCelijuBoja, 50);
                        animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[i].cells[j % razmak], resetirajBoja, 50);
                    }
                }
            }
        }

        // Shell Sort
        for (let brojac = 0; brojac < razmak; brojac++) {
            for (let i = brojac + razmak; i < n; i = i + razmak) {
                let priv = sipke_visina[i];
                if (razmak == 1) animCell(iznosi[i], sipke_div[i], sipke_visina[i], niz_tabela[index].rows[0].cells[i], privremeniBoja);
                else animCell(iznosi[i], sipke_div[i], sipke_visina[i], niz_tabela[index].rows[Math.floor(i / razmak)].cells[i % razmak], privremeniBoja);
                sipke_B_visina[0] = sipke_visina[i];
                anim(iznosi_B[0], sipke_B_div[0], sipke_B_visina[0], privremeniBoja, 100);
                let j = i - razmak;
                while (j >= 0) {
                    if (razmak == 1) animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[0].cells[j], iteracijaBoja);
                    else animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[Math.floor(j / razmak)].cells[j % razmak], iteracijaBoja);
                    if (sipke_visina[j] <= priv) {
                        if (razmak == 1) animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[0].cells[j], resetirajBoja);
                        else animCell(iznosi[j], sipke_div[j], sipke_visina[j], niz_tabela[index].rows[Math.floor(j / razmak)].cells[j % razmak], resetirajBoja);
                        break;
                    }
                    sipke_visina[j + razmak] = sipke_visina[j];
                    if (razmak == 1) animCell(iznosi[j + razmak], sipke_div[j + razmak], sipke_visina[j + razmak], niz_tabela[index].rows[0].cells[j + razmak], helperBoja);
                    else animCell(iznosi[j + razmak], sipke_div[j + razmak], sipke_visina[j + razmak], niz_tabela[index].rows[Math.floor((j + razmak) / razmak)].cells[(j + razmak) % razmak], helperBoja);
                    j = j - razmak;
                }
                sipke_visina[j + razmak] = priv;
                if (i != j + razmak) {
                    if (razmak == 1) animCell(iznosi[j + razmak], sipke_div[j + razmak], sipke_visina[j + razmak], niz_tabela[index].rows[0].cells[j + razmak], privremeniBoja);
                    else animCell(iznosi[j + razmak], sipke_div[j + razmak], sipke_visina[j + razmak], niz_tabela[index].rows[Math.floor((j + razmak) / razmak)].cells[(j + razmak) % razmak], privremeniBoja);
                } else {
                    if (razmak == 1) animCell(iznosi[j + razmak], sipke_div[j + razmak], sipke_visina[j + razmak], niz_tabela[index].rows[0].cells[j + razmak], resetirajBoja);
                    else animCell(iznosi[j + razmak], sipke_div[j + razmak], sipke_visina[j + razmak], niz_tabela[index].rows[Math.floor((j + razmak) / razmak)].cells[(j + razmak) % razmak], resetirajBoja);
                }
                sipke_B_visina[0] = 0;
                anim(iznosi_B[0], sipke_B_div[0], sipke_B_visina[0], resetirajBoja);
                for (let k = (j > 0) ? j : j + razmak; k <= i; k = k + razmak) {
                    if (razmak == 1) animCell(iznosi[k], sipke_div[k], sipke_visina[k], niz_tabela[index].rows[0].cells[k], resetirajBoja, 100);
                    else animCell(iznosi[k], sipke_div[k], sipke_visina[k], niz_tabela[index].rows[Math.floor(k / razmak)].cells[k % razmak], resetirajBoja, 100);
                }
            }
        }
    }
}
