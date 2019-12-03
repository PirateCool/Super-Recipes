	parseIngredients() {
 		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']
 		const unitsShort = ['spoon', 'spoon', 'oz', 'oz', 'spoon', 'cup', 'pound'];

 		const newIngredients = this.ingredients.map(el => {
 			// 1- Uniform units
 			let ingredient = el.toLowerCase();
 			unitsLong.forEach((unit, i) => {
 				ingredient = ingredient.replace(unit, unitsShort[i]);
 			})
 			// 2- Remove parentheses
 			ingredient = ingredient.replace(/ *\([^)]*\) */g, '  ');

 			// 3- Parse ingredients into count
 			const arrIng = ingredient.split(' '); 
 			const unitIndex = arrIng.findIndex(element => unitsShort.includes(element));

 			let objIng; 
 			if (unitIndex > -1 ) {
 				// There is a unit
 				console.log('There is a unit');
 			} else if (parseInt(arrIng[0], 10)) {
 				// No Unit, but element is a number
 				console.log('No Unit, but element is a number');
 				objIng = {
 					count: parseInt(arrIng[0], 10),
 					unit: '',
 					ingredient: arrIng.slice(1).join(' ')
 				}

 			} else if (unitIndex === -1) {
 				// No Unit & non number in 1st position
 				console.log('No Unit & non number in 1st position');
 				objIng = {
 					count: 1, 
 					unit: '',
 					ingredient
 				}
 			} else {
 				console.log('NOTHING');
 			}
 			console.log(objIng);
 			return objIng; 
 		});
 		this.ingredients = newIngredients; 
 	} 