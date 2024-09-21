import React, { useState } from 'react'; 
import './index.css';  // Agrega estilos CSS aquí si lo necesitas

function App() {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedTests, setSelectedTests] = useState([]);

  const pruebasBasicas = ['Login', 'Crear tarjeta', 'Editar tarjeta', 'Menu de Opciones', 'Borrar tarjeta', 'Modificar contraseña', 'Cerrar Sesión'];
  const pruebasAvanzadas = ['Acceso a tarjetero','Añadir tarjeta tarjetero','Display']
  const pruebasAdmin = ['Panel Tarjetas','Panel Usuarios','Firma','Estadísticas','CRM']

  const users = [
    { name: 'Free', icon: '/icons/freeUser.svg', accessibleTests: pruebasBasicas },
    { name: 'Corp', icon: '/icons/corporateUser.svg', accessibleTests: pruebasBasicas },
    { name: 'New', icon: '/icons/newUser.svg', accessibleTests: pruebasBasicas },
    { name: 'Pro', icon: '/icons/proUser.svg', accessibleTests: [...pruebasBasicas, ...pruebasAvanzadas] }, 
    { name: 'Manager', icon: '/icons/managerUser.svg', accessibleTests: [...pruebasBasicas, ...pruebasAvanzadas, ...pruebasAdmin] }, 
    { name: 'Admin', icon: '/icons/adminUser.svg', accessibleTests: [...pruebasBasicas, ...pruebasAvanzadas, ...pruebasAdmin] }
  ];
  
  const basicTests = [
    { name: 'Login', icon: '/icons/login.svg' },
    { name: 'Crear tarjeta', icon: '/icons/createCard.svg' },
    { name: 'Editar tarjeta', icon: '/icons/editCard.svg' },
    { name: 'Menu de Opciones', icon: '/icons/menuOptions.svg' },
    { name: 'Borrar tarjeta', icon: '/icons/deleteCard.svg' },
    { name: 'Modificar contraseña', icon: '/icons/password.svg' },
    { name: 'Cerrar Sesión', icon: '/icons/logout.svg' },
  ];

  const advancedTests = [  
    { name: 'Acceso a tarjetero', icon: '/icons/accessCardholder.svg' },
    { name: 'Añadir tarjeta tarjetero', icon: '/icons/addCardToHolder.svg' },
    { name: 'Display', icon: '/icons/display.svg' },
  ];

  const adminTests = [
    { name: 'Panel Tarjetas', icon: '/icons/cardsPanel.svg' },
    { name: 'Panel Usuarios', icon: '/icons/usersPanel.svg' },
    { name: 'Firma', icon: '/icons/signature.svg' },
    { name: 'Estadísticas', icon: '/icons/stats.svg' },
    { name: 'CRM', icon: '/icons/crm.svg' },
  ];

  const toggleUser = (user) => {
    setSelectedUsers(prevState => prevState.includes(user) ? prevState.filter(u => u !== user) : [...prevState, user]);
  };

  const toggleTest = (test) => {
    setSelectedTests(prevState => prevState.includes(test) ? prevState.filter(t => t !== test) : [...prevState, test]);
  };

  const selectAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user.name));
    }
  };

  const selectAllTests = () => {
    const allTests = [...basicTests, ...advancedTests, ...adminTests].map(test => test.name);
    if (selectedTests.length === allTests.length) {
      setSelectedTests([]);
    } else {
      setSelectedTests(allTests);
    }
  };

  const executeSelected = () => {
    alert(`Ejecutando para usuarios: ${selectedUsers.join(', ')} y pruebas: ${selectedTests.join(', ')}`);
  };

  const executeAll = () => {
    alert('Ejecutando todas las pruebas para todos los usuarios');
  };

  // Función para comprobar si un test es accesible para al menos uno de los usuarios seleccionados
  const isTestAccessible = (testName) => {
    if (selectedUsers.length === 0) return true; // Si no hay usuario seleccionado, mostrar todas las pruebas
    return selectedUsers.some((userName) => {
      const user = users.find((u) => u.name === userName);
      return user?.accessibleTests.includes(testName);
    });
  };

  return (
    <div className="App">
      <h1>Interfaz de Pruebas Dinámicas</h1>
      <div className="container">
        {/* Sección de botones de usuario */}
        <div className="left-section">
          <h2>Usuarios</h2>
          <div className="user-buttons">
            {users.map((user, index) => (
              <button
                key={index}
                className={`user-btn ${selectedUsers.includes(user.name) ? 'selected' : ''}`}
                onClick={() => toggleUser(user.name)}
              >
                <img src={user.icon} alt={user.name} />
                {user.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sección de botones de pruebas */}
        <div className="right-section">
          <h2>Pruebas Básicas</h2>
          <div className="test-buttons">
            {basicTests.map((test, index) => (
              <button
              key={index}
              className={`test-btn ${selectedTests.includes(test.name) ? 'selected' : ''} ${isTestAccessible(test.name) ? '' : 'hidden'}`}
              onClick={() => toggleTest(test.name)}
            >
              <img src={test.icon} alt={test.name} />
              {test.name}
            </button>
            ))}
          </div>

          <h2>Pruebas Avanzadas</h2>
          <div className="test-buttons">
            {advancedTests.map((test, index) => (
               <button
               key={index}
               className={`test-btn ${selectedTests.includes(test.name) ? 'selected' : ''} ${isTestAccessible(test.name) ? '' : 'hidden'}`}
               onClick={() => toggleTest(test.name)}
             >
               <img src={test.icon} alt={test.name} />
               {test.name}
             </button>
            ))}
          </div>

          <h2>Pruebas Administrador</h2>
          <div className="test-buttons">
            {adminTests.map((test, index) => (
               <button
              key={index}
              className={`test-btn ${selectedTests.includes(test.name) ? 'selected' : ''} ${isTestAccessible(test.name) ? '' : 'hidden'}`}
              onClick={() => toggleTest(test.name)}
            >
              <img src={test.icon} alt={test.name} />
              {test.name}
            </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sección de botones de acciones */}
      <div className="action-buttons">
        <h2>Acciones</h2>
        <button onClick={selectAllUsers}>Seleccionar todos los usuarios</button>
        <button onClick={selectAllTests}>Seleccionar todas las pruebas</button>
        <button onClick={executeSelected}>Ejecutar seleccionados</button>
        <button onClick={executeAll}>Ejecutar todos</button>
      </div>
    </div>
  );
}

export default App;
