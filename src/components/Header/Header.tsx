import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => (
  <header className={styles.Header} data-testid="Header">
    <Link to="/" className='article'>GRAPHFLIX</Link>
  </header>
);

export default Header;
