import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
// Reducers
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

// Connect to firebase
const firebaseConfig = {
  apiKey: "AIzaSyADtaKgXKSOHQyHSc1AWCHi1Em99Kn14a0",
  authDomain: "react-client-panel-61b17.firebaseapp.com",
  databaseURL: "https://react-client-panel-61b17.firebaseio.com",
  projectId: "react-client-panel-61b17",
  storageBucket: "react-client-panel-61b17.appspot.com",
  messagingSenderId: "1053148279883"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize Firebase Instance
firebase.initializeApp(firebaseConfig);
// Initialize Firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer, // <- needed if using firestore
  notify: notifyReducer,
  settings: settingsReducer
});

// Check for settings in localStorage
if (localStorage.getItem("settings") === null) {
  // Set Default Settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };

  // Set to localStorage
  // Local Storage can only hold strings, so we stringify the object. When we pull it out, we need to parse it into an object
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create Initial State
// Our settings will be held in local storage. We will fetch them from local storage, parse it back into an object, and put them into initial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    process.env.NODE_ENV === "production"
      ? x => x
      : window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
