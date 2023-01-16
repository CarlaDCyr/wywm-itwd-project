// Setting my variables

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/';
const drinkImage = document.getElementById('drinkImage');
const drinkName = document.getElementById('drinkName');
const cocktailIngredients = document.getElementById('cocktailIngredients');
const randomButton = document.getElementById('randomButton');
const ingredient = document.getElementById('ingredient');
const glass = document.getElementById('glass');
const type = document.getElementById('type');
const submit = document.getElementById('submit');


/**
 * Retrieves a random drink from the API and updates the HTML with the data
 */
function getRandomDrink() {
    fetch(`${API_URL}random.php`)
        .then(response => response.json())
        .then(data => {
            // Get the drink data from the API response
            const drinkData = data.drinks[0];
            // If there is no drink data, throw an error
            if (!drinkData) {
                throw new Error('No drink data found');
            }
            // Get the image url, name, and ingredients from the drink data
            const imageUrl = drinkData.strDrinkThumb;
            const name = drinkData.strDrink;
            const ingredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredient = drinkData[`strIngredient${i}`];
                if (ingredient) {
                    ingredients.push(ingredient);
                }
            }
            // Update the HTML with the drink data
            drinkImage.src = imageUrl;
            drinkName.innerText = name;
            cocktailIngredients.innerText = ingredients.join(', ');
        })
        .catch(error => console.log(error));
}

// Add an event listener to the random button to retrieve a random drink when clicked
randomButton.addEventListener('click', getRandomDrink);

// Add an event listener to the submit button to retrieve a drink based on the input when clicked
submit.addEventListener('click', function (event) {
    // Prevent the default form submit behavior
    event.preventDefault();
    // Get the input values
    const ingredientValue = ingredient.value;
    const glassValue = glass.value;
    const typeValue = type.value;
    fetch(`${API_URL}filter.php?i=${ingredientValue}&g=${glassValue}&c=${typeValue}`)
        .then(response => response.json())
        .then(data => {
            // Get the drink data from the API response
            const drinkData = data.drinks[0];
            // If there is no drink data, throw an error
            if (!drinkData) {
                throw new Error('No drink data found');
            }
            // Get the image url, name, and ingredients from the drink data
            const imageUrl = drinkData.strDrinkThumb;
            const name = drinkData.strDrink;
            const ingredients = [];
            for (let i = 1; i <= 15; i++) {
                const ingredient = drinkData[`strIngredient${i}`];
                if (ingredient) {
                    ingredients.push(ingredient);
                }
            }
            // Update the HTML with the drink data
            drinkImage.src = imageUrl;
            drinkName.innerText = name;
            cocktailIngredients.innerText = ingredients.join(', ');
        })
        .catch(error => console.log(error));
});
