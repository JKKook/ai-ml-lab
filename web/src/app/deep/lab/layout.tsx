import { LabSubNav } from "@/components/LabSubNav";

export default function LabLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LabSubNav />
      {children}
    </>
  );
}
