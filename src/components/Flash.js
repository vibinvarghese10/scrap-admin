import React, {useEffect} from 'react'

function Flash(props) {


    useEffect(() => {
         if(props.visibility===true){
            setTimeout(() => {
                props.setVisibility(false);
            }, 6000);
          }

    }, [props.visibility]);

  return (
 <>
 {props.visibility && (
  <div style={{backgroundColor:"red", position:"fixed", bottom:10, right:0, backgroundColor:"transparent", display:"flex", width:"100vw"}}>
  <div style={{backgroundColor:"#e7eae5", borderRadius:5, display:"flex", padding:10, margin:"auto", color: props.type==="red" ? "red" : "dodgerblue", borderColor:props.type==="red" ? "red" : "dodgerblue", borderWidth:2, borderStyle:"solid"}}>
     <h1 style={{margin:"auto 0 auto 0"}}>{props.message}</h1> 
    </div>
  </div>   
 )
}
 </>
   
      
  )
}

export default Flash