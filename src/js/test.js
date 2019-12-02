// Global app controller

// import string from './models/Search';
import str from './models/Search';
// import { add, multiply, ID } from './views/searchView'; 
// console.log(`Using my tests functions! ${add(ID, 2)} and ${multiply (3, 5)}. ${str} `);

import * as searchView from './views/searchView';
console.log(`Using my tests functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply (3, 5)}. ${str} `);