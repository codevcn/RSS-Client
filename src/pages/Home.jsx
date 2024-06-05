import notifications from '../lib/notifications'
import './Home.scss'

const Notification = () => {
    return (
        <div className="notifications">
            {notifications.map(({ id, title, date }) => (
                <div key={id} className="notification">
                    <div className="notification-title-box">
                        <span>
                            <i className="bi bi-chevron-double-right"></i>
                        </span>
                        <span>
                            <span>{title}</span>
                            <i className="bi bi-bell-fill"></i>
                        </span>
                    </div>
                    <div className="date">
                        <span>{date}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export const HomePage = () => {
    return (
        <div className="HomePage">
            <div className="home-container">
                <div className="title-box">
                    <h2>THÔNG BÁO</h2>
                </div>

                <Notification />
            </div>
        </div>
    )
}

export default HomePage
