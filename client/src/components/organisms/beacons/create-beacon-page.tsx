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
import { handleApiError } from "@/lib/utils";


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
        
        if (!beacon.CategoryId) {
          helpers.setFieldError("CategoryId", "Please select a category");
          return;
        }
        
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
          
          // Display validation errors to the user
          if (error.data.errors.CategoryId) {
            helpers.setFieldError("CategoryId", "Please select a valid category");
          }
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

      // For drafts, only title is required
      if (!values.ItemName?.trim()) {
        setDraftError("Please provide a title for your beacon draft.");
        return;
      }

      const draftData = {
        ...values,
        ItemDescription: values.ItemDescription || "Draft description",
        ItemPrice: values.ItemPrice || 0,
        CategoryId: values.CategoryId || (categoryOptions.length > 0 ? categoryOptions[0].value : "00000000-0000-0000-0000-000000000001"),
        IsDraft: true,
        UserId: user?.UserId,
        LastDraftSave: new Date().toISOString()
      };

      await createBeacon(draftData).unwrap();
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 3000);
    } catch (error: any) {
      console.error("Failed to save draft:", error);
      
      handleApiError(error, setDraftError);
    }
  };



  const validateForm = (values: Beacon) => {
    const errors: { [key: string]: string } = {};
    
    if (!values.ItemName?.trim()) {
      errors.ItemName = "Title is required";
    }
    
    if (!values.CategoryId) {
      errors.CategoryId = "Please select a category";
    }
    
    if (!values.ItemDescription?.trim()) {
      errors.ItemDescription = "Description is required";
    }
    
    return errors;
  };

  const {
    handleChange,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
    isSubmitting,
    setErrors
  } = useFormik({
    initialValues: {
      ItemName: "",
      CategoryId: "",
      ItemDescription: "",
      Images: [],
      ItemPrice: 0,
      imageSet: {}
    } as unknown as Beacon,
    validate: validateForm,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, helpers) => {
      const validationErrors = validateForm(values);
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
      
      processSubmit(values, helpers);
    },
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
