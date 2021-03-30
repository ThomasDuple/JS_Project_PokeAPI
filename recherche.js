function recherche(){
    alert("recherche")
    let categorie = document.getElementById("categorie").value;
    let input = document.getElementById("textInput").value;
    let search = categorie + "/" + input;
    alert(search);
}

$("#textInput").on('input', refreshFavBtn);

function refreshFavBtn() {
    const search = $("#textInput").val();
    const btn = $("#btn-favoris");

    if (search == "")  { //empty
        btn.removeAttr("onclick");
        btn.prop("disabled", true);
        btn.removeAttr("class");
        $('img[alt="Etoile pleine"]').hide();
        $('img[alt="Etoile vide"]').show();
    } else {
        btn.prop("disabled", false);

        btn.attr('class', 'btn_clicable');

        const fav = JSON.parse(localStorage.getItem("favorites"));

        if (fav.indexOf(search) == -1) {
            btn.attr("onclick", "addToFavorite()");
            $('img[alt="Etoile pleine"]').hide();
            $('img[alt="Etoile vide"]').show();
        } else {
            btn.attr("onclick", "removeFromFavorite()")
            $('img[alt="Etoile vide"]').hide();
            $('img[alt="Etoile pleine"]').show();
        }
    }
}


function addToFavorite() {
    const search = $("#textInput").val();
    const fav = JSON.parse(localStorage.getItem("favorites"));
    fav.push(search);
    localStorage.setItem("favorites", JSON.stringify(fav));
    refreshFavBtn();
    refreshFavList()
}

function removeFromFavorite(item = null) {
    let search;
    let ok;
    ok = confirm("Voulez vous supprimer ce favoris ?");
    if (item == null) {
        if (ok) search = $("#textInput").val();
    } else {
        search = item;
    }

    if (ok) {
        const fav = JSON.parse(localStorage.getItem("favorites"));
        const i = fav.indexOf(search);
        fav.splice(i, 1);
        localStorage.setItem("favorites", JSON.stringify(fav));
        refreshFavBtn();
        refreshFavList()
    }
}

function useFavorite(item) {
    $("#textInput").val(item);
    refreshFavBtn();
}

function refreshFavList() {
    const fav = JSON.parse(localStorage.getItem('favorites'));
    const template = document.getElementById('templateFav');
    const list = document.getElementById('liste-favoris')

    list.innerHTML = "";

    fav.forEach(search => {
        const item = template.content.cloneNode(true);
        item.querySelector('span').innerText = search;
        item.querySelector('span').setAttribute('onclick', 'useFavorite("' + search + '")');
        item.querySelector('img').setAttribute('onclick', 'removeFromFavorite("' + search + '")');
        list.appendChild(item);
    });

    const empty = $("#section-favoris > p.info-vide");

    if (list.innerHTML == "") {
        empty.show();
    } else {
        empty.hide();
    }
}

if (localStorage.getItem("favorites") === null) {
    localStorage.setItem("favorites", JSON.stringify([]));
}

refreshFavBtn();
refreshFavList();