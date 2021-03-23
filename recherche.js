function recherche(){
    alert("recherche")
}

function addToFavorite() {
    

    const fav = localStorage.getItem("favorites");
    fav.push()
    localStorage.setItem("favorites", fav);
}

function removeFromFavorite(item) {
    const fav = localStorage.getItem("favorites");
    const i = fav.indexOf(item);
    fav.splice(i, 1);
    localStorage.setItem("favorites", fav);
}