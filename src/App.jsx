import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import LayoutPage from './components/LayoutPage'
import StudentInfo from './pages/StudentInfo'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage />,
            },
            {
                path: '/student-info',
                element: <StudentInfo />,
            },
        ],
    },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
