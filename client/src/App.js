import React, { useState, useEffect } from 'react';
import './App.css';

// La URL base del API - Asegúrate de que esta URL es correcta
const API_URL = 'http://localhost:5000';

function App() {
  const [clients, setClients] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch clients on initial load
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching clients from:', `${API_URL}/api/clients`);
      const response = await fetch(`${API_URL}/api/clients`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch clients: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Clients data received:', data);
      setClients(data);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Error loading clients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      console.log('Sending client data to:', `${API_URL}/api/clients`);
      console.log('Data being sent:', formData);
      
      const response = await fetch(`${API_URL}/api/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Failed to add client: ${response.status} ${response.statusText} ${errorData.error || ''}`);
      }
      
      const newClient = await response.json();
      console.log('New client added:', newClient);
      
      // Add the new client to the list
      setClients([...clients, newClient]);
      
      // Show success message
      setSuccess('Client added successfully!');
      
      // Reset form
      resetForm();
    } catch (err) {
      console.error('Error adding client:', err);
      setError('Error adding client. Please try again.');
      
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      address: ''
    });
  };

  const handleListClients = () => {
    fetchClients();
  };

  return (
    <div className="app">
      <header className="header">
        <div className="container header-content">
          <div className="logo">
            <h1>Viajes</h1>
            <h2>Colombia</h2>
          </div>
          <div className="nav-buttons">
            <button className="btn btn-primary">Contáctanos</button>
            <button className="btn btn-outline">Iniciar sesión</button>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="module-header">
          <h1>Módulo Clientes</h1>
          <p>
            El Módulo Cliente gestiona la información de los clientes existentes, permitiendo consultar, editar y 
            organizar sus datos de forma eficiente. Facilita la búsqueda y filtrado de clientes por distintos criterios.
          </p>
        </div>
        
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="client-sections">
          <section className="client-section">
            <h2>Nuevo Cliente</h2>
            <p>Registrar nuevos clientes en el sistema, ingresando información básica como nombre, contacto y dirección.</p>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre Completo</label>
                <div className="input-icon">
                  <span className="icon user-icon"></span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nombre Completo"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>E-mail</label>
                <div className="input-icon">
                  <span className="icon email-icon"></span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="ejemplo@email.com"
                    required
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Dirección</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Cll 84 # 127 - 47"
                  required
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-success"
                  disabled={loading}
                >
                  {loading ? 'Agregando...' : 'Agregar Cliente'}
                </button>
                <button 
                  type="button" 
                  onClick={resetForm} 
                  className="btn btn-outline"
                  disabled={loading}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </section>

          <section className="client-section">
            <h2>Clientes</h2>
            <p>Visualiza todos nuestros clientes, por nombre completo y dirección.</p>
            
            <div className="client-list">
              {loading ? (
                <p className="loading-clients">Cargando clientes...</p>
              ) : clients.length === 0 ? (
                <p className="no-clients">No hay clientes registrados</p>
              ) : (
                clients.map((client) => (
                  <div key={client.idcliente} className="client-item">
                    <div className="client-name">{client.name}</div>
                    <div className="client-address">- {client.address}</div>
                  </div>
                ))
              )}
            </div>
            
            <div className="client-list-actions">
              <button 
                onClick={handleListClients} 
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Listar Clientes'}
              </button>
            </div>
          </section>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>Síguenos en</p>
          <div className="social-icons">
            <a href="#" className="social-icon twitter"></a>
            <a href="#" className="social-icon facebook"></a>
            <a href="#" className="social-icon linkedin"></a>
            <a href="#" className="social-icon instagram"></a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;