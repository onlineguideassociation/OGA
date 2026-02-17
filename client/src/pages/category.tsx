import { Layout } from "@/components/layout";
import { categories, guides } from "@/lib/data";
import { useRoute } from "wouter";
import { GuideCard } from "@/components/guide-card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function CategoryPage() {
  const [match, params] = useRoute("/category/:id");
  const categoryId = params?.id;
  
  const category = categories.find(c => c.id === categoryId);
  const categoryGuides = guides.filter(g => g.category === categoryId);

  if (!category) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Link href="/">
            <Button>Go Home</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-slate-50 border-b">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <Link href="/">
            <a className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
            </a>
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl shadow-sm p-4 flex items-center justify-center border">
              <img src={category.image} alt={category.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-4">{category.name}</h1>
              <p className="text-xl text-slate-600 max-w-2xl">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{categoryGuides.length} Guides</h2>
          {/* Could add sorting/filtering here */}
        </div>

        {categoryGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryGuides.map(guide => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed">
            <p className="text-muted-foreground">No guides found in this category yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
