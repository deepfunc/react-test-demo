import { all, takeLatest, put, select, call } from 'redux-saga/effects';
import * as type from '../types/bizTable';
import * as actions from '../actions/bizTable';
import { getBizToolbar, getBizTable } from '../selectors';
import * as api from '@/services/bizApi';

export function* watchBizTableFlow() {
    yield all([
        takeLatest(type.BIZ_TABLE_GET_REQ, onGetBizTableData),
        takeLatest(type.BIZ_TABLE_RELOAD, onReloadBizTableData),
        takeLatest(type.BIZ_TABLE_PARAMS_UPDATE, onUpdateBizTableParams)
    ]);
}

export function* onGetBizTableData() {
    /* 先获取 api 调用需要的参数：关键字、分页信息等 */
    const {keywords} = yield select(getBizToolbar);
    const {pagination} = yield select(getBizTable);

    const payload = {
        keywords,
        paging: {
            skip: (pagination.current - 1) * pagination.pageSize, max: pagination.pageSize
        }
    };

    try {
        /* 调用 api */
        const result = yield call(api.getBizTableData, payload);
        /* 正常返回 */
        yield put(actions.putBizTableDataSuccessResult(result));
    } catch (err) {
        /* 错误返回 */
        yield put(actions.putBizTableDataFailResult());
    }
}

export function* onReloadBizTableData() {
    const {pagination} = yield select(getBizTable);
    yield put(actions.updateBizTableParams({paging: {current: 1, pageSize: pagination.pageSize}}));
}

export function* onUpdateBizTableParams() {
    yield put(actions.getBizTableData());
}