import Link from 'next/link';

interface CategoryListProps {
  categories: any[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  if (categories.length === 0) {
    return <p className="text-gray-500 font-bengali">কোনো ক্যাটাগরি নেই</p>;
  }

  return (
    <ul className="space-y-2">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/categories/${category.slug}`}
            className="block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors font-bengali"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
