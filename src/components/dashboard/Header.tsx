// components/dashboard/Header.tsx
export function Header({ title }: { title: string }) {
  return (
    <header className="w-full border-b bg-white px-6 py-4 text-gray-800">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </header>
  );
}
