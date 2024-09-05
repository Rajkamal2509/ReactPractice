import { useState } from "react"
import Button from "../Products/Button"


function ProductDetails(props){
  // let ProductCount=0
  let isAvaible ='Available'


  let [ProductCount,updateCount]=useState(0)

  const displayFormattedProductCOunt=()=>{
      return ProductCount >0?ProductCount:'Zero'
  } 
  const mouseHover=()=>{
      
  }
  
  const increment=()=>{
    // ProductCount++
    console.log("gg");
    
    updateCount(++ProductCount)
  }
  
  const decrement=()=>{
    // ProductCount--
    updateCount(--ProductCount)
  }


    let badgeClass='badge'

  badgeClass += props.isAvailable ? ' bg-success' :' bg-danger'
    return(
        <div className="d-flex align-items-center justify-content-start mt-1" onMouseOver={mouseHover()}>
        <h6 className="font-weight-bold my-2" style={{marginRight:'30px'}}>{props.price}</h6>
        <Button eventHandler={increment}> + </Button>
        <span style={{padding:'8px 12px'}}>
          {displayFormattedProductCOunt()}
        </span >
        <Button  eventHandler={decrement}> - </Button>
        <span className={badgeClass}>
          {props.isAvailable ? 'Available':'UnAvailable'}
        </span>
      </div>
    )
}
export default ProductDetails