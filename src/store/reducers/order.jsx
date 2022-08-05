export default  ( state = { list: [], page: 1, total: 0}, action) => {
    switch (action.type) {
        case "ORDER_LOADED":
            return {...state,list:action.payload.orders,page:action.payload.page,total:action.payload.totalCount};
        default:
            return state;
    }
};
