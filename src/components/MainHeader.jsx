import { useDispatch } from 'react-redux'
import classes from './MainHeader.module.css'
import { authActions } from './Auth/AuthSlice';
import { useState } from 'react';
import MailEditor from './Mail/MailEditor';
import SentMail from './Mail/SentMail';
import InboxMail from './Mail/InboxMail';
import { Outlet } from 'react-router-dom';

const MainHeader = () => {
    const dispatch = useDispatch();
    const [compose,setCompose] = useState(true)
    const [sent,setSent] = useState(false)
    const [inbox,setInbox] = useState(false)
    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    const composeHandler = () => {
        setCompose(!compose);
        setInbox(false);
        setSent(false)
    }

    const sentHandler = () => {
        setSent(!sent);
        setInbox(false);
        setCompose(false);
    }

    const InboxHandler = () => {
        setInbox(!inbox);
        setCompose(false);
        setSent(false)
    }
    return (
        <div className={classes.mainHeadCont}>
            <div className={classes.navb}>
                <p>Welcome To MailBox</p>
                <button onClick={logoutHandler}>LogOut</button>
            </div>

            <div className={classes.mainAside}>
                <p onClick={composeHandler}>Compose</p>
                <p onClick={sentHandler}>Sent</p>
                <p onClick={InboxHandler}>Inbox</p>
            </div>

            {compose && <MailEditor/>}
            {sent && <SentMail/>}
            {inbox && <InboxMail/>}
        <Outlet/>
        </div>
    )
}
export default MainHeader;