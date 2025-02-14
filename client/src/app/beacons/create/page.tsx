'use client'
import { FC } from 'react'
import { useFormik } from 'formik'
import CreateBeaconTemplate from '@/components/templates/create-beacon-template'
import { Beacon } from '@/types/beacon'
import { useCreateBeaconMutation } from '@/redux/api'
import { useRouter } from 'next/navigation'

const DEFAULT_CATEGORY_OPTIONS: { label: string, value: string }[] = [
    { label: 'Automotive', value: 'automotive' },
    { label: 'Comics', value: 'comics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Heavy Duty', value: 'heavy duty' },
    { label: 'watches', value: 'watches' },
]

const CreateBeaconPage: FC = () => {
    const [createBeacon, { isLoading }] = useCreateBeaconMutation();
    const router = useRouter()

    const { handleChange, handleSubmit, values, errors, touched, } = useFormik({
        initialValues: {
            category: DEFAULT_CATEGORY_OPTIONS[0].value
        } as unknown as Beacon,
        onSubmit: async (result: Beacon) => {
            const payload = {
                ...result,
                "CategoryId": "bcd6ea2e-8d4d-4826-bf0e-7ab471903d49",
                "UserId": "dad51545-5ca5-4762-8c7f-f2f676970387",
            }
            const res = await createBeacon(payload).unwrap()
            console.log('res', res)
            router.push('/beacons/browse')
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