import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import LayoutPage from './components/LayoutPage'
import StudentInfo from './pages/StudentInfo'
import AddStudent from './pages/AddStudent'
import UpdateStudent from './pages/UpdateStudent'

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
                path: '/student-infor',
                element: <StudentInfo />,
            },
            {
                path: '/add-student',
                element: <AddStudent />,
            },
            {
                path: '/update-student/:id',
                element: <UpdateStudent />,
            },
        ],
    },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
