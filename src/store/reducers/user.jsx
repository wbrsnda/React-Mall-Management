export default  ( state = { list: [], page: 1, total: 0}, action) => {
    switch (action.type) {
        case "USER_LOADED":
            return {...state,list:action.payload.users,page:action.payload.page,total:action.payload.totalCount};
        default:
            return state;
    }
};
