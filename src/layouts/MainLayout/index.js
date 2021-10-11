import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './MainLayout.module.css';

function MainLayout({ mode, children }) {
  const mainLayoutClass = cx({
    [styles.MainLayout]: true,
    [styles.MainLayout__Grid]: mode === 'GRID',
  });

  return (
    <div className={mainLayoutClass}>
      {children}
    </div>
  );
}

MainLayout.propTypes = {
  mode: PropTypes.string,
  children: PropTypes.node,
};

export default MainLayout;
