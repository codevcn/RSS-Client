import { SnackbarProvider } from 'notistack'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddRegisterSession } from './components/Admin/add-register-session/AddRegisterSession'
import AdminInfo from './components/Admin/AdminInfo'
import AdminUpdate from './components/Admin/AdminUpdate'
import ChangePass from './components/Admin/ChangePass'
import { SearchStudent } from './components/Admin/SearchStudent'
import SubjectCreate from './components/Admin/SubjectCreate'
import SubjectList from './components/Admin/SubjectList'
import SubjectUpdate from './components/Admin/SubjectUpdate'
import LayoutPage from './components/layouts/LayoutPage'
import { RegisterNewTerm } from './components/Student/RegisterNewTerm'
import StudentSection from './components/Student/StudentManagement'
import AdminHome from './pages/AdminHome'
import ErrorPage from './pages/ErrorPage'
import { HomePage } from './pages/Home'
import LoginPage from './pages/Login'
import { ROLE_ADMIN, ROLE_STUDENT } from './utils/constants/role'
import { TOAST_DURATION, TOASTS_LIMIT } from './utils/constants/toast'

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
                path: '/login',
                children: [
                    {
                        path: '/login',
                        element: <LoginPage role={ROLE_STUDENT} />,
                    },
                    {
                        path: '/login/admin',
                        element: <LoginPage role={ROLE_ADMIN} />,
                    },
                ],
            },
            {
                path: '/student',
                children: [
                    {
                        path: '/student/register-session',
                        element: <RegisterNewTerm />,
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
                        children: [
                            {
                                path: '/admin/info',
                                element: <AdminInfo />,
                            },
                            {
                                path: '/admin/info/update',
                                element: <AdminUpdate />,
                            },
                            {
                                path: '/admin/info/change-Pass',
                                element: <ChangePass />,
                            },
                        ],
                    },
                    {
                        path: '/admin/search-student',
                        element: <SearchStudent />,
                    },
                    {
                        path: '/admin/add-register-session',
                        element: <AddRegisterSession />,
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
                    {
                        path: '/admin/student',
                        children: [
                            {
                                path: '/admin/student/infor',
                                element: <StudentSection />,
                            },
                        ],
                    },
                ],
            },
        ],
    },
])

const App = () => {
    return (
        <SnackbarProvider autoHideDuration={TOAST_DURATION} maxSnack={TOASTS_LIMIT}>
            <RouterProvider router={router} />
        </SnackbarProvider>
    )
}

export default App
