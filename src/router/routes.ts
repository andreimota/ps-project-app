import {FC} from "react";

export interface RouteDefinition {
    key: string;
    title: string;
    path: string;
    enabled: boolean;
    component?: FC<object>;
    icon?: any;
    nested?: any[];
}

export const routes: Array<RouteDefinition> = [
  {
    key: "dashboard-route",
    title: "Dashboard",
    path: "/dashboard",
    enabled: true
  },
];
