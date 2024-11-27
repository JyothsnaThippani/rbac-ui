## RBAC-UI (Role-Based Access Control User Interface)
This project is a web application designed to manage users, roles, permissions, and logs within a Role-Based Access Control (RBAC) system. It is built using React, Material-UI, and demonstrates modular component design and API integration.

## Features
RBAC-UI (Role-Based Access Control User Interface)
This project is a web application designed to manage users, roles, permissions, and logs within a Role-Based Access Control (RBAC) system. It is built using React, Material-UI, and demonstrates modular component design and API integration.

User Management: View, add, and delete users with integrated API calls.
Role Management: Assign and manage permissions for roles.
Sidebar Navigation: Dynamic sidebar menu with active state tracking.
Dark Mode: Implemented using Context API to toggle themes.
Dashboard: Displays an overview of the application's key metrics.

## Folder Structure:


rbac-ui/
│
├── public/                
├── src/                   
│   ├── components/        
│   │   ├── Navbar.jsx     
│   │   ├── Sidebar.jsx    
│   │   ├── Users.jsx      
│   │   ├── Roles.jsx      
│   │   ├── Dashboard.jsx  
│   │   └── EditableTable.jsx 
│   ├── context/           
│   │   ├── ThemeContext.jsx
│   │   └── AuthContext.jsx
│   ├── hooks/             
│   ├── data/              
│   │   └── db.json        
│   ├── App.jsx            
│   ├── index.js           
│   └── api.js            
└── package.json   

## Installation

Clone the Repository

git clone https://github.com/your-username/rbac-ui.git
cd rbac-ui

## Install Dependencies


Ensure you have Node.js installed:
npm install

## Start the Development Server


npm start
The app will be accessible at http://localhost:3000.

## Run the Mock API Server


If you're using json-server for mock APIs, start it with:

npx json-server --watch src/data/db.json --port 5000

## The API endpoints will be available at:

http://localhost:5000/users
http://localhost:5000/roles
http://localhost:5000/permissions
http://localhost:5000/logs

## Usage

Sidebar Navigation: Switch between different sections like Dashboard, Users, Roles, and Logs.
Theme Toggle: Enable or disable dark mode using the toggle button.
User Management: Add or delete users directly from the Users page.
Role Management: Assign and modify roles with their respective permissions.

## Technologies Used

React: For building the user interface.
Material-UI: For modern and responsive UI components.
React Router: For client-side routing.
Context API: For global state management (theme and authentication).
JSON Server: For mock backend data.

## Troubleshooting

"Cannot destructure property 'darkMode'"
Ensure that ThemeContext is correctly set up and the ThemeProvider wraps the App component.

API Errors
Verify the mock API server is running (json-server) and the endpoints match the frontend API calls in api.js.

Sidebar State Issues
Ensure the useState hook in Sidebar.jsx is properly managing the active state.

Contributing
Feel free to fork this repository and make contributions by submitting a pull request.
