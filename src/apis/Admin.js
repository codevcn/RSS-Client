export const getAdminInfo_api = () => '/admin/get-admin'
export const updateAdmin_api  = '/admin/update-admin'
export const getOneSubjectInfo_api = (subjectID) => '/subjects/get-subject/' + subjectID
export const getSubjectInfo_api = '/subjects/get-all-subject'
export const createSubjectInfo_api = '/subjects/create-subject'
export const updateSubjectInfo_api = (subjectID) => '/subjects/update-subject/' + subjectID
export const hideSubject_api = (subjectID) => '/subjects/hide-subject/' + subjectID
export const getMajorInfo_api = '/major/get-all-major'
export const getAllUsername_api = '/account/get-all-username'
export const ChangePass_api = '/admin/Change-Password'
export const getAllIDcard_api = 'admin/get-all-idcard'