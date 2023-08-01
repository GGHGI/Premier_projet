const ajouter = document.querySelector("form[role=search]");

ajouter.addEventListener("submit", search);

// document
//   .querySelector("form[role=search]")
//   .addEventListener("submit", (event) => {
//     document.querySelector("#nomproduit").textContent =
//       event.target["query"].value;

//     event.preventDefault();
//   });

function search(event) {
  event.preventDefault();
  let recherche = document.querySelector("#Recherche").value; //*les guillemets permettent de dire que ce nest pas une variable//*

  const apiUrl = `https://world.openfoodfacts.org/api/v2/product/${recherche}.json?fields=product_name,nutriments,additives,downgraded,aggregated_origins,adjustments,packaging_fr,additives_tags,production_system,ecoscore_data,manufacturing_places,image_front_url,agribalyse,packaging_text_fr,nutriscore_score,nutriscore_grade`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const p = data.product;
      const n = p.nutriments;
      const k = p.packaging_text_fr;
      const m = p.nutriscore_score;

      // nom du produit
      document.querySelector("#nomproduit").textContent = p.product_name;

      // additif
      const additives = document.querySelector("#additives");
      additives.innerHTML = "Additifs  : <br />";
      p.additives_tags.forEach((element) => {
        additives.innerHTML += `  <span class="add"> ${element.replace(
          "en:",
          ""
        )} </span> <br />`;
      });

      // nutriscore
      let nutriscore = p.nutriscore_grade;
      console.log(nutriscore);
      switch (nutriscore) {
        case "a":
        case "b":
        case "c":
        case "d":
        case "e":
          document
            .querySelector("#nutriscore")
            .setAttribute("src", `/nutriscore${nutriscore}.png`);
          break;
        default:
          document.querySelector("#nutriscore").textContent = "non noté";
      }

      // calories
      document.querySelector(".quantcal").textContent = n["energy-kcal"];
      document.querySelector(".unitescal").textContent = n["energy-kcal_unit"];

      // sucres
      document.querySelector(".quantsucre").textContent = n.sugars;
      document.querySelector(".unitésucre").textContent = n["sugars_unit"];

      // fibre
      document.querySelector(".quantfibre").textContent = n.fiber;
      document.querySelector(".unitefibre").textContent =
        n["nutriments.fiber_unit"];
      // sel
      document.querySelector(".quantsel").textContent = n.salt;
      document.querySelector(".unitesel").textContent = n.salt_unit;

      // note
      let notetext = p.nutriscore_score;
      if (notetext) {
        document.querySelector(".not").textContent = notetext;
      } else {
        document.querySelector(".not").textContent = "non noté";
      }

      // origine
      let origintext = p.origin;
      if (origintext) {
        document.querySelector(".ori").textContent = origintext;
      } else {
        document.querySelector(".ori").textContent = "pas defini";
      }

      // packaging

      if (k) {
        console.log(k);
        document.querySelector(".emballage").textContent = k;
      } else {
        document.querySelector(".emballage").textContent = "pas defini";
      }

      let fabtext = p.manufacturing_places;
      if (fabtext) {
        document.querySelector(".lieudefabrication").textContent =
          p.manufacturing_places;
      } else {
        document.querySelector(".lieudefabrication").textContent = "pas defini";
      }

      document.querySelector("#imageproduit").src = url = p.image_front_url;
    });
}

// document.querySelector("#calories>.quantcal").textContent = "cal";
// document.querySelector("#calories>.unitescal").textContent = "unical";
// document.querySelector("#sucre>.quantsucre").textContent = "quantsucr";
// document.querySelector("#sucre>.quantfibre").textContent = "quantfib";
// document.querySelector("#fibre>.unitefibre").textContent = "unifib";
// document.querySelector("#sel>.quantsel").textContent = "quantsl";
// document.querySelector("#sel>.unitesel").textContent = "unisel";
// document.querySelector("#origine>.note").textContent = "notation";
// document.querySelector("#emballage>.origine").textContent = "origin";
// document.querySelector("#production>.impact").textContent = "impac";
// document.querySelector("#production>.impact").textContent = "emballage";
