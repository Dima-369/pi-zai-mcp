import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerZaiMcpServers } from "../src/index.ts";

export default function zaiMcpZread(pi: ExtensionAPI) {
  registerZaiMcpServers(pi, ["zread"]);
}
