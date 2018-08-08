import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as type from '../types/bizTable';

export const defaultState = Immutable({
    loading: false,
    pagination: {
        current: 1,
        pageSize: 15,
        total: 0
    },
    data: []
});

export default handleActions(
    {
        [type.BIZ_TABLE_GET_REQ]: (state) => state.set('loading', true),

        [type.BIZ_TABLE_GET_RES_SUCCESS]: (state, {payload}) => {
            return state.merge(
                {
                    loading: false,
                    pagination: {total: payload.total},
                    data: payload.items
                },
                {deep: true}
            );
        },

        [type.BIZ_TABLE_GET_RES_FAIL]: (state) => state.set('loading', false),

        [type.BIZ_TABLE_PARAMS_UPDATE]: (state, {payload: {paging}}) => {
            return state.merge(
                {
                    pagination: {current: paging.current, pageSize: paging.pageSize}
                },
                {deep: true}
            );
        }
    },
    defaultState
);