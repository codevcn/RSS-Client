import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import LayoutPage from './components/LayoutPage'
import StudentInfo from './pages/StudentInfo'
import AdminInfo from './pages/Admin/AdminInfo'
import AdminUpdate from './pages/Admin/AdminUpdate'
import AdminHome from './pages/Admin/AdminHome'
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
                path: '/admin-home',
                element: <AdminHome />,
            },
            {
                path: '/student-info',
                element: <StudentInfo />,
            },
            {
                path: '/admin',
                element: <AdminInfo />,
            },
            {
                path: '/admin-update',
                element: <AdminUpdate />,
            },

            // {
            //     path: '/get-all-admin',
            //     element: <AdminGetAll/>,
            // },
            // {
            //     path: '/create-admin',
            //     element: <AdminCreate/>,
            // },
            // {
            //     path: '/update-admin/:id',
            //     element: <AdminUpdate/>,
            // },
            // {
            //     path: '/delete-admin/:id',
            //     element: null,
            // },
        ],
    },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
