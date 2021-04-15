import React from 'react';
import { makeStyles } from '@material-ui/core';
import _ from 'lodash';
// eslint-disable-next-line no-restricted-imports
import PodiumImage from '../../../assets/podium.svg';
import styles from './podium.module.css';

interface IPodiumProps {
  some?: string;
}

const Podium: React.FC<IPodiumProps> = () => (
  <>
    <div className={styles.podium2}>podium</div>
    {/* <div style={{ backgroundImage: `url(data:image/svg+xml;base64,${btoa(PodiumImage)})`, width: '200px', height: '200px' }} /> */}
    {/* <PodiumImage /> */}
  </>
);

export default Podium;
