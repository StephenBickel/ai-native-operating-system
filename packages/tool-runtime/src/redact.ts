const defaultSensitiveFields = new Set([
  "authorization",
  "password",
  "secret",
  "token",
  "apikey",
  "api_key",
  "encryptedsecret",
]);

export function redact(value: unknown, extraFields: string[] = []): unknown {
  const sensitive = new Set([
    ...defaultSensitiveFields,
    ...extraFields.map((field) => field.toLowerCase()),
  ]);

  function visit(current: unknown): unknown {
    if (Array.isArray(current)) return current.map(visit);
    if (current && typeof current === "object") {
      return Object.fromEntries(Object.entries(current).map(([key, nested]) => [
        key,
        sensitive.has(key.toLowerCase()) ? "[REDACTED]" : visit(nested),
      ]));
    }
    return current;
  }

  return visit(value);
}
