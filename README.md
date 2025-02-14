# 🍽️ Recipe Finder Frontend

This is the **frontend** for the **Recipe Finder** project, built with **React, Redux, TypeScript, and Vite**.  
It allows users to **search for recipes, save favorite recipes, and manage authentication (login/register).**  

🚀 **Live Backend**: [Your Backend Render URL](https://your-backend-url.onrender.com)  

---

## 🚀 Features
✅ **User Registration & Login** (JWT authentication)  
✅ **Search Recipes** using Spoonacular API  
✅ **Save Favorite Recipes**  
✅ **View Saved Recipes** upon login  
✅ **Delete Saved Recipes**  
✅ **Pagination Support**  
✅ **Fully Responsive UI**  

---

## 📌 Technologies Used
- **React (Vite)** - Frontend framework
- **Redux Toolkit** - State management
- **TypeScript** - Type safety
- **Axios** - API calls
- **React Router** - Client-side routing
- **CSS** - Styling for the UI
- **Render** - Deployment 

---

## 📂 Project Structure
```
recipe_finder_frontend/
│── src/
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── ProtectedRoute.tsx  # Route protection for logged-in users
│   ├── pages/
│   │   ├── Home.tsx            # Home Page
│   │   ├── Login.tsx           # Login Page
│   │   ├── Register.tsx        # Register Page
│   │   ├── SearchRecipes.tsx   # Search Recipes Page
│   │   ├── SavedRecipes.tsx    # Saved Recipes Page
│   ├── redux/
│   │   ├── slices/authSlice.ts    # Authentication state
│   │   ├── slices/recipesSlice.ts # Recipe management state
│   │   ├── store.ts              # Redux Store
│   ├── App.tsx                 # Main App component
│   ├── main.tsx                # Entry point
│── public/                     # Public assets
│── .env                        # Environment variables (not uploaded)
│── .gitignore                   # Ignored files
│── package.json                 # Dependencies and scripts
│── tsconfig.json                 # TypeScript configuration
│── README.md                    # Documentation
```

---

## 🛠️ Setup & Installation

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/YOUR_USERNAME/recipe_finder_frontend.git
cd recipe_finder_frontend
```

### 2️⃣ **Install Dependencies**
```sh
npm install
```

### 3️⃣ **Configure Environment Variables**
Create a `.env` file in the root folder and add:
```
VITE_API_BASE_URL=https://your-backend-url.onrender.com
```
> 🔹 Replace `your-backend-url.onrender.com` with your actual backend URL.

### 4️⃣ **Run the Development Server**
```sh
npm run dev
```
> 🚀 Your frontend will start on `http://localhost:5173`

---

## 🔗 API Endpoints
The frontend interacts with the **backend API** hosted at:
```
https://your-backend-url.onrender.com/api
```
For authentication and recipe search:
| Method  | Endpoint              | Description                     |
|---------|----------------------|---------------------------------|
| POST    | `/auth/register`      | Register a new user |
| POST    | `/auth/login`         | Login and get a JWT token |
| POST    | `/recipes/search`     | Search for recipes |
| POST    | `/recipes/save`       | Save a recipe |
| GET     | `/recipes/saved`      | Retrieve saved recipes |
| DELETE  | `/recipes/saved/:id`  | Delete a saved recipe |

> 🔑 **Authentication Required** for all `/recipes` endpoints.  
> Send `Authorization: Bearer YOUR_JWT_TOKEN` in the headers.

---

## 👥 Contributors
- **Your Name** - [GitHub](https://github.com/YOUR_USERNAME)

---

## 📜 License
This project is **open-source** under the **MIT License**.

---
