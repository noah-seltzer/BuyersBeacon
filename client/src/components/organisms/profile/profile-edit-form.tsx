import { FC, useState, useRef } from "react";
import { User } from "@/types/user";
import { Card } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { useUpdateProfileMutation, useUploadProfileImageMutation } from "@/redux/api";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Camera, Loader2, User2 } from "lucide-react";
import { useToast } from "@/components/atoms/use-toast";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

interface ProfileEditFormProps {
  user: User;
}

export const ProfileEditForm: FC<ProfileEditFormProps> = ({ user }) => {
  const [updateProfile] = useUpdateProfileMutation();
  const [uploadProfileImage] = useUploadProfileImageMutation();
  const router = useRouter();
  const { toast } = useToast();
  const { user: clerkUser } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || clerkUser?.imageUrl || "/default-avatar.webp");

  const { handleSubmit, handleChange, values, isSubmitting, setFieldValue } = useFormik({
    initialValues: {
      displayName: user.displayName || clerkUser?.firstName || "Anonymous User",
      bio: user.bio,
      location: user.location,
      avatarUrl: user.avatarUrl || "",
    },
    onSubmit: async (values) => {
      try {
        await updateProfile({
          id: user.id,
          ...values,
        }).unwrap();

        toast({
          title: "Profile Updated",
          description: "Your profile has been successfully updated!",
          variant: "success",
        });

        router.push(`/profile/${user.id}`);
      } catch (error) {
        console.error("Failed to update profile:", error);
        toast({
          title: "Update Failed",
          description:
            "There was a problem updating your profile. Please try again.",
          variant: "destructive",
        });
      }
    },
  });

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Preview the image locally first
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      // Upload the image to the server
      const response = await uploadProfileImage(file).unwrap();
      // Set the avatar URL field in the form
      setFieldValue("avatarUrl", response.url);
      setIsUploading(false);
      
      toast({
        title: "Image Uploaded",
        description: "Your profile picture has been updated!",
        variant: "success",
      });
    } catch (error) {
      console.error("Failed to upload profile image:", error);
      setIsUploading(false);
      
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your profile picture. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <div 
            className="relative w-24 h-24 cursor-pointer group" 
            onClick={handleImageClick}
          >
            <>
              <Image
                src={avatarUrl}
                alt={user.displayName}
                fill
                className="rounded-full object-cover border-4 border-background"
                sizes="96px"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.src = "/default-avatar.webp";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </>
            
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                <Loader2 className="w-6 h-6 text-white animate-spin" />
              </div>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden" 
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        
        <p className="text-center text-sm text-muted-foreground mb-6">
          Click on the image to change your profile picture
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Display Name
              </label>
              <Input
                name="displayName"
                value={values.displayName}
                onChange={handleChange}
                placeholder="Enter your display name"
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <Textarea
                name="bio"
                value={values.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell others about yourself"
                className="w-full resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                name="location"
                value={values.location}
                onChange={handleChange}
                placeholder="Where are you located?"
                className="w-full"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting || isUploading}>
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};