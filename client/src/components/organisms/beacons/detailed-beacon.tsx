import { Button } from "@/components/atoms/button"
import BodyText from "@/components/atoms/text/body"
import SecondaryTitle from "@/components/atoms/text/secondary-title"
import SubTitle from "@/components/atoms/text/sub-title"
import Title from "@/components/atoms/text/title"
import ImagePreview from "@/components/molecules/image-preview"
import { Beacon, Category } from "@/types/beacon"
import BeatLoader from "react-spinners/BeatLoader"

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
        <div className="w-full flex items-center justify-center">
            <ImagePreview
                images={beacon.Images ?? [{
                    file: "https://picsum.photos/800/600",
                    isCover: true
                },
                {
                    file: "https://picsum.photos/800/600",
                    isCover: false
                },
                {
                    file: "https://picsum.photos/800/600",
                    isCover: false
                },
                {
                    file: "https://picsum.photos/800/600",
                    isCover: false
                }
                ]}
                alt={beacon.ItemName}
                emptyStatePrimaryText={"No images found"}
            />
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