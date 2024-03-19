import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/Home'
import ErrorPage from './pages/ErrorPage'
import LayoutPage from './components/LayoutPage'
import StudentInfo from './pages/StudentInfo'
import AdminInfo from './components/Admin/AdminInfo'
import AdminUpdate from './components/Admin/AdminUpdate'
import AdminHome from './components/Admin/AdminHome'
import SearchSubjectPage from './pages/SearchSubjectPage'
import AddStudent from './pages/AddStudent'
import UpdateStudent from './pages/UpdateStudent'
import SubjectList from './components/Admin/SubjectList'
import SubjectUpdate from './components/Admin/SubjectUpdate'
import SubjectCreate from './components/Admin/SubjectCreate'
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
                path: '/subject-info',
                element: <SubjectList />,
            },
            {
                path: '/subject-update/:id',
                element: <SubjectUpdate />,
            },
            
            {
                path: '/subject-create',
                element: <SubjectCreate />,
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
