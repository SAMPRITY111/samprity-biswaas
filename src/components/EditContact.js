import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link,useParams } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const EditContact = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [number,setNumber]=useState("");
    const dispatch = useDispatch();
    const history= useHistory();
    const {id} = useParams();

    const contacts = useSelector(state=>state);
    const currentContact = contacts.find(contact=> contact.id === parseInt(id));

useEffect(()=>{

    if(currentContact) {
        setName(currentContact.name);
        setEmail(currentContact.email);
        setNumber(currentContact.number);
     
    }

},[currentContact]);

const handleSubmit = (e)=>{
    e.preventDefault();

    const checkEmail = contacts.find((contact)=>contact.id !== parseInt(id) && contact.email === email && email);

    const checkNumber = contacts.find((contact)=>contact.id !== parseInt(id) && contact.number === parseInt(number) && number); //===parseInt((number))

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
        id: parseInt(id),
        name,
        email,
        number
    };
   dispatch({type:"UPDATE_CONTACT", payload:data});
   toast.success("CustomerList updated Successfully!");
   history.push("/");
};
    return(
    
        <div className='container'>
            {
                currentContact ? (

               
            <>
        <h1 className="display-3 my-5  text-center">  Edit Customer {id}</h1>
  <div className="row">
      
  <div className="col-md-6 shadow mx-auto p-5">
<form onSubmit={handleSubmit}>
  <div className="form-group">
      <input type="text" placeholder="Name" className="form-control"   value={name} onChange={e=> setName(e.target.value)}/>
  </div>
  <br></br>
  <div className="form-group">
      <input type="email" placeholder="Email" className="form-control"  value={email} onChange={e=> setEmail(e.target.value)}/>
  </div>
  <br></br>
  <div className="form-group">
      <input type="number" placeholder="Phone Number" className="form-control"  value={number} onChange={e=> setNumber(e.target.value)}/>
  </div>
  <br></br>
  <div className="form-group">
      <input type="Submit" value="Update Customer" className="btn  btn-dark"/>
  </div>
  <br></br>
  <div className="form-group">
      <Link 
      to="/"
      className="btn btn-danger ml-3">
      Cancel  </Link>
  </div>
</form>
  </div>
  </div>
  </>
                ): (
                    <h1 className="display-3 my-5 text-center">customer contact with id {id}  is not exist!</h1>
                
   )};
  </div>

        );
    };
export default EditContact;