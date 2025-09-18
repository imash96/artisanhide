import Container from "@module/common/create-section";

export default function SectionHeader({
  title,
  desc,
  sectionName,
  className = "",
  children,
}: SectionHeaderProps) {
  return (
    <Container sectionName={sectionName} className=" py-10 md:py-16">
      <div className={`space-y-0 ${className}`}>
        <h2 className="text-3xl lg:text-5xl tracking-tight font-light">
          {title}
        </h2>
        <p className=" max-w-2xl hidden text-xs lg:text-[13px] tracking-wide font-light text-gray-600">
          {desc}
        </p>
      </div>
      {children}
    </Container>
  );
}

type SectionHeaderProps = {
  title: string;
  desc: string;
  sectionName: string;
  className?: string;
} & React.PropsWithChildren;
