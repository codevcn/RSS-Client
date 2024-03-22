import './ErrorPage.scss'

const ErrorPage = () => {
    return (
        <div className="ErrorPage">
            <main>
                <h1>404</h1>
                <p>
                    Tôi e rằng bạn đã tìm kiếm một trang không tồn tại trên RSS. Điều đó có thể xảy
                    ra khi bạn nhấp vào một liên kết đến nội dung nào đó đã bị xóa. Hoặc ngay từ đầu
                    liên kết đã không chính xác.
                </p>
                <p>
                    Xin lỗi vì điều đó. Chúng tôi đã ghi lại lỗi để xem xét trong trường hợp đó là
                    lỗi của chúng tôi.
                </p>
                <ul>
                    <li>
                        <a href="/">Trở về trang chủ</a>
                    </li>
                    <li>
                        <a href="/support">Liên hệ hỗ trợ</a>
                    </li>
                    <li>
                        <a href="/login">Đi đến đăng nhập</a>
                    </li>
                </ul>
            </main>
        </div>
    )
}

export default ErrorPage
