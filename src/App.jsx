import { useState } from 'react'
import './App.css'
import PetsCatalog from './pages/PetsCatalog.jsx'
import PetDetail from './pages/PetDetail.jsx'

function App() {
  const [selectedPet, setSelectedPet] = useState(null)

  return (
    <main>
      {selectedPet ? (
        <PetDetail pet={selectedPet} onBack={() => setSelectedPet(null)} />
      ) : (
        <PetsCatalog onSelectPet={setSelectedPet} />
      )}
    </main>
  )
}

export default App
