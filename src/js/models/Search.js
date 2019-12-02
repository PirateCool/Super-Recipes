import axios from 'axios';

/** global state of the app
* - Search Object
* - Current Recipes object 
* - Shopping List object
* - Likes Recipes
*/
const state = {};
export default class Search {
	constructor(query) {
		this.query = query; 
	}

	async getResults() {
		try {
			const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`)
			this.results = res.data.recipes; 
			console.log(this.results);
		} catch (error) {
			alert(error);
		}
	}

}