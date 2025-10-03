export const Buscador = ({
  onSubmit, 
  valorKeyword, 
  onChangeKeyword, 
  valorCategoryFilter, 
  onChangeCategoryFilter
}) => {
  return (
    <div className="buscador">
      <form onSubmit={onSubmit}>
        <input 
          value={valorKeyword} 
          type="text" 
          placeholder="Buscar noticias..." 
          onChange={onChangeKeyword}
        />
        <select 
          value={valorCategoryFilter}
          onChange={onChangeCategoryFilter}
        >
          <option value="">Todas las categorías</option>
          <option value="news/Politics">Política</option>
          <option value="dmoz/Business">Economía</option>
          <option value="news/Sports">Deportes</option>
          <option value="news/Technology">Tecnología</option>
          <option value="news/Entertainment">Entretenimiento</option>
          <option value="news/Science">Ciencia</option>
          <option value="news/Health">Salud</option>
        </select>
        <button type="submit">Buscar</button>
      </form>
    </div>
  )
}