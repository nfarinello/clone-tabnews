test("GET to /api/v1/status returns 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const responseBody = await response.json();
  expect(responseBody.updated_at).toBeDefined();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  const database = responseBody.dependencies.database;
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
  expect(database.db_version).toBeDefined();
  expect(database.db_version).toMatch(/^16\./);
  expect(database.max_connections).toBeDefined();
  expect(database.max_connections).toBeGreaterThan(0);
  expect(database.opened_connections).toBeDefined();
  expect(database.opened_connections).toBeGreaterThanOrEqual(1);
});
