class Cvor {
    constructor(vrijednost) {
        this.vrijednost = vrijednost;
        this.sljedeci = null;
    }
}

class JPLista {
    constructor() {
        this.pocetak = null;
        this.kraj = null;
        this.sortiran = null;
        this.duzina = 0;
    }
    insertionSort(pocref) {
        if (this.duzina === 0 || this.duzina === 1) {
            return;
        }
        this.sortiran = null;
        var trenutni = pocref;
        while (trenutni != null) {
            var sljedeci = trenutni.sljedeci;
            this.sortedInsert(trenutni);
            trenutni = sljedeci;
        }
        this.pocetak = this.sortiran;
        this.sortiran = null;
        var naKraj = this.pocetak;
        while (naKraj.sljedeci) {
            naKraj = naKraj.sljedeci;
        }
        this.kraj = naKraj;
        this.kraj.sljedeci = null;
    }
    sortedInsert(noviCvor) {
        if (this.sortiran == null || this.sortiran.vrijednost > noviCvor.vrijednost) {
            noviCvor.sljedeci = this.sortiran;
            this.sortiran = noviCvor;
        }
        else {
            var trenutni = this.sortiran;
            while (trenutni.sljedeci != null && trenutni.sljedeci.vrijednost < noviCvor.vrijednost) {
                trenutni = trenutni.sljedeci;
            }
            noviCvor.sljedeci = trenutni.sljedeci;
            trenutni.sljedeci = noviCvor;
        }
    }
    push(vrijednost) {
        const noviCvor = new Cvor(vrijednost);
        if (!this.pocetak) {
            this.pocetak = noviCvor;
            this.kraj = noviCvor;
        }
        else {
            this.kraj.sljedeci = noviCvor;
            this.kraj = noviCvor;
        }
        this.duzina++;
        return this;
    }
    pop() {
        if (!this.pocetak) return null;
        if (this.duzina === 1) {
            this.pocetak = null;
            this.kraj = null;
            this.duzina = 0;
            return null;
        }
        let trenutni = this.pocetak;
        let noviKraj = null;
        while (trenutni) {
            if (trenutni.sljedeci) {
                noviKraj = trenutni;
            }
            trenutni = trenutni.sljedeci;
        }
        const obrisan = this.kraj;
        this.kraj = noviKraj;
        this.kraj.sljedeci = null;
        this.length--;
        return obrisan;
    }
    shift() {
        if (!this.pocetak) return null;
        if (this.duzina === 1) {
            const trenutniPocetak = this.pocetak;
            this.pocetak = null;
            this.kraj = null;
            this.duzina = 0;
            return trenutniPocetak;
        }
        const trenutniPocetak = this.pocetak;
        const noviPocetak = trenutniPocetak.sljedeci;
        this.pocetak = noviPocetak;
        this.duzina--;
        return trenutniPocetak;
    }
    unshift(vrijednost) {
        const noviCvor = new Cvor(vrijednost)
        if (this.duzina === 0) {
            this.pocetak = noviCvor;
            this.kraj = noviCvor;
            this.duzina = 1;
            return noviCvor;
        }
        const trenutniPocetak = this.pocetak;
        const noviPocetak = noviCvor;
        this.pocetak = noviPocetak;
        noviPocetak.sljedeci = trenutniPocetak;
        this.duzina++;
        return noviPocetak;
    }
    get(index) {
        if (index < 0 || index >= this.duzina) return null;
        let pom = this.pocetak;
        for (let i = 0; i < index; i++) {
            pom = pom.sljedeci;
        }
        return pom;
    }
    set(index, vrijednost) {
        const pom = this.get(index);
        if (pom) {
            pom.vrijednost = vrijednost;
            return true;
        }
        return false;
    }
    insert(index, vrijednost) {
        if (index < 0 || index >= this.duzina) return false;

        if (index === this.duzina) {
            this.push(vrijednost);
            return true;
        }
        if (index === 0) {
            this.unshift(vrijednost);
            return true;
        }

        const noviCvor = new Cvor(vrijednost);
        const prethodni = this.get(index - 1);
        const trenutni = prethodni.sljedeci;
        prethodni.sljedeci = noviCvor;
        noviCvor.sljedeci = trenutni;
        this.duzina++;
        return true;
    }
    remove(index) {
        if (index < 0 || index >= this.duzina) return false;

        if (index === this.duzina - 1) {
            this.pop();
            return true;
        }
        if (index === 0) {
            this.shift();
            return true;
        }
        const prethodni = this.get(index - 1);
        const sljedeci = prethodni.sljedeci.sljedeci;
        prethodni.sljedeci = sljedeci;
        this.duzina--;
        return true;
    }
    size() {
        return this.duzina;
    }
}