export default  ( state = { list: [], page: 1, total: 0}, action) => {
    switch (action.type) {
        case 'SCREENING':
            return {...state,list:action.payload.products,page:action.payload.page,total:action.payload.totalCount};
        default:
            return state;
    }
};
