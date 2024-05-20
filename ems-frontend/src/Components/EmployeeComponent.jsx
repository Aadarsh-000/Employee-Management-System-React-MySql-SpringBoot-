import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeComponent = () => {

    const [errors, setError] = useState({
        "firstName": '',
        "lastName": '',
        "email": ''
    })

    const navigator = useNavigate();
    const { id } = useParams();

    const [firstName, setFirstName] = useState(' ');
    const [lastName, setLastName] = useState(' ');
    const [email, setEmail] = useState(' ');

    const handleFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastName = (e) => {
        setLastName(e.target.value);
    }


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    useEffect(()=>{
        
        if(id){
            getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch((error)=>{
                console.error(error);
            })
        }

    }, [id])

    const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        if (validateForm()) {

            const employee = { firstName, lastName, email }
            console.log(employee);
            setFirstName("");
            setLastName("");
            setEmail("");
            window.alert("Form Submitted Successfully");

            if(id){
                updateEmployee(id,employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error => {
                    console.error(error);
                })
            }
            else{
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigator('/employees');
    
                }).catch(error => {
                    console.error(error);
                })
            }


          

        }

        function validateForm() {

            let valid = true;

            const errorsCopy = { ...errors }

            if (firstName.trim()) {
                errorsCopy.firstName = '';
            }
            else {
                errorsCopy.firstName = 'First Name is required';
                valid = false;
            }

            if (lastName.trim()) {
                errorsCopy.lastName = '';
            }
            else {
                errorsCopy.lastName = 'Last Name is required';
                valid = false;
            }

            if (email.trim()) {
                errorsCopy.email = '';
            }
            else {
                errorsCopy.email = 'Email ID is required';
                valid = false;
            }

            setError(errorsCopy);
            return valid;

        }


    }



    function pageTitle() {
        if (id) {
           return <h4 className='text-center'><span style={{color:"#484848", fontWeight: 600}}>Edit Employees</span></h4>
        }
        else {
           return <h4 className='text-center'><span style={{color:"#484848", fontWeight: 600}}>Add Employees</span></h4>
        }
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>

                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <br />
                    {
                    pageTitle()
                    }
                    <hr />
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='from-label'>First Name:</label>
                                <input type='text'
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ' '}`}
                                    onChange={handleFirstName}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='from-label'>Last Name:</label>
                                <input type='text'
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ' '}`}
                                    onChange={handleLastName}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='from-label'>Email:</label>
                                <input type='email'
                                    placeholder='Enter Employee Email ID'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ' '}`}
                                    onChange={handleEmail}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                        </form>
                        <button className='btn btn-success mb-2 my-2' onClick={saveOrUpdateEmployee}>Submit</button>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default EmployeeComponent