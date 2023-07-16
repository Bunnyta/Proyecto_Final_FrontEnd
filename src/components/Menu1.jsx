import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import Context from '../context/context.jsx'

import Ingredients from "./Ingredients.jsx"

import { formatPrice } from "../utils/utils.js"

const Menu1 = () => {
    const { menu, addToCart } = useContext(Context)
    const navigate = useNavigate()

    const viewPizza = (id) => navigate(`/pizza/${id}`)

    return (
        <section className="menu">
            {
                menu.map((item) => {
                    return (
                        <div className="card" key={item.id}>
                            <div className="content">
                                <img src={item.img} alt={item.name} />
                                <h4>{item.name}</h4>

                                
                                

                                <div className="btn-row">
                                    <button className="btn btn-primary" onClick={() => viewPizza(item.id)}>Ver más 👀</button>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </section>
    )
}

export default Menu1