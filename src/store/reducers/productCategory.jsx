export default  ( state = { list: [], page: 1, total: 0}, action) => {
    switch (action.type) {
        case "PRODUCT_CATEGORY_LOADED":
            return {...state,list:action.payload.categories,page:action.payload.page,total:action.payload.totalCount};
        default:
            return state;
    }
};
