import React from 'react'

export default function RegistrationSuccessModal({isOpen, }) {

   const handleRegister =() =>{

   }
   const handleFormValue = (e) =>{
    const {name, value} = e.target
    setFormValue((prevVal)=>({...prevVal, [name]: value}))
   }
  return (
    <div>
        {isOpen &&(
            <div>
                
            </div>
        )}
    </div>
  )
}
