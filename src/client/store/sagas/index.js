import { all } from 'redux-saga/effects';
import { watchBizToolbarFlow } from './bizToolbar';
import { watchBizTableFlow } from './bizTable';

export default function* () {
  yield all([
    watchBizToolbarFlow(),
    watchBizTableFlow()
  ]);
}
