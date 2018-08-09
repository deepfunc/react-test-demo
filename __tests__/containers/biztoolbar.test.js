import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import BizToolbar from '@/containers/BizToolbar';

/* 测试容器组件 BizToolbar */
describe('BizToolbar container', () => {

    const initialState = {
        bizToolbar: {
            keywords: 'some keywords'
        }
    };
    const mockStore = configureStore();
    let store;
    let container;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<BizToolbar store={store}/>);
    });

    /* 测试 state 到 props 的映射是否正确 */
    test('should pass state to props', () => {
        const props = container.props();

        expect(props).toHaveProperty('keywords', initialState.bizToolbar.keywords);
    });

    /* 测试 actions 到 props 的映射是否正确 */
    test('should pass actions to props', () => {
        const props = container.props();

        expect(props).toHaveProperty('reload', expect.any(Function));
        expect(props).toHaveProperty('updateKeywords', expect.any(Function));
    });
});