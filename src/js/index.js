import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base';
/** global state of the app
* - Search Object
* - Current Recipes object 
* - Shopping List object
* - Likes Recipes
*/
const state = {};

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
	console.log(id);
	if (id) {
		// Prepare UI for changes
		try {
			// Create a new recipe object
			state.recipe = new Recipe(id);
			// Get recipe data
			await state.recipe.getRecipe();
			// Calculate cooking times & servings 
			state.recipe.calcTime();
			state.recipe.calcServings();

			// Render recipe on the UI
			console.log(state.recipe);
		} catch (err) {
			console.log(err);
			alert('Error processing recipe');
		}

	}
};


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));


















