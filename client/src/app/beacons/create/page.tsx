"use client";
import { FC, useEffect, useState, useCallback } from "react";
import { FormikHelpers, useFormik } from "formik";
import CreateBeaconTemplate from "@/components/templates/create-beacon-template";
import { Beacon } from "@/types/beacon";
import { useCreateBeaconMutation, useGetAllCategoriesQuery, useSaveDraftMutation } from "@/redux/api";
import { navigateToBeaconDetailsPage } from "@/helpers/navigation";
import { useRouter } from "next/navigation";

const CreateBeaconPage: FC = () => {
  const [createBeacon] = useCreateBeaconMutation();
  const [saveDraft] = useSaveDraftMutation();
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout>();
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

  const handleAutoSave = useCallback(async (values: Beacon) => {
    try {
      await saveDraft({
        ...values,
        IsDraft: true
      }).unwrap();
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  }, [saveDraft]);

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

  const handleChangeWithAutoSave = (e: React.ChangeEvent) => {
    handleChange(e);
    
    // Clear existing timeout
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout);
    }
    
    // Set new timeout for auto-save
    const timeout = setTimeout(() => {
      handleAutoSave(values);
    }, 2000); // Auto-save after 2 seconds of no changes
    
    setAutoSaveTimeout(timeout);
  };

  return (
    <CreateBeaconTemplate
      handleSubmit={handleSubmit}
      handleChange={handleChangeWithAutoSave}
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
