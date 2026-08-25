import { useState } from 'react'
import FavoriteButton from '../components/FavoriteButton.jsx'
import AdoptionForm from '../components/AdoptionForm.jsx'

const PetDetail = ({ pet, onBack }) => {
  // expects a `pet` object { id, name, breed, age, image }
  if (!pet) return <section>Seleccione una mascota</section>

  return (
    <section className="pet-detail">
      <div style={{marginBottom:12}}>
        <button className="back-btn" onClick={onBack} type="button">← Volver</button>
      </div>
      <div style={{display:'flex',gap:20,alignItems:'flex-start',flexWrap:'wrap'}}>
        <img src={pet.image} alt={pet.name} style={{maxWidth:320,borderRadius:10}} />
        <div style={{flex:1}}>
          <h2>{pet.name}</h2>
          <p className="muted">{pet.breed} · {pet.age}</p>
          <div style={{marginTop:12}}>
            <FavoriteButton petId={pet.id} initial={false} />
          </div>
        </div>
      </div>

      <div style={{marginTop:18}}>
        <h3>Solicitar adopción</h3>
        <AdoptionForm petId={pet.id} />
      </div>
    </section>
  )
}

export default PetDetail
