const { User } = require("../models");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await User.bulkCreate(
      [
        {
          name: "papi",
          age: 20,
          address: "bogor",
          role: "Owner",
          shopId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "pepe",
          age: 42,
          address: "tangerang",
          role: "Owner",
          shopId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "papa",
          age: 20,
          address: "jakarta",
          role: "Owner",
          shopId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "pepo",
          age: 25,
          address: "madura",
          role: "Owner",
          shopId: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "papo",
          age: 19,
          address: "bandung",
          role: "Owner",
          shopId: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { returning: true }
    )
      .then(function (newOwner) {
        const saltRounds = 10;
        return queryInterface.bulkInsert("Auths", [
          {
            email: "papi@gmail.com",
            password:
              "$2a$10$YBdLRjQUf6tevvaPPjoE8usz8NThOWie.Y0nZc5vxHX8ARkb6OIeO",
            confirmPassword:
              "$2a$10$YBdLRjQUf6tevvaPPjoE8usz8NThOWie.Y0nZc5vxHX8ARkb6OIeO",
            userId: newOwner[0].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            email: "pepe@gmail.com",
            password:
              "$2a$10$/6hr/RdXKLjWYEqVQjcS0O.jsXU1GxnZQipMS8mTX0YOeM3YYsika",
            confirmPassword:
              "$2a$10$/6hr/RdXKLjWYEqVQjcS0O.jsXU1GxnZQipMS8mTX0YOeM3YYsika",
            userId: newOwner[1].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            email: "papa@gmail.com",
            password:
              "$2a$10$2M5Ett7asTU2VWg0D6oYQ.yoME4nXnMp2U4bJhrLF5AHfmXrLQyDG",
            confirmPassword:
              "$2a$10$2M5Ett7asTU2VWg0D6oYQ.yoME4nXnMp2U4bJhrLF5AHfmXrLQyDG",
            userId: newOwner[2].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            email: "pepo@gmail.com",
            password:
              "$2a$10$Em.NlH7eZ87J8Oi/IoyuneG88S1QwdS3wD43FalxwgTrczMOJ2oZe",
            confirmPassword:
              "$2a$10$Em.NlH7eZ87J8Oi/IoyuneG88S1QwdS3wD43FalxwgTrczMOJ2oZe",
            userId: newOwner[3].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            email: "papo@gmail.com",
            password:
              "$2a$10$rkveFpivq9v0CIucbr1.EOJhUA0Ylw00eGUPDyOGcU/nVCjnt3ZxK",
            confirmPassword:
              "$2a$10$rkveFpivq9v0CIucbr1.EOJhUA0Ylw00eGUPDyOGcU/nVCjnt3ZxK",
            userId: newOwner[4].id,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ]);
      })
      .then(function (newOwner) {
        return queryInterface.bulkInsert("Shops", [
          {
            name: "papi store",
          },
          {
            name: "pepe store",
          },
          {
            name: "papa store",
          },
          {
            name: "pepo store",
          },
          {
            name: "papo store",
          },
        ]);
      });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
