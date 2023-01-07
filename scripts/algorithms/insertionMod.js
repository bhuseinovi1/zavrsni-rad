// Sortiranje umetanjem - poboljšano
function insertionSortModificirani() {
    disable();

    
    for (let i = 1; i < n; i++) {
        let priv = sipke_visina[i];
        anim(iznosi[i], sipke_div[i], sipke_visina[i], privremeniBoja);
        let j = i - 1;
        let l = 0;
        let r = j;
        let privL = l;
        let privR = r;
        let mid;
        while(r>=l) {
            mid = l + Math.floor((r-l)/2);
            anim(iznosi[mid],sipke_div[mid],sipke_visina[mid],iteracijaBoja);
            if(sipke_visina[mid] == priv) {
                j=mid;
                // stavi priv na sipke_visina[mid+1]
                break;
            }
            else if(sipke_visina[mid] > priv) {
                if(mid-1 < privL) {
                    j = -1;
                    break;
                }
                else if(sipke_visina[mid-1] < priv) {
                    j=mid-1;
                    // stavi priv na sipke_visina[mid]
                    break;
                }
                else {
                    anim(iznosi[mid], sipke_div[mid], sipke_visina[mid], resetirajBoja);
                    r = mid-1;
                }
            }
            else {
                if(mid+1 > privR) {
                    j = mid;
                    break;
                }
                else if(sipke_visina[mid+1] > priv) {
                    j = mid;
                    // stavi priv na sipke_visina[mid+1]
                    break;
                }
                else {
                    anim(iznosi[mid], sipke_div[mid], sipke_visina[mid], resetirajBoja);
                    l=mid+1;
                }
            }
        }
        for(let k=i;k>j+1;k--) {
            sipke_visina[k] = sipke_visina[k-1];
            anim(iznosi[k], sipke_div[k], sipke_visina[k], helperBoja);
        }
        sipke_visina[j+1] = priv;

        if (i != j + 1) {
            anim(iznosi[j + 1], sipke_div[j + 1], sipke_visina[j + 1], privremeniBoja);
        } else {
            anim(iznosi[j + 1], sipke_div[j + 1], sipke_visina[j + 1], resetirajBoja);
        }
        for (let k = Math.max(0, j); k <= i; k++) {
            anim(iznosi[k], sipke_div[k], sipke_visina[k], resetirajBoja);
        }

       
    }
    
}