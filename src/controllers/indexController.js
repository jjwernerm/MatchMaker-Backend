const jwt = require("jsonwebtoken");

const {
  verificarUsuario,
  registrarUsuario,
  actualizarUsuario,
  registrarRecinto,
  actualizarRecinto,
  obtenerRecintosTenant,
  obtenerRecintoUser,
  obtenerCanchas,
  registrarCancha,
  actualizarCancha,
  registrarReserva,
  ObtenerUsuario,
} = require("../function/functions");

const indexController = {
  iniciarSesion: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('email:', email);
      console.log('password:', password);
      const token = jwt.sign({ email }, "az_AZ", { expiresIn: "300" });
      console.log('token:', token);
      const usuario = await verificarUsuario(email, password);
      console.log('usuario:', usuario);
      res.header('Authorization', `Bearer ${token}`).status(200).send({ usuario, token });
    } catch (e) {
      res.status(404).send(e.message);
    }
  },

  registroUsuario: async (req, res) => {
    try {
      const usuario = req.body;
      await registrarUsuario(usuario);
      res.status(201).send("Usuario creado con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  editarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = req.body;
      await actualizarUsuario(usuario, id);
      res.status(201).send("Datos de Usuario actualizados con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  registroRecinto: async (req, res) => {
    try {
      const recinto = req.body;
      await registrarRecinto(recinto);
      res.status(201).send("Recinto creado con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  editarRecinto: async (req, res) => {
    try {
      const { id } = req.params;
      const recinto = req.body;
      await actualizarRecinto(recinto, id);
      res.status(201).send("Datos del recinto actualizados con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  getRecintosTenant: async (req, res) => {
    try {
      const usuario_id = req.body;
      const recintos = await obtenerRecintosTenant(usuario_id);
      res.status(200).send(recintos);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await ObtenerUsuario(id);
      console.log(usuario)
      res.status(200).send(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  getRecintosUser: async (req, res) => {
    try {
      const comuna = req.body;
      const recintos = await obtenerRecintoUser(comuna);
      res.status(200).send(recintos);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  getCanchas: async (req, res) => {
    try {
      const canchas = await obtenerCanchas();
      res.status(200).send(canchas);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },

  registroCancha: async (req, res) => {
    try {
      const cancha = req.body;
      await registrarCancha(cancha);
      res.status(201).send("Cancha creado con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  editarCancha: async (req, res) => {
    try {
      const { id } = req.params;
      const cancha = req.body;
      await actualizarCancha(cancha, id);
      res.status(201).send("Datos de la cancha actualizados con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

  registroReserva: async (req, res) => {
    try {
      const reserva = req.body;
      await registrarReserva(reserva);
      res.status(201).send("Reserva creada con éxito");
    } catch (error) {
      res.status(500).send(error);
    }
  },

};

module.exports = indexController;
