import Search from './models/Search';
import * as searchView from './views/searchView'
import { elements, renderLoader, clearLoader } from './views/base';
/** global state of the app
* - Search Object
* - Current Recipes object 
* - Shopping List object
* - Likes Recipes
*/
const state = {};
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

		// 4. Search for recipes
		await state.search.getResults();

		// 5. Render results on UI
		clearLoader();
		searchView.renderResults(state.search.results);

	}
}

document.querySelector('.search').addEventListener('submit', e => {
	e.preventDefault(); 
	controlSearch();

});


// search.getResults();