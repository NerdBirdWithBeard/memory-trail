const prisma = require('../lib/prisma');

module.exports = async (signal) => {
    console.log(`${signal} received: closing Prisma client...`);
    await prisma.$disconnect();
    process.exit(0);
};
