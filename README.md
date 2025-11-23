# 🍽️ Dinner Planner

A responsive web application for browsing recipes, planning dinner menus, and generating automated shopping lists. Built as part of the **DH2642 Interaction Programming** course at KTH.

## 🚀 Features

* **Recipe Search:** Browse a vast database of recipes using the Spoonacular API.
* **Menu Planning:** Add dishes to your personal menu (Starter, Main Course, Dessert).
* **Smart Shopping List:** Automatically aggregates ingredients from all selected dishes.
* **Dynamic Sidebar:** Real-time updates of total price and guest count.
* **Cloud Persistence:** Menu state is saved automatically to Firebase Firestore.
* **Responsive Design:** Fully optimized for Mobile, Tablet, and Desktop.

## 🛠️ Tech Stack

* **Frontend:** React 19 (Functional Components + Hooks)
* **State Management:** MobX (Reactive Model)
* **Build Tool:** Vite
* **Routing:** React Router DOM
* **Backend/Persistence:** Firebase (Firestore)
* **API:** Spoonacular Recipe API

## ⚙️ Setup & Installation

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd <your-project-folder>
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run locally**
    ```bash
    npm run dev
    ```
    Open `http://localhost:8080` in your browser.

4.  **Run Unit Tests**
    ```bash
    npm run test
    ```

## 📂 Project Structure

* `src/DinnerModel.js` - Core business logic and application state.
* `src/mobxReactiveModel.js` - MobX wrapper to make the model reactive.
* `src/views/` - UI components (Search, Details, Sidebar, etc.).
* `src/reactjs/` - React-specific presenters and router configuration.
* `src/firestoreModel.js` - Database integration logic.

## 📝 License

This project is for educational purposes. Recipe data provided by Spoonacular.




