import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

type GlobalState<T> = {
  activeServers: Set<T>;
  warnedMissingApiKey: boolean;
};

const STATE_KEY = Symbol.for("pi-zai-mcp.state");

function globalState<T>(): GlobalState<T> {
  const global = globalThis as typeof globalThis & { [STATE_KEY]?: GlobalState<T> };
  global[STATE_KEY] ??= { activeServers: new Set<T>(), warnedMissingApiKey: false };
  return global[STATE_KEY];
}

export function addActiveServers<T>(servers: readonly T[]): () => void {
  const state = globalState<T>();
  for (const server of servers) state.activeServers.add(server);
  return () => {
    for (const server of servers) state.activeServers.delete(server);
  };
}

export function getActiveServers<T>(): T[] {
  return [...globalState<T>().activeServers];
}

export function warnOnceIfMissingApiKey(hasApiKeySource: () => boolean, message: string): void {
  const state = globalState<unknown>();
  if (state.warnedMissingApiKey || hasApiKeySource()) return;
  state.warnedMissingApiKey = true;
  console.warn(message);
}

export function resetGlobalStateForTests(): void {
  const state = globalState<unknown>();
  state.activeServers.clear();
  state.warnedMissingApiKey = false;
}

export function registerStatusCommand(pi: ExtensionAPI, getStatusJson: () => string): void {
  pi.registerCommand("zai-mcp-status", {
    description: "Show configured Z.ai MCP servers and connection status",
    handler: async (_args, ctx) => {
      const status = getStatusJson();
      if (ctx.hasUI) {
        ctx.ui.notify(status, "info");
      } else {
        const stream = ctx.mode === "print" ? process.stdout : process.stderr;
        stream.write(`${status}\n`);
      }
    },
  });
}
