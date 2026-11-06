// Hardware Planner — faithful helpers from Nihon 0.7.0 (logic-psu, logic-compat)
export interface PsuAnalysis {
  continuousWatts: number;
  peakWatts: number;
  status: "pass" | "warn" | "fail";
  badgeText: string;
  explanation: string;
}

export function analyzePsuLoad(gpuTdpWatts: number, psuWattage = 550, systemBaseWatts = 85): PsuAnalysis {
  const continuousWatts = gpuTdpWatts + systemBaseWatts;
  const transientMult = gpuTdpWatts >= 220 ? 1.65 : 1.35;
  const peakWatts = Math.round(gpuTdpWatts * transientMult + systemBaseWatts);
  let status: PsuAnalysis["status"] = "pass";
  let badgeText = "Headroom Safe";
  let explanation = "";
  if (peakWatts > psuWattage) {
    status = "fail";
    badgeText = "OCP Trip Risk";
    explanation = `Microsecond transient power bursts can spike to ~${peakWatts}W, which exceeds your ${psuWattage}W rated PSU capacity. This risks triggering Over-Current Protection (OCP) shutdowns during demanding games.`;
  } else if (continuousWatts > 0.75 * psuWattage) {
    status = "warn";
    badgeText = "Heavy PSU Load";
    explanation = `Continuous consumption is ${continuousWatts}W with peak spikes around ~${peakWatts}W. The ${psuWattage}W PSU will handle it, but the internal fan will run hot and loud under continuous gaming sessions.`;
  } else {
    status = "pass";
    badgeText = "Headroom Safe";
    explanation = `Continuous load is an easy ${continuousWatts}W with transient peaks at ~${peakWatts}W. The ${psuWattage}W PSU operates inside its quietest and most energy-efficient curve.`;
  }
  return { continuousWatts, peakWatts, status, badgeText, explanation };
}
