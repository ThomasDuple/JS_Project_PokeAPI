function recherche(){
    let categorie = document.getElementById("categorie").value;
    let input = document.getElementById("textInput").value;
    let search = categorie + "/" + input;
    alert(search);
}