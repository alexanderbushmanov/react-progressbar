import { createSelector } from 'reselect'

export const allProgressbarsSelector = (state) => state.progressbar;

export const idSelector = (_, props) => props.id;

export const createProgressbarSelector = () => createSelector(allProgressbarsSelector, idSelector, (progressbars, id) => progressbars.get(id));
