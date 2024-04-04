import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminHome from './components/Admin/AdminHome'
import AdminInfo from './components/Admin/AdminInfo'
import AdminUpdate from './components/Admin/AdminUpdate'
import SubjectCreate from './components/Admin/SubjectCreate'
import SubjectList from './components/Admin/SubjectList'
import SubjectUpdate from './components/Admin/SubjectUpdate'
import LayoutPage from './components/layouts/LayoutPage'
import StudentSection from './components/Student/StudentManagement'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/Home'
import { ROLE_ADMIN, ROLE_STUDENT } from './utils/constants/roleConstants'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutPage />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/login',
                children: [
                    {
                        path: '/login',
                        element: <HomePage role={ROLE_STUDENT} />,
                    },
                    {
                        path: '/login/admin',
                        element: <HomePage role={ROLE_ADMIN} />,
                    },
                ],
            },
            {
                path: '/admin',
                children: [
                    {
                        path: '/admin',
                        element: <AdminHome />,
                    },
                    {
                        path: '/admin/info',
                        element: <AdminInfo />,
                    },
                    {
                        path: '/admin/update',
                        element: <AdminUpdate />,
                    },
                    {
                        path: '/admin/subject',
                        children: [
                            {
                                path: '/admin/subject',
                                element: <SubjectList />,
                            },
                            {
                                path: '/admin/subject/update/:id',
                                element: <SubjectUpdate />,
                            },
                            {
                                path: '/admin/subject/create',
                                element: <SubjectCreate />,
                            },
                        ],
                    },
                ],
            },
            {
                path: '/student',
                children: [
                    {
                        path: '/student/infor',
                        element: <StudentSection />,
                    },
                ],
            },
        ],
    },
])

const App = () => {
    return <RouterProvider router={router} />
}

export default App
