import {
  AppWindow,
  Box,
  Gamepad2,
  Layers,
  type LucideIcon,
  Smartphone,
} from "lucide-react";
import type { ProjectCategory } from "@/data/projects";

export const categoryIcons: Record<ProjectCategory, LucideIcon> = {
  "Full-stack": Layers,
  Frontend: AppWindow,
  Mobile: Smartphone,
  Game: Gamepad2,
  Other: Box,
};
