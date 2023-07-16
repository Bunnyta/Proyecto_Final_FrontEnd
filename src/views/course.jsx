import { useParams } from "react-router-dom"
import { useContext, useState, useEffect } from "react"
import Context from "../context/context.jsx"

import Ingredients from "../components/Ingredients.jsx"
import { formatPrice } from "../utils/utils.js"

const Course = () => {
    const { id } = useParams()
    const { menu, addToCart } = useContext(Context)

    const [course, setCourse] = useState({ ingredients: [], price: 0 })

    useEffect(() => {
        const course = menu.filter((item) => item.id === id)
        setCourse(course[0])
    }, [])

    return (
        <main>
            <div className="pizza-view">
                <section className="image" style={{ backgroundImage: `url(${course.img})` }}>
                </section>
                <article className="content">
                    <h4>{course.name}</h4>
                    <p className="desc">{course.desc}</p>

                    <Ingredients ingredients={course.ingredients}></Ingredients>

                    <div className="price-row">
                        <h3>Precio: ${formatPrice(course.price)}</h3>

                        <button className="btn btn-primary" onClick={() => addToCart(course)}>Añadir 🛒</button>
                    </div>
                </article>
            </div>
        </main>
    )
}

export default Course