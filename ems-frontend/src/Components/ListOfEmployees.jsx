import React, { useState, useEffect } from "react"
import { deleteEmployee, listEmployees } from "../Services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListofEmployees = () =>{

   const  [employees, setEmployees] = useState([]);

   useEffect(() => {
    getAllEmployees();
   }, [])

   function getAllEmployees(){
    listEmployees().then((response) => {
        setEmployees(response.data);
    }).catch(error => {
        console.log(error);
    })
   }
   
   const navigator = useNavigate();

   const addEmployee = () =>{
    navigator("/add-Employee");
   }

   function updateEmployee(id){
        navigator(`/edit-employee/${id}`)
   }


   function removeEmployee(id){
    console.log(id);

    deleteEmployee(id).then((response) => {
       getAllEmployees();
    }).catch(error => {
        console.error(error);
    })

   }

    return (
        <div className="container my-3">
        <h2 className="text-center"><span style={{color:"#484848", fontWeight: 600}}>List Of Employees</span></h2>
        <hr />
        <button className="btn btn-primary mb-2" onClick={addEmployee}>Add Employee</button>

        <table className="table table-striped table-bordered my-3">
            <thead>
                <tr>
                    <th><span style={{fontWeight:600}}>Employee ID</span></th>
                    <th><span style={{fontWeight:600}}>Employee First Name</span></th>
                    <th><span style={{fontWeight:600}}>Employee Last Name</span></th>
                    <th><span style={{fontWeight:600}}>Employee Email ID</span></th>
                    <th><span style={{fontWeight:600}}>Actions</span></th>
                </tr>
            </thead>

            <tbody>
                {
                    employees.map((employee) => {
                        return(
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className="btn btn-warning" onClick={()=>updateEmployee(employee.id)}>Update</button>
                                <button className="btn btn-danger mx-2" onClick={() => removeEmployee(employee.id)}>Delete</button>
                            </td>
                        </tr>
                        )}
                    )
                }
            </tbody>
        </table>
        </div>
    )
}

export default ListofEmployees;