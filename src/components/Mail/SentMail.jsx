import { useEffect, useState } from "react";
import classes from "./SentMail.module.css"
const SentMail = () => {
    const [sentData,setSentData] = useState();
    const email = localStorage.getItem('email');
    console.log(email);
    const sentMailHandler = async () =>{
        let newUrl = 'sent';
        if(!email){
            return;
        }
        for(let i of email){
            if(i === '@'){
                break;
            }
            newUrl += i;
        }
        try{
            const response = await fetch(`https://react-dummy-c727f-default-rtdb.firebaseio.com/${newUrl}.json`);
            if(!response.ok){
                throw new Error("unable to fetch sent");
            }
            const data = await response.json();
            const setData = Object.values(data);
            setSentData(setData);
            console.log(data);
        }

        catch(error){
            alert(error);
        }
    }

    useEffect(() => {
        sentMailHandler()
    },[]);

    if(sentData === undefined ){
        return;
    }

    console.log(sentData);
    return(
        <div className={classes.mainCont}>
            {
                sentData.map((item) => (
                    <div key={item.to} className={classes.cont}>
                    <p> Dis :{item.mailDis}</p>
                    <p> Sent To :{item.to}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default SentMail