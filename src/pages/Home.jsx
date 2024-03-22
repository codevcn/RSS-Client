import LoginSection from '../components/home/Login'

const HomePage = ({ role }) => {
    return (
        <div className="HomePage">
            <LoginSection role={role} />
        </div>
    )
}

export default HomePage
