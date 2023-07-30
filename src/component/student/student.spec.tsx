import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Student from './student';


describe('StudentPage', ()=>{
    describe('Layout', ()=>{
        it('has header for Student Details',()=>{
            const {container} = render(<Student />);
            const header = container.querySelector('h1');
            expect(header).toHaveTextContent('Student Details')
        });

        it('has input for student name',()=>{
            const {queryByPlaceholderText} = render(<Student />);
            const studentName = queryByPlaceholderText('Student Name');
            expect(studentName).toBeInTheDocument();
        });

        it('has input for student Age',()=>{
            const {queryByPlaceholderText} = render(<Student />);
            const age = queryByPlaceholderText('Your Age');
            expect(age).toBeInTheDocument();
        })

        it('has input for student Department',()=>{
            const {queryByPlaceholderText} = render(<Student />);
            const department = queryByPlaceholderText('Your Department');
            expect(department).toBeInTheDocument();
        })

        it('has input for student password',()=>{
            const {queryByPlaceholderText} = render(<Student />);
            const password = queryByPlaceholderText('Your Password');
            expect(password).toBeInTheDocument();
        })

        it('has input as password type for student password',()=>{
            const {queryByPlaceholderText} = render(<Student />);
            const passwordInput = queryByPlaceholderText('Your Password');
            expect(passwordInput).toHaveAttribute('type','password');
        })

        it('has input for confirm student password',()=>{
            const {queryByPlaceholderText} = render(<Student />);
            const password = queryByPlaceholderText('Your Confirm Password');
            expect(password).toBeInTheDocument();
        })

        it('has input as confirm password type for student password',()=>{
            const {queryByPlaceholderText} = render(<Student />);
            const confirmPassword = queryByPlaceholderText('Your Confirm Password');
            expect(confirmPassword).toHaveAttribute('type','password');
        })

        it('has submit button',()=>{
            const {container} = render(<Student />);
            const subButton = container.querySelector('button');
            expect(subButton).toBeInTheDocument();
        })
    });
    describe('Interactions', ()=>{
        const changeEvent = (content:any) => {
            return {
              target: {
                value: content,
              },
            };
          };

          let button:any, stuName:any,age:any, department:any, password:any,confirmPassword :any;

          const setupForSubmit = (props?:any)=>{
              const rendered = render(
                  <Student actions={props}/>
              );
      
             const {container, getByTestId} = rendered;
          
             const stuName = getByTestId('studentname');
             const age = getByTestId('age');
             const department = getByTestId('department');
             const password = getByTestId('password');
             const confirmPassword = getByTestId('confirmpassword');
  
             fireEvent.change(stuName, changeEvent('Test'));
             fireEvent.change(age, changeEvent('Test'));
             fireEvent.change(department, changeEvent('Test'));
             fireEvent.change(password, changeEvent('Test'));
             fireEvent.change(confirmPassword, changeEvent('Test'));
            
             const button = container.querySelectorAll('button');
             fireEvent.click(button[0]);
             return rendered;
          }
        it('has student Name value into state',()=>{
                const {getByTestId} = render(<Student />);
                const studentName = getByTestId('studentname');
                 const changeEvent={
                     target:{ 
                         value:'My Name'
                     }
                 };
                fireEvent.change(studentName, changeEvent);
                expect(studentName).toHaveValue('My Name');
        });

        it('has student age value into state',()=>{
            const {getByTestId} = render(<Student />);
            const studentName = getByTestId('age');
             const changeEvent={
                 target:{ 
                     value:'12'
                 }
             };
            fireEvent.change(studentName, changeEvent);
            expect(studentName).toHaveValue('12');
        });

        it('has student Department value into state',()=>{
            const {getByTestId} = render(<Student />);
            const studentName = getByTestId('department');
             const changeEvent={
                 target:{ 
                     value:'Test'
                 }
             };
            fireEvent.change(studentName, changeEvent);
            expect(studentName).toHaveValue('Test');
        });

        it('has student password value into state',()=>{
            const {getByTestId} = render(<Student />);
            const studentName = getByTestId('password');
             const changeEvent={
                 target:{ 
                     value:'pass'
                 }
             };
            fireEvent.change(studentName, changeEvent);
            expect(studentName).toHaveValue('pass');
        });

        it('has student confirm password value into state',()=>{
            const {getByTestId} = render(<Student />);
            const studentName = getByTestId('confirmpassword');
            const changeEvent={
                 target:{ 
                     value:'pass'
                 }
             };
            fireEvent.change(studentName, changeEvent);
            expect(studentName).toHaveValue('pass');
        });

        it('call post register function when all values are valid',()=>{
            const actions = {
                postStudent : jest.fn().mockResolvedValueOnce({})
            };

            setupForSubmit(actions);
            expect(actions.postStudent).toHaveBeenCalledTimes(1);
        });

        
         it('does not throw exception when call post register function when actions are not provided',()=>{
           // setupForSubmit();
            expect(()=>setupForSubmit()).not.toThrow();
         });

         it('call post register function when the proper object is provided',()=>{
            
            const actions = {
                postStudent : jest.fn().mockResolvedValueOnce({})
            };

            setupForSubmit(actions);
            const expectStudentObj = {
                studentName: 'Test',
                age: 'Test',
                department: 'Test',
                password:'Test',
                confirmPassword:'Test'
            }
            expect(actions.postStudent).toHaveBeenCalledWith(expectStudentObj);
          });
    }) 
})