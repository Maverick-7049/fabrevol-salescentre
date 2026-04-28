import { app, initApp } from "./app";

// Initialize routes once at module load; all requests await this promise.
const initPromise = initApp();

export default async function handler(req: any, res: any) {
  await initPromise;
  app(req, res);
}
