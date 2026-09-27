import { Shell } from "@/components/catalog/shell";
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Shell>{children}</Shell>;
}
