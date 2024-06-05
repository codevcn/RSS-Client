export const teamGroup_inputId = 'teamGroup'
export const partGroup_inputId = 'partGroup'
export const nameOfClass_inputId = 'nameOfClass'
export const dayOfWeek_inputId = 'dayOfWeek'
export const numberOfSessions_inputId = 'numberOfSessions'
export const startingSession_inputId = 'startingSession'
export const roomCode_inputId = 'roomCode'
export const endDate_inputId = 'endDate'
export const beginDate_inputId = 'beginDate'
export const creditsCount_inputId = 'creditsCount'
export const learningDate_eventId = 'learningDateEventId'
export const slotsCount_inputId = 'slotsCount'
export const regSessCode_inputId = 'regSessCode'
export const beginTime_inputId = 'beginTime'
export const endTime_inputId = 'endTime'

export const register_session_info_form_groups = [
    {
        id: regSessCode_inputId,
        label: 'Mã đợt đăng ký',
        helper: 'Nhập mã đợt đăng ký',
        inputType: 'text',
    },
    {
        id: beginTime_inputId,
        label: 'Thời gian bắt đầu',
        helper: 'Nhập theo định dạng DD/MM/YYYY HH:mm',
        inputType: 'text',
        format: 'DD/MM/YYYY HH:mm',
    },
    {
        id: endTime_inputId,
        label: 'Thời gian kết thúc',
        helper: 'Nhập theo định dạng DD/MM/YYYY HH:mm',
        inputType: 'text',
        format: 'DD/MM/YYYY HH:mm',
    },
]

export const subject_info_form_groups = [
    {
        id: teamGroup_inputId,
        label: 'Nhóm',
        helper: 'Nhập nhóm',
        inputType: 'number',
        min: 1,
        max: 4,
    },
    {
        id: partGroup_inputId,
        label: 'Tổ',
        helper: 'Nhập tổ',
        inputType: 'number',
        min: 1,
        max: 4,
    },
]

export const teacher_form_groups = [
    {
        id: slotsCount_inputId,
        label: 'Số slot',
        helper: 'Nhập số slot',
        inputType: 'number',
        min: 1,
        max: 300,
    },
    {
        id: dayOfWeek_inputId,
        label: 'Thứ',
        helper: 'Nhập thứ trong tuần',
        inputType: 'select',
        range: [
            { value: 2, label: 'Thứ 2' },
            { value: 3, label: 'Thứ 3' },
            { value: 4, label: 'Thứ 4' },
            { value: 5, label: 'Thứ 5' },
            { value: 6, label: 'Thứ 6' },
            { value: 7, label: 'Thứ 7' },
        ],
    },
    {
        id: numberOfSessions_inputId,
        label: 'Số tiết',
        helper: 'Nhập số tiết',
        inputType: 'number',
        max: 12,
        min: 1,
    },
    {
        id: startingSession_inputId,
        label: 'Tiết bắt đầu',
        helper: 'Nhập tiết bắt đầu',
        inputType: 'number',
        max: 12,
        min: 1,
    },
]
