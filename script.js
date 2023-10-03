// Replace with your actual API key from Spoonacular
const API_KEY = '8d8d7ce93f324efea6a45fe260de3201';

function getRecipes() {
    const query = document.getElementById('search-input').value;
    const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&apiKey=${API_KEY}&number=5`;
    
    fetch(apiUrl)
        .then(response => {
            // Check if the response is OK (status 200-299)
            if(!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Check if data is an array and not empty
            if(Array.isArray(data) && data.length) {
                displayRecipes(data);
            } else {
                console.error('No recipes found:', data);
                // Handle no recipes scenario
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle error scenario, potentially display a message to the user.
        });
}

function displayRecipes(recipes) {
    const recipesSection = document.getElementById('recipes-section');
    recipesSection.innerHTML = ""; 

    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
        `;
        recipeCard.addEventListener('click', () => {
            displayRecipeDetails(recipe.id);
        });
        recipesSection.appendChild(recipeCard);
    });
}


function displayRecipeDetails(recipeId) {
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${API_KEY}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const detailsContent = document.getElementById('recipe-details-content');
            detailsContent.innerHTML = `
                <h1>${data.title}</h1>
                <img src="${data.image}" alt="${data.title}">
                <p>${data.summary}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
                </ul>
                <h2>Instructions</h2>
                <p>${data.instructions}</p>
            `;
            document.getElementById('recipes-section').style.display = 'none';
            document.getElementById('recipe-details-section').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
            // Consider displaying a message to the user in case of an error.
        });
    }

    function getAdvancedRecipes() {
        const query = document.getElementById('search-input').value;
        const diet = document.getElementById('diet').value;
        const mealType = document.getElementById('meal-type').value;
        const intolerances = document.getElementById('intolerances').value;
    
        const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=${diet}&type=${mealType}&intolerances=${intolerances}&apiKey=${API_KEY}&number=5`;
    
        fetch(apiUrl)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if(Array.isArray(data.results) && data.results.length) {
                    displayRecipes(data.results);
                } else {
                    console.error('No recipes found:', data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function getRandomRecipe() {
        const apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1`;
    
        fetch(apiUrl)
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if(Array.isArray(data.recipes) && data.recipes.length) {
                    displayRecipes(data.recipes);
                } else {
                    console.error('No recipe found:', data);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    
    document.getElementById('back-button').addEventListener('click', function() {
        document.getElementById('recipes-section').style.display = 'block';
        document.getElementById('recipe-details-section').style.display = 'none';
    });

    document.getElementById('search-input').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            getRecipes();
        }
    });


