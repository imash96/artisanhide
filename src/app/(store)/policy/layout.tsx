import PolicySidebar from "@/layout/policy/sidebar";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div className="templateContainer py-8 md:py-10 lg:py-16 flex gap-16 lg:gap-32">
      <div className="hidden md:block w-[20%]">
        <PolicySidebar />
      </div>
      <div className="w-full md:w-[80%]">{children}</div>
    </div>
  );
};

;
