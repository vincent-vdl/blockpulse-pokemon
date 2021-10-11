import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Card from '../../components/Card';
import Table from '../../components/Table';
import styles from './ResultLayout.module.css';

const GRID_MODE = 'GRID';
const LIST_MODE = 'LIST';

function ResultLayout({ data, mode, onToggle = () => {}, selected = [] }) {
  const resultLayoutClass = cx({
    [styles.ResultLayout]: true,
    [styles.ResultLayout__Grid]: mode === GRID_MODE,
  });

  const handleRowClick = (row) => {
    onToggle(row.id);
  };

  const results = () => {
    switch (mode) {
      case GRID_MODE:
        return data.map((el) => (
          <Card key={el.id} cover={el.sprites.front_default} title={el.name} />
        ));
      case LIST_MODE:
        return <Table data={data} headers={['id', 'name', 'height', 'weight']} onClick={handleRowClick} selected={selected} />;
      default:
        return <Table data={data} headers={['id', 'name', 'height', 'weight']} onClick={handleRowClick} selected={selected} />;
    }
  };

  return (
    <div className={resultLayoutClass}>
      {results()}
    </div>
  );
}

ResultLayout.propTypes = {
  data: PropTypes.array,
  mode: PropTypes.string,
  onToggle: PropTypes.func,
  selected: PropTypes.array
};

export default ResultLayout;
