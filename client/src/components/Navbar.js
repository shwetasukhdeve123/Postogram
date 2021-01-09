import React,{useContext} from'react'
import {Link,useHistory} from "react-router-dom"
import {UserContext} from '../App'
const Navbar= ()=> {
   const {state,dispatch}=useContext(UserContext)
   const history=useHistory()
   const renderList=()=>{
      if(state){
         return [
          <li><Link  to ="/profile">Profile</Link></li>,
          <li><Link  to ="/create">Create Post</Link></li>,
          <li><Link  to ="/myfollowingpost">My following posts</Link></li>,
          <li><button className="btn #e53935 red darken-1"  
          onClick ={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/signin')
          }}>
         Logout

         </button>
         </li>
         ]
      }
      else{
        return[
          <li><Link to="/signin">Sign in</Link></li>,
          <li><Link  to="/signup">Sign up </Link></li>
        ]

      }
   }
   return (  <nav>
    <div className="nav-wrapper white">
      <Link to={state?"/":"/signin"} className="brand-logo left" >Postogram</Link>
      <ul id="nav-mobile" className="right ">
        {renderList()}
      </ul>
    </div>
  </nav>
  )
}
export default Navbar