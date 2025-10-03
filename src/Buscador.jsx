export const Buscador = ({onSubmit, valorKeyword, onChangeKeyword, valorCategoryFilter, onChangeCategoryFilter}) => {
    return (
        <div className="buscador">
            <form onSubmit={onSubmit}>
                <input 
                    value={valorKeyword} 
                    type="text" 
                    placeholder="Buscar" 
                    onChange={onChangeKeyword}
                />
                <select 
                    value={valorCategoryFilter}
                    onChange={onChangeCategoryFilter}
                >
                    <option value="">Todos</option>
                    <option value="news/Politics">Política</option>
                    <option value="dmoz/Business">Economía</option>
                    <option value="news/Sports">Deportes</option>
                    <option value="news/Technology">Tecnología</option>
                </select>
                <button type="submit">Buscar</button>
            </form>
        </div>
    )
}