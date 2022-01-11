import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyB0C8sDC03VCYjIiV0SX6vfi7m7n-dMzko',
    authDomain: 'network-marketing-2021.firebaseapp.com',
    projectId: 'network-marketing-2021',
    storageBucket: 'network-marketing-2021.appspot.com',
    messagingSenderId: '487579289722',
    appId: '1:487579289722:web:b79755581062446fc053c3',
    measurementId: 'G-7JEFFPW61V',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

createApp(App).use(router).mount('#app')
