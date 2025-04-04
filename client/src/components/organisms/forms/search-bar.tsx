import React, { ChangeEvent } from 'react';
import { FormikErrors, FormikTouched } from 'formik';
import SelectInput from '@/components/molecules/inputs/select-input';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';


export interface SearchBarInputs {
  CategoryId: string,
  QueryString: string,
}


interface SearchBarProps {
  values: SearchBarInputs,
  errors: FormikErrors<SearchBarInputs>
  touched: FormikTouched<SearchBarInputs>
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T_1 = string | ChangeEvent<any>>(field: T_1): T_1 extends React.ChangeEvent<any> ? void : (e: string | React.ChangeEvent<any>) => void;
  },
  isSubmitting: boolean,
  categories: { label: string; value: string }[],
  onClearSearch: () => void,
  loadingCategories: boolean,
}


const SearchBar = ({
  values,
  handleSubmit,
  handleChange,
  categories,
  onClearSearch,
  loadingCategories
}: SearchBarProps) => {
  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            name="QueryString"
            value={values.QueryString}
            onChange={handleChange}
            placeholder="Search by name, description, category, or location..."
            className="pl-10 py-3 rounded-xl border-border/50 w-full h-[48px]"
          />
          {values.QueryString && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Dropdown */}
        <SelectInput
          name="CategoryId"
          value={values.CategoryId}
          onChange={handleChange}
          options={categories}
          categoryOptionsIsLoading={loadingCategories}
          className="min-w-[180px] md:min-w-[200px]"
        />

        {/* Search Button */}
        <Button
          type="submit"
          className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 h-[48px] flex items-center justify-center"
        >
          Search
        </Button>
      </form>
    </div>
  );
};




export default SearchBar