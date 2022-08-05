import { getOneByName } from "../../services/products";

export const screening = payload => async dispatch => {
    console.log(payload)
    const res = await getOneByName(payload.name,payload.page);
    // const res = await listApi(payload.page);
    console.log(res);
    // 当异步操作完成之后通过dispatch触发reducer改变数据
    dispatch({
        type:'SCREENING',
        payload: {...res,page:payload.page}
    });
};