import { sequelize } from './sequelize.config';

async function authenticateDatabase(): Promise<void> {
  try {
    await sequelize.authenticate();
    console.log('Connection to database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function synchronizeDatabase(): Promise<void> {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Database synchronization failed:', error);
  }
}

export { authenticateDatabase, synchronizeDatabase };
