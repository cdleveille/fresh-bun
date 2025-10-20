import { AppInfo } from "@/shared/constants";

export const Config = { IS_PROD: window.location.origin === AppInfo.url, PORT: 3000 };
