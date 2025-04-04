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
  categoryOptionsIsLoading: boolean;
  categtorOptionsError?: FetchBaseQueryError | SerializedError | undefined;
  submitting: boolean;
  setFieldValue: (field: string, value: any) => void;
  onSaveDraft?: () => void;
  draftSaved?: boolean;
  draftError?: string | null;
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
  onSaveDraft,
  draftSaved,
  draftError,
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
            <div className="flex items-center mt-2">
              <span className="text-sm font-medium text-red-600 dark:text-red-500">{errors.ItemName}</span>
            </div>
          )}
        </div>

        <SelectInput
          name={"CategoryId"}
          value={values.CategoryId || ''}
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
            <div className="flex items-center mt-2">
              <span className="text-sm font-medium text-red-600 dark:text-red-500">
                {errors.ItemDescription}
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Price
          </label>
          <Input
            type="number"
            name="ItemPrice"
            placeholder="Enter price"
            onChange={handleChange}
            value={values.ItemPrice || ""}
            className="mt-2"
          />
          {touched.ItemPrice && errors.ItemPrice && (
            <div className="flex items-center mt-2">
              <span className="text-sm font-medium text-red-600 dark:text-red-500">{errors.ItemPrice}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              City
            </label>
            <Input
              name="LocCity"
              placeholder="Enter city"
              onChange={handleChange}
              value={values.LocCity || ""}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Region/Province
            </label>
            <Input
              name="LocRegion"
              placeholder="Enter region/province"
              onChange={handleChange}
              value={values.LocRegion || ""}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Country
            </label>
            <Input
              name="LocCountry"
              placeholder="Enter country"
              onChange={handleChange}
              value={values.LocCountry || ""}
              className="mt-2"
            />
          </div>

          <div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Postal Code
            </label>
            <Input
              name="LocPostalCode"
              placeholder="Enter postal code"
              onChange={handleChange}
              value={values.LocPostalCode || ""}
              className="mt-2"
            />
          </div>
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
            <div className="flex items-center mt-2">
              <span className="text-sm font-medium text-red-600 dark:text-red-500">
                {errors.Images.toString()}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center">
        {onSaveDraft && (
          <Button
            type="button"
            onClick={onSaveDraft}
            variant="outline"
            className="border-primary/50 text-primary hover:text-primary/90"
            disabled={submitting}
          >
            {draftSaved ? "Draft Saved!" : "Save Draft"}
          </Button>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="bg-primary hover:bg-primary/90 text-white ml-auto"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Beacon...
            </>
          ) : (
            "Post Beacon"
          )}
        </Button>
      </div>

      {draftError && (
        <div className="flex items-center mt-2">
          <span className="text-sm font-medium text-red-600 dark:text-red-500">{draftError}</span>
        </div>
      )}

      {draftSaved && (
        <p className="text-sm text-primary mt-2">Draft saved successfully!</p>
      )}
    </form>
  );
}

export default BeaconForm;
