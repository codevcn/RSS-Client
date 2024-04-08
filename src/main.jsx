import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { DayPickerProvider } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './redux/store.js'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <DayPickerProvider initialProps={{ fromYear: new Date() }}>
                <App />
            </DayPickerProvider>
        </Provider>
    </React.StrictMode>
)
