export const teamGroup_inputId = 'teamGroup'
export const nameOfClass_inputId = 'nameOfClass'
export const dayOfWeek_inputId = 'dayOfWeek'
export const numberOfSessions_inputId = 'numberOfSessions'
export const startingSession_inputId = 'startingSession'
export const roomName_inputId = 'roomName'
export const endDate_inputId = 'endDate'
export const beginDate_inputId = 'beginDate'
export const creditsCount_inputId = 'creditsCount'
export const learningDate_eventId = 'learningDateEventId'
export const submitForm_eventId = 'submitFormEventId'

export const schedule_form_groups = [
    {
        id: teamGroup_inputId,
        label: 'Nhóm tổ',
        helper: 'Nhập nhóm tổ',
        inputType: 'text',
    },
    {
        id: nameOfClass_inputId,
        label: 'Tên lớp',
        helper: 'Nhập tên lớp',
        inputType: 'text',
    },
    {
        id: creditsCount_inputId,
        label: 'Số tín chỉ',
        helper: 'Nhập số tín chỉ',
        inputType: 'number',
        min: 1,
        max: 4,
    },
]

export const teacher_form_groups = [
    {
        id: dayOfWeek_inputId,
        label: 'Thứ',
        helper: 'Nhập thứ trong tuần',
        inputType: 'number',
        max: 7,
        min: 1,
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
    {
        id: roomName_inputId,
        label: 'Phòng',
        helper: 'Nhập phòng học',
        inputType: 'text',
    },
]
