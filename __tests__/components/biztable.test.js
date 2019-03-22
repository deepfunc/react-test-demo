import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { Table } from 'antd';
import * as defaultSettingsUtil from '@/utils/defaultSettingsUtil';
import BizTable from '@/components/BizTable';

/* 测试 UI 组件 BizTable */
describe('BizTable component', () => {

  const defaultProps = {
    loading: false,
    pagination: Object.assign({}, {
      current: 1,
      pageSize: 15,
      total: 2
    }, defaultSettingsUtil.pagination),
    data: [{ id: 1 }, { id: 2 }],
    getData: sinon.fake(),
    updateParams: sinon.fake()
  };
  let defaultWrapper;

  beforeEach(() => {
    defaultWrapper = mount(<BizTable {...defaultProps}/>);
  });

  afterEach(() => {
    defaultProps.getData.resetHistory();
    defaultProps.updateParams.resetHistory();
  });

  /* 测试是否渲染了正确的功能子组件 */
  test('should render table and pagination', () => {
    /* 是否渲染了 Table 组件 */
    expect(defaultWrapper.find(Table).exists()).toBe(true);
    /* 是否渲染了 分页器 组件，样式是否正确（mini） */
    expect(defaultWrapper.find('.ant-table-pagination.mini').exists()).toBe(true);
  });

  /* 测试首次加载时数据列表为空是否发起加载数据请求 */
  test('when componentDidMount and data is empty, should getData', () => {
    sinon.spy(BizTable.prototype, 'componentDidMount');
    const props = Object.assign({}, defaultProps, {
      pagination: Object.assign({}, {
        current: 1,
        pageSize: 15,
        total: 0
      }, defaultSettingsUtil.pagination),
      data: []
    });
    const wrapper = mount(<BizTable {...props}/>);

    expect(BizTable.prototype.componentDidMount.calledOnce).toBe(true);
    expect(props.getData.calledOnce).toBe(true);
    BizTable.prototype.componentDidMount.restore();
  });

  /* 测试 table 翻页后是否正确触发 updateParams */
  test('when change pagination of table, should updateParams', () => {
    const table = defaultWrapper.find(Table);
    table.props().onChange({ current: 2, pageSize: 25 });
    expect(defaultProps.updateParams.lastCall.args[0])
      .toEqual({ paging: { current: 2, pageSize: 25 } });
  });
});
