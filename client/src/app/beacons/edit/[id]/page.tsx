"use client";

import { FC, useEffect } from "react";
import { useParams } from "next/navigation";
import { useGetBeaconQuery, useGetAllCategoriesQuery } from "@/redux/api";
import CreateBeaconTemplate from "@/components/templates/create-beacon-template";
import { useFormik } from "formik";
import { Beacon } from "@/types/beacon";
import { Loader2 } from "lucide-react";

const EditBeaconPage: FC = () => {
  const { id } = useParams();
  const { data: beacon, isLoading: beaconLoading, error: beaconError } = useGetBeaconQuery(id as string);
  const { data: categories, isLoading: categoriesLoading, error: categoriesError } = useGetAllCategoriesQuery();


  const categoryOptions = categories?.map(cat => ({
    label: cat.CategoryName.charAt(0).toUpperCase() + cat.CategoryName.slice(1),
    value: cat.CategoryId
  })) || [];

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    setValues,
  } = useFormik({
    initialValues: {
      ItemName: "",
      CategoryId: "",
      ItemDescription: "",
      ItemPrice: 0,
      Images: [],
    } as Beacon,
    onSubmit: async (values) => {
      // Handle submit logic here
      console.log("Submitting:", values);
    },
    enableReinitialize: true, // Important for updating form when data loads
  });

  useEffect(() => {
    if (beacon) {
      console.log("Setting beacon values:", beacon);
      setValues({
        ...beacon,
        CategoryId: beacon.CategoryId || "",
        ItemPrice: beacon.ItemPrice || 0,
      });
    }
  }, [beacon, setValues]);

  if (beaconLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (beaconError || categoriesError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-destructive">
        Error loading data
      </div>
    );
  }

  return (
    <CreateBeaconTemplate
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      values={values}
      errors={errors}
      touched={touched}
      categoryOptions={categoryOptions}
      categoryOptionsIsLoading={categoriesLoading}
      categoryOptionsError={categoriesError}
      submitting={isSubmitting}
      setFieldValue={setFieldValue}
      isEditing={true}
    />
  );
};

export default EditBeaconPage; 