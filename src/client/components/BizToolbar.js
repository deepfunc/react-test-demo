import React from 'react';
import { Icon, Button, Input, Row, Col } from 'antd';
import styles from './styles/bizToolbar.less';

const ButtonGroup = Button.Group;
const Search = Input.Search;

const BizToolbar = (props) => (
    <div className={styles.toolbarContainer}>
        <Row>
            <Col span={12}>
                <ButtonGroup>
                    <Button
                        icon="reload"
                        title="刷新"
                        // onClick={this.handleReload}
                    />
                </ButtonGroup>
            </Col>
            <Col span={12} className={styles.searchCol}>
                <Search
                    className={styles.search}
                    placeholder="关键字过滤"
                    // value={keywords}
                    // onChange={this.handleChangeKeywords}
                    // onSearch={this.handleSearchKeywords}
                />
            </Col>
        </Row>
    </div>
);

export default BizToolbar;