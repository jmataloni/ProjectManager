import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider, theme } from '@chakra-ui/react'
import '../index.css'

import { initializeApp } from "firebase/app";

//configuracion de firebase
const firebaseConfig = {
  apiKey: "AIzaSyDkxQU2D3XbIPaza8KB5Jfvq8NYAbAhwvg",
  authDomain: "projectmanager-dc9cc.firebaseapp.com",
  projectId: "projectmanager-dc9cc",
  storageBucket: "projectmanager-dc9cc.appspot.com",
  messagingSenderId: "286729287386",
  appId: "1:286729287386:web:8a870add140f6b56fdd7e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
)
