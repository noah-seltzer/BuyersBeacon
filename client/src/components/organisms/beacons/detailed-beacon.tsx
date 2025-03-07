import { Button } from "@/components/atoms/button"
import BodyText from "@/components/atoms/text/body"
import SecondaryTitle from "@/components/atoms/text/secondary-title"
import SubTitle from "@/components/atoms/text/sub-title"
import Title from "@/components/atoms/text/title"
import { Beacon, Category } from "@/types/beacon"

interface DetailedBeaconProps {
    beacon: Beacon,
    category: Category,
}

const DetailedBeacon = ({ beacon, category }: DetailedBeaconProps) => {

    return <div className="flex flex-col gap-5">
        <div>
            <Title>
                {beacon?.ItemName}
            </Title>
            <SecondaryTitle>
                {category.CategoryName}
            </SecondaryTitle>
        </div>
        <div className="h-[500px] w-full bg-surface flex items-center justify-center">
            IMAGES GO HERE
        </div>
        <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div>
                    <SubTitle>Location</SubTitle>
                    <BodyText>Abbotsford, British Columbia, Canada</BodyText>
                </div>
                <Button variant={'default'}>Get in Touch</Button>
            </div>
            <div>
                <SubTitle>Description</SubTitle>
                <BodyText>{beacon.ItemDescription}</BodyText>
            </div>
        </div>
    </div>
}


export default DetailedBeacon