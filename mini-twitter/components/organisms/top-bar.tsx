type Props = {
  title: string;
};

export function TopBar({ title }: Props) {
  return (
    <div className="sticky top-0 z-20 bg-[#0D1220] py-4 border-b border-[#1f2937]">
      <h1 className="text-xl font-bold px-2">{title}</h1>
    </div>
  );
}