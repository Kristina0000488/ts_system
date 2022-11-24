import { all } from 'redux-saga/effects';

import  mainSaga from './';


export default function* rootSaga() 
{
    yield all([
        mainSaga(),
    ])
}