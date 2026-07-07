import createProxy from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createProxy(routing);

export const config = {
  // Todo excepto rutas internas de Next y archivos estáticos
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
