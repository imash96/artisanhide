
export default function CustomDivider({ text }: { text?: string }) {
  return (
    <div className="flex items-center gap-5 justify-center">
      <div className="h-[0.5px] w-full bg-[#c7c6c6]" />
      {text && (
        <>
          <span className="text-[#c7c6c6] font-light">{text}</span>
          <div className="h-[0.5px] w-full bg-[#c7c6c6]" />
        </>
      )}
    </div>
  );
};
