# 🍽️ Dinner Planner

A responsive web application for browsing recipes, planning dinner menus, and generating automated shopping lists. Built as part of the **DH2642 Interaction Programming** course at KTH.

## 🚀 Features

- **Recipe Search:** Browse recipes using the Spoonacular API
- **Menu Planning:** Add dishes to your personal menu (Starter, Main Course, Dessert)
- **Smart Shopping List:** Automatically aggregates ingredients from all selected dishes
- **Dynamic Sidebar:** Real-time updates of total price and guest count
- **Cloud Persistence:** Menu state saved automatically to Firebase Firestore
- **Responsive Design:** Optimized for Mobile, Tablet, and Desktop

## 🛠️ Tech Stack

- **Frontend:** React 19 (Functional Components + Hooks)
- **State Management:** MobX (Reactive Model)
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Backend/Persistence:** Firebase (Firestore + Auth)
- **API:** Spoonacular Recipe API

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

5. **Run tests**
   ```bash
   npm run test
   ```

---


#### File Organization
```
src/
├── AuthService.js           # Renamed (was Authservice.js)
├── config/
│   ├── apiConfig.js
│   └── firebaseConfig.js
├── model/
│   ├── DinnerModel.js       
│   ├── dishSource.js        
│   ├── firestoreModel.js   
│   ├── mobxReactiveModel.js 
│   └── resolvePromise.js   
├── reactjs/
│   ├── ReactRoot.jsx       
│   ├── detailsPresenter.jsx
│   ├── index.jsx            
│   ├── loginPresenter.jsx  
│   ├── searchPresenter.jsx  
│   ├── sidebarPresenter.jsx 
│   ├── signupPresenter.jsx 
│   ├── summaryPresenter.jsx 
│   └── userPresenter.jsx    
├── style/
│   └── style.css
├── views/
│   ├── detailsView.jsx     
│   ├── loginView.jsx        
│   ├── searchFormView.jsx   
│   ├── searchResultsView.jsx 
│   ├── sidebarView.jsx      
│   ├── signupView.jsx       
│   ├── summaryView.jsx      
│   ├── suspenseView.jsx     
│   └── userView.jsx         
├── utilities.js             
└── teacherFetch.js         
```


---

## 📂 Key Files Explained

| File | Purpose |
|------|---------|
| `model/DinnerModel.js` | Core application state (guests, dishes, search) |
| `model/firestoreModel.js` | Firebase persistence logic |
| `model/mobxReactiveModel.js` | MobX wrapper for reactivity |
| `AuthService.js` | Firebase authentication functions |
| `reactjs/ReactRoot.jsx` | Main app component with routing |
| `utilities.js` | Sorting, filtering, calculation helpers |

---

## 📝 License

This project is for educational purposes. Recipe data provided by Spoonacular.




