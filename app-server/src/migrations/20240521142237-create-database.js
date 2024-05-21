'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Create the database
    await queryInterface.createDatabase('todo-test');

    await queryInterface.sequelize.query(`
      CREATE TABLE \`users\` (\n  
        \`id\` int NOT NULL AUTO_INCREMENT,\n  
        \`first_name\` varchar(45) NOT NULL,\n  
        \`last_name\` varchar(45) DEFAULT NULL,\n  
        \`email_id\` varchar(45) NOT NULL,\n  
        \`password\` varchar(256) NOT NULL,\n  
        \`created_at\` datetime NOT NULL,\n  
        \`updated_at\` varchar(45) DEFAULT NULL,\n  
        \`deleted_at\` varchar(45) DEFAULT NULL,\n  
        \`role\` enum(\'admin\',\'user\') NOT NULL,\n  
        PRIMARY KEY (\`id\`)\n) 
        ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT 
        CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `)

    await queryInterface.sequelize.query(`
      CREATE TABLE \`tasks\` (\n  
        \`id\` int NOT NULL AUTO_INCREMENT,\n  
        \`title\` varchar(45) NOT NULL,\n  
        \`description\` varchar(45) NOT NULL,\n  
        \`status\` enum(\'To Do\',\'In Progress\',\'Done\',\'Deleted\') NOT NULL,\n  
        \`created_at\` datetime NOT NULL,\n  
        \`updated_at\` datetime DEFAULT NULL,\n  
        \`deleted_at\` datetime DEFAULT NULL,\n  
        \`due_date\` datetime DEFAULT NULL,\n  
        \`user_id\` int NOT NULL,\n  
        PRIMARY KEY (\`id\`),\n  
        KEY \`user_id_idx\` (\`user_id\`),\n  
        CONSTRAINT \`task_user_id\` FOREIGN KEY (\`user_id\`) 
        REFERENCES \`users\` (\`id\`)\n) 
        ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT 
        CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
    `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE tasks DROP FOREIGN KEY task_user_id
    `)

    await queryInterface.sequelize.query(`
      DROP TABLE tasks
    `)

    await queryInterface.sequelize.query(`
      DROP TABLE users
    `)
  }
};
