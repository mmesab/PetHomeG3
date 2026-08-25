const AdoptionStatusBadge = ({ status = 'available' }) => {
  const labels = {
    available: 'Disponible',
    pending: 'En proceso',
    adopted: 'Adoptado',
  }

  return <span>{labels[status] || 'Disponible'}</span>
}

export default AdoptionStatusBadge
