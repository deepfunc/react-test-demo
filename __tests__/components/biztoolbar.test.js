import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Row, Col, Button, Input } from 'antd';
import BizToolbar from '@/components/BizToolbar';

/* 测试 UI 组件 BizToolbar */
describe('BizToolbar component', () => {

    const props = {
        keywords: 'some keywords',
        reload: sinon.fake(),
        updateKeywords: sinon.fake()
    };
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<BizToolbar {...props}/>);
    });

    afterEach(() => {
        props.reload.resetHistory();
        props.updateKeywords.resetHistory();
    });

    /* 测试是否渲染了正确的功能子组件 */
    test('should render reload button and search input', () => {
        expect(wrapper.find(Button).props()).toHaveProperty('title', '刷新');
        expect(wrapper.find(Input.Search).exists()).toBe(true);
    });

    /* 测试是否渲染了正确的样式 */
    test('should render right class', () => {
        expect(wrapper.childAt(0).hasClass('toolbarContainer')).toBe(true);
        expect(wrapper.find(Col).at(1).hasClass('searchCol')).toBe(true);
    });

    /* 测试刷新按钮点击 */
    test('simulates click button to reload', () => {
        wrapper.find(Button).first().simulate('click');
        expect(props.reload.calledOnce).toBe(true);
    });

    /* 测试搜索框改变值后内部 state 对应值是否正确更新 */
    test('when search input change value, state should change', () => {
        const input = wrapper.find(Input.Search);
        input.props().onChange({target: {value: '123'}});
        expect(wrapper.state('keywords')).toBe('123');
    });

    /* 测试搜索框是否正确触发 updateKeywords */
    test('when click search or enter, should updateKeywords', () => {
        const input = wrapper.find(Input.Search);
        input.props().onSearch('456');
        expect(props.updateKeywords.lastCall.args[0]).toBe('456');
    });
});