const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const logMemory = (action) => {
    const usedMemory = process.memoryUsage();
    console.log(`${action} process.memoryUsage() in MB: `, {
        rss: (Math.round(usedMemory.rss / 1024 / 1024) * 100) / 100,
        heapUsed: (Math.round(usedMemory.heapUsed / 1024 / 1024) * 100) / 100,
        heapTotal: (Math.round(usedMemory.heapTotal / 1024 / 1024) * 100) / 100,
        arrayBuffers: (Math.round(usedMemory.arrayBuffers / 1024 / 1024) * 100) / 100,
        external: (Math.round(usedMemory.external / 1024 / 1024) * 100) / 100,
    });
};

async function main() {
    const connectionTypeUid = "01H8Q2ZQZTNS5NA8BC8JH9Z3MR"
    const userId = 999999
    const name = "SomeAwesomeName1692996662757"

    logMemory('Before connection.findMany');
    const existingConnections = await prisma.connection.findMany({
        where: {
            // connectionType: {
            //     uid: connectionTypeUid,
            // },
            ownerId: userId,
            // deleted: false,
            // name,
        },
    });
    logMemory('After connection.findMany');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })