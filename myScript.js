// CONNECTING HTML AND JS
const search = document.getElementById("search")
const category = document.getElementById("category")
const glass = document.getElementById("glass")
const ingredient = document.getElementById("ingredient")
const getRandom = document.getElementById("random")
const drinkCard = document.getElementById("drinkCard")

// API URLS
const randomURL = "www.thecocktaildb.com/api/json/v1/1/random.php"
const categoryURL = "www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink"
const glassURL = "www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass"
const ingredientURL = "www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin"


// FUNCTIONS
function checkStatus(response) {
    if (response.status !== 200){
        throw new Error(`Status error: ${resonse.status}`)
    }else {
        return response.json()
    }
}

