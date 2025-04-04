"use client";
import { GetBeaconQueryInput, useGetAllCategoriesQuery, useGetBeaconsQuery } from "@/redux/api";
import { FC, useCallback, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { BeaconThumbnail } from "@/components/molecules/beacon-thumbnail";
import { Category } from "@/types/beacon";
import EmptyState from "@/components/molecules/empty-state";
import PageHeading from "@/components/atoms/text/page-heading";
import PageContainer from "@/components/ui/page-container";
import SearchBar, { SearchBarInputs } from "@/components/organisms/forms/search-bar";
import { useFormik } from "formik";

const initialValues: SearchBarInputs = {
  CategoryId: '',
  QueryString: ''
}

const BrowseBeaconsPage: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<GetBeaconQueryInput>({
    Drafts: false,
  });
  const { data: categories, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
  const { data: beacons } = useGetBeaconsQuery(query)

  const processSubmitQuery = useCallback((values: SearchBarInputs) => {
    setQuery({
      CategoryId: values.CategoryId,
      QueryString: values.QueryString
    })
  }, [])

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    touched,
    isSubmitting,
    setValues
  } = useFormik({
    onSubmit: processSubmitQuery,
    initialValues,
    enableReinitialize: true
  })

  const handleClearSearch = () => {
    setValues({
      CategoryId: '',
      QueryString: ''
    }, false)
    router.push('/beacons/browse');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <PageContainer>
        <PageHeading 
          title="Browse Beacons"
          subtitle={`${beacons ? beacons.length: 0} Beacons ${query ? 'found' : 'available'}`}
        />
      </PageContainer>

      {/* Main Content */}
      <PageContainer>
        {/* Search Bar */}
        <SearchBar
          values={values}
          errors={errors}
          touched={touched}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          isSubmitting={isSubmitting}
          categories={categories?.map((c: Category) => ({
            label: c.CategoryName,
            value: c.CategoryId
          })) ?? []}
          onClearSearch={handleClearSearch}
          loadingCategories={isCategoriesLoading}
        />

        {/* No Results */}
        {beacons?.length === 0 && <EmptyState primaryText={"No Beacons found"} />}

        {/* Beacons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {beacons?.map((beacon) => (
            <BeaconThumbnail key={beacon.BeaconId} beacon={beacon} />
          ))}
        </div>
        </PageContainer>
      </div>
  );
};

export default BrowseBeaconsPage;
