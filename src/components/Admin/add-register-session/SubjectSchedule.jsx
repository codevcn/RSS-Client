import { createSelector } from '@reduxjs/toolkit'
import { vi } from 'date-fns/locale'
import moment from 'moment'
import { Fragment, useEffect, useRef, useState } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { DayPicker } from 'react-day-picker'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '../../../hooks/toast.js'
import { FillFormWithDataset } from '../../../lib/test.jsx'
import { setUpSubjectSchedule } from '../../../redux/reducers/registerSessionReducers.js'
import {
    DAYS_RANGE_FOR_LEARNING_DATE,
    END_DATE_OF_MONTH_IN_SCHEDULE,
    END_MONTH_IN_SCHEDULE,
    STARTING_DATE_OF_MONTH_IN_SCHEDULE,
    STARTING_MONTH_IN_SCHEDULE,
} from '../../../utils/constants/schedule.js'
import { SelectTeachers } from './SelectTeachers.jsx'
import {
    beginDate_inputId,
    dayOfWeek_inputId,
    endDate_inputId,
    learningDate_eventId,
    numberOfSessions_inputId,
    roomCode_inputId,
    slotsCount_inputId,
    startingSession_inputId,
    teacher_form_groups,
} from './sharings.js'

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

const DatePickerDialog = ({ rhfRegister, rhfSetValue, errors, teacherCode }) => {
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

    useEffect(() => {
        document.addEventListener(learningDate_eventId + teacherCode, function (e) {
            const { endDate, beginDate } = e.detail
            setEndDateHandler(new Date(endDate * 1))
            setBeginDateHandler(new Date(beginDate * 1))
        })

        return () => {
            document.removeEventListener(learningDate_eventId + teacherCode, () => {})
        }
    }, [])

    useEffect(() => {
        rhfSetValue(endDate_inputId, endDate.getTime().toString(10))
        rhfSetValue(beginDate_inputId, beginDate.getTime().toString(10))
    }, [beginDate, endDate])

    return (
        <div className="date-picker-container">
            <div className="form-group">
                <label>Thời gian học:</label>
                <div className="date-picker-btn">
                    <span>Từ</span>
                    <button
                        type="button"
                        className="add-learning-date"
                        onClick={() => handleShowDialog(true)}
                    >
                        <span>
                            {beginDate
                                ? moment(beginDate).format('DD-MM-YYYY')
                                : 'Chọn thời gian bắt đầu'}
                        </span>
                        <i className="bi bi-caret-down-fill"></i>
                    </button>
                    <span>đến</span>
                    <button
                        type="button"
                        className="add-learning-date"
                        onClick={() => handleShowDialog(true)}
                    >
                        <span>
                            {endDate
                                ? moment(endDate).format('DD-MM-YYYY')
                                : 'Chọn thời gian kết thúc'}
                        </span>
                        <i className="bi bi-caret-down-fill"></i>
                    </button>
                </div>
                <div className="display-date-in-text">
                    <span>
                        <i className="bi bi-arrow-right-circle"></i>
                    </span>
                    <span>{`Thời gian giảng dạy bắt đầu từ ngày ${beginDate.getDate()} tháng ${beginDate.getMonth() + 1} năm ${beginDate.getFullYear()}`}</span>
                    <span>{` đến ngày ${endDate.getDate()} tháng ${endDate.getMonth() + 1} năm ${endDate.getFullYear()}.`}</span>
                </div>
                <div className="message">
                    {errors[beginDate_inputId] && (errors[beginDate_inputId].message || '')}
                </div>
            </div>

            <div hidden>
                <input type="text" {...rhfRegister(endDate_inputId)} />
                <input type="text" {...rhfRegister(beginDate_inputId)} />
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
                    <div className="begin-end-date-pickers">
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
                                fromDate={moment(beginDate)
                                    .add(DAYS_RANGE_FOR_LEARNING_DATE, 'days')
                                    .toDate()}
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

const teachersSelector = (pickedSubjectCode) =>
    createSelector(
        (state) => state.registerSession.teachers,
        (teachers) => {
            return pickedSubjectCode
                ? teachers?.find(({ subject }) => subject.code === pickedSubjectCode)?.teachers
                : null
        }
    )

const checkOverlapDate = (preDate, newDate) => {
    const preBeginDate = moment(new Date(preDate.beginDate * 1))
    const preEndDate = moment(new Date(preDate.endDate * 1))
    const newBeginDate = moment(new Date(newDate.beginDate * 1))
    const newEndDate = moment(new Date(newDate.endDate * 1))
    return preBeginDate.isSameOrBefore(newEndDate) && preEndDate.isSameOrAfter(newBeginDate)
}

const checkOverlapStartingSession = (preSchedule, newSchedule) => {
    return (
        preSchedule.startingSession <=
            newSchedule.startingSession * 1 + newSchedule.numberOfSessions * 1 - 1 &&
        newSchedule.startingSession <=
            preSchedule.startingSession * 1 + preSchedule.numberOfSessions * 1 - 1
    )
}

const checkUniqueSubjectSchedule = (subjectSchedules, newSchedule) => {
    console.log('>>> info validation >>>', { subjectSchedules, newSchedule })
    const { dayOfWeek, startingSession, teacher, roomCode, pickingClass } = newSchedule
    if (!subjectSchedules) return
    let id_for_schedule
    for (const scheduledSubject of subjectSchedules) {
        id_for_schedule = 0
        for (const schedule of scheduledSubject.schedules) {
            id_for_schedule++
            const subject = scheduledSubject.subject.code
            if (
                teacher.code !== schedule.teacher.code &&
                pickingClass.code !== schedule.forClass.code
            ) {
                if (roomCode !== schedule.roomCode) {
                    continue
                }
            }
            if (checkOverlapDate(schedule, newSchedule)) {
                if (dayOfWeek * 1 === schedule.dayOfWeek * 1) {
                    if (startingSession * 1 === schedule.startingSession * 1) {
                        throw new Error(
                            `Trùng tiết bắt đầu với môn học ${subject} tại lịch dạy số ${id_for_schedule}.`
                        )
                    }
                    if (checkOverlapStartingSession(schedule, newSchedule)) {
                        throw new Error(
                            `Tiết bắt đầu không hợp lệ với môn học ${subject} tại lịch dạy số ${id_for_schedule}.`
                        )
                    }
                }
            }
        }
    }
}

function validateScheduleDate(beginDate, endDate) {
    const momentBeginDate = moment(new Date(beginDate * 1))
    const momentEndDate = moment(new Date(endDate * 1))
    const diffDays = momentEndDate.diff(momentBeginDate, 'days')
    return diffDays < DAYS_RANGE_FOR_LEARNING_DATE
}

const TeacherSchedule = ({
    index,
    pickedSubject,
    teacher,
    subjectSchedules,
    dispatch,
    toast,
    rooms,
    pickingClass,
}) => {
    const {
        register,
        formState: { errors },
        setValue,
        setError,
        handleSubmit,
    } = useForm()
    const [formRowMsg, setFormRowMsg] = useState(null)

    const fillForm = (data) => {
        if (data && data.teacher && data.teacher.code !== teacher.code) return
        const { dayOfWeek, numberOfSessions, startingSession, roomCode, endDate, beginDate } = data
        const config = { shouldValidate: false }
        setValue(dayOfWeek_inputId, dayOfWeek || '', config)
        setValue(numberOfSessions_inputId, numberOfSessions || '', config)
        setValue(startingSession_inputId, startingSession || '', config)
        setValue(roomCode_inputId, roomCode || '', config)
        if (endDate && beginDate) {
            const learningDateEvent = new CustomEvent(learningDate_eventId + teacher.code, {
                detail: { endDate, beginDate },
            })
            document.dispatchEvent(learningDateEvent)
        }
    }

    useEffect(() => {
        if (pickedSubject === null || subjectSchedules === null) return
        const subject_schedules = subjectSchedules.find(
            ({ subject }) => subject.code === pickedSubject.code
        )
        if (!subject_schedules) return
        const teacher_schedule = subject_schedules.schedules.find(
            ({ teacher: { code }, forClass }) =>
                code === teacher.code && pickingClass.code === forClass.code
        )
        if (!teacher_schedule) return
        fillForm(teacher_schedule || {})
    }, [pickedSubject])

    const validateForm = ({
        dayOfWeek,
        numberOfSessions,
        startingSession,
        roomCode,
        endDate,
        beginDate,
        slotsCount,
    }) => {
        const validation_errors = []

        if (!dayOfWeek) {
            validation_errors.push({
                id: dayOfWeek_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        } else {
            const { range, label } = teacher_form_groups.find(({ id }) => id === dayOfWeek_inputId)
            const min = range[0].value
            const max = range[range.length - 1].value
            if (dayOfWeek < min || dayOfWeek > max || !/^[0-9]{1,2}$/.test(dayOfWeek)) {
                validation_errors.push({
                    id: dayOfWeek_inputId,
                    message: `Trường "${label}" phải là một số nguyên từ ${min} đến ${max}!`,
                })
            }
        }
        if (!numberOfSessions) {
            validation_errors.push({
                id: numberOfSessions_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        } else {
            const { min, max, label } = teacher_form_groups.find(
                ({ id }) => id === numberOfSessions_inputId
            )
            if (
                numberOfSessions * 1 < min ||
                numberOfSessions * 1 > max ||
                !/^[0-9]{1,2}$/.test(numberOfSessions)
            ) {
                validation_errors.push({
                    id: numberOfSessions_inputId,
                    message: `Trường "${label}" phải là một số nguyên từ ${min} đến ${max}!`,
                })
            }
        }
        if (!startingSession) {
            validation_errors.push({
                id: startingSession_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        } else {
            const { min, max, label } = teacher_form_groups.find(
                ({ id }) => id === startingSession_inputId
            )
            if (
                startingSession * 1 < min ||
                startingSession * 1 > max ||
                !/^[0-9]{1,2}$/.test(startingSession)
            ) {
                validation_errors.push({
                    id: startingSession_inputId,
                    message: `Trường "${label}" phải là một số nguyên từ ${min} đến ${max}!`,
                })
            }
        }
        if (!roomCode || roomCode === 'none') {
            validation_errors.push({
                id: roomCode_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        }
        if (!slotsCount) {
            validation_errors.push({
                id: slotsCount_inputId,
                message: 'Vui lòng không bỏ trống trường này!',
            })
        } else {
            const { min, max, label } = teacher_form_groups.find(
                ({ id }) => id === slotsCount_inputId
            )
            if (slotsCount * 1 < min || slotsCount * 1 > max || !/^[0-9]{1,3}$/.test(slotsCount)) {
                validation_errors.push({
                    id: slotsCount_inputId,
                    message: `Trường "${label}" phải là một số nguyên từ ${min} đến ${max}!`,
                })
            }
        }
        if (validateScheduleDate(beginDate, endDate)) {
            validation_errors.push({
                id: beginDate_inputId,
                message: `Trường "Thời gian học" không hợp lệ! Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu 30 ngày.`,
            })
        }

        const is_invalid = validation_errors.length > 0

        if (is_invalid) {
            for (const err of validation_errors) {
                setError(err.id, { message: err.message })
            }

            throw new Error('Không thể lưu thông tin, biểu mẫu nhập không hợp lệ!')
        }
    }

    const submitForm = (data) => {
        try {
            if (!pickingClass) {
                throw new Error('Lớp học chưa được chọn')
            }
            validateForm(data)
            checkUniqueSubjectSchedule(subjectSchedules, { ...data, teacher, pickingClass })
        } catch (error) {
            const err_msg = error.message
            toast.error(err_msg.length > 100 ? err_msg.slice(0, 100) : err_msg)
            setFormRowMsg({ fail: error.message })
            return
        }

        dispatch(
            setUpSubjectSchedule({
                forClass: pickingClass,
                teacher: { code: teacher.code },
                subject: { code: pickedSubject.code },
                schedule: data,
            })
        )

        toast.success('Lưu thông tin môn học thành công!')
        setFormRowMsg({ success: 'Đã lưu thông tin môn học' })
    }

    return (
        <form onSubmit={handleSubmit(submitForm)} className="main-form-section form-row">
            <FillFormWithDataset
                onclick={() => {
                    fillForm({
                        dayOfWeek: 2,
                        numberOfSessions: 2,
                        roomCode: '2A01',
                        startingSession: 1,
                        teacher,
                    })
                }}
                top={`${index * 30}px`}
                right={`${index * 30}px`}
            />
            <div className="form-row-title">
                <p>
                    Giảng viên <strong>{teacher.code}</strong>
                </p>
            </div>

            {formRowMsg && (
                <div className={`form-row-message ${formRowMsg.success ? 'success' : 'fail'}`}>
                    {formRowMsg.success ? (
                        <>
                            <i className="bi bi-check-circle-fill"></i>
                            <span>{formRowMsg.success}</span>
                        </>
                    ) : (
                        <>
                            <i className="bi bi-exclamation-triangle-fill"></i>
                            <span>{formRowMsg.fail}</span>
                        </>
                    )}
                </div>
            )}

            {teacher_form_groups.map(({ label, id, helper, inputType, range }) => (
                <div key={id} className={`form-group ${id}`}>
                    <label htmlFor={id}>{label + ':'}</label>
                    <div className="input-wrapper">
                        {inputType === 'select' ? (
                            <Form.Select defaultValue="none" name={id} {...register(id)}>
                                <option value="none">{helper}</option>
                                {range.map(({ value, label }) => (
                                    <option value={value} key={value}>
                                        {label}
                                    </option>
                                ))}
                            </Form.Select>
                        ) : (
                            <input
                                type={inputType}
                                id={id}
                                placeholder={helper + '...'}
                                {...register(id)}
                            />
                        )}
                    </div>
                    <div className="message">{errors[id] && (errors[id].message || '')}</div>
                </div>
            ))}

            <div className={`form-group ${roomCode_inputId}`}>
                <label htmlFor={roomCode_inputId}>Chọn phòng học</label>
                <div className="input-wrapper">
                    <Form.Select
                        defaultValue="none"
                        name={roomCode_inputId}
                        {...register(roomCode_inputId)}
                    >
                        <option value="none">Chọn phòng học</option>
                        {rooms.map(({ roomCode }) => (
                            <option value={roomCode} key={roomCode}>
                                {roomCode}
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <div className="message">
                    {errors[roomCode_inputId] && (errors[roomCode_inputId].message || '')}
                </div>
            </div>

            <DatePickerDialog
                teacherCode={teacher.code}
                rhfRegister={register}
                rhfSetValue={setValue}
                errors={errors}
            />

            <button type="submit" className="save-data-btn">
                <span>
                    <i className="bi bi-plus-circle-fill"></i>
                </span>
                <span>Thêm lịch học</span>
            </button>
        </form>
    )
}

export const TeacherSection = ({ pickedSubject }) => {
    const teachers = useSelector(teachersSelector(pickedSubject?.code))
    const { subjectSchedules, datasets, classesForStudent } = useSelector(
        ({ registerSession }) => registerSession
    )
    const dispatch = useDispatch()
    const toast = useToast()

    return (
        <section className="form-section teacher">
            {pickedSubject && <label className="form-section-label">Giảng viên giảng dạy:</label>}

            {pickedSubject && (
                <SelectTeachers
                    pickedSubject={pickedSubject}
                    teachers={teachers}
                    teachersDataset={datasets.teachers}
                    pickingClass={classesForStudent.pickingClass}
                />
            )}

            {pickedSubject && teachers && teachers.length > 0 && (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã giảng viên</th>
                                <th>Tên giảng viên</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teachers.map((teacher, index) => (
                                <Fragment key={teacher.code}>
                                    <tr>
                                        <td className="picked-result-table-cell code">
                                            {teacher.code}
                                        </td>
                                        <td className="picked-result-table-cell name">
                                            {teacher.name}
                                        </td>
                                    </tr>
                                    <tr className="table-form-row">
                                        <td colSpan={2} className="picked-result-table-cell">
                                            <TeacherSchedule
                                                pickedSubject={pickedSubject}
                                                index={index + 1}
                                                teacher={teacher}
                                                subjectSchedules={subjectSchedules}
                                                dispatch={dispatch}
                                                toast={toast}
                                                rooms={datasets.rooms}
                                                pickingClass={classesForStudent.pickingClass}
                                            />
                                        </td>
                                    </tr>
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </section>
    )
}
