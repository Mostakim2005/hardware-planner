import { Plugin, Notice } from "obsidian";
import { DEFAULT_SETTINGS, type HardwareSettings } from "./settings";
// HardwarePlannerPlugin entry.
export default class HardwarePlannerPlugin extends Plugin {
  settings: HardwareSettings = DEFAULT_SETTINGS;
  async onload() {
    await this.loadSettings();
    this.addRibbonIcon("cpu", "PC Hardware Planner", () => new Notice("PC Hardware Planner â€” pilot build."));
    this.addCommand({ id: "open-hardware-planner", name: "Open PC Hardware Planner", callback: () => new Notice("PC Hardware Planner â€” pilot build.") });
  }
  onunload() {}
  async loadSettings() {
    const loaded = (await this.loadData()) as Partial<HardwareSettings> | undefined;
    this.settings = Object.assign({}, DEFAULT_SETTINGS, loaded ?? {});
  }
  async saveSettings() { await this.saveData(this.settings); }
}

