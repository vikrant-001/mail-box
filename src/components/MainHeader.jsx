import { useDispatch } from 'react-redux'
import classes from './MainHeader.module.css'
import { authActions } from './Auth/AuthSlice';
import { useState } from 'react';
import MailEditor from './Mail/MailEditor';

const MainHeader = () => {
    const dispatch = useDispatch();
    const [compose,setCompose] = useState(false)
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    const composeHandler = () => {
        setCompose(!compose);
    }
    return (
        <div className={classes.mainHeadCont}>
            <div className={classes.navb}>
                <p>Welcome To MailBox</p>
                <button onClick={logoutHandler}>LogOut</button>
            </div>

            <div className={classes.mainAside}>
                <p onClick={composeHandler}>Compose</p>
                <p>Sent</p>
                <p>Inbox</p>
            </div>

            {compose && <MailEditor/>}

        </div>
    )
}
export default MainHeader;