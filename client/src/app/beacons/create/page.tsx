"use client";
import { FC, useCallback, useEffect, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import CreateBeaconTemplate from "@/components/templates/create-beacon-template";
import { Beacon, Category } from "@/types/beacon";
import { useCreateBeaconMutation, useGetAllCategoriesQuery } from "@/redux/api";
// import { useCreateBeaconMutation } from '@/redux/api'

const DEFAULT_CATEGORY_OPTIONS: { label: string; value: string }[] = [
  { label: "Automotive", value: "automotive" },
  { label: "Comics", value: "comics" },
  { label: "Clothing", value: "clothing" },
  { label: "Heavy Duty", value: "heavy duty" },
  { label: "watches", value: "watches" },
];

const CreateBeaconPage: FC = () => {
  const [createBeacon] = useCreateBeaconMutation();
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
  const { data: categoies, error, isLoading, } = useGetAllCategoriesQuery();

  // Set category options
  useEffect(() => {
    if (!categoies) return;
    const res: { label: string; value: string }[] = [];

    for (let i = 0; i < categoies.length; i++) {
      const name = categoies[i].categoryName.charAt(0).toUpperCase() + categoies[i].categoryName.substring(1);
      res.push({
        label: name,
        value: categoies[i].categoryId
      })
    }

    setCategoryOptions(res);
  }, [categoies])

  const processSubmit = async (beacon: Beacon, helpers: FormikHelpers<Beacon>) => {
    try {
      // THIS IS WHERE WE WILL upload the image to S3 first and then send the URL with the beacon data
      helpers.setSubmitting(true)
      await createBeacon(beacon).unwrap();
    } catch (error) {
      console.error("Failed to create beacon:", error);
    } finally {
      helpers.setSubmitting(false)
    }
  }

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue, isSubmitting } =
    useFormik({
      initialValues: {
        title: "",
        category: DEFAULT_CATEGORY_OPTIONS[0].value,
        description: "",
        image: null,
      } as unknown as Beacon,
      onSubmit: processSubmit
    })

  return (
    <CreateBeaconTemplate
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      values={values}
      errors={errors}
      touched={touched}
      categoryOptions={categoryOptions}
      categoryOptionsIsLoading={isLoading}
      categoryOptionsError={error}
      submitting={isSubmitting}
      setFieldValue={setFieldValue}
    />
  );
};
export default CreateBeaconPage;
