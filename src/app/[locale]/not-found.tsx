import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <Container className="py-24 text-center sm:py-32">
          <p className="font-mono text-sm text-violet-deep">404</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            Halaman tidak ditemukan
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted">
            Halaman yang anda cari tidak ada atau sudah dipindahkan.
          </p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-violet px-6 text-sm font-semibold text-dark transition-colors hover:bg-violet-deep"
            >
              Kembali ke beranda
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
