"use client";
import { FC, useEffect, useState, useCallback } from "react";
import { FormikHelpers, useFormik } from "formik";
import CreateBeaconTemplate from "@/components/templates/create-beacon-template";
import { Beacon } from "@/types/beacon";
import { useCreateBeaconMutation, useGetAllCategoriesQuery } from "@/redux/api";
import { navigateToBeaconDetailsPage } from "@/helpers/navigation";
import { useRouter } from "next/navigation";

const CreateBeaconPage: FC = () => {
  const [createBeacon] = useCreateBeaconMutation();
  const [categoryOptions, setCategoryOptions] = useState<{ label: string; value: string }[]>([]);
  const { data: categoies, error, isLoading, } = useGetAllCategoriesQuery();
  const router = useRouter();

  // Set category options
  useEffect(() => {
    if (!categoies) return;
    const res: { label: string; value: string }[] = [];

    for (let i = 0; i < categoies.length; i++) {
      const name = categoies[i].CategoryName.charAt(0).toUpperCase() + categoies[i].CategoryName.substring(1);
      res.push({
        label: name,
        value: categoies[i].CategoryId
      })
    }

    setCategoryOptions(res);
  }, [categoies])

  const processSubmit = useCallback(async (beacon: Beacon, helpers: FormikHelpers<Beacon>) => {
    try {
      // THIS IS WHERE WE WILL upload the image to S3 first and then send the URL with the beacon data
      helpers.setSubmitting(true)
      const res = await createBeacon(beacon).unwrap();
      navigateToBeaconDetailsPage(router, res);
    } catch (error) {
      console.error("Failed to create beacon:", error);
    } finally {
      helpers.setSubmitting(false)
    }
  }, [createBeacon, navigateToBeaconDetailsPage, router])

  const { handleChange, handleSubmit, values, errors, touched, setFieldValue, isSubmitting } =
    useFormik({
      initialValues: {
        ItemName: "",
        CategoryId: '',
        ItemDescription: "",
        Images: [],
      } as Beacon,
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