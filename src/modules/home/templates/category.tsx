import CategoryContent from "../components/category-content";
import SectionHeader from "../components/section-header";

export default function Category() {
    return (
        <SectionHeader title="Shop by Category" desc="Discover Your Style: Navigate by Category for Effortless Shopping!" sectionName="category">
            <CategoryContent />
        </SectionHeader>
    )
}