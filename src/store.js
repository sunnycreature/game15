import { createStore } from 'redux';
import { rootReducer } from './rootReducer';
import fetch from 'node-fetch';
import { LoadTop10 } from './actions';
import { HOST_ADDR } from './const';

export const store = createStore(rootReducer);

fetch(HOST_ADDR)
    .then(res => { return res.text(); })
    .then(res => JSON.parse(res) )
    .then(obj => {
        store.dispatch(LoadTop10(obj.top10));
    });   