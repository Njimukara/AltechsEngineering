export const initialState = {
    project: [],
    projects: [],
    user: []
}

const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_CURRENT_PROJECT':
            return {
                ...state,
                project: [action.item],
            }
        case 'SET_PROJECTS':
            return {
                ...state,
                projects: [action.item],
            }
        case 'REMOVE_CURRENT_PROJECT': 
            return {
                ...state,
                project: []
            }
        case 'SET_USER':
            return {
                ...state,
                user: [action.user]
            }
        }
};

export default reducer;