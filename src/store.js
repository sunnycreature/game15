import { createStore } from 'redux';
import { rootReducer } from './rootReducer';
import fetch from 'node-fetch';
import { LoadTop10 } from './actions';

export const store = createStore(rootReducer);

/*
fetch('http://localhost:3003/db')
    .then(res => res.text())
    .then(res => JSON.parse(res))
    .then(obj => store.dispatch(LoadTop10(obj.top10)));
*/    