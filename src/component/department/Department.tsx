import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import {Table, Button, Container, Row , Col} from 'react-bootstrap';  
import { environment } from '../../shared/environment/envrironment';
import '../../App.css';
import {Modal} from 'react-bootstrap';  
import {FaPlus, FaPencilAlt, FaTrash} from "react-icons/fa";

const Department = () => {

    const [departmentdetails, setdepartmentdetails] = useState([]);
    const [show, setShow] = useState(false);
    const modalClose= () => setShow(false);
    const modelShow = () => setShow(true);

    const [departmentName, setdepartmentName] = useState('');

    const [editshow, seteditShow] = useState(false);
    const editmodalClose= () => seteditShow(false);
    const editmodelShow = (id:any) =>
     {
      seteditShow(true);
      getdepartmentdetailsbyid(id);

    }
    const [editid,seteditid] = useState('');

    const [editdepartmentName, seteditdepartmentName] = useState('');

    const getdepartmentdetails = () => {
        axios
            .get(`${environment.apiurl}/department`)
            .then(res => setdepartmentdetails(res.data))
            .catch(error => console.log(error));
    };

    const getdepartmentdetailsbyid = (id:any) =>
    {

      seteditid(id);
      axios.get(`${environment.apiurl}/departmentById?id=${id}`)
      .then((res) => 
      {seteditdepartmentName(res.data.departmentName)});
    }

    const handleAdd = () =>
    {
      const data = {
        "departmentName": departmentName
      }
       axios.post(`${environment.apiurl}/department`,data)
            .then((res) => 
            {getdepartmentdetails();
              clear();
              modalClose();
            });
    }

    const handleDelete = (id:any) => 
    {
      axios.delete(`${environment.apiurl}/deletedepartment?id=${id}`)
      .then((res) => 
      {getdepartmentdetails();});

    }

    const handleUpdate = () => {

      const data = {
        "id" : editid,
        "departmentName": editdepartmentName
      }

      axios.put(`${environment.apiurl}/updatedepartment`,data)
      .then((res) => 
      {getdepartmentdetails();
        clear();
        editmodalClose();
      });

    }

    const clear = () =>{
      setdepartmentName('');
      seteditdepartmentName('');
    }
    
    useEffect(() => {
        getdepartmentdetails();
      },[]);

  return (
    <Fragment>
        <div className='depbutton'>
          <button><FaPlus className="btncolor" onClick={modelShow}/> </button> 
        </div>
        <Modal backdrop="static" show={show} onHide={modalClose}>  
            <Modal.Header closeButton>  
            <Modal.Title>Add department</Modal.Title>  
            </Modal.Header>  
            
            <Modal.Body>  
              <Container>
                <Row>
                  <Col>Department name</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter department"  required
                 value={departmentName} onChange={(e) => setdepartmentName(e.target.value)} /></Col>
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
      <th>Department ID</th>  
      <th>Department Name</th>  
    </tr>  
  </thead>  
  <tbody>  
  {departmentdetails.map(department => (
              <tr key={department['id']}>
                 <td>{department['id']}</td>
                <td>{department['departmentName']}</td>
                <td colSpan={2}>
                &nbsp; &nbsp;  &nbsp;  &nbsp;  &nbsp; &nbsp;
                  <button className="btn btn-primary" onClick={()=>editmodelShow(department['id'])}><FaPencilAlt/></button> &nbsp;
                  <button className="btn btn-danger" onClick={()=>handleDelete(department['id'])}><FaTrash /></button>
                </td>
              </tr>
            ))}
  </tbody>  
</Table> 
</div>  
<Modal backdrop="static" show={editshow} onHide={editmodalClose}>  
            <Modal.Header closeButton>  
            <Modal.Title>Edit department</Modal.Title>  
            </Modal.Header>  
            
            <Modal.Body>  
              <Container>
                <Row>
                  <Col>Department name</Col>
                 <Col><input type="text" className="form-control" placeholder="Enter department"  required
                 value={editdepartmentName} onChange={(e) => seteditdepartmentName(e.target.value)} /></Col>
                </Row>
              </Container>
            </Modal.Body>  
            
            <Modal.Footer>  
            <Button variant="secondary" onClick={editmodalClose}>Cancel</Button>  
            <Button variant="primary" onClick={ ()=> handleUpdate() }>Update</Button>  
            </Modal.Footer>  
        </Modal>  
    </Fragment>
  )
}

export default Department