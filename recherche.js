function recherche(){
    let input = $( "#textInput" ).val();
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/"+input,
        success: function (result) {
            $("#bloc-resultats > p.info-vide").hide();
            $("#resultat").show();
            //Abilities
            console.log(result);
            //result.abilities.forEach(element => $("#abilities").append(createP(element.ability.name)));
            setData(result);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            if(xhr.status==404) {
                $("#bloc-resultats > p.info-vide").show();
                $("#resultat").hide();
            }
        }
    });
}

function setData(data) {
    $("#sprite").attr('src', data.sprites.front_default);

    data.stats.forEach(st => {
        $("#stat_" + st.stat.name).val(st.base_stat);
    });
}

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
    recherche();
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

$("#textInput").on('input', refreshFavBtn);
$("#bloc-resultats > p.info-vide").hide();
$("#resultat").hide();

refreshFavBtn();
refreshFavList();