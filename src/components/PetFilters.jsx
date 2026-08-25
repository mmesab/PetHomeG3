import { useState } from 'react'

const types = [
  { key: 'all', label: 'Todos' },
  { key: 'dog', label: 'Perros' },
  { key: 'cat', label: 'Gatos' },
  { key: 'other', label: 'Otros' },
]

const PetFilters = ({ value = { type: 'all', q: '' }, onChange }) => {
  const [local, setLocal] = useState(value)

  const apply = (next) => {
    const merged = { ...local, ...next }
    setLocal(merged)
    onChange && onChange(merged)
  }

  return (
    <div className="pet-filters">
      {types.map((t) => (
        <button
          key={t.key}
          type="button"
          className={local.type === t.key ? 'active' : ''}
          onClick={() => apply({ type: t.key })}
        >
          {t.label}
        </button>
      ))}

      <input
        placeholder="Buscar por nombre o raza"
        value={local.q}
        onChange={(e) => apply({ q: e.target.value })}
        style={{ marginLeft: 12, padding: '8px 10px', borderRadius: 8, border: '1px solid #e6eef8' }}
      />
    </div>
  )
}

export default PetFilters
