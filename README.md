## About This Application

This application presents an interactive index of the original 150 Pokemon. It allows the user to peruse a list of all 150 first generation Pokemon and select each individually. Selected Pokemon display a modal with the Pokemon's name, height, abilities and image.

## How to Run This Application

This application is simple to run. Load the page to see the list of Pokemon buttons and click each button to load a modal with the Pokemon's image, name, height and abilities displayed. To exit the modal, you can either click the 'Close' button, the 'X' in the corner of the modal, the 'Esc' key on your keypad, or clicking the mouse outside of the modal.
You cannot switch between Pokemon's modals. Please close your current modal before opening another.
The searchbar is in the navbar at the top of the page. On smaller screens it is replaced with a hamburger menu, which can be clicked to open the search bar. This application applies an automatic filter to the list of Pokemon as you type, so does not require a 'Search' button. Just begin typing the **name** of the Pokemon in the searchbox for the list to filter relevant options. If you are experiencing errors, check for typos.

## Project Dependencies

This application is dependent on JavaScript, JSON, an external Pokemon API, and Bootstrap. It also employs 'fetch' and 'promise' polyfills for older browsers.

## Which API the Project Uses

This application uses PokeAPI, accessible at: https://pokeapi.co/api/v2/pokemon/?limit=150.
