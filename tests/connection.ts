import { Connection, createConnection } from 'typeorm';

let connection: Connection | null = null;

export async function create(): Promise<void> {
  if (!connection) connection = await createConnection();
}

export async function close(): Promise<void> {
  await connection?.close();
}
