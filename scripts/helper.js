// Vraća random broj u intervalu [min,max]
function randomBroj(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}