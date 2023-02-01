const sequelize = require('../config/connection');
// Add seed files here
// const seedFile = require('./seedFile');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    process.exit(0);
};

seedAll();