export const pagination = {
  size: 'small',
  showTotal: (total, range) => `${range[0]}-${range[1]} / ${total}`,
  pageSizeOptions: ['15', '25', '40', '60'],
  showSizeChanger: true,
  showQuickJumper: true
};
