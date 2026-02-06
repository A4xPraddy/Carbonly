# Carbonly – Carbon Footprint Calculator & Tracker

Carbonly is a web application that helps users understand and track their carbon footprint based on daily activities. The project focuses on making carbon emission tracking simple and easy to understand by showing clear data and visual insights. It was developed as part of **Assessment 1: Carbon Footprint Calculator & Tracker**.

---

## Demonstration Video

Watch the live demonstration of the project here:

 https://youtu.be/VEctvebnrkg

---

## Problem Statement

Climate change is a major global concern, but most people are unaware of how their everyday activities contribute to carbon emissions. Activities like food choices and transportation have a direct impact on the environment, yet there are very few simple tools that help users track this impact clearly. Many existing solutions are either too complex or do not provide meaningful insights.

Carbonly aims to solve this problem by allowing users to log their daily activities, calculate carbon emissions automatically, and visualize the results in a clear and understandable way.

---

## Features

### User Authentication
- Login system for individual users  
- User-specific data storage  

### Activity Logging
- Users can add daily activities such as:
  - Food consumption (Veg / Non-Veg)
  - Transportation
- Carbon emissions are calculated automatically when an activity is added
- All activities are displayed in a table for easy tracking

### Carbon Emission Calculation
- Emission calculations are handled on the backend
- Uses predefined emission factors for consistency
- Emissions are grouped by activity type

### Dashboard & Visuals
- Bar charts to compare user emissions with average values
- Pie charts showing emission distribution by category
- Supports daily, weekly, and monthly views

### AI-Based Insights
- Provides basic insights based on user activity patterns
- Encourages sustainable habits through simple suggestions

### Responsive Design
- Works on both desktop and mobile devices
- Clean and simple user interface

---

## Technologies Used

### Frontend
- React.js  
- Vite  
- HTML, CSS, JavaScript  
- Chart.js  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB  

### Other Tools
- Git & GitHub  
- dotenv for environment variables  

---

## Project Structure
```
CARBONLY
│
├── client
│ ├── src
│ ├── index.html
│ ├── package.json
│ ├── vite.config.js
│ └── .env
│
├── server
│ ├── controllers
│ ├── middleware
│ ├── models
│ ├── routes
│ ├── db.js
│ ├── server.js
│ └── .env
```

---

## Carbon Emission Logic

The project uses simplified emission factors for demonstration purposes:

| Activity | Emission |
|--------|----------|
| Vegetarian meal | 1.5 kg CO₂ |
| Non-vegetarian meal | 6.0 kg CO₂ |
| Car travel | Distance (km) × 0.12 |

---

## Application Flow

1. User logs in to the application  
2. Frontend sends requests to backend APIs  
3. Backend processes data and calculates emissions  
4. Data is stored in MongoDB  
5. Processed data is sent back to the frontend  
6. Dashboard displays charts and insights  

The project follows a basic client–server architecture where the frontend handles the user interface and the backend handles logic and calculations.

---

## How to Run the Project

### Backend
```bash
cd server
node server.js
```

### Frontend
```bash
cd client
npm install
npm run dev
```
### Assignment Requirements Covered
```bash
1)User authentication
2)Activity logging system
3)Carbon emission calculation
4)Visual dashboard
5)AI-based insights
6)Responsive design
7)Public GitHub repository
```
### Future Scope
```bash
1)Adding more activity types such as electricity and flights
2)More advanced AI-based recommendations
3)Exporting reports as PDF
4)Setting carbon reduction goals
```
## Author

### Prasad
