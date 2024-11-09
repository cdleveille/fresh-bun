import { Env } from "@constants";

const IS_PROD = Bun.env.BUN_ENV === Env.Production || Bun.env.NODE_ENV === Env.Production;

const PORT = parseInt(Bun.env.PORT ?? "3000");

const WS_PORT = parseInt(Bun.env.WS_PORT ?? "3001");

const HOST = Bun.env.HOST ?? "http://localhost";

export const Config = {
	IS_PROD,
	PORT,
	WS_PORT,
	HOST
};
