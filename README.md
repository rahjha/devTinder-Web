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
- send/ignore the user card from the feed
- Signup page and feature
- Test

Body
    NavBar
    Route=/ => Feed
    Route=/login => login
    Route=/connection =>connection
    Route=/profile => Profile

# Deployment
- Signup on AWS
- Launch EC2 instance
- chmod 400 <secret>.pem
- chmod 400 "codeToElevate-secret.pem"
- ssh -i "codeToElevate-secret.pem" ubuntu@ec2-13-60-92-231.eu-north-1.compute.amazonaws.com
- install nvm -> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
- install node -> nvm install 20.14.0
- Git clone your DevTinder backend and frontend code

- Frontend deployment
    - npm install -> dependencies install
    - npm run build -> to build the project
    - We need to install nginx server
        - sudo apt update - this is to  update the libraries
        - sudo apt install nginx
        - sudo systemctl start nginx - now start your nginx
        - sudo systemctl enable nginx - and enable your nginx
    - now copy build code from dist(build files) to nginx http server at var/www/html
        - sudo scp -r dist/* /var/www/html
        - now enable port 80 on EC2 instance, by default nginx deploys our app on port :80, and EC2 instance blocks all the ports,
            so we have to enable it to access our app.

- Backend
    - npm install
    - npm run start - to run it in production
    - above run will fail with database not connected error, we are trying to connect to mongo db from EC2 instance, so we have to add the public IP of mongo db inside the network access. after that it will not fail with database not connected error.
    - Our backend is listening on port 7777 as written inside the code, but EC2 instance has blocked this port, so enable port 7777 on the EC2 instance.
    - Now consider production scenario - you cannot keep your console open with "npm run start" running on it, so we need to run it in daemon mode, for that pm2 (process manager) module will be installed and used
    - npm install pm2@latest -g   -> to install pm2
    - pm2 start npm -- start      -> to start

    - ubuntu@ip-172-31-42-67:~/DevTinder$ pm2 start npm -- start
    - [PM2] Starting /home/ubuntu/.nvm/versions/node/v20.14.0/bin/npm in fork_mode (1 instance)
    - [PM2] Done.
┌────┬────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name   │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 0  │ npm    │ default     │ 0.40.1  │ fork    │ 20788    │ 0s     │ 0    │ online    │ 0%       │ 34.3mb   │ ubuntu   │ disabled │
└────┴────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
    - pm2 logs          -> command to check the logs in pm2
    - pm2 flush npm     -> to flush the logs on application
    - pm2 stop npm      -> stop the process
    - pm2 delete npm    -> delete the process
    - pm2 start npm --name "devtinder-backend" -- start

    - Frontend - http://http://13.60.92.231/
    - Backend - http://http://13.60.92.231:7777/

    - Domain name - codetoelevate.com
    - Backend = codetoelevate.com:7777 => codetoelevate.com/api

    - Nginx config

    - this config file is updated with below command
    - sudo nano /etc/nginx/sites-available/default
    - after updating nginx config file, restart nginx - sudo systemctl restart nginx


    - server_name 13.60.92.231

    location /api/ {
        proxy_pass http://localhost:7777/;  # Forward requests to Node.js backend
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }