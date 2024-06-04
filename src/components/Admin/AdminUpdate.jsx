import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap'
import { useToast } from '../../hooks/toast';
import { adminService } from '../../services/AdminService';
import { HttpRequestErrorHandler } from '../../utils/httpRequestErrorHandler';
import './AdminUpdate.scss';

const AdminUpdate = ({ adminInfo, editInfo }) => {
    const [adminData, setAdminData] = useState(adminInfo);
    const [showConfirm, setShowConfirm] = useState(false);
    const [errors, setErrors] = useState({});
    const [Idcards, setIdcards] = useState([]);
    const toast = useToast();

    useEffect(() => {
        adminService
            .getAllIDcard()
            .then((response) => {
                setIdcards(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    useEffect(() => {
        setAdminData(adminInfo);
    }, [adminInfo]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAdminData((prevAdminData) => ({
            ...prevAdminData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};
        if (
            adminData.idcard !== adminInfo.idcard &&
            Idcards.some((Id) => Id.Idcards === adminData.idcard)
        ) {
            validationErrors.idcard = 'Số Căn cước công dân đã tồn tại !';
        }
        if (/\d/.test(adminData.fullName)) {
            validationErrors.fullName = 'Họ và Tên không được chứa chữ số';
        }
        if (!adminData.idcard.trim()) {
            validationErrors.idcard = 'Không để trống số CCCD';
        }
        if (adminData.idcard.length !== 12) {
            validationErrors.idcard = 'Định dạng số CCCD phải chứa 12 chữ số!';
        }
        if (!/^[0-9]+$/.test(adminData.idcard)) {
            validationErrors.idcard = 'Số CCCD phải là chữ số!';
        }
        if (!adminData.birthday.trim()) {
            validationErrors.birthday = 'Không để trống ngày sinh';
        } else {
            const birthday = new Date(adminData.birthday);
            const eighteenYearsAgo = new Date(new Date().setFullYear(new Date().getFullYear() - 18));
            if (birthday > eighteenYearsAgo) {
                validationErrors.birthday = 'Phải trên 18 tuổi';
            }
        }

        if (!adminData.gender.trim()) {
            validationErrors.gender = 'Không để trống Giới tính';
        }

        if (!adminData.fullName.trim()) {
            validationErrors.fullName = 'Không để trống họ và tên';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setShowConfirm(true);
        } else {
            toast.error('Vui lòng điền đầy đủ thông tin và kiểm tra các trường nhập liệu.');
        }
    };

    const handleConfirm = () => {
        adminService
            .updateAdminInfo(adminData)
            .then(() => {
                toast.success('Cập nhật thành công');
                editInfo(adminData);
            })
            .catch((error) => {
                const errorHanlder = new HttpRequestErrorHandler(error);
                errorHanlder.handleAxiosError();
                toast.error(errorHanlder.message);
            });
        setShowConfirm(false);
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    return (
        <div className="AdminUpdate">
            <div className="admin-update-header">
                <h2 className="title">Chỉnh Sửa Thông Tin Cá Nhân</h2>
            </div>
            <div className="admin-update-body">
                <div className="form-group">
                    <label>Tên tài khoản:</label>
                    <input
                        type="text"
                        name="accountUsername"
                        value={adminData.account?.username}
                        className="form-control"
                    />
                    {errors.accountUsername && (
                        <span className="text-danger">{errors.accountUsername}</span>
                    )}
                </div>

                <div className="form-group">
                    <label>IDcard:</label>
                    <input
                        type="text"
                        name="idcard"
                        value={adminData.idcard}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    {errors.idcard && <span className="text-danger">{errors.idcard}</span>}
                </div>

                <div className="form-group">
                    <label>Tên:</label>
                    <input
                        type="text"
                        name="fullName"
                        value={adminData.fullName}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    {errors.fullName && <span className="text-danger">{errors.fullName}</span>}
                </div>

                <div className="form-group">
                    <label>Ngày sinh:</label>
                    <input
                        type="date"
                        name="birthday"
                        value={adminData.birthday}
                        onChange={handleInputChange}
                        className="form-control"
                    />
                    {errors.birthday && <span className="text-danger">{errors.birthday}</span>}
                </div>

                <div className="form-group">
                    <label>Giới tính:</label>
                    <select
                        name="gender"
                        value={adminData.gender}
                        onChange={handleInputChange}
                        className="form-control"
                    >
                        <option value="">Chọn giới tính</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>
                    {errors.gender && <span className="text-danger">{errors.gender}</span>}
                </div>
            </div>
            <div className="admin-update-footer">
                <Button
                    className="Cancel-save"
                    variant="secondary"
                    onClick={handleCancel}
                >
                    Hủy
                </Button>
                <Button className="save" onClick={handleSubmit}>
                    Lưu thay đổi
                </Button>
            </div>
            {showConfirm && (
                    <Modal className="Confirm-form" show={true} onHide={handleCancel} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Xác nhận</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bạn có chắc chắn muốn cập nhật thông tin này không?</Modal.Body>
                        <Modal.Footer>
                            <Button
                                className="Cancel-confirm"
                                variant="secondary"
                                onClick={handleCancel}
                            >
                                Hủy
                            </Button>
                            <Button className="confirm" variant="primary" onClick={handleConfirm}>
                                Xác nhận
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
        </div>
    );
};

export default AdminUpdate;
