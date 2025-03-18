"use client";
import { FC, useEffect, useState, useCallback } from "react";
import { FormikHelpers, useFormik } from "formik";
import CreateBeaconTemplate from "@/components/templates/create-beacon-template";
import { Beacon } from "@/types/beacon";
import {
  useCreateBeaconMutation,
  useGetAllCategoriesQuery,
  useSaveDraftMutation,
} from "@/redux/api";
import { navigateToBeaconDetailsPage } from "@/helpers/navigation";
import { useRouter } from "next/navigation";
import { useSignIn, useUser } from "@clerk/nextjs";


import asdf from "@clerk/nextjs"

const CreateBeaconPage: FC = () => {
  const [createBeacon] = useCreateBeaconMutation();
  const [saveDraft] = useSaveDraftMutation();
  const [categoryOptions, setCategoryOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();
  const router = useRouter();
  const [draftSaved, setDraftSaved] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
  const { user } = useUser()

  


  // Set category options
  useEffect(() => {
    if (!categories) return;
    const res: { label: string; value: string }[] = [];

    for (let i = 0; i < categories.length; i++) {
      const name =
        categories[i].CategoryName.charAt(0).toUpperCase() +
        categories[i].CategoryName.substring(1);
      res.push({
        label: name,
        value: categories[i].CategoryId,
      });
    }

    setCategoryOptions(res);
  }, [categories]);

  const processSubmit = useCallback(
    async (beacon: Beacon, helpers: FormikHelpers<Beacon>) => {
      try {
        helpers.setSubmitting(true);
        const payload = { ...beacon }
        if (user) {
          payload.UserId = user.id
        }
        const res = await createBeacon(payload).unwrap();
        navigateToBeaconDetailsPage(router, res);
      } catch (error) {
        console.error("Failed to create beacon:", error);
      } finally {
        helpers.setSubmitting(false);
      }
    },
    [createBeacon, router]
  );

  const handleSaveDraft = async () => {
    try {
      setDraftError(null);

      // Save whatever data we have, no validation needed
      const draftData = {
        ...values,
        ItemPrice: values.ItemPrice || 0,
        // Don't set a default CategoryId
      };

      await saveDraft(draftData).unwrap();
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save draft:", error);
      setDraftError("Failed to save draft. Please try again.");
    }
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
  } = useFormik({
    initialValues: {
      ItemName: "",
      CategoryId: "",
      ItemDescription: "",
      Images: [],
    } as Beacon,
    onSubmit: processSubmit,
  });

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
      onSaveDraft={handleSaveDraft}
      draftSaved={draftSaved}
      draftError={draftError}
    />
  );
};
export default CreateBeaconPage;
