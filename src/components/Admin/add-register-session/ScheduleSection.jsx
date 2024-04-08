import { vi } from 'date-fns/locale'
import moment from 'moment'
import { useEffect, useMemo, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { DayPicker } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { setUpSchedule } from '../../../redux/reducers/registerSessionReducers'
import {
    END_DATE_OF_MONTH_IN_SCHEDULE,
    END_MONTH_IN_SCHEDULE,
    STARTING_DATE_OF_MONTH_IN_SCHEDULE,
    STARTING_MONTH_IN_SCHEDULE,
} from '../../../utils/constants/schedule'

const day_picker_modifiers = {
    months: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
    ],
    weekdaysShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    firstDayOfWeek: 1,
}

const DatePickerDialog = () => {
    const [openDialog, setOpenDialog] = useState(false)

    const schedule_range = useRef({
        fromDate: moment({
            year: moment().year(),
            month: STARTING_MONTH_IN_SCHEDULE - 1,
            date: STARTING_DATE_OF_MONTH_IN_SCHEDULE,
        }).toDate(),
        toDate: moment({
            year: moment().year() + 1,
            month: END_MONTH_IN_SCHEDULE - 1,
            date: END_DATE_OF_MONTH_IN_SCHEDULE,
        }).toDate(),
    })
    const [beginDate, setBeginDate] = useState(schedule_range.current.fromDate)
    const [endDate, setEndDate] = useState(schedule_range.current.toDate)

    const handleShowDialog = (show) => {
        setOpenDialog(show)
    }

    const setBeginDateHandler = (date) => {
        setBeginDate(date)
    }

    const setEndDateHandler = (date) => {
        setEndDate(date)
    }

    return (
        <div className="date-picker-container">
            <div className="form-group">
                <label>Thời gian học:</label>
                <div className="date-picker-btn">
                    <span>Từ</span>
                    <button className="add-learning-date" onClick={() => handleShowDialog(true)}>
                        <span>
                            {beginDate
                                ? moment(beginDate).format('DD-MM-YYYY')
                                : 'Chọn thời gian bắt đầu'}
                        </span>
                        <i className="bi bi-caret-down-fill"></i>
                    </button>
                    <span>đến</span>
                    <button className="add-learning-date" onClick={() => handleShowDialog(true)}>
                        <span>
                            {endDate
                                ? moment(endDate).format('DD-MM-YYYY')
                                : 'Chọn thời gian kết thúc'}
                        </span>
                        <i className="bi bi-caret-down-fill"></i>
                    </button>
                </div>
            </div>

            <Modal
                show={openDialog}
                onHide={() => handleShowDialog(false)}
                dialogClassName="add-register-session-dialog date-picker-dialog"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Xếp lịch học</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="begin-end-date-picker">
                        <div className="pick-begin-date pick-date">
                            <h3>Chọn ngày bắt đầu</h3>
                            <DayPicker
                                showOutsideDays
                                mode="single"
                                selected={beginDate}
                                fixedWeeks
                                onSelect={setBeginDateHandler}
                                fromDate={schedule_range.current.fromDate}
                                toDate={schedule_range.current.toDate}
                                locale={vi}
                                months={day_picker_modifiers.months}
                                weekdaysShort={day_picker_modifiers.weekdaysShort}
                                firstDayOfWeek={day_picker_modifiers.firstDayOfWeek}
                            />
                        </div>
                        <div className={`pick-end-date pick-date ${beginDate ? '' : 'inactive'}`}>
                            <h3>Chọn ngày kết thúc</h3>
                            <DayPicker
                                showOutsideDays
                                mode="single"
                                selected={endDate}
                                fixedWeeks
                                fromDate={moment(beginDate).add(31, 'days').toDate()}
                                toDate={schedule_range.current.toDate}
                                onSelect={setEndDateHandler}
                                locale={vi}
                                months={day_picker_modifiers.months}
                                weekdaysShort={day_picker_modifiers.weekdaysShort}
                                firstDayOfWeek={day_picker_modifiers.firstDayOfWeek}
                            />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className="dialog-footer">
                    <button className="close-btn" onClick={() => handleShowDialog(false)}>
                        <span>
                            <i className="bi bi-x-circle"></i>
                        </span>
                        <span>Đóng</span>
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

const get_form_groups = ({
    teamGroup,
    className,
    dayOfWeek,
    numberOfSessions,
    startingSession,
    roomName,
}) => [
    {
        id: 'teamGroup',
        label: 'Nhóm tổ',
        helper: 'Nhập nhóm tổ',
        value: teamGroup,
        inputType: 'text',
    },
    {
        id: 'nameOfClass',
        label: 'Tên lớp',
        helper: 'Nhập tên lớp',
        value: className,
        inputType: 'text',
    },
    {
        id: 'dayOfWeek',
        label: 'Thứ',
        helper: 'Nhập thứ trong tuần',
        value: dayOfWeek,
        inputType: 'number',
    },
    {
        id: 'numberOfSessions',
        label: 'Số tiết',
        helper: 'Nhập số tiết',
        value: numberOfSessions,
        inputType: 'number',
    },
    {
        id: 'startingSession',
        label: 'Tiết bắt đầu',
        helper: 'Nhập tiết bắt đầu',
        value: startingSession,
        inputType: 'number',
    },
    {
        id: 'roomName',
        label: 'Phòng',
        helper: 'Nhập phòng học',
        value: roomName,
        inputType: 'text',
    },
]

const Form = ({ pickedSubject }) => {
    const { schedules } = useSelector(({ registerSession }) => registerSession.data)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const scheduleFormGroups = useMemo(() => {
        if (pickedSubject === null) return null
        if (schedules === null) return get_form_groups({})
        return get_form_groups(
            schedules.find(({ subjectCode }) => pickedSubject.code === subjectCode) || {}
        )
    }, [pickedSubject, schedules])

    const saveData = (data) => {
        dispatch(
            setUpSchedule({
                subject: {
                    code: pickedSubject.code,
                    name: pickedSubject.name,
                },
                teamGroup: data.teamGroup,
                className: data.nameOfClass,
                dayOfWeek: data.dayOfWeek,
                numberOfSessions: data.numberOfSessions,
                startingSession: data.startingSession,
                roomName: data.roomName,
                endDate: '',
                beginDate: '',
                teacher: {
                    code: '',
                    name: '',
                },
            })
        )
    }

    return (
        <form onSubmit={handleSubmit(saveData)} className="main-form">
            <div className="form-group form-group-subject-setting-up">
                <label>Bạn đang nhập lịch học cho môn:</label>
                <div className="subject-setting-up">
                    {pickedSubject ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Mã môn học</th>
                                    <th>Tên môn học</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="picked-result-table-cell code">
                                        {pickedSubject.code}
                                    </td>
                                    <td className="picked-result-table-cell name">
                                        {pickedSubject.name}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <>
                            <i className="bi bi-question-circle-fill"></i>
                            <span>Bạn chưa chọn môn học để nhập lịch học...</span>
                        </>
                    )}
                </div>
            </div>

            {scheduleFormGroups &&
                scheduleFormGroups.map(({ label, id, helper, value, inputType }) => (
                    <div key={id} className={`form-group ${id}`}>
                        <label htmlFor={id}>{label + ':'}</label>
                        <div className="input-wrapper">
                            <input
                                type={inputType}
                                id={id}
                                placeholder={helper + '...'}
                                // value={value} >>> :MARK continue here
                                // onChange={() => {}}
                                {...register(id, { required: true })}
                            />
                        </div>
                        <div className="message">
                            {errors[id] && 'Vui lòng không bỏ trống trường này'}
                        </div>
                    </div>
                ))}

            {scheduleFormGroups && <DatePickerDialog />}

            {scheduleFormGroups && <button className="save-data-btn">Lưu</button>}
        </form>
    )
}

const SubjectsStatus = ({ pickedSubject, onChooseSubject }) => {
    const { subjects } = useSelector(({ registerSession }) => registerSession.data)

    const chooseSubject = ({ code, name }) => {
        onChooseSubject({ code, name })
    }

    return (
        <div className="schedule-main-section-left-side">
            <div className="subjects-status">
                <div className="picked-result-text">Các môn học đã thêm:</div>
                <table className="picked-result-table">
                    <thead>
                        <tr>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Đang nhập lịch học</th>
                        </tr>
                    </thead>

                    <tbody>
                        {subjects &&
                            subjects.length > 0 &&
                            subjects.map(({ code, name }) => (
                                <tr key={code} onClick={() => chooseSubject({ code, name })}>
                                    <td className="picked-result-table-cell code">{code}</td>
                                    <td className="picked-result-table-cell name">{name}</td>
                                    <td className="modal-table-cell picked">
                                        {pickedSubject && pickedSubject.code === code ? (
                                            <i className="bi bi-check-circle-fill"></i>
                                        ) : (
                                            <i className="bi bi-circle"></i>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export const ScheduleSection = () => {
    const [pickedSubject, setPickedSubject] = useState(null)
    const { subjects } = useSelector(({ registerSession }) => registerSession.data)

    useEffect(() => {
        if (pickedSubject !== null) {
            subjectSettingUpHandler(pickedSubject)
        }
    }, [subjects])

    const subjectSettingUpHandler = (data) => {
        if (data === null || subjects === null) return setPickedSubject(null)
        const picked_subject = subjects.find(({ code }) => code === data.code)
        if (picked_subject) {
            setPickedSubject(picked_subject)
        } else {
            setPickedSubject(null)
        }
    }

    return (
        <div className="add-register-session-section schedule-section">
            <div className="section-title">
                <i className="bi bi-chevron-double-right"></i>
                <label>Xếp lịch học</label>
            </div>

            <section className="form-section">
                <SubjectsStatus
                    pickedSubject={pickedSubject}
                    onChooseSubject={subjectSettingUpHandler}
                />
                <Form pickedSubject={pickedSubject} />
            </section>
        </div>
    )
}
