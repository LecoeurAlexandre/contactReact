import ModalComponent from '../shared/ModalComponent'

const Header = () => {
    const responseClick = () => {console.log("Coucou")}

    return (
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="text-light">
                    <h3><i className="bi bi-person-bounding-box me-3"></i>Répertoire</h3>
                </div>
                <div>
                <button type="button" onClick={<ModalComponent/>} className="btn btn-outline-success me-3">S'inscrire</button>
                <button type="button" onClick={console.log("Ca va ?")} className="btn btn-outline-info">Se connecter</button>
                </div>
            </div>
        </nav>
    </header>
    )
}

export default Header