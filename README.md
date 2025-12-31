# 🍽️ Dinner Planner

A responsive web application for browsing recipes, planning dinner menus, and generating automated shopping lists. Built as part of the **DH2642 Interaction Programming** course at KTH.

## 🌐 Live Demo

**[https://sana-personal-web.web.app](https://sana-personal-web.web.app)**

---

## 🚀 Features

- **Recipe Search:** Browse recipes using the Spoonacular API
- **Menu Planning:** Add dishes to your personal menu (Starter, Main Course, Dessert)
- **Smart Shopping List:** Automatically aggregates ingredients from all selected dishes
- **Dynamic Sidebar:** Real-time updates of total price and guest count
- **Cloud Persistence:** Menu state saved automatically to Firebase Firestore
- **User Authentication:** Sign up and login with email/password
- **Responsive Design:** Optimized for Mobile, Tablet, and Desktop

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19 (Functional Components + Hooks) |
| **State Management** | MobX |
| **Build Tool** | Vite |
| **Routing** | React Router DOM |
| **Backend** | Firebase (Firestore + Auth) |
| **Hosting** | Firebase Hosting |
| **API** | Spoonacular Recipe API |

---

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dinner-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file** with your Firebase config:
   ```env
   VITE_API_URL=your_proxy_url
   VITE_API_KEY=your_api_key
   VITE_apiKey=your_firebase_api_key
   VITE_authDomain=your_project.firebaseapp.com
   VITE_projectId=your_project_id
   VITE_storageBucket=your_project.appspot.com
   VITE_messagingSenderId=your_sender_id
   VITE_appId=your_app_id
   VITE_measurementId=your_measurement_id
   ```

4. **Run locally**
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser.

5. **Run tests**
   ```bash
   npm run test
   ```

6. **Build for production**
   ```bash
   npm run build
   ```

7. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

---

## 📂 Project Structure

```
src/
├── Authservice.js            # Firebase authentication functions
├── config/
│   ├── apiConfig.js          # API proxy settings
│   └── firebaseConfig.js     # Firebase initialization
├── model/
│   ├── DinnerModel.js        # Core application state
│   ├── dishSource.js         # API calls to Spoonacular
│   ├── firestoreModel.js     # Firebase persistence logic
│   ├── mobxReactiveModel.js  # MobX wrapper for reactivity
│   └── resolvePromise.js     # Promise state handler
├── reactjs/
│   ├── ReactRoot.jsx         # Main app component with routing
│   ├── detailsPresenter.jsx  # Dish details logic
│   ├── index.jsx             # App entry point
│   ├── loginPresenter.jsx    # Login logic
│   ├── searchPresenter.jsx   # Search logic
│   ├── sidebarPresenter.jsx  # Sidebar logic
│   ├── signupPresenter.jsx   # Signup logic
│   ├── summaryPresenter.jsx  # Shopping list logic
│   └── userPresenter.jsx     # User bar logic
├── style/           
│   ├── style.css             # Application styles
│   └── dinner_table.jpg     
├── views/
│   ├── detailsView.jsx       # Dish details UI
│   ├── loginView.jsx         # Login form UI
│   ├── searchFormView.jsx    # Search form UI
│   ├── searchResultsView.jsx # Search results grid
│   ├── sidebarView.jsx       # Sidebar with menu
│   ├── signupView.jsx        # Signup form UI
│   ├── summaryView.jsx       # Shopping list UI
│   ├── suspenseView.jsx      # Loading/welcome states
│   └── userView.jsx          # User bar UI
├── utilities.js              # Sorting, filtering helpers
└── teacherFetch.js           # Infinite loop protection
```

---

## 📝 License

This project is for educational purposes. Recipe data provided by [Spoonacular](https://spoonacular.com/).


