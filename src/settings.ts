// Hardware Planner — pilot TS scaffold from Mostakim2005 template.
// Full bundle split is incremental. See README parity checklist.
export interface HardwareSettings {
  enablePareto: boolean;
  psuWattage: number;
  glassmorphism: boolean;
}

export const DEFAULT_SETTINGS: HardwareSettings = {
  enablePareto: true,
  psuWattage: 550,
  glassmorphism: true,
};
