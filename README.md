# Groupchat App

    This is a simple group chat application which enables users to chat with each other in a group. 

### Tech Stack Used
    UI: Vue JS
    API: Node JS
    DB: MySQL
  ### Required Softwares/Tools 
    1. Node js 
    2. Vue-CLI 
    3. MySQL
  ### Source Code
    https://github.com/amarkant814/groupchat.git

  ## DB schema name
    socketdb


  ## DB Tables 
  users 
  ```
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```
  groups
  ```
CREATE TABLE `groups` (
  `id` int NOT NULL AUTO_INCREMENT,
  `groupname` varchar(45) NOT NULL,
  `created_by` int NOT NULL,
  `created_on` datetime NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `created_by_idx` (`created_by`),
  CONSTRAINT `created_by` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

messages
```
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `message` varchar(4445) NOT NULL,
  `sent_by` int NOT NULL,
  `group_id` int NOT NULL,
  `created_on` datetime DEFAULT NULL,
  `likes` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `sent_by_idx` (`sent_by`),
  KEY `group_id_idx` (`group_id`),
  CONSTRAINT `group_id` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sent_by` FOREIGN KEY (`sent_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

group_user_map
```
CREATE TABLE `group_user_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  `status` int NOT NULL,
  `role` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `group_id_idx` (`group_id`),
  CONSTRAINT `groupID` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```
user_msg_like_map
```
CREATE TABLE `user_msg_like_map` (
  `id` int NOT NULL AUTO_INCREMENT,
  `m_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `unique_m_id_user_id` (`m_id`,`user_id`),
  KEY `m_id_idx` (`m_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `m_id` FOREIGN KEY (`m_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usr_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

```

 ### Commands for Node Server
    In terminal go to path groupchat/Server
   ### Run 
      npm install
      node src/index.js
  ### Commands for UI 
    In terminal go to path groupchat/UI
 ### Run
    npm install 
    npm run serve 