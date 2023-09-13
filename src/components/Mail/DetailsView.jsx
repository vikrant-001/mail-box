import { useSelector } from "react-redux"
import classes from "./DetailsView.module.css"
const DetailsView = () => {
    const data = useSelector((state) => state.auth.itemView);
    console.log(data);
    return (<div className={classes.detailCont}>
        <div className={classes.card}>
        <p>{data.mailDis}</p>
        <p>from : {  data.from}</p>
        </div>
    </div>)
}

export default DetailsView