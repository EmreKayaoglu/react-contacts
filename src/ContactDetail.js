import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import ImageInput from './ImageInput'
import serializeForm from 'form-serialize'
import { UserContext } from './App'

export default function ContactDetail(props) {
  const { onSaveContact } = props
  const { contact } = useContext(UserContext)
  const [curContact, setCurContact] = useState({})

  useEffect(() => {
    if (contact != null)
      setCurContact({ ...curContact, ...contact })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })

    if (onSaveContact != null)
      onSaveContact(values)
  }

  const handleNameChange = (e) => {
    let c = curContact
    c.name = e.target.value
    setCurContact({ ...curContact, ...c })
  }

  const handleEmailChange = (e) => {
    let c = curContact
    c.email = e.target.value
    setCurContact({ ...curContact, ...c })
  }

  const handlePhoneChange = (e) => {
    let c = curContact
    c.phone = e.target.value
    setCurContact({ ...curContact, ...c })
  }

  const handleBirthdayChange = (e) => {
    let c = curContact
    c.birthday = e.target.value
    setCurContact({ ...curContact, ...c })
  }

  return (
    <div>
      <Link className='close-create-contact' to='/'>Close</Link>
      <form onSubmit={handleSubmit} className='create-contact-form'>
        <ImageInput
          className='create-contact-avatar-input'
          name='avatar'
          maxHeight={640}
        />
        <div className='create-contact-details'>
          <input type='text' name='name' placeholder='Name' value={curContact.name} onChange={handleNameChange} required />
          <input type='text' name='email' placeholder='Email' value={curContact.email} onChange={handleEmailChange}/>
          <input type='text' name='phone' placeholder='Phone' value={curContact.phone} onChange={handlePhoneChange}/>
          <input type='text' name='birthday' placeholder='Birthday' value={curContact.birthday} onChange={handleBirthdayChange}/>
          <button type='submit'>{`${contact != null ? 'Save Contact' : 'Add Contact'}`}</button>
        </div>
      </form>
    </div>
  )
}

