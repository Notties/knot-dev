export default function FileName({
  children,
  name,
  language,
}: Readonly<{
  children: React.ReactNode;
  name: string;
  language?: string;
}>) {
  return (
    <div className="bg-gray-dark w-full border rounded-md">
      <div className="px-2 w-full text-xs relative flex flex-row justify-between h-8">
        <div className="flex items-center gap-2 w-full">
          <div className="bg-red-500/80 w-3 h-3 rounded-full "></div>
          <div className="bg-yellow-500/80  w-3 h-3 rounded-full"></div>
          <div className="bg-green-500/80  w-3 h-3 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 w-full">
          <p className=" flex justify-center w-full text-gray-300">{name}</p>
        </div>
        <div className="flex justify-end items-center gap-2 w-full">
          <p>{language}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
