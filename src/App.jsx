import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutPage from './components/layouts/LayoutPage'
import AddStudent from './pages/AddStudent'
import AdminHome from './pages/Admin/AdminHome'
import AdminInfo from './pages/Admin/AdminInfo'
import AdminUpdate from './pages/Admin/AdminUpdate'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/Home'
import SearchSubjectPage from './pages/SearchSubjectPage'
import StudentInfo from './pages/StudentInfo'
import UpdateStudent from './pages/UpdateStudent'
import { ROLE_ADMIN, ROLE_STUDENT } from './utils/constants/roleConstants'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <HomePage role={ROLE_STUDENT} />,
            },
            {
                path: '/login/admin',
                element: <HomePage role={ROLE_ADMIN} />,
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
                path: '/student-infor',
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
            {
                path: '/subject',
                element: <SearchSubjectPage />,
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
