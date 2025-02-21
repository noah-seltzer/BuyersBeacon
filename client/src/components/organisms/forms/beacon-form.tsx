import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { Select } from "@/components/atoms/select";
import { Beacon } from "@/types/beacon";
import { FormikErrors, FormikTouched } from "formik";
import { Loader2 } from "lucide-react";
import { ImageUpload } from "@/components/molecules/image-upload";

interface BeaconFormProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
  handleChange: (e: React.ChangeEvent) => void;
  values: Beacon;
  errors: FormikErrors<Beacon>;
  touched: FormikTouched<Beacon>;
  categoryOptions: { label: string; value: string }[];
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
            name="title"
            placeholder="What are you looking for?"
            onChange={handleChange}
            value={values.title}
            className="mt-2"
          />
          {touched.title && errors.title && (
            <p className="text-sm text-destructive mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Category
          </label>
          <Select
            name="category"
            options={categoryOptions}
            value={values.category}
            onChange={handleChange}
            className="mt-2"
          />
          {touched.category && errors.category && (
            <p className="text-sm text-destructive mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Description
          </label>
          <Textarea
            name="description"
            placeholder="Describe what you're looking for in detail..."
            onChange={handleChange}
            value={values.description}
            className="mt-2 min-h-[150px]"
          />
          {touched.description && errors.description && (
            <p className="text-sm text-destructive mt-1">
              {errors.description}
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
            onChange={(images) => setFieldValue("images", images)}
            value={values.images || []}
            className="mt-2"
            maxImages={6}
          />
          {touched.images && errors.images && (
            <p className="text-sm text-destructive mt-1">{errors.images}</p>
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
