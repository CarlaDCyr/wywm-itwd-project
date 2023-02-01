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

// When "Surprise Me" button is clicked, a random drink is populated in the drink card.
randomButton.addEventListener('click', getRandomDrink);

//Turn the Ingredient select field into a drop down populated with the available ingredients from the API
fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
    .then(response => response.json())
    .then(data => {
        const ingredients = data.drinks.map(ingredient => ingredient.strIngredient1);

        ingredients.forEach(ingredient => {
            const option = document.createElement('option');
            option.value = ingredient;
            option.innerText = ingredient;
            document.querySelector('#ingredient').appendChild(option);
        });
    });

//Turn the Glass select field into a drop down populated with the available ingredients from the API
fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list')
    .then(response => response.json())
    .then(data => {
        const glasses = data.drinks.map(glass => glass.strGlass);

        glasses.forEach(glass => {
            const option = document.createElement('option');
            option.value = glass;
            option.innerText = glass;
            document.querySelector('#glass').appendChild(option);
        });
    });

//Turn the Drink Type select field into a drop down populated with the available ingredients from the API
fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then(response => response.json())
    .then(data => {
        const types = data.drinks.map(type => type.strCategory);

        types.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.innerText = type;
            document.querySelector('#type').appendChild(option);
        });
    });
//When Submit button is clicked in the "Pick your Poison" menu, a drink is generated based off of choices and displayed in drink card.
    submit.addEventListener('click', function (event) {
        // Prevent the default form submit behavior
        event.preventDefault();
        // Get the input values
        const ingredientValue = ingredient.value;
        const glassValue = glass.value;
        const typeValue = type.value;
        fetch(`${API_URL}filter.php?i=${encodeURIComponent(ingredientValue)}&g=${encodeURIComponent(glassValue)}&c=${encodeURIComponent(typeValue)}`)
            .then(response => response.json())
            .then(data => {
                // Get the drink data from the API response
                const drinkData = data.drinks;
                // If there is no drink data, throw an error
                if (!drinkData) {
                    throw new Error('No drink data found');
                }
                // Get the first drink from the response
                const firstDrink = drinkData[0];
                // Get the image url, name, and ingredients from the drink data
                const imageUrl = firstDrink.strDrinkThumb;
                const name = firstDrink.strDrink;
                const ingredients = [];
                for (let i = 1; i <= 15; i++) {
                    const ingredient = firstDrink[`strIngredient${i}`];
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
    


