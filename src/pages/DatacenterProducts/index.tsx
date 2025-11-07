import { TrapezoidBackground } from "../../components/ui/TrapezoidBackground";
import { TaggedTopicsSection } from "../../components/layout/TaggedTopicsSection";

export default function DatacenterProducts() {
  return (
    <div className="home-container">
      <TrapezoidBackground className="min-h-[280px]">
        <div className="w-full flex flex-col items-start px-[4rem] pt-[5rem]">
          <h1 className="text-3xl font-bold text-[#fff]">محصولات دیتاسنتر</h1>
          <p className="text-[#fff] text-lg">محصولات دیتاسنتر آلیاسیس.</p>
        </div>
      </TrapezoidBackground>
      <TaggedTopicsSection layoutMode="grid" />
    </div>
  );
}
