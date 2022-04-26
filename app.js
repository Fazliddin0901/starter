const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json()); //Middleware qorovulcha

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/toursSimple.json`, {
    encoding: 'utf-8',
  })
);

// app.get('/api/v1/reviews', (req, res) => {
//   res.status(200).json({
//     status: 'Succes',
//     data: {
//       reviews,
//     },
//   });
// });

// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, {
//     encoding: 'utf-8',
//   })
// );

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Succes',
    data: {
      tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  const data = req.body;
  const newId = tours[tours.length - 1].id + 1;
  const complateObj = Object.assign({ id: newId }, data);

  tours.push(complateObj);

  fs.writeFile(
    `${__dirname}/dev-data/data/toursSimple.json`,
    JSON.stringify(tours),
    'utf-8',
    (err) => {
      res.status(201).json({
        status: 'Succes',
        data: {
          tour: complateObj,
        },
      });
    }
  );
});

app.get('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  const data = tours.find((val) => val.id == id);
  if (!data) {
    res.status(200).json({
      status: 'succes',
      data: {
        data,
      },
    });
  } else {
    res.status(404).json({
      status: 'Bunday narsa yoq',
      massage: 'Invelit ID',
    });
  }

  // res.status(200).json({
  //   status: 'succes',
  //   data: {
  //     data,
  //   },
  // });
});

app.patch('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  const data = tours.find((val) => val.id == id);

  res.status(200).json({
    status: 'succes',
    data: {
      data,
    },
  });
});
const port = 8000;
app.listen(port, '127.0.0.1');
