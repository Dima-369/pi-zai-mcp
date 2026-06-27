import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerZaiMcpStatusCommand } from "../src/index.ts";

export default function zaiMcpStatus(pi: ExtensionAPI) {
  registerZaiMcpStatusCommand(pi);
}
