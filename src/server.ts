import app from "./app.js";
import env from "./config/env.js";


const server = app.listen(env.port, ()=> {
    console.log(
        `Portfolio API running on http://localhost:${env.port}`
    );
});

const shutdown = (signal: string): void =>{
    console.log(
        `${signal} received. Starting graceful shutdown...`
    );

    server.close(() => {
        console.log(`HTTP server closed.`);

        process.exit(0);
    });
};

process.on("SIGTERM", () => {
    shutdown("SIGTERM");
});

process.on("SIGINT", () => {
    shutdown("SIGINT");
});
