import React, { PureComponent } from 'react';
import { Row, Col, Button, Input } from 'antd';
import styles from './styles/bizToolbar.less';

const ButtonGroup = Button.Group;
const Search = Input.Search;

class BizToolbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { keywords: props.keywords };
  }

  render() {
    const { keywords } = this.state;

    return (
      <div className={styles.toolbarContainer}>
        <Row>
          <Col span={12}>
            <ButtonGroup>
              <Button
                icon="reload"
                title="刷新"
                onClick={this.handleReload}
              />
            </ButtonGroup>
          </Col>
          <Col span={12} className={styles.searchCol}>
            <Search
              className={styles.search}
              placeholder="关键字过滤"
              value={keywords}
              onChange={this.handleChangeKeywords}
              onSearch={this.handleSearchKeywords}
            />
          </Col>
        </Row>
      </div>
    );
  }

  handleReload = () => {
    const { reload } = this.props;

    /* istanbul ignore else  */
    if (reload) {
      reload();
    }
  };

  handleChangeKeywords = e => {
    this.setState({ keywords: e.target.value });
  };

  handleSearchKeywords = value => {
    const { updateKeywords } = this.props;

    /* istanbul ignore else  */
    if (updateKeywords) {
      updateKeywords(value);
    }
  };
}

export default BizToolbar;
