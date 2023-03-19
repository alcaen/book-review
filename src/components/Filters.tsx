// Imports
// Types
import type { Dispatch, SetStateAction } from "react";
// Components
import Filter from "./Filter";
// Functionals
import { api } from "@/utils/api";
import { useState } from "react";
// Interface
interface FiltersProps {
  setCurrentCategory: Dispatch<SetStateAction<string | undefined>>;
  setCurrentAuthor: Dispatch<SetStateAction<string | undefined>>;
}
// Component
const Filters: React.FC<FiltersProps> = ({
  setCurrentAuthor,
  setCurrentCategory,
}) => {
  const utils = api.useContext();
  const [categories, setCategories] = useState<string[]>();
  const [authors, setAuthors] = useState<string[]>();

  utils.book.getAllBooks.getData({});

  const getCategories = api.book.getAllCategories.useQuery(undefined, {
    onSuccess(data) {
      const cat = data.map((cat) => {
        return cat.category;
      });
      setCategories([...new Set(cat), "All"]);
    },
  });

  const getAuthors = api.book.getAllAuthors.useQuery(undefined, {
    onSuccess(data) {
      const author = data.map((author) => {
        return author.author;
      });
      setAuthors([...new Set(author), "All"]);
    },
  });

  return (
    <div className="flex w-full flex-col items-center justify-around gap-10 rounded-lg bg-white/95 px-4 py-7">
      <h2 className="text-2xl font-semibold">Filters</h2>
      <Filter
        name={"Category"}
        states={categories}
        setCurrentState={setCurrentCategory}
      />
      <Filter
        name={"Author"}
        states={authors}
        setCurrentState={setCurrentAuthor}
      />
      {/* <Filter name={"Stared"} />
      <Filter name={"Reviewed"} /> */}
    </div>
  );
};

export default Filters;
