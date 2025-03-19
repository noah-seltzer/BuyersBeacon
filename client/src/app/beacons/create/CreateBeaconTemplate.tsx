import { ChangeEventHandler, FC } from "react";
import { Category } from "@/types/beacon";
import { FormikErrors, FormikTouched } from "formik";

interface CreateBeaconTemplateProps {
  handleSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  handleChange: ChangeEventHandler<HTMLElement>;
  values: {
    ItemName: string;
    ItemDescription: string;
    CategoryId: string;
    Images: Array<{ file: File }>;
    ItemPrice?: number;
  };
  errors: FormikErrors<{
    ItemName: string;
    ItemDescription: string;
    CategoryId: string;
    Images: Array<{ file: File }>;
    ItemPrice?: number;
  }>;
  touched: FormikTouched<{
    ItemName: string;
    ItemDescription: string;
    CategoryId: string;
    Images: Array<{ file: File }>;
    ItemPrice?: number;
  }>;
  categoryOptions: Category[];
  categoryOptionsIsLoading: boolean;
  categoryOptionsError: Error;
  submitting: boolean;
  setFieldValue: (field: string, value: unknown) => void;
  onSaveDraft: () => void;
  draftSaved: boolean;
  draftError: string | null;
}

export const CreateBeaconTemplate: FC<CreateBeaconTemplateProps> = ({
  handleSubmit,
  handleChange,
  values,
  errors,
  touched,
  categoryOptions,
  submitting,
  setFieldValue,
  onSaveDraft,
  draftSaved,
  draftError,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Beacon</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Name */}
        <div>
          <label htmlFor="ItemName" className="block text-sm font-medium">
            Item Name
          </label>
          <input
            type="text"
            name="ItemName"
            id="ItemName"
            value={values.ItemName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {touched.ItemName && errors.ItemName && (
            <div className="text-red-500 text-sm mt-1">{errors.ItemName}</div>
          )}
        </div>

        {/* Category Selection */}
        <div>
          <label htmlFor="CategoryId" className="block text-sm font-medium">
            Category
          </label>
          <select
            name="CategoryId"
            id="CategoryId"
            value={values.CategoryId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((category) => (
              <option key={category.CategoryId} value={category.CategoryId}>
                {category.CategoryName}
              </option>
            ))}
          </select>
          {touched.CategoryId && errors.CategoryId && (
            <div className="text-red-500 text-sm mt-1">{errors.CategoryId}</div>
          )}
        </div>

        {/* Item Description */}
        <div>
          <label
            htmlFor="ItemDescription"
            className="block text-sm font-medium"
          >
            Description
          </label>
          <textarea
            name="ItemDescription"
            id="ItemDescription"
            value={values.ItemDescription}
            onChange={handleChange}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {touched.ItemDescription && errors.ItemDescription && (
            <div className="text-red-500 text-sm mt-1">
              {errors.ItemDescription}
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <label htmlFor="ItemPrice" className="block text-sm font-medium">
            Price
          </label>
          <input
            type="number"
            name="ItemPrice"
            id="ItemPrice"
            value={values.ItemPrice || ""}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
          {touched.ItemPrice && errors.ItemPrice && (
            <div className="text-red-500 text-sm mt-1">{errors.ItemPrice}</div>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files || []).map((file) => ({
                file,
                preview: URL.createObjectURL(file),
              }));
              setFieldValue("Images", files);
            }}
            className="mt-1 block w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {submitting ? "Creating..." : "Create Beacon"}
          </button>

          <button
            type="button"
            onClick={onSaveDraft}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Save as Draft
          </button>
        </div>

        {/* Status Messages */}
        {draftSaved && (
          <div className="text-green-600">Draft saved successfully!</div>
        )}
        {draftError && <div className="text-red-500">{draftError}</div>}
      </form>
    </div>
  );
};
