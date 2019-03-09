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

router.get('/cards', authRequest, async (req, res) => {
  console.log('GET stats');

  const namesStats = await execQuery('namesStats');
  const phonesStats = await execQuery('phonesStats');
  const birthdaysStats = await execQuery('birthdaysStats');
  const sexStats = await execQuery('sexStats');
  const smsEnabled = await execQuery('smsEnabled');
  const emailsEnabled = await execQuery('emailsEnabled');
  const totalsStats = getTotals(namesStats);

  return res.status(200).send({
    result: {
      namesStats,
      phonesStats,
      birthdaysStats,
      sexStats,
      smsEnabled,
      emailsEnabled,
      totalsStats
    }
  });
});

router.get('/sales1', authRequest, async (req, res) => {
  console.log('GET Sales 1');
  console.log(req.query);

  let accounts_filter = '';
  if (req.query.accounts != undefined) {
    const accounts = req.query.accounts;
    if (accounts.length > 0) {
      const accounts_string = accounts.join('\',\'');
      accounts_filter = `AND cheque.pos IN ('${accounts_string}')`;
    }
  }

  let date1 = moment()
    .subtract(35, 'days')
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

      dates_filter = `AND cheque.stamp >= '${date1}' AND cheque.stamp <= '${date2}'`;
    }
  }

  let dateFields = `
    to_char(cheque.stamp::date, 'YYYY-MM-DD') AS dategroup,
		cheque.stamp::date AS datereal,
  `;
  const diffDays = moment(date2).diff(date1, 'days');
  if (diffDays > 35) {
    dateFields = `
      to_char(date_trunc('week', cheque.stamp::date), 'YYYY-MM-DD') || ' нед.' AS dategroup,
      date_trunc('week', cheque.stamp::date) AS datereal,
    `;
  }
  if (diffDays > 180) {
    dateFields = `
      to_char(date_trunc('month', cheque.stamp::date), 'YYYY Mon') AS dategroup,
      date_trunc('month', cheque.stamp::date) AS datereal,
    `;
  }

  const query = {
    text: `
    SELECT *
    FROM (
      SELECT 
        ${dateFields}
        SUM(cheque.total) AS chequeTotal       
      FROM cheque
      WHERE true ${accounts_filter} ${dates_filter}
      GROUP BY dategroup, datereal
      ORDER BY datereal DESC LIMIT 35) t
    ORDER BY datereal
    `
  };

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
        const chequetotal = Number(
          (parseInt(item.chequetotal, 10) * 0.01).toFixed(2)
        );
        return {
          index: index + 1,
          dategroup: item.dategroup,
          chequetotal: chequetotal
        };
      });
      return res.status(200).send({ result: newResult });
    }
  });
});

router.get('/sales2', authRequest, async (req, res) => {
  console.log('GET Sales 2');
  console.log(req.query);

  let date1 = moment()
    .subtract(35, 'days')
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

      dates_filter = `AND bonus.stamp >= '${date1}' AND bonus.stamp <= '${date2}'`;
    }
  }

  let dateFields = `
    to_char(bonus.stamp::date, 'YYYY-MM-DD') AS dategroup,
		bonus.stamp::date AS datereal,
  `;
  const diffDays = moment(date2).diff(date1, 'days');
  if (diffDays > 35) {
    dateFields = `
      to_char(date_trunc('week', bonus.stamp::date), 'YYYY-MM-DD') || ' нед.' AS dategroup,
      date_trunc('week', bonus.stamp::date) AS datereal,
    `;
  }
  if (diffDays > 180) {
    dateFields = `
      to_char(date_trunc('month', bonus.stamp::date), 'YYYY Mon') AS dategroup,
      date_trunc('month', bonus.stamp::date) AS datereal,
    `;
  }

  const query = {
    text: `
    SELECT *
    FROM (
      SELECT
        ${dateFields}
        SUM(bonus.value) FILTER (WHERE bonus.value > 0) as added,
        SUM(bonus.value) FILTER (WHERE bonus.value < 0) as deducted
      FROM bonus
      WHERE true ${dates_filter}
      GROUP BY dategroup, datereal
      ORDER BY datereal DESC LIMIT 35) t
    ORDER BY datereal
    `
  };

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
        const added = Number((parseInt(item.added, 10) * 0.01).toFixed(2));
        const deducted = Number(
          (parseInt(item.deducted, 10) * 0.01).toFixed(2)
        );

        return {
          index: index + 1,
          dategroup: item.dategroup,
          added: added,
          deducted: deducted
        };
      });
      return res.status(200).send({ result: newResult });
    }
  });
});

router.get('/sales3', authRequest, async (req, res) => {
  console.log('GET Sales 3');
  console.log(req.query);

  let accounts_filter = '';
  if (req.query.accounts != undefined) {
    const accounts = req.query.accounts;
    if (accounts.length > 0) {
      const accounts_string = accounts.join('\',\'');
      accounts_filter = `AND cheque.pos IN ('${accounts_string}')`;
    }
  }

  let date1 = moment()
    .subtract(35, 'days')
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

      dates_filter = `AND cheque.stamp >= '${date1}' AND cheque.stamp <= '${date2}'`;
    }
  }

  const query = {
    text: `
    SELECT pos, posname, chequetotal from
      (
        SELECT 
        pos,
        sum(cheque.total) as chequetotal
      FROM cheque
      WHERE true ${accounts_filter} ${dates_filter}
      GROUP BY pos
      ) cheques
      JOIN (
      SELECT 
        id, name as posname 
      FROM account
      ) accounts
    ON cheques.pos = accounts.id
    ORDER BY cheques.chequetotal DESC LIMIT 20
    `
  };

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
        const chequetotal = Number(
          (parseInt(item.chequetotal, 10) * 0.01).toFixed(2)
        );
        return {
          index: index + 1,
          pos: item.pos,
          posname: item.posname,
          chequetotal: chequetotal
        };
      });
      return res.status(200).send({ result: newResult });
    }
  });
});

const getTotals = namesStats => {
  let nameFilled = 0;
  let nameEmpty = 0;
  namesStats.forEach(item => {
    if (item.title === 'Да') {
      nameFilled = parseInt(item.count, 10);
    }
    if (item.title === 'Нет') {
      nameEmpty = parseInt(item.count, 10);
    }
  });
  const totals = {
    totalCards: nameFilled + nameEmpty,
    namedCards: nameFilled
  };
  return totals;
};

const execQuery = async (queryName, res) => {
  try {
    const { rows } = await client.query(getQuery(queryName));
    return rows;
  } catch (error) {
    console.log(error);
    const errorMessage = 'Error to query stats!';
    // log.error(errorMessage);
    // log.error(err);
    return res.status(400).send({ result: errorMessage });
  }
};

const getQuery = queryName => {
  if (queryName === 'namesStats') {
    const queryText = `
    SELECT *
    FROM (
    SELECT 
      COUNT(*),
      to_char(COUNT(*) * 100.0/SUM(COUNT(*)) OVER (), 'FM990.00" %"') as percent,
      CASE WHEN "name" IS not NULL THEN 'Да'
           ELSE 'Нет'
      END as title
    FROM client
    GROUP BY title
    
    UNION ALL
    
    SELECT 
      COUNT(*),
      '100 %' as percent,
      'Всего' as title
    FROM client
    GROUP BY title
    ) t
    `;
    return queryText;
  }

  if (queryName === 'phonesStats') {
    const queryText = `
    SELECT 
      COUNT(*),
      to_char(COUNT(*) * 100.0/SUM(COUNT(*)) OVER (), 'FM990.00" %"') as percent,
      CASE WHEN phone IS not NULL THEN 'Да'
          ELSE 'Нет'
      END as title
    FROM client
    WHERE "name" IS not NULL
    GROUP BY title
    `;
    return queryText;
  }

  if (queryName === 'birthdaysStats') {
    const queryText = `
    SELECT 
      COUNT(*),
      to_char(COUNT(*) * 100.0/SUM(COUNT(*)) OVER (), 'FM990.00" %"') as percent,
      CASE WHEN birthday IS not NULL THEN 'Да'
          ELSE 'Нет'
      END as title
    FROM client
    WHERE "name" IS not NULL
    GROUP BY title
    `;
    return queryText;
  }

  if (queryName === 'sexStats') {
    const queryText = `
    SELECT 
      COUNT(*),
      to_char(COUNT(*) * 100.0/SUM(COUNT(*)) OVER (), 'FM990.00" %"') as percent,
      CASE WHEN sex='male' THEN '1. Мужчин'
          WHEN sex='female' THEN '2. Женщин'
          ELSE '3. Не указано'
      END as title
    FROM client
    WHERE "name" IS not NULL
    GROUP BY title
    ORDER BY title
    `;
    return queryText;
  }

  if (queryName === 'smsEnabled') {
    const queryText = `
    SELECT 
      COUNT(*),
      to_char(COUNT(*) * 100.0/SUM(COUNT(*)) OVER (), 'FM990.00" %"') as percent,
      CASE WHEN notify_sms THEN 'Да'
          ELSE 'Нет'
      END as title
    FROM client
    WHERE "name" IS not NULL
    GROUP BY title
    `;
    return queryText;
  }

  if (queryName === 'emailsEnabled') {
    const queryText = `
    SELECT 
      COUNT(*),
      to_char(COUNT(*) * 100.0/SUM(COUNT(*)) OVER (), 'FM990.00" %"') as percent,
      CASE WHEN notify_email THEN 'Да'
          ELSE 'Нет'
      END as title
    FROM client
    WHERE "name" IS not NULL
    GROUP BY title
    `;
    return queryText;
  }
};

export default router;
