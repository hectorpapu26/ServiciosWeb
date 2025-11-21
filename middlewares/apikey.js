function apiKeyMiddleware(req, res, next) {
  const apiKeyHeader = req.headers["x-api-key"];
  const expectedKey = process.env.API_KEY || "mi-api-key-super-secreta";

  if (!apiKeyHeader) {
    return res.fail("Falta API Key en el header 'x-api-key'", 401);
  }

  if (apiKeyHeader !== expectedKey) {
    return res.fail("API Key inválida", 403);
  }

  next();
}

module.exports = apiKeyMiddleware;
