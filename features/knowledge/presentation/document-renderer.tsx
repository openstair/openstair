import type { ReactNode } from "react";

type DocumentRendererProps = {
  body: string;
};

type ListBlock = {
  type: "list";
  items: string[];
};

type ParagraphBlock = {
  type: "paragraph";
  lines: string[];
};

type HeadingBlock = {
  type: "heading";
  level: 1 | 2 | 3;
  text: string;
};

type MarkdownBlock = ListBlock | ParagraphBlock | HeadingBlock;

export function DocumentRenderer({ body }: DocumentRendererProps) {
  const blocks = parseMarkdownBlocks(body);

  return (
    <div className="space-y-7">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

function renderBlock(block: MarkdownBlock, index: number): ReactNode {
  if (block.type === "heading") {
    if (block.level === 1) {
      return (
        <h1 key={index} className="text-4xl font-semibold leading-tight text-white">
          {block.text}
        </h1>
      );
    }

    if (block.level === 2) {
      return (
        <h2 key={index} className="pt-4 text-2xl font-semibold text-white">
          {block.text}
        </h2>
      );
    }

    return (
      <h3 key={index} className="pt-2 text-xl font-semibold text-white">
        {block.text}
      </h3>
    );
  }

  if (block.type === "list") {
    return (
      <ul key={index} className="list-disc space-y-2 pl-6 text-base leading-8 text-slate-300">
        {block.items.map((item) => (
          <li key={item}>{renderInlineCode(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={index} className="text-base leading-8 text-slate-300">
      {renderInlineCode(block.lines.join(" "))}
    </p>
  );
}

function parseMarkdownBlocks(body: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const lines = body.replaceAll("\r\n", "\n").split("\n");
  let paragraphLines: string[] = [];
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      blocks.push({ type: "paragraph", lines: paragraphLines });
      paragraphLines = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      blocks.push({ type: "list", items: listItems });
      listItems = [];
    }
  };

  lines.forEach((line) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushParagraph();
      flushList();
      return;
    }

    const heading = parseHeading(trimmedLine);

    if (heading) {
      flushParagraph();
      flushList();
      blocks.push(heading);
      return;
    }

    if (trimmedLine.startsWith("- ")) {
      flushParagraph();
      listItems.push(trimmedLine.slice(2));
      return;
    }

    flushList();
    paragraphLines.push(trimmedLine);
  });

  flushParagraph();
  flushList();

  return blocks;
}

function parseHeading(line: string): HeadingBlock | undefined {
  if (line.startsWith("# ")) {
    return { type: "heading", level: 1, text: line.slice(2).trim() };
  }

  if (line.startsWith("## ")) {
    return { type: "heading", level: 2, text: line.slice(3).trim() };
  }

  if (line.startsWith("### ")) {
    return { type: "heading", level: 3, text: line.slice(4).trim() };
  }
}

function renderInlineCode(value: string) {
  const parts = value.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${part}-${index}`}
          className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 text-sm text-cyan-100"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    return part;
  });
}

