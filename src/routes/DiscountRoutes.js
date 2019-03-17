import express from 'express';
import { Client } from 'pg';
import moment from 'moment';

import config from '../config/config';
import { authRequest } from '../services/authRequest';

const client = new Client({
  connectionString: config.pgURI
});

client.connect(err => {
  if (err) {
    console.error('PG connection error', err.stack);
  } else {
    console.log('PG connected');
  }
});

const router = express.Router();
router.get('/', authRequest, (req, res) => {
  console.log('GET Discounts');
  console.log(req.query);

  let sort = 'total';
  if (req.query.sort != undefined) {
    sort = req.query.sort;
  }

  let limit = parseInt(config.resultsCounts, 10);
  if (req.query.limit != undefined) {
    limit = parseInt(req.query.limit, 10);
  }
  console.log('limit ', limit);

  let skip = 0;
  if (req.query.page != undefined) {
    const page = parseInt(req.query.page, 10);
    if (page > 0) {
      skip = limit * (req.query.page - 1);
    }
  }
  console.log('skip ', skip);

  // const query = {
  //   // give the query a unique name
  //   name: 'fetch-cheques',
  //   text: 'SELECT * FROM cheque WHERE client_id = $1',
  //   values: [req.query.client_id]
  // };

  // const query = {
  //   // give the query a unique name
  //   name: 'fetch-cheques',
  //   text: 'SELECT * FROM client_bonus ORDER BY value DESC LIMIT 1000'
  // };

  const query = {
    name: `client-rating-${sort}-${limit}-${skip}`,
    text: `
    SELECT client_total.id, client_total.value AS total, client_bonus.value AS bonus, client.name, client.phone, client.birthday
FROM client_total, client_bonus, client
WHERE client_total.id = client.id AND client_bonus.id = client.id
ORDER BY client_${sort}.value DESC LIMIT ${limit} OFFSET ${skip}
    `
  };

  client.query(query, (pg_err, pg_res) => {
    if (pg_err) {
      console.log(pg_err.stack);
      const errorMessage = 'Error to query docs!';
      // log.error(errorMessage);
      // log.error(err);
      return res.status(400).send({ result: errorMessage });
    } else {
      // console.log(pg_res.rows);

      const newResult = pg_res.rows.map((item, index) => {
        const total = parseInt(item.total, 10) * 0.01;
        const bonus = parseInt(item.bonus, 10) * 0.01;
        return {
          index: skip + index + 1,
          id: item.id,
          name: item.name,
          phone: item.phone,
          birthday: item.birthday,
          total: total,
          bonus: bonus
        };
      });
      return res.status(200).send({ result: newResult });
    }
  });
});

router.get('/cheques', authRequest, (req, res) => {
  console.log('GET Cheques');
  console.log(req.query);

  let limit = parseInt(config.resultsCounts, 10);
  if (req.query.limit != undefined) {
    limit = parseInt(req.query.limit, 10);
  }

  let skip = 0;
  if (req.query.page != undefined) {
    const page = parseInt(req.query.page, 10);
    if (page > 0) {
      skip = limit * (req.query.page - 1);
    }
  }

  let accounts_filter = '';
  if (req.query.accounts != undefined) {
    const accounts = req.query.accounts;
    if (accounts.length > 0) {
      const accounts_string = accounts.join('\',\'');
      accounts_filter = `AND cheque.pos IN ('${accounts_string}')`;
    }
  }

  let dates_filter = '';
  if (req.query.period != undefined) {
    const period = JSON.parse(req.query.period);
    if (period.date1 && period.date2) {
      const date1 = moment(period.date1)
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      const date2 = moment(period.date2)
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');

      dates_filter = `AND stamp >= '${date1}' AND stamp <= '${date2}'`;
    }
  }

  const query = {
    text: `
    SELECT client_id, uid, number, pos, account.name, type, total, stamp
FROM cheque, account
WHERE cheque.pos = account.id ${accounts_filter} ${dates_filter}
ORDER BY cheque.stamp DESC LIMIT ${limit} OFFSET ${skip}
    `
  };
  // console.log(query);

  client.query(query, (pg_err, pg_res) => {
    if (pg_err) {
      console.log(pg_err.stack);
      const errorMessage = 'Error to query cheques!';
      // log.error(errorMessage);
      // log.error(err);
      return res.status(400).send({ result: errorMessage });
    } else {
      // console.log(pg_res.rows);

      const newResult = pg_res.rows.map((item, index) => {
        const total = parseInt(item.total, 10) * 0.01;
        return {
          index: skip + index + 1,
          id: item.client_id,
          uid: item.uid,
          number: item.number,
          pos: item.pos,
          pos_name: item.name,
          type: item.type,
          total: total,
          stamp: item.stamp
        };
      });
      return res.status(200).send({ result: newResult });
    }
  });
});

router.get('/accounts', authRequest, (req, res) => {
  console.log('GET accounts');

  const query = {
    name: 'accounts',
    text: `
    SELECT id AS key, id AS value, name AS text
FROM account
WHERE account.role = 'pos'
ORDER by id
    `
  };

  client.query(query, (pg_err, pg_res) => {
    if (pg_err) {
      console.log(pg_err.stack);
      const errorMessage = 'Error to query accounts!';
      // log.error(errorMessage);
      // log.error(err);
      return res.status(400).send({ result: errorMessage });
    } else {
      // console.log(pg_res.rows);

      return res.status(200).send({ result: pg_res.rows });
    }
  });
});

router.get('/fraud', authRequest, (req, res) => {
  console.log('GET fraud cards');

  let date1 = moment()
    .subtract(30, 'days')
    .startOf('day')
    .format('YYYY-MM-DD HH:mm:ss');
  let date2 = moment()
    .endOf('day')
    .format('YYYY-MM-DD HH:mm:ss');
  let dates_filter = `AND stamp >= '${date1}' AND stamp <= '${date2}'`;
  if (req.query.period != undefined) {
    const period = JSON.parse(req.query.period);
    if (period.date1 && period.date2) {
      date1 = moment(period.date1)
        .startOf('day')
        .format('YYYY-MM-DD HH:mm:ss');
      date2 = moment(period.date2)
        .endOf('day')
        .format('YYYY-MM-DD HH:mm:ss');

      dates_filter = `AND stamp >= '${date1}' AND stamp <= '${date2}'`;
    }
  }

  const query = {
    text: `
    select * from (
      select client_id as id,
        sum(chequecount) as chequecount,
        sum(chequetotal) as chequetotal,
        count(groupdate) as datecounter,
        count(groupdate) FILTER (WHERE chequecount > 1) as baddatecounter
      from
        (
        select
          stamp::date as groupdate,
          client_id,
          count(cheque.uid) as chequecount,
          sum(cheque.total)/100 as chequetotal
        from cheque
        where true ${dates_filter}
        group by groupdate, client_id) t1
      group by client_id
      order by
        baddatecounter desc,
        datecounter desc,
        chequecount desc,
        client_id ) t2
    where baddatecounter>0
    limit 100
    `
  };

  client.query(query, (pg_err, pg_res) => {
    if (pg_err) {
      console.log(pg_err.stack);
      const errorMessage = 'Error to query fraud!';
      // log.error(errorMessage);
      // log.error(err);
      return res.status(400).send({ result: errorMessage });
    } else {
      // console.log(pg_res.rows);

      return res.status(200).send({ result: pg_res.rows });
    }
  });
});

export default router;
