const FavoriteButton = ({ isFavorite = false }) => {
  return (
    <button type="button">
      {isFavorite ? 'Guardado' : 'Guardar'}
    </button>
  )
}

export default FavoriteButton
