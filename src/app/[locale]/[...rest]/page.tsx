import { notFound } from "next/navigation";

/** Catch-all inside the locale segment — anything unmatched is a 404. */
export default function CatchAllPage() {
  notFound();
}
