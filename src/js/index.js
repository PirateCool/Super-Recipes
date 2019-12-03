import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';

import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';

import { elements, renderLoader, clearLoader } from './views/base';
/** global state of the app
* - Search Object
* - Current Recipes object 
* - Shopping List object
* - Likes Recipes
*/
const state = {};
window.state = state // testing

/********************
* SEARCH CONTROLLER *
*********************/

const controlSearch = async () => {
	// 1. Get Query from the view
	const query = searchView.getInput();
	console.log(query);
	if (query) {
		// 2. New Search object added to state
		state.search = new Search(query);

		// 3. Prepare the UI for results 
		searchView.clearInput(); 
		searchView.clearResults();
		renderLoader(elements.searchResult);
		try {
		// 4. Search for recipes
		await state.search.getResults();

		// 5. Render results on UI
		clearLoader();
		searchView.renderResults(state.search.results);
		} catch (err) {
			alert('Something went wrong with the search... ')
			clearLoader();
		}
	}
}

// Submit search & prevent from refresh
elements.searchForm.addEventListener('submit', e => {
	e.preventDefault(); 
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.results, goToPage);
	}
});


// search.getResults();


/********************
* RECIPE CONTROLLER *
********************/

// const r = new Recipe(47746)
// r.getRecipe();

const controlRecipe = async () => {
	const id = window.location.hash.replace('#', '');
	// console.log(id);
	if (id) {
		// Prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		if (state.search) {
			searchView.highlightSelected(id);
		}

		try {
			// Create a new recipe object
			state.recipe = new Recipe(id);
			// window.r = state.recipe; // TESTING !

			// Get recipe data
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			// Calculate cooking times & servings 
			state.recipe.calcTime();
			state.recipe.calcServings();

			// Render recipe on the UI
			clearLoader();
			recipeView.renderRecipe(state.recipe);

		} catch (err) {
			console.log(err);
			alert('Error processing recipe');
		}

	}
};


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


/********************
* RECIPE CONTROLLER *
********************/


/** 
 * LIST CONTROLLER
 */
const controlList = () => {
    // Create a new list IF there in none yet
    if (!state.list) state.list = new List();

    // Add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        const item = state.list.addItem(el.count = 1, el.unit, el.ingredient);
        listView.renderItem(item);
    });
}

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

    // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});





/********************
* EVENTS HANDLERS *
********************/



// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
	if (e.target.matches('.btn-decrease, .btn-decrease *')) {
		// decrease button is clicked 
		if (state.recipe.servings > 1) {
			state.recipe.updateServings('dec');
			recipeView.updateServingsIngredients(state.recipe);
		}
	} else if (e.target.matches('.btn-increase, .btn-increase *')) {
		// increase button is clicked 
		state.recipe.updateServings('inc');
		recipeView.updateServingsIngredients(state.recipe);
	} else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
		controlList();
	}
	// console.log(state.recipe);
})

window.l = new List();















