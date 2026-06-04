// CORS_ORIGINS: ((process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:5173')
//   .split(',')
//   .map((origin) => origin.trim()),
//   // In app.js
//   app.use(
//     cors({
//       origin: CORS_ORIGINS,
//       credentials: true,
//     })
//   ));
//   // In.env
//   CORS_ORIGINS=http://localhost:3000,http://localhost:5173
