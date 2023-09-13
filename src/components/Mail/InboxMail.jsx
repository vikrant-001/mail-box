import { useEffect, useState } from "react";
import classes from "./InboxMail.module.css"
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from '../Auth/AuthSlice'

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
            values[i].read = false;
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
        const newdata = userMail.findIndex((value) => value.id === item.id);
        userMail[newdata].read =  true;
        setUserMail(userMail);
        console.log('new : ',userMail)
        dispatch(authActions.setItem(item))
        setRead(true);
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
                    <NavLink to={'/mailDetails'}  ><button onClick = {detailHandler.bind(null,item)} className={item.read ? classes.btn2 : classes.btn}>Read</button></NavLink>
                </div>
            ))
        }
    </div>)
}
export default InboxMail;

