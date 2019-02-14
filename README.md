# project-number-2

## TODO
- Write a better README file
  - A link of your project
  - Screenshots
  - How to execute the project: `git clone ...; npm install; npm run dev` + example of a .env file
- Add a favicon
- Idea: add call to action on the profile page to add a story. If the user has no story, you can display a specific: "Hey, create your first story!"
- Make sure for every "Time spent", users understand that it's minutes
- Add a star for the mandatory fields
- On /new-story, display error 
- Add all the HBS helpers inside a specific file, such as: `conigs/hbs-helpers.js`
- On the page to edit the profile, add the value of "About me", between `<textaread>`s
- To make a nav link with the class "active", use a middleware to define `res.locals.something` and potentially a HBS helper