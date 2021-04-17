# IronsourceAssignment

This Assignment was my first angular project. The purpose was to implement Infinite Scroll that fetch data from a fake server, in each time the user scrolling to the end of the page an AJAX request is fired and the next page of data being loaded and appended to the table element.
In this project I've also use Angular Route to let the user navigate between landing page(shows my full name and email) and the infinite scroll page (which has the table element with the infinte scroll and a filter search bar on top).

## Implemented feature: 
1. Checkbox switch to shuffle between Dark Mode and Light Mode. 
2. Deploy the project on Heroku.
3. Some CSS animation when elements entering the page.

## Landing Page:
Dark Mode-
![alt text](https://github.com/amitmo50/InfiniteScrollAssignment/blob/main/darkmode.png?raw=true)
Light Mode-
![alt text](https://github.com/amitmo50/InfiniteScrollAssignment/blob/main/lightmode.png?raw=true)

## Infinit Scroll Page:
Dark Mode-
![alt text](https://github.com/amitmo50/InfiniteScrollAssignment/blob/main/tableDarkMode.png?raw=true)
Light Mode-
![alt text](https://github.com/amitmo50/InfiniteScrollAssignment/blob/main/tableLightMode.png?raw=true)


## Deployed version:

https://angular-infinite-scroll-app.herokuapp.com/


## Dev
In order use the code, clone the repo and install all the dependencies in Angular.json then run "ng serve" to build the project and serve it on "localhost:4200".