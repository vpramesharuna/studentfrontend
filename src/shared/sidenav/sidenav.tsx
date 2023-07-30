
import '../../App.css';
import React from "react";
class SideNav extends React.Component<any, any>{
   
   render(){
    return (
      <aside className='admin-panel__sidebar col-md-4'>
          <div className="sideText">
            <p>
            <a href="student"><text className="bold">Student</text></a>
            </p>
          </div>
          <div className="sideText">
            <p>
            <a href="department"><text className="bold">Department</text></a>
            </p>
          </div>
      </aside>
    )
   }
}
export default SideNav;