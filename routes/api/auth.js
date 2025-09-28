const router   = require('express').Router();
const ctrl     = require('../../controllers/auth.controller');
const validate = require('../../middlewares/validate');
const { body } = require('express-validator');
const userSvc  = require('../../services/user.service');


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
