import { getBlogSearchIndex } from "@/lib/blog";

export function GET() {
  return Response.json(getBlogSearchIndex(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
