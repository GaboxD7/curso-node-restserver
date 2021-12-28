
const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');








const usuariosGet = async(req=request, res= response) => {
//const {q, nombre = "no name", apikey, page="10", limit} = req.query;
const { limite = 5, desde = 0 } = req.query;
const query = {estado: true};





const [total, usuarios] = await Promise.all([
  Usuario.countDocuments(query),
  Usuario.find(query)
    .limit(Number(limite))
    .skip(Number(desde))
]);

    res.json({
     
  total,
  usuarios
 
    });
}

const usuariosPut = async(req, res=response) => {
    const {id} = req.params;
    const {_id, password, google, ...resto} = req.body;

  // TODO validar contra base de datos
  if(password){
    const salt = bcryptjs.genSaltSync();
   resto.password = bcryptjs.hashSync( password, salt);
  }
  
  const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
  }

 const  usuariosPost = async(req, res= response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario( {nombre, correo, password, rol} );
//verificar si el correo existe


// Ecriptar la contraseña
const salt = bcryptjs.genSaltSync();
usuario.password = bcryptjs.hashSync( password, salt);

// Guaradar en BD

    await usuario.save();

    res.json({
      usuario
    });






    
  }

const usuariosPatch = (req, res= response) => {
    res.json({
    msg:'patch API - Controlador '
    })
  }
const usuariosDelete = async(req, res= response) => {
 const {id} = req.params;

const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
// Fisicamento borrado
//const usuario = await Usuario.findByIdAndDelete(id);
    res.json(usuario)
  }


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosPatch,
    usuariosDelete
}