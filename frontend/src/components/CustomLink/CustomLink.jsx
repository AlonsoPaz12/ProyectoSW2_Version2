'use client';

import Link from 'next/link';
import styles from './CustomLink.module.css';

const CustomLink = ({ href, text}) => {
  return (
    <Link className={styles.link} href={href}>
      <span >{text}</span>
    </Link>
  );
};

export default CustomLink;