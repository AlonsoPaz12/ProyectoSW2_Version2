// ButtonConcreteProduct.jsx
import React from 'react';
import styles from './Button.module.css';
import { Button } from 'react-bootstrap';
import { RiArrowGoBackFill, RiSkipRightLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';

export const ButtonStyle1 = ({ texto, page }) => {
  const router = useRouter()
  return (
    <Button variant="dark" onClick={() => router.push(`/${page}`)} className={styles.estiloUno}>
      {texto}
    </Button>
  );
};

export const ButtonStyle2 = ({ texto }) => {
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <Button variant="secondary" onClick={handleGoBack} style={{borderRadius: '10px', width: '250px'}}> 
      <RiArrowGoBackFill/> {texto}
    </Button>
  );
};

export const ButtonStyle3 = ({ texto, page }) => {
  const router = useRouter()
  return (
    <Button onClick={() => { router.push(`/${page}`);}} variant="dark" style={{borderRadius: '10px', width: '250px'}}>
      {texto} <RiSkipRightLine size={'22'}/> 
    </Button>
  );
};
