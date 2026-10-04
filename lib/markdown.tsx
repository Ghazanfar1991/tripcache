import type { ReactNode } from "react"

import { formatInline } from "@/lib/markdown-inline.mjs"

type RenderMarkdownOptions = {
  skipFirstH1?: boolean
}

export function renderMarkdown(markdown: string, options: RenderMarkdownOptions = {}): ReactNode[] {
  const { skipFirstH1 = false } = options
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const elements: ReactNode[] = []
  let keyIndex = 0
  let listBuffer: { ordered: boolean; items: string[] } | null = null
  let quoteBuffer: string[] = []
  let tableBuffer: string[] = []
  let codeBuffer: string[] | null = null
  let codeLanguage = ""
  let firstH1Skipped = false

  const nextKey = () => `md-${keyIndex++}`

  const flushList = () => {
    if (!listBuffer) return
    const items = listBuffer.items.map((item) => (
      <li
        key={nextKey()}
        className="text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatInline(item) }}
      />
    ))

    elements.push(
      listBuffer.ordered ? (
        <ol key={nextKey()} className="ml-6 mb-6 list-decimal space-y-2">
          {items}
        </ol>
      ) : (
        <ul key={nextKey()} className="ml-6 mb-6 list-disc space-y-2">
          {items}
        </ul>
      ),
    )
    listBuffer = null
  }

  const flushQuote = () => {
    if (!quoteBuffer.length) return
    const html = quoteBuffer.map((line) => formatInline(line)).join("<br />")
    elements.push(
      <blockquote
        key={nextKey()}
        className="mb-6 border-l-4 border-accent/60 pl-4 italic text-muted-foreground"
        dangerouslySetInnerHTML={{ __html: html }}
      />,
    )
    quoteBuffer = []
  }

  const isSeparatorCell = (cell: string) => /^:?-{3,}:?$/.test(cell)

  const getAlignmentClass = (cell: string) => {
    const hasLeft = cell.startsWith(":")
    const hasRight = cell.endsWith(":")
    if (hasLeft && hasRight) return "text-center"
    if (hasRight) return "text-right"
    return "text-left"
  }

  const flushTable = () => {
    if (!tableBuffer.length) return

    const rows = tableBuffer.map((line) =>
      line
        .trim()
        .replace(/^\|/, "")
        .replace(/\|$/, "")
        .split("|")
        .map((cell) => cell.trim()),
    )

    const hasTableShape =
      rows.length >= 2 &&
      rows[0].length > 1 &&
      rows[1].length === rows[0].length &&
      rows[1].every((cell) => isSeparatorCell(cell))

    if (!hasTableShape) {
      tableBuffer.forEach((line) => pushParagraph(line))
      tableBuffer = []
      return
    }

    const headers = rows[0]
    const separator = rows[1]
    const bodyRows = rows.slice(2)

    elements.push(
      <div key={nextKey()} className="mb-8 overflow-x-auto rounded-2xl border border-border/60">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead className="bg-primary/10">
            <tr>
              {headers.map((header, colIndex) => (
                <th
                  key={nextKey()}
                  className={`border-b border-border/70 px-4 py-3 font-semibold text-foreground ${getAlignmentClass(separator[colIndex] || "---")}`}
                  dangerouslySetInnerHTML={{ __html: formatInline(header) }}
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row) => (
              <tr key={nextKey()} className="odd:bg-background even:bg-muted/30">
                {headers.map((_, colIndex) => (
                  <td
                    key={nextKey()}
                    className={`border-b border-border/40 px-4 py-3 align-top text-muted-foreground ${getAlignmentClass(separator[colIndex] || "---")}`}
                    dangerouslySetInnerHTML={{ __html: formatInline(row[colIndex] || "") }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>,
    )

    tableBuffer = []
  }

  const pushParagraph = (text: string) => {
    elements.push(
      <p
        key={nextKey()}
        className="mb-6 text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatInline(text) }}
      />,
    )
  }

  const flushCode = () => {
    if (!codeBuffer) return
    elements.push(
      <pre key={nextKey()} className="mb-8 overflow-x-auto rounded-2xl bg-[#121212] p-5 text-sm leading-6 text-[#f7f2e9]">
        <code className={codeLanguage ? `language-${codeLanguage}` : undefined}>{codeBuffer.join("\n")}</code>
      </pre>,
    )
    codeBuffer = null
    codeLanguage = ""
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    const trimmed = line.trim()

    if (trimmed.startsWith("```")) {
      if (codeBuffer) {
        flushCode()
      } else {
        flushList()
        flushQuote()
        flushTable()
        codeBuffer = []
        codeLanguage = trimmed.slice(3).trim()
      }
      continue
    }

    if (codeBuffer) {
      codeBuffer.push(rawLine)
      continue
    }

    if (!trimmed) {
      flushList()
      flushQuote()
      flushTable()
      continue
    }

    if (/^\|.*\|$/.test(trimmed)) {
      flushList()
      flushQuote()
      tableBuffer.push(trimmed)
      continue
    }

    flushTable()

    if (/^#{1,3}\s+/.test(trimmed)) {
      flushList()
      flushQuote()
      const level = trimmed.match(/^#{1,3}/)?.[0].length ?? 1
      const content = trimmed.replace(/^#{1,3}\s+/, "")
      const tag = `h${level}` as const

      if (level === 1 && skipFirstH1 && !firstH1Skipped) {
        firstH1Skipped = true
        continue
      }

      const className =
        level === 1
          ? "mt-10 mb-6 text-3xl font-bold text-foreground"
          : level === 2
            ? "mt-10 mb-4 text-2xl font-bold text-foreground"
            : "mt-8 mb-4 text-xl font-semibold text-foreground"

      elements.push(
        tag === "h1" ? (
          <h1 key={nextKey()} className={className} dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
        ) : tag === "h2" ? (
          <h2 key={nextKey()} className={className} dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
        ) : (
          <h3 key={nextKey()} className={className} dangerouslySetInnerHTML={{ __html: formatInline(content) }} />
        ),
      )
      continue
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushQuote()
      if (!listBuffer || listBuffer.ordered) {
        flushList()
        listBuffer = { ordered: false, items: [] }
      }
      listBuffer.items.push(trimmed.replace(/^[-*]\s+/, ""))
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      flushQuote()
      if (!listBuffer || !listBuffer.ordered) {
        flushList()
        listBuffer = { ordered: true, items: [] }
      }
      listBuffer.items.push(trimmed.replace(/^\d+\.\s+/, ""))
      continue
    }

    if (trimmed.startsWith(">")) {
      flushList()
      quoteBuffer.push(trimmed.replace(/^>\s?/, ""))
      continue
    }

    if (/^---+$/.test(trimmed)) {
      flushList()
      flushQuote()
      elements.push(<hr key={nextKey()} className="my-8 border-border" />)
      continue
    }

    pushParagraph(trimmed)
  }

  flushList()
  flushQuote()
  flushTable()
  flushCode()

  return elements
}
