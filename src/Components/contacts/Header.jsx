const Header = (props) => {
    
    // modifier setModalVisible pour la passer à true et faire apparaitre le modal
    const displayModal = (b) => {
        props.setModalVisible(true)
        if (b === true) {
            props.setModalConnect(true)
        } else {
            props.setModalConnect(false)
        }
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="text-light">
                        <h3><i className="bi bi-person-bounding-box me-3"></i>Répertoire</h3>
                    </div>
                    <div>
                    {!props.isLogged && <button type="button" onClick={() => displayModal(true)} className="btn btn-outline-success me-3">S'inscrire</button>}
                    <button type="button" onClick={props.isLogged ? () => props.logOutHandler () : () => displayModal(false)} className= {props.isLogged ? "btn btn-outline-danger" : "btn btn-outline-info"}>{props.isLogged ? "Se déconnecter" : "Se connecter"}</button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header