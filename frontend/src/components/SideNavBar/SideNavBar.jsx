import {useState} from 'react';
import { useRouter } from 'next/navigation';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { CgCalendarNext } from "react-icons/cg";
import { FaCalendarAlt } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { MdOutlineVaccines } from "react-icons/md";
import { IoDocumentTextSharp } from "react-icons/io5";


const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideNavBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography  sx={{fontFamily: "Staatliches", display: open ? "flex" : "none"}} variant="h5" noWrap component="div">
            <img src='./img/logo.png' height={30} style={{ paddingRight: "0.3em" }}/>
            MedControl+
          </Typography>
          <IconButton onClick={()=>setOpen(!open)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{router.push("/ProximasCitas")}}>
              <ListItemButton
                sx={{
                  color: '#014433',
                  margin:"10px",
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#E7F6F1',
                    borderRadius: "10px",
                    
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                <CgCalendarNext size={25} />
                </ListItemIcon>
                <ListItemText primary="Home" sx={{opacity: open? 1 : 0}}/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{router.push("/HistorialCitas")}}>
              <ListItemButton
                sx={{
                  color: '#014433',
                  margin:"10px",
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#E7F6F1',
                    borderRadius: "10px",
                    
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                <MdOutlineHistory size={25} />
                </ListItemIcon>
                <ListItemText primary="Historial de Citas" sx={{opacity: open? 1 : 0}}/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{router.push("/Calendario")}}>
              <ListItemButton
                sx={{
                  color: '#014433',
                  margin:"10px",
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#E7F6F1',
                    borderRadius: "10px",
                    
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                <FaCalendarAlt size={25} />
                </ListItemIcon>
                <ListItemText primary="Calendario" sx={{opacity: open? 1 : 0}}/>
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{router.push("/Vacunas")}}>
              <ListItemButton
                sx={{
                  color: '#014433',
                  margin:"10px",
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#E7F6F1',
                    borderRadius: "10px",
                    
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                <MdOutlineVaccines size={25} />
                </ListItemIcon>
                <ListItemText primary="Vacunas" sx={{opacity: open? 1 : 0}}/>
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding sx={{ display: 'block' }} onClick={()=>{router.push("/GenerarInformes")}}>
              <ListItemButton
                sx={{
                  color: '#014433',
                  margin:"10px",
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&:hover': {
                    backgroundColor: '#E7F6F1',
                    borderRadius: "10px",
                    
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 1 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                <IoDocumentTextSharp size={25}/>
                </ListItemIcon>
                <ListItemText primary="Generar Informe" sx={{opacity: open? 1 : 0}}/>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
    </div>
    
  );
}
