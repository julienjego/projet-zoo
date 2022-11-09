import express, { Express, Request, Response } from "express";

const app: Express = express();

const PORT = 8888;

app.use("/", (req: Request, res: Response) => {
    res.send({ test: 1 });
    res.end();
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
