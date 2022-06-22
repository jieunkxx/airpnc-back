CREATE TABLE wishlist
(
 user_id INT NOT NULL,
 room_id INT NOT NULL,
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
 FOREIGN KEY(room_id) REFERENCES room(id) ON DELETE CASCADE
);