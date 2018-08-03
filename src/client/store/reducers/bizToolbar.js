import { handleActions } from 'redux-actions';
import Immutable from 'seamless-immutable';
import * as type from '../types/bizToolbar';

const defaultValue = Immutable({
    keywords: ''
});

export default handleActions(
    {
        [type.BIZ_TOOLBAR_KEYWORDS_UPDATE]: (state, {payload}) => state.set('keywords', payload)
    },
    defaultValue
);