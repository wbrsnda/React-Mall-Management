import { listApi } from "../../services/productCategory";

export const loadProductCategory = payload => async dispatch => {
    // console.log(payload);
    const res = await listApi(payload.page);
    // console.log(res);
    // 当异步操作完成之后通过dispatch触发reducer改变数据
    dispatch({
        type:'PRODUCT_CATEGORY_LOADED',
        payload: {...res,page:payload.page}
    });
};