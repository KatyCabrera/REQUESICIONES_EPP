import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Info from '@mui/icons-material/Info';
import Warning from '@mui/icons-material/Warning';
import Check from '@mui/icons-material/CheckCircle';
import Error from '@mui/icons-material/RemoveCircle';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import dummy from 'dan-api/dummy/dummyContents';
import messageStyles from 'dan-styles/Messages.scss';
import avatarApi from 'dan-api/images/avatars';
import link from 'dan-api/ui/link';
import useStyles from './header-jss';
import { clearUserData } from '../../redux/actions/userActions';
import { useHistory } from 'react-router-dom';
import { deleteToken } from '../../utils/auth';
import Notifications from './Notifications';

function UserMenu(props) {
  const { classes, cx } = useStyles();
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    openMenu: null
  });
  const history = useHistory();

  const handleMenu = menu => (event) => {
    const { openMenu } = menuState;
    setMenuState({
      openMenu: openMenu === menu ? null : menu,
      anchorEl: event.currentTarget
    });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, openMenu: null });
  };

  const handleLogout = () => {
    clearUserData();
    handleClose();
    history.push("/login");
    deleteToken();
  };

  const { dark } = props;
  const { anchorEl, openMenu } = menuState;
  return (
    <div>
      <Notifications />
      <Button onClick={handleMenu('user-setting')}>
        <Avatar
          alt={dummy.user.name}
          src={dummy.user.avatar}
        />
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={openMenu === 'user-setting'}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to={link.profile}>My Profile</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={link.calendar}>My Calendar</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to={link.email}>
          My Inbox
          <ListItemIcon>
            <Badge className={cx(classes.badge, classes.badgeMenu)} badgeContent={2} color="secondary" />
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} component={Link} to="/">
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.propTypes = {

  dark: PropTypes.bool,
};

UserMenu.defaultProps = {
  dark: false
};

export default UserMenu;
