import { existsSync, readdirSync } from "node:fs"
import path from "node:path"

/*
 * "How to connect your AI agent" videos, made in their own session and dropped into
 * public/videos/agent-connect/. Files are matched by prefix (claude*, chatgpt*) and extension, so the
 * section shows each video as soon as its files exist and shows nothing for one that doesn't.
 */

export type AgentVideo = { mp4?: string; webm?: string; poster?: string; captions?: string }
export type AgentVideos = { claude?: AgentVideo; chatgpt?: AgentVideo }

const DIR = "videos/agent-connect"

export function getAgentVideos(): AgentVideos {
  const folder = path.join(process.cwd(), "public", DIR)
  if (!existsSync(folder)) return {}
  const files = readdirSync(folder)
  const find = (key: string): AgentVideo | undefined => {
    const own = files.filter((file) => file.toLowerCase().startsWith(key))
    const pick = (test: RegExp) => {
      const file = own.find((name) => test.test(name))
      return file ? `/${DIR}/${file}` : undefined
    }
    const video = {
      mp4: pick(/\.mp4$/i),
      webm: pick(/\.webm$/i),
      poster: pick(/\.(jpe?g|png|webp|avif)$/i),
      captions: pick(/\.vtt$/i),
    }
    return video.mp4 || video.webm ? video : undefined
  }
  return { claude: find("claude"), chatgpt: find("chatgpt") }
}
