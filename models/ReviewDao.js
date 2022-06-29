//const prisma = require('./index');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/*
function readDetail(id) {
  return prisma.$queryRaw`
  SELECT
    users.name,
    review.review,
    review.score,
    review.created_at
  FROM review
  JOIN 
    users on review.user_id = users.id 
  JOIN
    room on review.room_id = room.id
  WHERE
    review.room_id = ${id}`;
}*/

async function readReviewsDao(id) {
  const selectReview = await prisma.$queryRaw`
  SELECT
      users.name,
      users.profile_image,
      review.review,
      review.score,
      review.created_at
    FROM review
    JOIN 
      users on review.user_id = users.id 
    JOIN
      room on review.room_id = room.id
    WHERE
      review.room_id = ${id}`;
  return selectReview;
}

async function readMyReviewsDao(id) {
  const selectedMyReview = await prisma.$queryRaw`
  SELECT
      users.name,
      review.score,
      room.name,
      review.review,
      review.created_at
    FROM review
    JOIN 
      users on review.user_id = users.id 
	JOIN
      room on review.room_id = room.id
    WHERE
      users.id = ${id}`;
  return selectedMyReview;
}

module.exports = { readReviewsDao, readMyReviewsDao };
