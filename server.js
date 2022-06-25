require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.post('/review', async (req, res) => {
  // 1
  try {
    // 2

    const { review, score, user_id, room_id, reservation_id } = req.body; // 3

    console.log('review: ', review, 'score: ', score);

    const createdUser = await prisma.$queryRaw`
    Insert Into review(review, score, user_id, room_id, reservation_id) 
    VALUES (${review}, ${score}, ${user_id}, ${room_id}, ${reservation_id})`; // 4

    return res.status(201).json({ message: 'CREATED' }); // 5
  } catch (err) {
    // 2
    console.log(err);
    return res.status(500).json({ message: err.message }); // 6
  }
});

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;

// console.log(PORT);

const start = async () => {
  // 서버를 시작하는 함수입니다.
  try {
    server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect(); // 에러가 발생했을 시에 database 연결을 종료합니다.
  }
};

start();
