import { Fragment, useEffect, useRef, useState } from "react"
import classes from "./MailEditor.module.css"
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import CKEditorInspector from '@ckeditor/ckeditor5-inspector'
const MailEditor = () => {
    const [mail,setMail] = useState('');
    const[check,setCheck] = useState(false);
    console.log(mail);

    const toMailRef = useRef();
    const fromMailRef = useRef();                 

    const mailSentHandler = async (event) => {
        event.preventDefault()
        if(!toMailRef.current.value || !fromMailRef.current.value){
            alert("fill the data first");
            return;
        }

        const toSent = toMailRef.current.value;
        let urlSent = ''
        for(let i of toSent){
            if(i === '@'){
                break;
            }
            urlSent += i;
        }
        console.log(urlSent);

        try{
            const response = await fetch(`https://react-dummy-c727f-default-rtdb.firebaseio.com/${urlSent}.json`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application.json'
                },
                body:JSON.stringify({
                    from:fromMailRef.current.value,
                    mailDis:mail,
                })
            });
            if(!response.ok){
                throw new Error("Unable to sent Mail");
            }
            const data = await response.json();
            setCheck(!check);
            console.log("Mail Sent Successfully",data);
            
        }

        catch(error){
            alert(error);
        }
    }

    const sentItemHandler = async () => {
        const fromUrl = fromMailRef.current.value;
        let newFromUrl = 'sent';
        if(!toMailRef.current.value){
            return;
        }
        for(let i of fromUrl){
            if(i === '@'){
                break;
            }
            newFromUrl += i;
        }
        console.log(newFromUrl);
        try{
            const response = await fetch(`https://react-dummy-c727f-default-rtdb.firebaseio.com/${newFromUrl}.json`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application.json'
                },
                body:JSON.stringify({
                    to:toMailRef.current.value,
                    mailDis:mail,
                }),
            });

            if(!response.ok){
                throw new Error("Enable to set sent");
            }

            const data = await response.json();
            console.log('sent Added successFully',data);
        }

        catch(error){
            alert(error)
        }
    }

    useEffect(() => {
        sentItemHandler()
    },[check])

    return (
        <Fragment>
            <form className={classes.mailMain} >
                <label>From</label>
                <input type="email"  required ref={fromMailRef}/>

                <label>To </label>
                <input type="email"  required ref={toMailRef} />

                <label>Mail</label>
                <CKEditor editor={ClassicEditor}
                    data="abs"
                    onReady={(editor) => {
                        console.log("Editor is Ready to use",editor)
                        CKEditorInspector.attach(editor)
                    }}
                    onChange={(event,editor) => {
                        const data = editor.getData();
                        const newData = data.substring(3,data.length-4)
                        setMail(newData);
                        console.log({event,editor,data})
                        
                    }}
              />
                <button className={classes.sent} onClick={mailSentHandler}>Send</button>
            </form>
        </Fragment>
    )
}

export default MailEditor