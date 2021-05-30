import express from 'express';

import { contact } from '../controllers/contact.js';

const router = express.Router();

router.post('/contact', contact )

export default router;