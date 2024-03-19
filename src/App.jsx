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
                path: '/admin',
                // element: <AdminHome />,
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
                        // element: <SubjectList />,
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
                path: '/subject',
                element: <SearchSubjectPage />,
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
