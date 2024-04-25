$(document).ready(function (){
    const id = window.location.search.substring(1);
    const url = "/hentEn?"+id;
    $.get(url,function(bilett){
        $("#id").val(bilett.id); // må ha med id inn skjemaet, hidden i html
        $("#antall").val(bilett.antall);
        $("#fornavn").val(bilett.fornavn);
        $("#etternavn").val(bilett.etternavn);
        $("#telefonnr").val(bilett.telefonnr);
        $("#epost").val(bilett.epost);

    });
});

 $("#Endre").click(function (){
     const kunde = {
         id : $("#id").val(),
         film : $("#filmer").val(),
         antall : $("#antall").val(),
         fornavn : $("#fornavn").val(),
         etternavn : $("#etternavn").val(),
         telefonnr : $("#telefonnr").val(),
         epost : $("#epost").val()

     };
     console.log(kunde)
     alert(kunde);

     $.post("/endreEn",kunde,function(){
         window.location.href = "/";
     });
 });

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
