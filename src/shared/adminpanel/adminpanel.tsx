import React, { Fragment } from 'react';
import { BrowserRouter, Routes, Route,Outlet } from "react-router-dom";
import Header from "../header/header";
import SideNav from "../sidenav/sidenav";
import '../../assets/css/adminpanel.css';
import Student from '../../component/student/student';
import StudentList from '../../component/student/studentList';
import Department from '../../component/department/Department';
interface AdminPanelProps {
    // Add any necessary props here
  }

const AdminPanel: React.FC<AdminPanelProps> = () => {
    return (
      <div className="admin-panel">
        <Header />
        <div className='row'>
            <SideNav />
            <main className="admin-panel__main col-md-8">
            <Fragment>  
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Student />} />
                        <Route path="student" element={<StudentList />} />
                        <Route path="department" element={<Department />} />
                    </Routes>
                    </BrowserRouter>
                  
                    </Fragment>
            </main>
        </div>
      </div>
    );
  };

  export default AdminPanel;