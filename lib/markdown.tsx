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
        className="min-w-0 break-words ps-1.5 text-[17px] leading-[1.75] text-tc-ink-2 [overflow-wrap:anywhere] sm:text-[18px]"
        dangerouslySetInnerHTML={{ __html: formatInline(item) }}
      />
    ))

    elements.push(
      listBuffer.ordered ? (
        <ol key={nextKey()} className="mb-7 list-decimal space-y-2.5 ps-6 marker:font-semibold marker:text-tc-violet marker:tabular-nums">
          {items}
        </ol>
      ) : (
        <ul key={nextKey()} className="mb-7 list-disc space-y-2.5 ps-6 marker:text-tc-violet">
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
        className="relative my-9 min-w-0 overflow-hidden break-words rounded-[22px] border border-[#e4dcff] bg-[#f7f5ff] px-6 py-5 text-[16px] leading-[1.8] text-tc-ink-2 shadow-[0_1px_2px_rgba(14,14,14,0.03),0_24px_48px_-36px_rgba(45,27,87,0.35)] [overflow-wrap:anywhere] sm:px-7 sm:py-6 sm:text-[17px] [&>strong:first-child]:mb-1 [&>strong:first-child]:inline-block [&>strong:first-child]:font-tc-display [&>strong:first-child]:text-[19px] [&>strong:first-child]:font-semibold [&>strong:first-child]:tracking-[-0.01em] [&>strong:first-child]:text-tc-ink"
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
      <div key={nextKey()} className="not-prose my-9 min-w-0 max-w-full">
        {/* Cards keep every table value visible and labeled on phones and tablets. */}
        <div className="grid min-w-0 gap-3 md:grid-cols-2 lg:hidden" role="list">
          {bodyRows.map((row, rowIndex) => {
            const primaryValue = row[0] || `Row ${rowIndex + 1}`

            return (
              <section
                key={nextKey()}
                role="listitem"
                aria-label={`${headers[0] || "Item"}: ${primaryValue}`}
                className="min-w-0 overflow-hidden rounded-[20px] border border-tc-line bg-white p-5 shadow-[0_1px_2px_rgba(14,14,14,0.04),0_24px_48px_-38px_rgba(45,27,87,0.4)]"
              >
                <div className="min-w-0 border-b border-tc-line pb-3">
                  <div
                    className="text-[12.5px] font-medium text-tc-mute"
                    dangerouslySetInnerHTML={{ __html: formatInline(headers[0] || "Item") }}
                  />
                  <div
                    className="mt-0.5 min-w-0 break-words font-tc-display text-[18px] font-semibold leading-[1.35] text-tc-ink [overflow-wrap:anywhere]"
                    dangerouslySetInnerHTML={{ __html: formatInline(primaryValue) }}
                  />
                </div>

                <dl className="m-0 min-w-0 divide-y divide-tc-line">
                  {headers.slice(1).map((header, headerIndex) => {
                    const colIndex = headerIndex + 1
                    const value = row[colIndex] || "—"

                    return (
                      <div
                        key={nextKey()}
                        className="grid min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-3 py-3 first:pt-3 last:pb-0"
                      >
                        <dt
                          className="min-w-0 break-words text-[14px] font-semibold leading-5 text-tc-ink-2 [overflow-wrap:anywhere]"
                          dangerouslySetInnerHTML={{ __html: formatInline(header) }}
                        />
                        <dd
                          className="m-0 min-w-0 break-words text-[14px] leading-[1.55] text-tc-mute tabular-nums [overflow-wrap:anywhere]"
                          dangerouslySetInnerHTML={{ __html: formatInline(value) }}
                        />
                      </div>
                    )
                  })}
                </dl>
              </section>
            )
          })}
        </div>

        {/* The semantic table returns when the article column is wide enough. */}
        <div className="hidden min-w-0 max-w-full overflow-hidden rounded-[20px] border border-tc-line bg-white shadow-[0_1px_2px_rgba(14,14,14,0.04),0_24px_48px_-38px_rgba(45,27,87,0.4)] lg:block">
          <table className="w-full table-fixed border-collapse text-[14.5px] tabular-nums">
            <colgroup>
              <col className="w-[28%]" />
              {headers.slice(1).map(() => (
                <col key={nextKey()} />
              ))}
            </colgroup>
            <thead className="bg-tc-mist">
              <tr>
                {headers.map((header, colIndex) => (
                  <th
                    key={nextKey()}
                    className={`break-words border-b border-tc-line px-4 py-3.5 text-[13.5px] font-semibold leading-5 text-tc-ink [overflow-wrap:anywhere] ${getAlignmentClass(separator[colIndex] || "---")}`}
                    dangerouslySetInnerHTML={{ __html: formatInline(header) }}
                  />
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row) => (
                <tr key={nextKey()} className="transition-colors duration-200 hover:bg-tc-mist/70 [&:last-child>td]:border-b-0">
                  {headers.map((_, colIndex) => (
                    <td
                      key={nextKey()}
                      className={`break-words border-b border-tc-line px-4 py-3.5 align-top leading-6 text-tc-ink-2 first:font-medium first:text-tc-ink [overflow-wrap:anywhere] ${getAlignmentClass(separator[colIndex] || "---")}`}
                      dangerouslySetInnerHTML={{ __html: formatInline(row[colIndex] || "—") }}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>,
    )

    tableBuffer = []
  }

  const pushParagraph = (text: string) => {
    elements.push(
      <p
        key={nextKey()}
        className="mb-6 min-w-0 break-words text-[17px] leading-[1.8] text-tc-ink-2 [overflow-wrap:anywhere] sm:text-[18px]"
        dangerouslySetInnerHTML={{ __html: formatInline(text) }}
      />,
    )
  }

  const flushCode = () => {
    if (!codeBuffer) return
    elements.push(
      <pre key={nextKey()} className="my-8 max-w-full overflow-x-auto rounded-[20px] bg-[#17151f] p-5 font-mono text-[14px] leading-6 text-white/90 sm:p-6">
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
          ? "mb-6 mt-14 text-balance break-words font-tc-display text-[clamp(30px,3.6vw,40px)] font-semibold leading-[1.1] tracking-[-0.02em] text-tc-ink [overflow-wrap:anywhere]"
          : level === 2
            ? "mb-4 mt-14 scroll-mt-28 text-balance break-words font-tc-display text-[clamp(26px,3vw,34px)] font-semibold leading-[1.15] tracking-[-0.015em] text-tc-ink [overflow-wrap:anywhere] sm:mt-16"
            : "mb-3 mt-10 scroll-mt-28 text-balance break-words font-tc-display text-[21px] font-semibold leading-[1.3] tracking-[-0.01em] text-tc-ink [overflow-wrap:anywhere] sm:text-[23px]"

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
      elements.push(<hr key={nextKey()} className="my-12 h-px border-0 bg-tc-line" />)
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
