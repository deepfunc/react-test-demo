import React, { PureComponent } from 'react';
import { Table } from 'antd';

class BizTable extends PureComponent {
  constructor(props) {
    super(props);
    this.columns = this.createColumns();
  }

  createColumns() {
    return [
      {
        title: '编码',
        dataIndex: 'code',
        key: 'code'
      },
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '完整名称',
        dataIndex: 'wholeName',
        key: 'wholeName'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
      },
      {
        title: '最后修改时间',
        dataIndex: 'lastModificationTime',
        key: 'lastModificationTime'
      },
      {
        title: '最后修改人',
        dataIndex: 'lastModifierUserId',
        key: 'lastModifierUserId'
      }
    ];
  }

  render() {
    const { loading, pagination, data } = this.props;

    return (
      <Table
        bordered
        rowKey="id"
        columns={this.columns}
        pagination={pagination}
        dataSource={data}
        loading={loading}
        onChange={this.handleTableChange}
      />
    );
  }

  handleTableChange = (pagination) => {
    const { updateParams } = this.props;

    updateParams({
      paging: { current: pagination.current, pageSize: pagination.pageSize }
    });
  };

  componentDidMount() {
    this.initData();
  }

  initData() {
    const { data, getData } = this.props;

    if ((!data || data.length === 0) && getData) {
      getData();
    }
  }
}

export default BizTable;
