Some little New Code flow guidelines which helps you to understand the new code.

# In webpack.config.js file ,On this line - entry: path.resolve(__dirname, 'src', 'Main.js')  , here i set my main index file and named Main.js file
1) Go to Main.js file then route this to App module
2) In App module,Open Index.js file and set the route structure
3) In Index.js file you have to create parent routes or children of parent routes according to your need..
4) Create components and Index.js file in every Module 
5) Go to App.js file of component folder in App module.
6) In App.js file,Set Header module to be static which is neccessary in every page then Use childs of a parent which changes according to link  url.
7)For Demo ,Right now child elements is profile module and homepage module.
8)Child elements changes with route changes.




