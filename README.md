# DevTinder
- Created a Vite + React application
- Remove unnecessary code and create a hello world app
- Install tailwind css - refer https://tailwindcss.com/docs/guides/vite#react
- Install daisy ui - it is compatible with tailwind and it is mainly used for readymade component designs - refer https://daisyui.com/docs/install/
- Add NavBar component to App.jsx
- create a NavBar.jsx separate component file
- Install react router dom
- Create BrowserRouter > Routes > Route = / Body > RouteChildren
- Create an Outlet in your Body Component
- Create a footer
- Create a login page
- Install axios
- CORS - install cors in backend => add middleware to with configuration origin, credentials
- Whenever you're making API calls so pass axios => {withCredentials: true}
- Install redux toolkit - https://redux-toolkit.js.org/introduction/getting-started
- install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store
- add redux devtools in chrome
- Login and see if your data is coming properly in the store
- NavBar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should not be able to access other routes without login
- If the token is not present, redirect user to login page
- Logout
- Profile page
- get the feed and store the feed inside the redux store
- build the user card on feed
- Edit profile feature
- Show toast message upon saving the profile
- New page - See all my connections
- New page - see all my connection request
- Feature - Accept/reject connection request

Body
    NavBar
    Route=/ => Feed
    Route=/login => login
    Route=/connection =>connection
    Route=/profile => Profile