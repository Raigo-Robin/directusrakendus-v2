const Sentry = require("@sentry/node");

Sentry.init({
  dsn: "https://255cf149c69d405da08760c17416a5e6@o4505507285237760.ingest.sentry.io/4505507292315648",
  tracesSampleRate: 1.0,
});

