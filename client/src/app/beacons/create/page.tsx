'use client'
import { FC } from 'react'
import { FormikHelpers, useFormik } from 'formik'
import CreateBeaconTemplate from '@/components/templates/create-beacon-template'
import { Beacon } from '@/types/beacon'
import { useCreateBeaconMutation } from '@/redux/api'
// import { useCreateBeaconMutation } from '@/redux/api'

const DEFAULT_CATEGORY_OPTIONS: { label: string, value: string }[] = [
    { label: 'Automotive', value: 'automotive' },
    { label: 'Comics', value: 'comics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Heavy Duty', value: 'heavy duty' },
    { label: 'watches', value: 'watches' },
]

const CreateBeaconPage: FC = () => {
    const [createBeacon, { isLoading }] = useCreateBeaconMutation();

    // const [createBeacon] = useCreateBeaconMutation()

    const { handleChange, handleSubmit, values, errors, touched } = useFormik({
        initialValues: {
            title: '',
            category: DEFAULT_CATEGORY_OPTIONS[0].value,
            description: '',
        } as Beacon,
        onSubmit: async (values: Beacon, helpers: FormikHelpers<Beacon>) => {
            try {
                const res = await createBeacon(values).unwrap()
                console.log(res);
            } catch (error) {
                console.error('Failed to create beacon:', error);
            }
        }
    })

    return <CreateBeaconTemplate
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        values={values}
        errors={errors}
        touched={touched}
        categoryOptions={DEFAULT_CATEGORY_OPTIONS}
        submitting={isLoading}
    />
}
export default CreateBeaconPage