"use client";
import { GetBeaconQueryInput, useGetAllCategoriesQuery, useGetBeaconsQuery } from "@/redux/api";
import { FC, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageContainer from "@/components/ui/page-container";
import SearchBar, { SearchBarInputs } from "@/components/organisms/forms/search-bar";
import { FormikHelpers, useFormik } from "formik";
import { Category } from "@/types/beacon";
import { useAuth, useUser } from "@clerk/nextjs";
import EmptyState from "@/components/molecules/empty-state";

const initialValues: SearchBarInputs = {
  CategoryId: '',
  QueryString: ''
}

const BrowseBeaconsPage: FC = () => {
  const router = useRouter();
  const { userId, isLoaded } = useAuth()
  const [query, setQuery] = useState<GetBeaconQueryInput>({
    Drafts: false,
  });
  const { data: categories, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
  const { data } = useGetBeaconsQuery(query)

  const processSubmitQuery = useCallback((value: SearchBarInputs) => {

    if (!userId) return;

    setQuery({
      Drafts: false,
      ClerkId: userId,
      CategoryId: values.CategoryId,
      QueryString: value.QueryString
    })

  }, [userId])

  const {
    values,
    errors,
    handleSubmit,
    handleChange,
    touched,
    isSubmitting,
  } = useFormik({
    onSubmit: processSubmitQuery,
    initialValues,
    enableReinitialize: true
  })


  const handleClearSearch = () => {
    router.push('/beacons/browse');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      {/* <PageContainer>
        <PageHeading
          title="Browse Beacons"
          subtitle={`${filteredBeacons.length} Beacons ${query ? 'found' : 'available'}`}
        />
      </PageContainer> */}

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
        {data?.length === 0 && <EmptyState primaryText={"No Beacons found"} />}

        {/* Beacons Grid */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBeacons.map((beacon) => (
            <BeaconThumbnail key={beacon.BeaconId} beacon={beacon} />
          ))}
        </div> */}
      </PageContainer>
    </div>
  );
};

export default BrowseBeaconsPage;
