const { Router } = require('express');
const { check } = require('express-validator');
const { esRoleValido, emailExiste , existeUsuarioPorId} = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');

const {   usuariosGet,
          usuariosPut,
         usuariosPatch,
          usuariosDelete, 
          usuariosPost} = require('../controllers/usuarios.controller');


const router = Router();


router.get('/',[
check('limite','El limite debe ser solo numero').isNumeric(),

], usuariosGet);

router.put('/:id', [
check('id','No es un ID valido').isMongoId(),
check('id').custom(existeUsuarioPorId),
check('rol').custom(esRoleValido),
validarCampos

    
],usuariosPut); 

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser mas de 6 letras').isLength({min:6}),
    check('correo').custom(emailExiste),
    check('rol').custom(esRoleValido),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], usuariosPost);

router.patch('/',usuariosPatch);
   
router.delete('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos

],usuariosDelete);
   










module.exports = router;