'use strict';

import { Router } from 'express';
import upload from './upload';

const router = new Router();

router.post('/:userId', upload.changeProfileImage);

module.exports = router;
