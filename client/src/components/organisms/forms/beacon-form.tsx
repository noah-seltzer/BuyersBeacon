import TextInput from "@/components/molecules/inputs/text-inputs"
import { Beacon } from "@/types/beacon";
import { FormikErrors, FormikTouched } from "formik";

interface BeaconFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement> | undefined) => void;
    handleChange: (e: React.ChangeEvent) => void;
    values: Beacon,
    errors: FormikErrors<Beacon>
    touched: FormikTouched<Beacon>
}

const BeaconForm = ({ handleSubmit, handleChange, values, errors, touched }: BeaconFormProps) => {

    return <form>
        <TextInput
            label={"Title"}
            value={values.itemName}
            name={"itemName"}
            onChange={handleChange}
            error={errors.itemName}
        />
        <TextInput
            label={"Description"}
            value={values.itemDescription}
            name={"itemDescription"}
            onChange={handleChange}
            error={errors.itemDescription}
        />
        <TextInput
            label={"Category"}
            value={values.category?.category_name}
            name={"category"}
            onChange={handleChange}
            error={errors.category?.category_name}
        />
        <TextInput
            label={"Prioe"}
            value={values.itemPrice?.toString()}
            name={"itemPrice"}
            onChange={handleChange}
            error={errors.itemPrice}
        />
    </form>
}

export default BeaconForm