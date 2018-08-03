import 'babel-polyfill';
import 'es6-promise/auto';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import store from './store';
import BizIndex from './components/BizIndex';

const App = () => {
    return (
        <Provider store={store}>
            <LocaleProvider locale={zhCN}>
                <BizIndex/>
            </LocaleProvider>
        </Provider>
    );
};

setTimeout(() => {
    ReactDOM.render(<App/>, document.getElementById('app'));
}, 100);