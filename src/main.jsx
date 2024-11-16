import { createRoot } from 'react-dom/client'
import axios from 'axios'
import App from './App.jsx'
import { URL_BACK } from './config/index'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


axios.defaults.baseURL = URL_BACK

createRoot(document.getElementById('root')).render(
    <App />
)
