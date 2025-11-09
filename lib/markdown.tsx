import type { ReactNode } from "react"

function escapeHtmlSegment(segment: string): string {
  return segment.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
}

function formatInline(text: string): string {
  let result = ""
  let i = 0

  const appendEscaped = (value: string) => {
    result += escapeHtmlSegment(value)
  }

  while (i < text.length) {
    if (text.startsWith("**", i)) {
      const end = text.indexOf("**", i + 2)
      if (end !== -1) {
        const inner = formatInline(text.slice(i + 2, end))
        result += `<strong>${inner}</strong>`
        i = end + 2
        continue
      }
    }

    if (text.startsWith("__", i)) {
      const end = text.indexOf("__", i + 2)
      if (end !== -1) {
        const inner = formatInline(text.slice(i + 2, end))
        result += `<strong>${inner}</strong>`
        i = end + 2
        continue
      }
    }

    if (text[i] === "*" && text[i + 1] !== "*") {
      const end = text.indexOf("*", i + 1)
      if (end !== -1) {
        const inner = formatInline(text.slice(i + 1, end))
        result += `<em>${inner}</em>`
        i = end + 1
        continue
      }
    }

    if (text[i] === "_" && text[i + 1] !== "_") {
      const end = text.indexOf("_", i + 1)
      if (end !== -1) {
        const inner = formatInline(text.slice(i + 1, end))
        result += `<em>${inner}</em>`
        i = end + 1
        continue
      }
    }

    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1)
      if (end !== -1) {
        const code = escapeHtmlSegment(text.slice(i + 1, end))
        result += `<code>${code}</code>`
        i = end + 1
        continue
      }
    }

    if (text[i] === "[" && text.includes("]", i)) {
      const closeBracket = text.indexOf("]", i)
      const openParen = text.indexOf("(", closeBracket)
      const closeParen = text.indexOf(")", openParen)

      if (closeBracket !== -1 && openParen === closeBracket + 1 && closeParen !== -1) {
        const label = formatInline(text.slice(i + 1, closeBracket))
        const url = escapeHtmlSegment(text.slice(openParen + 1, closeParen).trim())
        result += `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-cyan-500 underline decoration-cyan-500/50 hover:decoration-cyan-500">${label}</a>`
        i = closeParen + 1
        continue
      }
    }

    appendEscaped(text[i])
    i++
  }

  return result
}

export function renderMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n")
  const elements: ReactNode[] = []
  let keyIndex = 0
  let listBuffer: { ordered: boolean; items: string[] } | null = null
  let quoteBuffer: string[] = []

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

  const pushParagraph = (text: string) => {
    elements.push(
      <p
        key={nextKey()}
        className="mb-6 text-muted-foreground leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatInline(text) }}
      />,
    )
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd()
    const trimmed = line.trim()

    if (!trimmed) {
      flushList()
      flushQuote()
      continue
    }

    if (/^#{1,3}\s+/.test(trimmed)) {
      flushList()
      flushQuote()
      const level = trimmed.match(/^#{1,3}/)?.[0].length ?? 1
      const content = trimmed.replace(/^#{1,3}\s+/, "")
      const tag = `h${level}` as const
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

  return elements
}
