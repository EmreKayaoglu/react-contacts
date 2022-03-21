import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

export default function ListContacts(props) {
  const { contacts, onShowDetail, onDeleteContact } = props
  const [query, setQuery] = useState('')

  const updateQuery = (q) => {
    setQuery(q)
  }

  const clearQuery = () => {
    setQuery('')
  }

  const onCreate = () => {
    onShowDetail()
  }

  let showingContacts
  if (query) {
    const match = new RegExp(escapeRegExp(query), 'i')
    showingContacts = contacts.filter((contact) => match.test(contact.name))
  } else {
    showingContacts = contacts
  }

  showingContacts.sort(sortBy('name'))

  return (
    <div className='list-contacts'>
      <div className='list-contacts-top'>
        <input
          className='search-contacts'
          type='text'
          placeholder='Search contacts'
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
        />
        <div
          className='add-contact'
          onClick={onCreate}
        >Add Contact</div>
      </div>

      {showingContacts.length !== contacts.length && (
        <div className='showing-contacts'>
          <span>Now showing {showingContacts.length} of {contacts.length} total</span>
          <button onClick={clearQuery}>Show all</button>
        </div>
      )}

      <ul className='contact-list'>
        {showingContacts.map((contact, index) => (
          <li key={contact.id}>
            <a href="javascript:;" class="card">
              <img src={`${contact.avatar}`} class="card-image" alt="" onClick={() => onShowDetail(contact)} />
              <div class="card__overlay">
                <div class="card__header">
                  <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>
                  <div class="card__header-text">
                    <h3 class="card__title">{contact.name}</h3>
                  </div>
                </div>
                <div class="card__description">
                  <button class="card__button" onClick={() => onShowDetail(contact)}>Detail</button>
                  <button class="card__button danger" onClick={() => onDeleteContact(contact)}>Remove</button>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div >
  )
}