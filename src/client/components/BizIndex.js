import React from 'react';
import BizToolbar from '@/containers/BizToolbar';
import BizTable from '@/containers/BizTable';
import styles from './styles/bizIndex.less';

const BizIndex = () => (
  <div className={styles.indexContainer}>
    <BizToolbar/>
    <BizTable/>
  </div>
);

export default BizIndex;
