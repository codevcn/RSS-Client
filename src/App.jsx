import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import LayoutPage from './components/LayoutPage'
import StudentInfo from './pages/Student/StudentInfo'
import AdminInfo from './pages/Admin/AdminInfo'
import AdminUpdate from './pages/Admin/AdminUpdate'
import UpdateStudent from './pages/Student/UpdateStudent'
import AdminHome from './pages/Admin/AdminHome'
import SearchSubjectPage from './pages/SearchSubjectPage'
import AddStudent from './pages/Student/AddStudent'

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
                path: '/admin-home',
                element: <AdminHome />,
            },
            {
                path: '/student',
                //element: <StudentInfo />,
                children: [
                    {
                        path: '/student/infor',
                        element: <StudentInfo />,
                    },
                    {
                        path: '/student/add',
                        element: <AddStudent />,
                    },
                    {
                        path: '/student/update/:id',
                        element: <UpdateStudent />,
                    },
                ],
            },
            {
                path: '/admin',
                element: <AdminInfo />,
            },
            {
                path: '/admin-update',
                element: <AdminUpdate />,
            },
            {
                path: '/subject',
                element: <SearchSubjectPage />,
            },
        ],
    },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
