import { connect } from 'react-redux';
import { getBizTable } from '@/store/selectors';
import * as actions from '@/store/actions/bizTable';
import BizTable from '@/components/BizTable';

const mapStateToProps = (state) => ({
  ...getBizTable(state)
});

const mapDispatchToProps = {
  getData: actions.getBizTableData,
  updateParams: actions.updateBizTableParams
};

export default connect(mapStateToProps, mapDispatchToProps)(BizTable);
