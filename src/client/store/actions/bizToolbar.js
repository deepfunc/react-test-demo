import { createAction } from 'redux-actions';
import * as type from '../types/bizToolbar';

export const updateKeywords = createAction(type.BIZ_TOOLBAR_KEYWORDS_UPDATE);

export const reload = createAction(type.BIZ_TOOLBAR_RELOAD);
