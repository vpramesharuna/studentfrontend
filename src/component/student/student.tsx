import React from 'react';

interface Props{
    actions?:{
        postStudent:any
    }
}

class Student extends React.Component<Props,{}> {

    state = {
        studentName : '',
        age : '',
        course: '',
        specialization: '' ,
        percentage: ''
        // department: [{
        //     departmentName:'',
        //     description:'',
        //     id:''
        // }]
    }

    onchangeEvent = (event:any)=> {
        const value = event.target.value;
        this.setState({studentName:value});
    }

    onchangeAgeEvent = (event:any)=> {
        const value = event.target.value;
        this.setState({age:value});
    }

    onchangeDepartmentEvent = (event:any)=> {
        const [name, value] = event.target;
        const departmentField = name.split('.')[1]
        // this.setState({
        //     department:[{
        //         departmentName: value,
        //         description:'',
        //         id:''
        //     }]
        // });
        
    }

    onchangeCourseEvent = (event:any)=> {
        const value = event.target.value;
        this.setState({course:value});
    }

    onchangeSpecializationEvent = (event:any)=> {
        const value = event.target.value;
        this.setState({specialization:value});
    }

    onchangePercentageEvent = (event:any) =>{
        const value = event.target.value;
        this.setState({percentage:value});
    }

    onClickSubmit=()=>{
        const student = {
            studentName: this.state.studentName,
            age: this.state.age,
            course: this.state.course,
            specialization: this.state.specialization ,
            percentage: this.state.percentage
            // department: [{
            //     departmentName:'',
            //     description : '',
            //     id:''
            // }]
        }
        if(this.props.actions){
            this.props.actions?.postStudent(student);
        }
    }

    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Student Details</h1>
                <div className='col-12 mb-3'>
                    <label htmlFor="Student Name">Student Name</label>
                    <input className='form-control' 
                    data-testid="studentname" 
                    placeholder='Student Name' value={this.state.studentName}
                    onChange={this.onchangeEvent}></input>
                </div>

                <div className='col-12 mb-3'>
                    <label htmlFor="Age">Age</label>
                    <input className='form-control'  data-testid="age" placeholder='Your Age'
                    value={this.state.age}
                    onChange={this.onchangeAgeEvent}></input>
                </div>
                <div className='col-12 mb-3'>
                    <label htmlFor="course">Course</label>
                    <input className='form-control'  data-testid="course" placeholder='Your Course'
                    value={this.state.course}
                    onChange={this.onchangeCourseEvent}></input>
                </div>
                <div className='col-12 mb-3'>
                    <label htmlFor="Specialization">Specialization</label>
                    <input className='form-control'  data-testid="specialization" placeholder='Your Specialization'
                    value={this.state.specialization}
                    onChange={this.onchangeSpecializationEvent}></input>
                </div>
                <div className='col-12 mb-3'>
                    <label htmlFor="percentage">Percentage</label>
                    <input className='form-control'  data-testid="percentage" placeholder='Your Percentage'
                    value={this.state.percentage}
                    onChange={this.onchangePercentageEvent}></input>
                </div>
                {/* <div className='col-12 mb-3'>
                    <label htmlFor="department">Department</label>
                    <input className='form-control'  data-testid="percentage" placeholder='Your Department'
                    onChange={this.onchangeDepartmentEvent}></input>
                </div> */}

                {/* <div className='col-12 mb-3'>
                    <label htmlFor="Password">Password</label>
                    <input className='form-control' data-testid="password" placeholder='Your Password' type='password'
                    value={this.state.password}
                    onChange={this.onchangePasswordEvent}></input>
                </div>

                <div className='col-12 mb-3'>
                    <label htmlFor="Confirm Password">Confirm Password</label>
                    <input className='form-control' data-testid="confirmpassword" placeholder='Your Confirm Password' type='password'
                    value={this.state.confirmPassword}
                    onChange={this.onchangeConfirmPasswordEvent}></input>
                </div>

                 <div className='text-center' hidden>
                    <button className='btn btn-primary' onClick={this.onClickSubmit}>Submit</button>
                </div>  */}
            </div> 
        )
    }
}


export default Student;