import { useState } from 'react'
import { createAdoption } from '../services/adoptionService.js'

const AdoptionForm = ({ petId }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await createAdoption({ petId, name, email, message })
      if (res?.ok) {
        setStatus('Solicitud enviada correctamente')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('Error al enviar la solicitud')
      }
    } catch (err) {
      setStatus('Error al enviar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="adoption-form" onSubmit={submit}>
      <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nombre completo" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Email" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Mensaje (opcional)" rows={3} />
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <button className="primary" type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Enviar solicitud'}</button>
        {status && <div className="form-status">{status}</div>}
      </div>
    </form>
  )
}

export default AdoptionForm
