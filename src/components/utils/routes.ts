import SettingsIcon from '@material-ui/icons/Settings';
import DealerManagement from './../dealerManagement/dealerManagement';
import Home from '../home';

const Routes = [
    {
      path: '/',
      sidebarName: 'MENU.DEALER_CONFIGURATION',
      // navbarName: 'Home',
      icon: SettingsIcon,
      component: DealerManagement,
      exact: true

    },
    {
      path: '/home',
      sidebarName: 'Home',
      navbarName: 'Profile',
      icon: SettingsIcon,
      component: Home,
      exact: false
    }
  ];
  
  export default Routes;