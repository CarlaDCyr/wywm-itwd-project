const randomButton = document.querySelector("#randomButton");
const drinkImage = document.querySelector("#drinkImage");
const drinkName = document.querySelector("#drinkName");
const cocktailIngredients = document.querySelector("#cocktailIngredients");
const randomURL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const ingredientURL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const idURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

randomButton.addEventListener("click", function() {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      const drink = data.drinks[0];
      drinkImage.src = drink.strDrinkThumb;
      drinkName.textContent = drink.strDrink;

      let ingredients = "";
      for (let i = 1; i <= 15; i++) {
        const ingredient = drink[`strIngredient${i}`];
        const measure = drink[`strMeasure${i}`];
        if (ingredient) {
          ingredients += `${ingredient} - ${measure}`;
        }
      }
      cocktailIngredients.textContent = ingredients;
    });
});

const ingredientSelect = document.querySelector("#ingredient");

//Populate ingredient dropdown with an alphabetized list of all ingredients
fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list")
  .then(response => response.json())
  .then(data => {
    const ingredients = data.drinks.map(ingredient => ingredient.strIngredient1);
    ingredients.sort();

    for (const ingredient of ingredients) {
      const option = document.createElement("option");
      option.value = ingredient;
      option.textContent = ingredient;
      ingredientSelect.appendChild(option);
    }
  });

//Submit button eventlistener to display a drink based off of an ingredient choice
const submitBtn = document.querySelector("#submit");
submitBtn.addEventListener("click", event => {
    event.preventDefault();
    const selectedIngredient = ingredientSelect.value;
    if (!selectedIngredient) {
      return;
    }else if (selectedIngredient.indexOf(",") > -1){
        return
    }

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`)
      .then(response => response.json())
      .then(data => {
        if (!data.drinks) {
          return;
        }

        const drink = data.drinks[0];
        const id = drink.idDrink;
        const ingredients = [];

        for (let i = 1; i <= 15; i++) {
          const ingredient = drink[`strIngredient${i}`];
          const measure = drink[`strMeasure${i}`];

          if (!ingredient) {
            break;
          }

          ingredients.push(`${measure} ${ingredient}`);
        }

        drinkImage.src = drink.strDrinkThumb;
        drinkName.textContent = drink.strDrink;
        cocktailIngredients.textContent = ingredients;

        // Additional code to retrieve and display drink details
        const drinkId = drink.idDrink;
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`)
          .then(response => response.json())
          .then(data => {
            const drinkDetails = data.drinks[0];

          // Display the details in the desired HTML elements
          });
          fetch(`${idURL}${drinkId}`)
          .then(response => response.json())
          .then(data => {
            const drink = data.drinks[0];
            let ingredients = "";
            for (let i = 1; i <= 15; i++) {
              const ingredient = drink[`strIngredient${i}`];
              const measure = drink[`strMeasure${i}`];
              if (ingredient) {
                ingredients += `${ingredient} - ${measure} + \n`;
              }
            }
            cocktailIngredients.textContent = ingredients;
          }); 
      });
  });


