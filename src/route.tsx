import Result from "./pages/CalendarDrawing";
import YearInput from "./pages/YearInput";
import { RoutePath } from "./types/Route";

const ROUTE_PATH = {
  YEAR_INPUT: "/",
  CALENDAR_DRAWING: "/calendarDrawing/:year",
} as const;

interface RouteConfig {
  id: number;
  path: RoutePath;
  element: React.ReactNode;
}

const routeConfigs: RouteConfig[] = [
  { id: 0, path: ROUTE_PATH.YEAR_INPUT, element: <YearInput /> },
  { id: 1, path: ROUTE_PATH.CALENDAR_DRAWING, element: <Result /> },
];

export { ROUTE_PATH, routeConfigs };
