import { Plugin, Notice } from "obsidian";
import { DEFAULT_SETTINGS, type HardwareSettings } from "./settings";
// Pilot entry — full 16,899-line bundle split is incremental. See README parity.
export default class HardwarePlannerPlugin extends Plugin {
  settings: HardwareSettings = DEFAULT_SETTINGS;
  async onload() {
    await this.loadSettings();
    this.addRibbonIcon("cpu", "PC Hardware Planner", () => new Notice("PC Hardware Planner — pilot build."));
    this.addCommand({ id: "open-hardware-planner", name: "Open PC Hardware Planner", callback: () => new Notice("PC Hardware Planner — pilot build.") });
  }
  onunload() {}
  async loadSettings() {
    const loaded = (await this.loadData()) as Partial<HardwareSettings> | undefined;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded ?? {});
  }
  async saveSettings() { await this.saveData(this.settings); }
}
