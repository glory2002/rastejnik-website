import type { Metadata } from "next";
import { DashboardTopBar } from "@/components/DashboardTopBar";
import { DashboardView } from "@/components/DashboardView";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Табло — Растежник",
};

export default function DashboardPage() {
  return (
    <>
      <DashboardTopBar />
      <section className="w-full bg-white py-10 md:py-14">
        <Container>
          <DashboardView />
        </Container>
      </section>
    </>
  );
}
