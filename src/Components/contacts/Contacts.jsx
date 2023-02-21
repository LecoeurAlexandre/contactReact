const Contacts = (props) => {
    const displayContactModal = (b) => {
        props.setContactModalVisible(true)
        console.log("méthode ouverture de modal")
    }


    return (
            <div className="container">
                <div className="my-3 row">
                    <div className="col-10 offset-3 bg-dark text-light p-3 rounded mx-auto">
                        <div className="d-flex justify-content-between">
                            <h4>Mes contacts</h4>
                            {props.isLogged && <button type="button" onClick={() => displayContactModal()} className="btn btn-outline-info">Ajouter un contact</button>}
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Contacts