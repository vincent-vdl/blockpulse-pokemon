import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';

function Card({ id, title, cover, children }) {
  return (
    <div className={styles.Card}>
      <img src={cover} alt="pokemon cover" />
      <strong>{title}</strong>
      {children}
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number,
  cover: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

export default Card;
