import React from 'react';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import myReducers from './reducers/myReducer';

const store = createStore(
    myReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function DataProvider({children}) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider;
