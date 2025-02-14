import { Button } from "@/components/atoms/button";
import ButtonContainer from "@/components/molecules/containers/button-container";
import NumberInput from "@/components/molecules/inputs/number-input";
import SelectInput from "@/components/molecules/inputs/select-input";
import MultilineInput from "@/components/molecules/inputs/text-area-input";
import TextInput from "@/components/molecules/inputs/text-inputs";
import { Beacon } from "@/types/beacon";
import { FormikErrors, FormikTouched } from "formik";

interface BeaconFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: (e: React.ChangeEvent) => void;
    values: Beacon;
    errors: FormikErrors<Beacon>;
    touched: FormikTouched<Beacon>;
    categoryOptions: { label: string; value: string }[];
    submitting: boolean
}

const BeaconForm = ({
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    categoryOptions,
    submitting
}: BeaconFormProps) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <TextInput
                label={"Title"}
                value={values.itemName}
                name={"itemName"}
                onChange={handleChange}
                error={errors.itemName}
            />
            <MultilineInput
                label={"Description"}
                value={values.itemDescription}
                name={"itemDescription"}
                onChange={handleChange}
                error={errors.itemDescription}
            />
            <div className="flex gap-4">
                <SelectInput
                    label={"Category"}
                    value={values.category?.category_name}
                    name={"category"}
                    onChange={handleChange}
                    error={errors.category?.category_name}
                    options={categoryOptions}
                    className="flex-1 w-full"
                />
                <NumberInput
                    label={"Price"}
                    value={values.itemPrice}
                    name={"itemPrice"}
                    onChange={handleChange}
                    error={errors.itemPrice}
                    className="flex-1 w-full"
                />
            </div>
            <ButtonContainer>
                <Button variant="default" size="sm" disabled={submitting}>
                    {submitting ? "Submitting...." : 'Submit'}
                </Button>
            </ButtonContainer>
        </form>
    );
};

export default BeaconForm;
