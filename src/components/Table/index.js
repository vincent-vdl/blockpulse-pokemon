import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Table.module.css';

function Table({
  data = [], headers = [], onClick = () => {}, selected = [],
}) {
  const handleRowClick = (context) => {
    onClick(context);
  };

  return (
    <table className={styles.Table}>
      <thead>
        <tr>
          {headers.map((title) => (
            <th key={title}>{title}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          const trClass = cx({ [styles.TableRowSelected]: selected.includes(row.id) });
          return (
            <tr className={trClass} key={row.id} onClick={() => handleRowClick(row)}>
              {headers.map((title) => (
                <td key={`${row.id}-${title}`}>{row[title]}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  headers: PropTypes.arrayOf(PropTypes.string),
  selected: PropTypes.array,
  onClick: PropTypes.func,
};

export default Table;
