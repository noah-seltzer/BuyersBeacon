"use client";
import { FC, useEffect, useState, useCallback } from "react";
import { FormikHelpers, useFormik } from "formik";
import CreateBeaconTemplate from "@/components/templates/create-beacon-template";
import { Beacon } from "@/types/beacon";
import {
  useCreateBeaconMutation,
  useGetAllCategoriesQuery,
} from "@/redux/api";
import { navigateToBeaconDetailsPage } from "@/helpers/navigation";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";


const CreateBeaconPage: FC<{ user: User }> = ({ user }) => {
  const [createBeacon] = useCreateBeaconMutation();

  const [categoryOptions, setCategoryOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const { data: categories, error, isLoading } = useGetAllCategoriesQuery();
  const router = useRouter();
  const [draftSaved, setDraftSaved] = useState(false);
  const [draftError, setDraftError] = useState<string | null>(null);
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
          payload.UserId = user.UserId
        }
        const res = await createBeacon(payload).unwrap();
        navigateToBeaconDetailsPage(router, res);
      } catch (error: any) {
        console.error("Failed to create beacon:", error);
        if (error.data?.errors) {
          console.error("Validation errors:", error.data.errors);
        }
      } finally {
        helpers.setSubmitting(false);
      }
    },
    [createBeacon, router, user]
  );

  const handleSaveDraft = async () => {
    try {
      setDraftError(null);

      const draftData = {
        ...values,
        ItemPrice: values.ItemPrice || 0,
        IsDraft: true,
        UserId: user?.UserId,
        LastDraftSave: new Date().toISOString()
      };

      await createBeacon(draftData).unwrap();
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 3000);
    } catch (error) {
      console.error("Failed to save draft:", error);
      setDraftError("Failed to save draft. Please try again.");
    }
  };


  console.log("USER", user)

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
      ItemPrice: 0,
      imageSet: {}
    } as unknown as Beacon,
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
