import { FC } from "react";
import { User } from "@/types/user";
import { Card } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Textarea } from "@/components/atoms/textarea";
import { useUpdateProfileMutation } from "@/redux/api";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/atoms/use-toast";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

interface ProfileEditFormProps {
  user: User;
}

export const ProfileEditForm: FC<ProfileEditFormProps> = ({ user }) => {
  const [updateProfile] = useUpdateProfileMutation();
  const router = useRouter();
  const { toast } = useToast();
  const { user: clerkUser } = useUser();

  const avatarUrl = clerkUser?.imageUrl
    ? clerkUser.imageUrl
    : user.avatarUrl
    ? user.avatarUrl
    : "/default-avatar.png";

  const { handleSubmit, handleChange, values, isSubmitting } = useFormik({
    initialValues: {
      displayName: user.displayName || clerkUser?.firstName || "Anonymous User",
      bio: user.bio,
      location: user.location,
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

  return (
    <Card className="max-w-2xl mx-auto">
      <div className="p-6">
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20">
            <Image
              src={avatarUrl}
              alt={user.displayName}
              fill
              className="rounded-full object-cover border-4 border-background"
              sizes="80px"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = "/default-avatar.png";
              }}
            />
          </div>
        </div>

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
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
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
