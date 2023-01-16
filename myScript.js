// Get the elements from the HTML
const randomButton = document.getElementById("randomButton");
const drinkImage = document.getElementById("drinkImage");
const drinkName = document.getElementById("drinkName");
const cocktailIngredients = document.getElementById("cocktailIngredients");
const ingredientInput = document.getElementById("ingredient");
const glassInput = document.getElementById("glass");
const typeInput = document.getElementById("type");

// Add event listener to the "Surprise Me" button
randomButton.addEventListener("click", function() {
    // Fetch random drink from the Cocktail DB API
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
        // Get the drink data
        const drink = data.drinks[0];

        // Update the drink image
        drinkImage.src = drink.strDrinkThumb;

        // Update the drink name
        drinkName.textContent = drink.strDrink;

        // Update the ingredients list
        let ingredients = "";
        for(let i = 1; i <= 15; i++) {
            if(drink[`strIngredient${i}`]) {
                ingredients += `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}<br>`;
            }
        }
        cocktailIngredients.innerHTML = ingredients;
    });
});

// Add event listener to the ingredient input
ingredientInput.addEventListener("input", function() {
    // Fetch drinks by ingredient from the Cocktail DB API
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientInput.value}`)
    .then(response => response.json())
    .then(data => {
        // Code to update the UI with the filtered drinks goes here
        const drinks = data.drinks;
        drinks.forEach(drink => {
            // Update the drink image
            drinkImage.src = drink.strDrinkThumb;

            // Update the drink name
            drinkName.textContent = drink.strDrink;

            // Update the ingredients list
            let ingredients = "";
            for(let i = 1; i <= 15; i++) {
                if(drink[`strIngredient${i}`]) {
                    ingredients += `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}<br>`;
                }
            }
            cocktailIngredients.innerHTML = ingredients;
        });
    });
});

// Add event listener to the glass input
glassInput.addEventListener("input", function() {
    // Fetch drinks by glass from the Cocktail DB API
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=${glassInput.value}`)
    .then(response => response.json())
    .then(data => {
        // Code to update the UI with the filtered drinks goes here
        const drinks = data.drinks;
        drinks.forEach(drink => {
            // Update the drink image
            drinkImage.src = drink.strDrinkThumb;

            // Update the drink name
            drinkName.textContent = drink.strDrink;

            // Update the ingredients list
            let ingredients = "";
            for(let i = 1; i <= 15; i++) {
                if(drink[`strIngredient${i}`]) {
                    ingredients += `${drink[`strIngredient${i}`]} - ${drink[`strMeasure${i}`]}<br>`;
                }
            }
            cocktailIngredients.innerHTML = ingredients;
        });
    });
});
