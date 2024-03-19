import './AdminHome.scss'
import { useNavigate } from 'react-router-dom';
const AdminHome = () => {
    const navigator = useNavigate();
    const AdminInfo= () => {
        navigator('/admin/info')
    };
    const AdminUpdate= () => {
        navigator('/admin/update')
    };
    const subjectList= () => {
        navigator('/admin/subject')
    };
    const SubjectUpdate= (id) => {
        navigator('/admin/subject/update/:id')
    };
    const SubjectCreate = () => {
        navigator('/admin/subject/create')
    };
    


    return <div className="HomePage">
        <h2>Admin Home</h2>
        <button onClick={AdminInfo}>AdminInfo</button>
        <button onClick={AdminUpdate}>AdminUpdate</button>
        <button onClick={subjectList}>subjectList</button>
        <button onClick={SubjectUpdate}>SubjectUpdate</button>
        <button onClick={SubjectCreate }>SubjectCreate </button>
        
    </div>
}

export default AdminHome
