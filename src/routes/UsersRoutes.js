import express from 'express';
import axios from 'axios';

import config from '../config/config';
import log from '../services/Logging';

import { authRequest, encodeB64 } from '../services/authRequest';

const router = express.Router();

router.post('/login', (req, res) => {
  log.info('POST user login:');
  log.info(req.body);

  if (
    req.body === undefined ||
    req.body.id === undefined ||
    req.body.id === ''
  ) {
    return res
      .status(400)
      .send({ result: 'Нет данных авторизации', token: '' });
  }

  const url = `${config.fduURL}/token`;
  const loginObj = req.body;

  axios
    .get(url, {
      headers: { Authorization: `Direct ${encodeB64(loginObj)}` }
    })
    .then(response => {
      const userData = response.data;
      // console.log(userData);
      if (userData.role != 'administrator') {
        return res
          .status(400)
          .send({ result: 'Недостаточно прав доступа', token: '' });
      }
      return res
        .status(200)
        .send({ result: response.data, token: encodeB64(response.data) });
    })
    .catch(error => {
      // console.log(error);
      return res
        .status(error.response.status)
        .send({ result: error.response.data, token: '' });
    });
});

router.get('/current', authRequest, (req, res) => {
  log.info('GET current user');
  const { user } = req;
  return res.status(200).send({ result: user });
});

export default router;
