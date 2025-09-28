import { type StandaloneInputSchema, t } from "elysia";

export const apiSchema = {
  hello: {
    get: {
      query: t.Object({ message: t.Optional(t.String()) }),
      response: {
        200: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
    },
    post: {
      body: t.Object({ message: t.String() }),
      response: {
        200: t.Object({ message: t.String() }),
        422: t.Object({ message: t.String() }),
        500: t.Object({ message: t.String() }),
      },
    },
    ws: {
      body: t.Object({ message: t.String() }),
      response: t.Object({ message: t.String() }),
    },
  } satisfies Record<string, StandaloneInputSchema>,
};
