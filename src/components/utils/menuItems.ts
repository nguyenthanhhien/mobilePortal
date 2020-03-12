import SettingsIcon from '@material-ui/icons/Settings';
import DealerManagement from '../dealerManagement/dealerManagement';
import Home from '../home';

const MenuItems = [
    {
      path: '/dealers',
      name: 'MENU.DEALER_CONFIGURATION',
      icon: SettingsIcon,
      component: DealerManagement,
      exact: true

    },
    {
      path: '/home',
      name: 'Home',
      icon: SettingsIcon,
      component: Home,
      exact: false
    }
  ];
  
  export default MenuItems;