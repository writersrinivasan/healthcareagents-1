import { TopNav } from "@/components/ui/TopNav";
import { LearningHub } from "@/components/learn/LearningHub";

export const metadata = {
  title: "Learning Hub | OneYoto — Agentic AI & Digital Twin in Healthcare",
  description:
    "In-depth learning material on Agentic AI and Digital Twins in healthcare — the deep-dive companion to the presentation.",
};

export default function LearnPage({
  searchParams,
}: {
  searchParams?: { lesson?: string };
}) {
  return (
    <main className="relative min-h-screen">
      <TopNav active="learn" />
      <LearningHub initialLesson={searchParams?.lesson} />
    </main>
  );
}
