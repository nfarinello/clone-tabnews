import database from "infra/database.js";
async function status(request, response) {
  const updatedAt = new Date().toISOString();
  const dbVersion = await database.query("SHOW server_version;");
  const maxConnection = await database.query("SHOW max_connections;");
  const databaseName = process.env.POSTGRES_DB;
  const openedConnections = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  response.status(200).json({
    updated_at: updatedAt,
    db_version: dbVersion.rows[0].server_version,
    max_connections: parseInt(maxConnection.rows[0].max_connections, 10),
    opened_connections: parseInt(openedConnections.rows[0].count, 10),
  });
}
export default status;
