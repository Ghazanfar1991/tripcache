import { spawnSync } from "node:child_process"
import { mkdir, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { readJson, repoRoot, writeJson } from "./lib/common.mjs"

const userHome = os.homedir()
const agentsDir = path.join(userHome, "Library", "LaunchAgents")
const logsDir = path.join(userHome, "Library", "Logs", "TripCacheGrowth")
const plist = path.join(agentsDir, "com.tripcache.growth-dispatcher.plist")
const node = process.execPath
const dispatcher = path.join(repoRoot, "growth", "scripts", "dispatcher.mjs")
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.tripcache.growth-dispatcher</string>
  <key>ProgramArguments</key><array><string>${node}</string><string>${dispatcher}</string></array>
  <key>WorkingDirectory</key><string>${repoRoot}</string>
  <key>StartInterval</key><integer>3600</integer>
  <key>RunAtLoad</key><true/>
  <key>StandardOutPath</key><string>${path.join(logsDir, "dispatcher.log")}</string>
  <key>StandardErrorPath</key><string>${path.join(logsDir, "dispatcher-error.log")}</string>
  <key>ProcessType</key><string>Background</string>
</dict></plist>
`

await mkdir(agentsDir, { recursive: true })
await mkdir(logsDir, { recursive: true })
await writeFile(plist, xml, "utf8")
const domain = `gui/${process.getuid()}`
spawnSync("launchctl", ["bootout", domain, plist], { stdio: "ignore" })
const load = spawnSync("launchctl", ["bootstrap", domain, plist], { encoding: "utf8" })
if (load.status !== 0) throw new Error(load.stderr || `launchctl bootstrap exited ${load.status}`)
spawnSync("launchctl", ["kickstart", "-k", `${domain}/com.tripcache.growth-dispatcher`], { stdio: "ignore" })
await writeJson("state/setup-state.json", {
  ...await readJson("state/setup-state.json", {}),
  updatedAt: new Date().toISOString(),
  launchd: "INSTALLED",
  launchdPlist: plist,
})
console.log(`Installed ${plist}`)
