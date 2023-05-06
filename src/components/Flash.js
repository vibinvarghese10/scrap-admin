import React, {useEffect} from 'react'

function Flash({message, visibility, setVisibility, type}) {


    useEffect(() => {
         if(visibility===true){
            setTimeout(() => {
                setVisibility(false);
            }, 6000);
          }

    }, [visibility, setVisibility]);

  return (
 <>
 {visibility && (
  <div style={{backgroundColor:"red", position:"fixed", bottom:10, right:0, backgroundColor:"transparent", display:"flex", width:"100vw"}}>
  <div style={{backgroundColor:"#e7eae5", borderRadius:5, display:"flex", padding:10, margin:"auto", color: type==="red" ? "red" : "dodgerblue", borderColor:type==="red" ? "red" : "dodgerblue", borderWidth:2, borderStyle:"solid"}}>
     <h1 style={{margin:"auto 0 auto 0"}}>{message}</h1> 
    </div>
  </div>   
 )
}
 </>
   
      
  )
}

export default Flash