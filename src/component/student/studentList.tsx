import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import {Table, Button, Container, Row , Col} from 'react-bootstrap';  
import { environment } from '../../shared/environment/envrironment';
import '../../App.css';
import {Modal} from 'react-bootstrap';
import {FaPencilAlt, FaPlus, FaTrash} from "react-icons/fa";
import Student from './student';

const StudentList = () => {

  const [studentsdetails, setstudentsdetails] = useState([]);
   const [departmentdetails, setdepartmentdetails] = useState([]);
  const [show, setShow] = useState(false);
  const modalClose= () => setShow(false);
  const modelShow = () => setShow(true);
  const [editshow, seteditShow] = useState(false);
    const editmodalClose= () => seteditShow(false);
    const editmodelShow = (id:any) =>
     {
      seteditShow(true);
      getstudentdetailsbyid(id);

    }

  const [studentName, setstudentName] = useState('');
  const [course, setcourse] = useState('');
  const [specialization, setspecialization] = useState('');
  const [percentage, setpercentage] = useState('');
   const [departmentId, setdepartmentId] = useState('');
   const [department,  setdepartment] = useState('');

  const [editstudentName, seteditstudentName] = useState('');
  const [editcourse, seteditcourse] = useState('');
  const [editspecialization, seteditspecialization] = useState('');
  const [editpercentage, seteditpercentage] = useState('');
  const [editdepartmentId, seteditdepartmentId] = useState('');
  const [editstudentId, seteditstudentId] = useState();

  const handleChange = (event:any) => {

     setdepartmentId(event.target.value);
 
  };

  const edithandleChange = (event:any) => {

     seteditdepartmentId(event.target.value);
 
  };

  const getstudentsdetails = () => {
    axios
        .get(`${environment.apiurl}/student`)
        .then(res => setstudentsdetails(res.data))
        .catch(error => console.log(error));
};

const getdepartmentdetails = () => {
  axios
      .get(`${environment.apiurl}/department`)
      .then(res => setdepartmentdetails(res.data))
      .catch(error => console.log(error));
      // console.log(studentdetails);
};

const getstudentdetailsbyid = (id:any) =>
{

  seteditstudentId(id);
  axios.get(`${environment.apiurl}/student?id=${id}`)
  .then((res) => 
  {
    console.log(res);
    seteditstudentName(res.data[0].name);
    seteditcourse(res.data[0].course);
    seteditspecialization(res.data[0].specialization);
    seteditpercentage(res.data[0].percentage);
    seteditdepartmentId(res.data[0].department.departmentId);
    
  });
}

const handleAdd = () =>
{
  const data = {
     "name": studentName,
     "course": course,
     "specialization": specialization,
     "percentage": percentage,
      "department":{
         "departmentName": departmentId
      } 
  }
  console.log(data);
   axios.post(`${environment.apiurl}/student`,data)
        .then((res) => 
        {getstudentsdetails();
          clear();
          modalClose();
        });
}

const handleDelete = (id:any) => 
{
  axios.delete(`${environment.apiurl}/deletestudent?id=${id}`)
  .then((res) => 
  {getstudentsdetails();});

}

const handleUpdate = () => {

  const data = {
    "id": editstudentId,
    "name": editstudentName,
    "course": editcourse,
    "specialization": editspecialization ,
    "percentage": editpercentage,
    "department":{
        "id": editdepartmentId
     } 
  }

  axios.put(`${environment.apiurl}/updatestudent`,data)
  .then((res) => 
  {getstudentsdetails();
    clear();
    editmodalClose();
  });

}

const clear = () =>{
  setstudentName('');
  setcourse('');
  setspecialization('');
  setpercentage('');
  setdepartmentId('');
  seteditstudentName('');
  seteditcourse('');
  seteditspecialization('');
  seteditpercentage('');
  seteditdepartmentId('');
  setdepartment('');

}


useEffect(() => {
  getstudentsdetails();
  getdepartmentdetails();
},[]);

  return (
    <Fragment>
       <div className='depbutton'>
        <button><FaPlus className="btncolor" onClick={modelShow}/> </button>
        </div>
        <Modal backdrop="static" show={show} onHide={modalClose}>  
            <Modal.Header closeButton>  
            <Modal.Title>Add student</Modal.Title>  
            </Modal.Header>  
            
            <Modal.Body>  
              <Container>
                <Row>
                  <Col>student name</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter student name"  required
                 value={studentName} onChange={(e) => setstudentName(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>course</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter course"  required
                 value={course} onChange={(e) => setcourse(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>specialization</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter specialization"  required
                 value={specialization} onChange={(e) => setspecialization(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>percentage</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter percentage"  required
                 value={percentage} onChange={(e) => setpercentage(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>department</Col>
                  <Col> <select value={departmentId} onChange={handleChange}>
                       {departmentdetails.map((department) => (
                        <option value={department['id']}>{department['departmentName']}</option>
                      ))}
                    </select>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>  
            
            <Modal.Footer>  
            <Button variant="secondary" onClick={modalClose}>Cancel</Button>  
            <Button variant="primary" onClick={ ()=> handleAdd() }>Add</Button>  
            </Modal.Footer>  
        </Modal>  
         <div className='p-5'>  
  <Table striped bordered hover size='sm'>  
  <thead>  
    <tr>   
      <th>Student ID</th>  
      <th>Student Name</th> 
      <th>Course</th> 
      <th>Specialization</th> 
      <th>Percentage</th> 
      <th>Department Name</th>  
    </tr>  
  </thead>  
  <tbody>  
  {studentsdetails.map((student) =>{
    return( 
              <tr key={student['id']}>
                 <td>{student['id']}</td>
                 <td>{student['name']}</td>
                <td>{student['course']}</td>
                <td>{student['specialization']}</td>
                <td>{student['percentage']}</td>
                <td>{student['department']['departmentName']}</td>
                <td colSpan={2}>    
                &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;
                  <button className="btn btn-primary" onClick={()=>editmodelShow(student['id'])} ><FaPencilAlt/></button> &nbsp;
                  <button className="btn btn-danger" onClick={()=>handleDelete(student['id'])}><FaTrash /></button>
                </td>
              </tr>
            )})}
  </tbody>  
</Table> 
</div>  
<Modal backdrop="static" show={editshow} onHide={editmodalClose}>  
            <Modal.Header closeButton>  
            <Modal.Title>Edit Student</Modal.Title>  
            </Modal.Header>  
            
            <Modal.Body>  
            <Container>
                <Row>
                  <Col>Student Name</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter student name"  required
                 value={editstudentName} onChange={(e) => seteditstudentName(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>Course</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter course"  required
                 value={editcourse} onChange={(e) => seteditcourse(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>Specialization</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter specialization"  required
                 value={editspecialization} onChange={(e) => seteditspecialization(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>Percentage</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter percentage"  required
                 value={editpercentage} onChange={(e) => seteditpercentage(e.target.value)} /></Col>
                </Row>
                <Row>
                  <Col>Department</Col>
                   <Col> <select value={editdepartmentId} onChange={edithandleChange}>
                       {departmentdetails.map((department) => (
                        <option value={department['departmentId']}>{department['departmentName']}</option>
                      ))}
                    </select>
                  </Col> 
                </Row>
              </Container>

            </Modal.Body>  
            
            <Modal.Footer>  
            <Button variant="secondary" onClick={editmodalClose}>Cancel</Button>  
            <Button variant="primary" onClick={ ()=> handleUpdate() }>Edit</Button>  
            </Modal.Footer>  
        </Modal>  
    </Fragment>
  )
}

export default StudentList;