import { connect } from 'react-redux';
import { getBizToolbar } from '@/store/selectors';
import * as actions from '@/store/actions/bizToolbar';
import BizToolbar from '@/components/BizToolbar';

const mapStateToProps = (state) => ({
    ...getBizToolbar(state)
});

const mapDispatchToProps = {
    reload: actions.reload,
    updateKeywords: actions.updateKeywords
};

export default connect(mapStateToProps, mapDispatchToProps)(BizToolbar);