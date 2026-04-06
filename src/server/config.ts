const PORT = Number(process.env.PORT) || 3000;

const IS_PROD = process.env.NODE_ENV === "production";

export const Config = { PORT, IS_PROD };
