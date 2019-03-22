import { all, takeLatest, put } from 'redux-saga/effects';
import * as type from '../types/bizToolbar';
import * as bizTableActions from '../actions/bizTable';

export function* watchBizToolbarFlow() {
  yield all([
    takeLatest(type.BIZ_TOOLBAR_KEYWORDS_UPDATE, onUpdateKeywords),
    takeLatest(type.BIZ_TOOLBAR_RELOAD, onReload)
  ]);
}

export function* onUpdateKeywords() {
  yield put(bizTableActions.reloadBizTableData());
}

export function* onReload() {
  yield put(bizTableActions.reloadBizTableData());
}
