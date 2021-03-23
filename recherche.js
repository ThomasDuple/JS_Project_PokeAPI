function recherche(){
    let input = $( "#textInput" ).val();
    $.ajax({url: "https://pokeapi.co/api/v2/pokemon/"+input, success: function(result){
        //Abilities
        console.log(result);
        //result.abilities.forEach(element => $("#abilities").append(createP(element.ability.name)));
        for(const i in result){
          let element = document.createElement("h2");
          element.innerHTML = i;
          console.log(element)
          $("#bloc-resultats").append(element);
        }
      }});
}

function createP(text, class_name = ""){
  return "<p class=\"" + class_name + "\">" + text + "</p>"
}

