const router   = require('express').Router();
const ctrl     = require('../../controllers/auth.controller');
const validate = require('../../middlewares/validate');
const { body } = require('express-validator');
const userSvc  = require('../../services/user.service');

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, passwordConfirmation]
 *             properties:
 *               name: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *               passwordConfirmation: { type: string, format: password }
 *     responses:
 *       201: { description: Creado }
 *       400: { description: Datos inválidos }
 *       409: { description: email ya usado }
 */
router.post(
  '/register',
  [
    body('name')
      .trim().notEmpty().withMessage('name es obligatorio')
      .isLength({ min: 2, max: 50 }).withMessage('name debe tener 2–50 chars'),

    body('email')
      .trim().isEmail().withMessage('email inválido').normalizeEmail()
      .custom(async (value) => {
        const user = await userSvc.findByEmail(value);   
        if (user) throw new Error('email ya está en uso');
        return true;
      }),

    body('password')
      .isLength({ min: 6 }).withMessage('password mínimo 6 chars'),

    body('passwordConfirmation') 
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('password no coincide');
        }
        return true;
      }),
  ],
  validate,       
  ctrl.register    
);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string, format: email }
 *               password: { type: string, format: password }
 *     responses:
 *       200:
 *         description: Login correcto
 *       400: { description: Datos inválidos }
 *       401: { description: Credenciales inválidas }
 */

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('email inválido'),
    body('password').notEmpty().withMessage('password es obligatorio'),
  ],
  validate,
  ctrl.login
);

module.exports = router;
