import axios from 'axios';
import config from '../config/config';

const encodeB64 = obj => {
  let objJsonStr = JSON.stringify(obj);
  return Buffer.from(objJsonStr).toString('base64');
};

const decodeB64 = str => {
  return Buffer.from(str, 'base64').toString('ascii');
};

const authRequest = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ result: 'Нет данных авторизации' });
  }

  // decode token
  const decodedStr = decodeB64(req.headers.authorization);
  let decodedObj = {};
  try {
    decodedObj = JSON.parse(decodedStr);
  } catch (e) {
    return res.status(400).send({ result: 'Ошибка авторизации по токену' });
  }

  const url = `${config.fduURL}/account/${decodedObj.id}`;
  axios
    .get(url, {
      headers: { Authorization: `Bearer ${req.headers.authorization}` }
    })
    .then(response => {
      // console.log(response.data);
      req.user = response.data;
      next();
      //   return res
      //     .status(200)
      //     .send({ result: response.data, token: encodeB64(response.data) });
    })
    .catch(error => {
      // console.log(error);
      return res
        .status(error.response.status)
        .send({ result: error.response.data });
    });

  // const { user } = req;
  // const userInfo = setUserInfo(user);
  // return res.status(200).send({ result: userInfo });
};

module.exports = {
  authRequest,
  encodeB64,
  decodeB64
};
