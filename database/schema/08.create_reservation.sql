CREATE TABLE reservation(id INT NOT NULL AUTO_INCREMENT,
  status varchar(50),
  check_in datetime not null,
  check_out datetime not null,
  guests int,
  user_id int,
  room_id int,
  primary key(id), 
  FOREIGN key (room_id) REFERENCES room(id) ON DELETE CASCADE,
  FOREIGN key (user_id) REFERENCES users(id) ON DELETE CASCADE
)
