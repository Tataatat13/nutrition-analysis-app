export const Nutrition = ({label,quantity, unit} ) => {
    return (

        <div className="box_nutrients">
            <li className="nutrition">
            <b className="label">{label}</b>

            <em className="unit">  {quantity} {unit} </em>
            </li>
            
        </div>
    )
}