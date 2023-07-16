import Header from '../components/Header.jsx'
import Menu from '../components/Menu.jsx'
import AuthProvider from '../context/AuthContext.jsx'

const Courses = () => {
    return (
        <div>
            <Header></Header>
            <main>
                <Menu></Menu>
            </main>
        </div>
    )
}

export default Courses;