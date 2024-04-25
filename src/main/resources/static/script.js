$(document).ready(function (){
    hentAlleBilletter();
})

// Array for å lagre billettobjekter
let billetter = [];

// Event listener for å sjekke om brukeren har trykket på knappene
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("kjøpBillett").addEventListener("click", bestillBilletter);

});

function bestillBilletter(event) {
    event.preventDefault();

    let filmer = document.getElementById("filmer").value;
    let antall = document.getElementById("antall").value;
    let fornavn = document.getElementById("fornavn").value;
    let etternavn = document.getElementById("etternavn").value;
    let telefonnr = document.getElementById("telefonnr").value;
    let epost = document.getElementById("epost").value;

    if (!valider(filmer, antall, fornavn, etternavn, telefonnr, epost)) return;

    let billettData = {
        film: filmer,
        antall: parseInt(antall, 10),
        fornavn: fornavn,
        etternavn: etternavn,
        telefonnr: telefonnr,
        epost: epost
    };

    fetch('/lagre', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(billettData)
    })
        .then(response => {
            if (!response.ok) throw new Error('Noe gikk galt med lagring av billetten.');
            hentAlleBilletter();
        })
        .catch(error => {
            alert(error.message);
        });

    tømSkjema();
}

function valider(filmer, antall, fornavn, etternavn, telefonnr, epost) {
    let gyldig = true;
    gyldig &= validerFelt(filmer, "filmFeil", "Du må velge film");
    gyldig &= validerFelt(antall, "antallFeil", "Du må skrive noe inn i antall");
    gyldig &= validerFelt(fornavn, "fornavnFeil", "Du må skrive noe i fornavn");
    gyldig &= validerFelt(etternavn, "etternavnFeil", "Du må skrive noe i etternavn");
    gyldig &= validerTelefonnr(telefonnr, "telefonnrFeil", "Telefonnummeret er ikke gyldig");
    gyldig &= validerEpost(epost, "epostFeil", "Epostadressen er ikke gyldig");
    return gyldig;
}

function validerFelt(verdi, feilId, feilmelding) {
    if (!verdi.trim()) {
        document.getElementById(feilId).style.display = "block";
        document.getElementById(feilId).textContent = feilmelding;
        return false;
    } else {
        document.getElementById(feilId).style.display = "none";
        return true;
    }
}

function validerTelefonnr(telefonnr, feilId, feilmelding) {
    const telefonKrav = /^\d{8}$/;
    if (!telefonKrav.test(telefonnr)) {
        document.getElementById(feilId).style.display = "block";
        document.getElementById(feilId).textContent = feilmelding;
        return false;
    } else {
        document.getElementById(feilId).style.display = "none";
        return true;
    }
}

function validerEpost(epost, feilId, feilmelding) {
    const epostKrav = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!epostKrav.test(epost)) {
        document.getElementById(feilId).style.display = "block";
        document.getElementById(feilId).textContent = feilmelding;
        return false;
    } else {
        document.getElementById(feilId).style.display = "none";
        return true;
    }
}

function hentAlleBilletter() {
    fetch('/hentAlle')
        .then(response => response.json())
        .then(data => {
            billetter = data; // Oppdaterer den lokale billettlisten med data fra serveren
            visBilletter(data); // Kaller visBilletter med den oppdaterte listen
        })
        .catch(error => {
            console.error('Feil ved henting av billetter:', error);
        });
}

function visBilletter(billettListe) {
    let ut = "<table class='table table-striped'><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnr</th><th>Epost</th><th></th><th></th></tr>";
    billettListe.forEach(billett => {
        ut += `<tr>
          <td>${billett.film}</td>
          <td>${billett.antall}</td>
          <td>${billett.fornavn}</td>
          <td>${billett.etternavn}</td>
          <td>${billett.telefonnr}</td>
          <td>${billett.epost}</td>
          <td><a class='btn btn-primary' href='endre.html?id=${billett.id}'>Endre</a></td>
          <td><button class='btn btn-danger' onclick='slettEn(${billett.id})'>Slett</button></td>
      </tr>`;
    });
    ut += "</table>";
    document.getElementById("filmListe").innerHTML = ut;
}

function tømSkjema() {
    document.getElementById("filmer").value = '';
    document.getElementById("antall").value = '';
    document.getElementById("fornavn").value = '';
    document.getElementById("etternavn").value = '';
    document.getElementById("telefonnr").value = '';
    document.getElementById("epost").value = '';
    // Skjuler eventuelle feilmeldinger
    document.querySelectorAll("span").forEach(feilmelding => feilmelding.style.display = "none");
}

//slett data
$("#slettAlle").click(function slettAlle(){
    $.get("/slett",function (){
      hentAlleBilletter();
    });
});
function slettEn(id) {
    const url = "/slettEn?id="+id;
    $.get( url, function() {
        window.location.href = 'index.html';
    });
};



