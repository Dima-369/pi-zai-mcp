import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { registerZaiMcpServers } from "../src/index.ts";

export default function zaiMcpSearch(pi: ExtensionAPI) {
  registerZaiMcpServers(pi, ["search"]);
}
