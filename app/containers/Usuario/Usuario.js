import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const RegistroUsuarios = () => {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del usuario a un servidor, almacenarlos en una base de datos, etc.
    console.log(usuario);
    // Limpia los campos después de enviar el formulario
    setUsuario({ nombre: '', email: '', contraseña: '' });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <form onSubmit={handleSubmit} style={{ width: '50%' }}>
        <TextField
          fullWidth
          label="Nombre"
          name="nombre"
          value={usuario.nombre}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          name="contraseña"
          value={usuario.contraseña}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Registrarse
        </Button>
      </form>
    </div>
  );
}

export default RegistroUsuarios;