import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.js";
import { registerUserSchema, loginUserSchema, loginWithGoogleOAuthSchema} from "../validation/auth.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {  registerUserController , loginUserController, logoutUserController, refreshUserSessionController} from "../controllers/auth.js";
import { requestResetEmailSchema,resetPasswordSchema } from '../validation/auth.js';
import { requestResetEmailController, resetPasswordController, getGoogleOAuthUrlController,loginWithGoogleController } from '../controllers/auth.js';
 

const router = Router();

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));
router.post('/request-reset-email',validateBody(requestResetEmailSchema),ctrlWrapper(requestResetEmailController),
);
router.post('/reset-password',validateBody(resetPasswordSchema),ctrlWrapper(resetPasswordController),
);
router.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
router.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default router;
