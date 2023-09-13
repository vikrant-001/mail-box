import { useEffect, useState } from "react";
import classes from "./InboxMail.module.css"
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {authActions} from '../Auth/AuthSlice'

const InboxMail = () => {
    const dispatch = useDispatch()
    const email = localStorage.getItem('email');
    const [userMail ,setUserMail] = useState();
    const [read,setRead] = useState(false);
    const fetchDataHandler = async () => {
        if(!email){
            return;
        }
        console.log(email);

        let newUrl = '';
        for(let i of email){
            if(i === '@'){
                break;
            }
            newUrl += i;
        }
        console.log('check')
        const response = await fetch(`https://react-dummy-c727f-default-rtdb.firebaseio.com/${newUrl}.json`);
        const data = await response.json();
        console.log(data);
        if(data === null){
            return;
        }
        const values = Object.values(data);
        const key = Object.keys(data);

        for(let i = 0 ; i < values.length;i++){
            values[i].id = key[i];
        }
        console.log(values)
        setUserMail(values);
    }

    useEffect(() => {
        fetchDataHandler()
    },[]);

    if(userMail === undefined){
        return;
    }

    const detailHandler = (item) =>{
        dispatch(authActions.setItem(item))
        setRead(true)
    }

    const deleteHandler = async (id) => {
        if(!email){
            return;
        }
        console.log(email);

        let newUrl = '';
        for(let i of email){
            if(i === '@'){
                break;
            }
            newUrl += i;
        }
        try{
            const response = await fetch(`https://react-dummy-c727f-default-rtdb.firebaseio.com/${newUrl}/${id}.json`,{
                method:'DELETE',
                headers:{
                    'Content-Type': 'application/json' 
                },
            })
            if(!response.ok){
                throw new Error("Unable to Delete");
            }
            const data = await response.json();
            console.log("Delete SuccessFul",data);
        }
        catch(error){
            alert(error);
        }
    }
    if(userMail === undefined){
        alert("mail box is Empty");
        return;
    }
    return(<div className={classes.contInbox}>
        {
            userMail.map((item) => (
                <div key={item.id} className={classes.inboxDis}>
                    <p>{item.from}</p>
                    <p>{item.mailDis}</p>
                    <button className={classes.btn2} onClick={deleteHandler.bind(null,item.id)}>Del</button>
                    <Link to={'/mailDetails'}><button  className={read ? classes.btn2 : classes.btn} onClick = {detailHandler.bind(null,item)}>Read</button></Link>
                </div>
            ))
        }
    </div>)
}
export default InboxMail;

