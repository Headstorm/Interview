CREATE TABLE `Record` (
  `record_id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `basic_widget` int,
  `advanced_widget` int,
  `protection_plan` boolean
);

CREATE TABLE `User` (
  `user_id` int PRIMARY KEY,
  `name` varchar(255),
  `cell_phone` varchar(255),
  `work_phone` varchar(255),
  `email` varchar(255),
  `address` varchar(255)
);

ALTER TABLE `Record` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);
