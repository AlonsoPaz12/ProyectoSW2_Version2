'use client';

import styles from './page.module.css';
import SideNavBar from '@/components/SideNavBar/SideNavBar';
import Box from '@mui/material/Box';
import UserMenu from '@/components/UserMenu/UserMenu';

const HistorialCitas = () => {

  return (
    <Box sx={{display: "flex", backgroundColor:"#E7F6F1", height: "100vh", width: "100%"}}>
      <SideNavBar></SideNavBar>

      <Box sx={{flexDirection: "column", margin: "2em", width: "100%"}}>
        <div className={styles.cabecera}>
          <UserMenu/>
        </div>
        
        <div>TITULO</div>
        
        rsdgsdf
        wrsdgvesd
        wrsdgvefsdc
        <p>efsvfdv</p>
      </Box>
    </Box>
  );
};

export default HistorialCitas;
