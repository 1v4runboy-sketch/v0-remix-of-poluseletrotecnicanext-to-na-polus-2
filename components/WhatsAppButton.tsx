// /components/WhatsAppButton.tsx
"use client";

export default function WhatsAppButton({
  text,
  phone = "551135992935",
}: {
  text: string;
  phone?: string;
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow hover:bg-[#1ebe57]"
    >
      Solicitar cotação via WhatsApp
    </a>
  );
}
