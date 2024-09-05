

const btnEvent=()=>{
    console.log("Button clicked");
}

function Button(props)
{
return( 
    <button className="btn btn-primary" onClick={props.eventHandler}>{props.children}</button>
)
}
export default Button