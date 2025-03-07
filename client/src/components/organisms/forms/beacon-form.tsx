import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { Beacon } from "@/types/beacon";
import { FormikErrors, FormikTouched } from "formik";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/molecules/image-upload";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import SelectInput from "@/components/molecules/inputs/select-input";

interface BeaconFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: (e: React.ChangeEvent) => void;
  values: Beacon;
  errors: FormikErrors<Beacon>;
  touched: FormikTouched<Beacon>;
  categoryOptions: { label: string; value: string }[];
  categoryOptionsIsLoading: boolean,
  categtorOptionsError?: FetchBaseQueryError | SerializedError | undefined,
  submitting: boolean;
  setFieldValue: (field: string, value: any) => void;
}

export function BeaconForm({
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
  categoryOptions,
  categoryOptionsIsLoading,
  categtorOptionsError,
  submitting,
  setFieldValue,
}: BeaconFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Title
          </label>
          <Input
            name="ItemName"
            placeholder="What are you looking for?"
            onChange={handleChange}
            value={values.ItemName}
            className="mt-2"
          />
          {touched.ItemName && errors.ItemName && (
            <p className="text-sm text-destructive mt-1">{errors.ItemName}</p>
          )}
        </div>

        <SelectInput
          name={"CategoryId"}
          value={values.CategoryId}
          onChange={handleChange}
          options={categoryOptions}
          categoryOptionsIsLoading={categoryOptionsIsLoading}
          categtorOptionsError={categtorOptionsError}
          error={errors.CategoryId}
          label="Category"
        />

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Description
          </label>
          <Textarea
            name="ItemDescription"
            placeholder="Describe what you're looking for in detail..."
            onChange={handleChange}
            value={values.ItemDescription}
            className="mt-2 min-h-[150px]"
          />
          {touched.ItemDescription && errors.ItemDescription && (
            <p className="text-sm text-destructive mt-1">
              {errors.ItemDescription}
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Images
          </label>
          <p className="text-sm text-muted-foreground mt-1">
            Add up to 6 images. First image will be the cover photo.
          </p>
          <ImageUpload
            onChange={(images) => setFieldValue("Images", images)}
            value={values.Images || []}
            className="mt-2"
            maxImages={6}
          />
          {touched.Images && errors.Images && (
            <p className="text-sm text-destructive mt-1">{errors.Images.toString()}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-primary hover:bg-primary/90 text-white"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Beacon...
            </>
          ) : (
            "Create Beacon"
          )}
        </Button>
      </div>
    </form>
  );
}

export default BeaconForm;
