export const getAdminInfo_api = (adminUserName) =>'/admin/get-admin/' + adminUserName
export const updateAdmin_api = (adminId) => '/admin/update-admin/' + adminId
export const getOneSubjectInfo_api = (subjectID) => '/subjects/get-subject/'+subjectID
export const getSubjectInfo_api = '/subjects/get-all-subject';
export const createSubjectInfo_api = '/subjects/create-subject';
export const updateSubjectInfo_api = (subjectID) => '/subjects/update-subject/' + subjectID
export const hideSubject_api = (subjectID) => '/subjects/hide-subject/'+subjectID
export const getMajorInfo_api = '/subjects/get-all-major';