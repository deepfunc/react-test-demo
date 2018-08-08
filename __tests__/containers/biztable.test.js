import React from 'react';
import Immutable from 'seamless-immutable';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import BizTable from '@/containers/BizTable';

/* 测试容器组件 BizTable */
describe('BizTable container', () => {
    const initialState = Immutable({
        bizTable: {
            loading: false,
            pagination: {
                current: 1,
                pageSize: 15,
                total: 0
            },
            data: []
        }
    });
    const mockStore = configureStore();
    let store;
    let container;

    beforeEach(() => {
        store = mockStore(initialState);
        container = shallow(<BizTable store={store}/>);
    });

    /* 测试 state 到 props 的映射是否正确 */
    test('should pass state to props', () => {
        const props = container.props();
        const {bizTable: bizTableState} = initialState;

        expect(props).toHaveProperty('loading', bizTableState.loading);
        expect(props).toHaveProperty('data', bizTableState.data);
        expect(props).toHaveProperty('pagination');
        expect(props['pagination']).toMatchObject(bizTableState.pagination);
    });

    /* 测试 actions 到 props 的映射是否正确 */
    test('should pass actions to props', () => {
        const props = container.props();

        expect(props).toHaveProperty('getData', expect.any(Function));
        expect(props).toHaveProperty('updateParams', expect.any(Function));
    });
});