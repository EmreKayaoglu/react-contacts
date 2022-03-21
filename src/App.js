import React, { useState, useEffect, createContext, useContext } from 'react';
import { Route, useHistory } from 'react-router-dom'
import ListContacts from './ListContacts'
import ContactDetail from './ContactDetail'
import * as ContactsAPI from './utils/ContactsAPI'

export const UserContext = createContext({ contact: null })

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState();
  const history = useHistory();

  useEffect(() => {
    ContactsAPI.getAll().then((res) => {
      if (!res.err) {
        setContacts(res.data)
      } else {
        // show error message
        setContacts([])
      }
    })
  }, []);

  const removeContact = (contact) => {
    setContacts(contacts.filter((c) => c.id !== contact.id))
    ContactsAPI.remove(contact)
  }

  const showDetail = (contact) => {
    setCurrentContact(contact)
    history.push('/show')
  }

  const handleSaveContact = (contact) => {
    if (currentContact != null) {
      contact.id = currentContact.id
      ContactsAPI.update(contact).then(contact => {
        setContacts(contacts.map(item => item.id === currentContact.id ? contact : item))
        history.push('/')
      })
    } else {
      ContactsAPI.create(contact).then(contact => {
        setContacts(contacts.concat([contact]))
        history.push('/')
      })
    }
  }

  return (
    <UserContext.Provider value={{ contact: currentContact }}>
      <div>
        <Route exact path='/' render={() => (
          <ListContacts
            onShowDetail={showDetail}
            onDeleteContact={removeContact}
            contacts={contacts}
          />
        )} />
        <Route path='/show' render={() => (
          <ContactDetail
            onSaveContact={(contact) => {
              handleSaveContact(contact)
            }}
          />
        )} />
      </div>
    </UserContext.Provider>
  )
}