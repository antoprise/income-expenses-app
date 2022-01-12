import Item from "./Item";
import "./transaction.css";

const Transaction = (props)=> {
    const {items} = props;

    return (
        <div>
            <ul className="itemlist">
            {items.map((element) =>{
               return <Item {...element} key={element.id}/>
            })}
        </ul> 
        </div>
       
    )
}
export default Transaction;