const api = process.env.REACT_APP_CONTACTS_API_URL || 'https://61c32f169cfb8f0017a3e9f4.mockapi.io/api/v1/contacts'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

export const getAll = async () => {
  const res = await fetch(`${api}`, { headers })
  if (res.ok) {
    const data = await res.json()
    return { err: false, data: data }
  } else
    return { err: true, message: 'Invalid response' };
}

export const remove = (contact) =>
  fetch(`${api}/${contact.id}`, { method: 'DELETE', headers })
    .then(res => res.json())
    .then(data => data.contact)

export const create = (body) =>
  fetch(`${api}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }).then(res => res.json())

export const update = (contact) =>
  fetch(`${api}/${contact.id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(contact)
  }).then(res => res.json())
