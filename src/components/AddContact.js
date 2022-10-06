import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const AddContact = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [number,setNumber]=useState("");

    const contacts = useSelector((state)=>state);
    
    const dispatch = useDispatch();

    const history= useHistory();

    const handleSubmit = (e)=>{
        e.preventDefault();

        const checkEmail = contacts.find(contact=>contact.email == email && email);

        const checkNumber = contacts.find((contact)=>contact.number == number && number); //===parseInt((number))

        if(!email || !number || !name ){
            return toast.warning("please fill in all fields!");
        }
        if (checkEmail) {
            return toast.error("This Email is  already exists!");
        }
        if (checkNumber) {
            return toast.error("This Number is  already exists!");
        }
        const  data = {
            id: contacts[contacts.length-1].id + 1,
            name,
            email,
            number
        };
       dispatch({type:"ADD_CONTACT", payload:data});
       toast.success("Customer added Successfully!");
       history.push("/");
        console.log(data)
    }
    console.log(contacts);
 return(


    
    <div className='container'>
          <h1 className="display-3 my-5 bg-danger text-center"> Customer details</h1>
          <hr/>
          <h4>applicant's information</h4>
    <div className="row">
        
    <div className="col-md-6 shadow mx-auto p-5">
  <form onSubmit={handleSubmit}>
    <div className="form-group">
        <input type="text" placeholder="Name" className="form-control" required value={name} onChange={e=> setName(e.target.value)}/>
    </div>
    <br></br>
    <div className="form-group">
        <input type="email" placeholder="Email" className="form-control" required value={email} onChange={e=> setEmail(e.target.value)}/>
    </div>
    <br></br>
    <div className="form-group">
        <input type="number" placeholder="Phone Number" className="form-control" required value={number} onChange={e=> setNumber(e.target.value)}/>
    </div>
    <br></br>
    <div className="form-group">
        <input type="Submit" value="Add Customer" className="btn btn-block btn-dark"/>
    </div>
  </form>
    </div>
    </div>
    </div>
 )
}
export default AddContact;