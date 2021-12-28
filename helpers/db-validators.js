const Role = require('../models/role');
const Usuario = require('../models/usuario')


const esRoleValido = async(rol='') => {
    const existRol = await Role.findOne({rol});
    if(!existRol){
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }

}


const emailExiste = async(correo='') => {


const existeEmail = await Usuario.findOne({correo});
if(existeEmail) {
    throw new Error(`Este correo ya existe ${correo}`);
  }


}



const existeUsuarioPorId = async(id ='') => {


    const existeUsuario = await Usuario.findById(id);
    if(!existeUsuario) {
        throw new Error( `Ya existe un usuario con este  id: `);
      }
    
    
    }




module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}