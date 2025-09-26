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
          <div className="bg-red-500/80 size-2 sm:size-3 rounded-full "></div>
          <div className="bg-yellow-500/80  size-2 sm:size-3 rounded-full"></div>
          <div className="bg-green-500/80  size-2 sm:size-3 rounded-full"></div>
        </div>
        <div className="flex items-center gap-2 w-full">
          <p className=" flex justify-center w-full text-gray-300 text-xs sm:text-sm">{name}</p>
        </div>
        <div className="flex justify-end items-center gap-2 w-full">
          <p className="text-xs sm:text-sm">{language}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
