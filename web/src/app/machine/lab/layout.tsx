import { LabSubNav } from "@/components/LabSubNav";

export default function MachineLabLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <LabSubNav />
      {children}
    </>
  );
}
