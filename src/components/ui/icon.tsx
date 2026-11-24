import {
  Building2,
  ChartGantt,
  ChartPie,
  Coins,
  Crown,
  Database,
  DraftingCompass,
  Drone,
  FolderOpen,
  HardHat,
  Landmark,
  Layers,
  ShieldCheck,
  Stamp,
  UserCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "@/content/home";

const icons: Record<IconKey, LucideIcon> = {
  workflow: Workflow,
  "drafting-compass": DraftingCompass,
  "hard-hat": HardHat,
  coins: Coins,
  "chart-gantt": ChartGantt,
  stamp: Stamp,
  drone: Drone,
  crown: Crown,
  "user-check": UserCheck,
  landmark: Landmark,
  building: Building2,
  "chart-pie": ChartPie,
  "shield-check": ShieldCheck,
  layers: Layers,
  database: Database,
  "folder-open": FolderOpen,
};

/** Maps content icon keys to Lucide icons so the content file stays plain data. */
export function Icon({ name, className }: { name: IconKey; className?: string }) {
  const Component = icons[name];
  return <Component aria-hidden="true" className={className} strokeWidth={1.5} />;
}
