import { Pool, QueryResult } from "pg";
import dotenv from "dotenv";
import { User, UserRole } from '../models/user';

dotenv.config();

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: parseInt(process.env.PGPORT || "5432")
});

async function connectToDB() {
  try {
    await pool.connect();
  } catch (err) {
    console.log(err);
  }
};
async function shutdownDB() {
  await pool.end()
}

connectToDB();

async function findAll(role: UserRole): Promise<User[]> {
  let query;

  if (role) {
    query = await pool.query(`SELECT * FROM users WHERE role = $1`, [role]);
  } else {
    query = await pool.query(`SELECT * FROM users`);
  }
  
  return query.rows;
}

async function findById(id: string): Promise<User[]> {
  const query = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return query.rows;
}

async function findByUsername(username: string): Promise<User[]> {
  const query = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
  return query.rows;
}

async function createUser(user: User): Promise<QueryResult> {
  return pool.query(
    `INSERT INTO users(username, email, role) VALUES($1, $2, $3)`, 
    [user.username, user.email, user.role]
  );
}

async function updateUser(user: User): Promise<QueryResult> {
  return pool.query(
    `UPDATE users SET email=$1,role=$2`, 
    [user.email, user.role]
  );
}

async function deleteUser(id: string): Promise<QueryResult> {
  return pool.query(`DELETE FROM users WHERE id=$1`, [id]);
}

export {
  findAll,
  findById,
  findByUsername,
  createUser,
  updateUser,
  deleteUser,
  shutdownDB,
}