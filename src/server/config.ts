const PORT = Number(process.env.PORT) || 3000;

const IS_PROD = process.env.NODE_ENV === "production";

const MODE = IS_PROD ? "production" : "development";

export const Config = { PORT, IS_PROD, MODE };
