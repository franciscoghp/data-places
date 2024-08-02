const MarkerModal = ({ selectedVenue, setSelectedVenue, showModal, setShowModal, setState }) => {
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVenue(null);
    setState((prevState) => ({
      ...prevState,
      isAddingMarker: true // Habilitar agregar marcadores cuando el modal está cerrado
    }));
  };

  return (
    <div className={`modal fade show ${showModal ? 'd-block' : ''}`} tabIndex="-1" style={{ display: showModal ? 'block' : 'none' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Venue Information</h5>
            <button type="button" className="btn-close" onClick={handleCloseModal}></button>
          </div>
          <div className="modal-body">
            <p><strong>Name:</strong> {selectedVenue.name}</p>
            <p><strong>Latitude:</strong> {selectedVenue.geometry[0]}</p>
            <p><strong>Longitude:</strong> {selectedVenue.geometry[1]}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkerModal;
