import { getAppRoutes } from "@/lib/app-routes";
import { SiteNavClient } from "./SiteNavClient";

export function SiteNav() {
  return <SiteNavClient routes={getAppRoutes()} />;
}
