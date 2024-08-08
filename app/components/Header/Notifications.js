import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Check from '@mui/icons-material/CheckCircle';
import Tooltip from '@mui/material/Tooltip';
import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import messageStyles from 'dan-styles/Messages.scss';
import useStyles from './header-jss';
import { clearUserData } from '../../redux/actions/userActions';
import { useHistory } from 'react-router-dom';
import { deleteToken } from '../../utils/auth';
import { formatDate } from '../../utils/general';
import axios from 'axios';

function getNotifcations() {
    return new Promise((resolve, reject) => {
        axios.get("eventRegister/admin/notifications")
          .then(response => resolve(response.data))
          .catch(error => reject(error))
    });
}

function Notifications(props) {
  const { classes, cx } = useStyles();
  const [menuState, setMenuState] = useState({
    anchorEl: null,
    openMenu: null
  });
  const [notificationCount, setNotificationsCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getNotifcations()
        .then(data => {
            setNotifications(data.rows);
            setNotificationsCount(data.count);
        });
    const notificationInterval = setInterval(() => {
        getNotifcations()
        .then(data => {
            setNotifications(data.rows);
            setNotificationsCount(data.count);
        });
    }, 30000)
    return () => {
        clearInterval(notificationInterval)
    }
  }, []);

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
    <>
        <IconButton
            aria-haspopup="true"
            onClick={handleMenu('notification')}
            color="inherit"
            className={cx(classes.notifIcon, dark ? classes.dark : classes.light)}
            size="large">
            {
                notificationCount ?
                <Badge className={classes.badge} badgeContent={notificationCount} color="secondary">
                    <i className="ion-ios-notifications-outline" />
                </Badge>: 
                <i className="ion-ios-notifications-outline" />
            }
        </IconButton>
        <Menu
            id="menu-notification"
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            className={classes.notifMenu}
            PaperProps={{
            style: {
                width: 350,
            },
            }}
            open={openMenu === 'notification'}
            onClose={handleClose}
        >
            {/*<MenuItem onClick={handleClose}>
            <div className={messageStyles.messageInfo}>
                <ListItemAvatar>
                <Avatar alt="User Name" src={avatarApi[0]} />
                </ListItemAvatar>
                <ListItemText primary={dummy.text.subtitle} secondary={dummy.text.date} />
            </div>
            </MenuItem>
            <Divider variant="inset" />
            <MenuItem onClick={handleClose}>
            <div className={messageStyles.messageInfo}>
                <ListItemAvatar>
                <Avatar className={messageStyles.icon}>
                    <Info />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={dummy.text.sentences} className={classes.textNotif} secondary={dummy.text.date} />
            </div>
            </MenuItem>
        <Divider variant="inset" />*/}
            {
                notifications.map(notification => (
                    <>
                        <MenuItem key={notification.id} onClick={handleClose}>
                            <div className={messageStyles.messageSuccess}>
                                <ListItemAvatar>
                                <Avatar className={messageStyles.icon}>
                                    <Check />
                                </Avatar>
                                </ListItemAvatar>
                                <Tooltip title={notification.action}>
                                    <ListItemText primary={notification.action} className={classes.textNotif} secondary={formatDate(notification.createdAt)} />
                                </Tooltip>
                            </div>
                        </MenuItem>
                        <Divider variant="inset" />
                    </>
                ))
            }
            {/*<MenuItem onClick={handleClose}>
            <div className={messageStyles.messageWarning}>
                <ListItemAvatar>
                <Avatar className={messageStyles.icon}>
                    <Warning />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary={dummy.text.subtitle} className={classes.textNotif} secondary={dummy.text.date} />
            </div>
            </MenuItem>
            <Divider variant="inset" />
            <MenuItem onClick={handleClose}>
            <div className={messageStyles.messageError}>
                <ListItemAvatar>
                <Avatar className={messageStyles.icon}>
                    <Error />
                </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Suspendisse pharetra pulvinar sollicitudin. Aenean ut orci eu odio cursus lobortis eget tempus velit. " className={classes.textNotif} secondary="Jan 9, 2016" />
            </div>
            </MenuItem>*/}
        </Menu>
    </>
  );
}

export default Notifications;
