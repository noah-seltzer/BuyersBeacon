import { FC, useState } from "react";
import { StarRating } from "./star-rating";
import { Button } from "@/components/atoms/button";
import { Badge } from "@/components/atoms/badge";
import { Card } from "@/components/atoms/card";
import { useCreateReviewMutation, useGetTagsQuery } from "@/redux/api";
import { useToast } from "@/components/atoms/use-toast";
import { Loader2, Star } from "lucide-react";

interface ReviewFormProps {
  userId: string;
  onSuccess?: () => void;
}

export const ReviewForm: FC<ReviewFormProps> = ({ userId, onSuccess }) => {
  const [rating, setRating] = useState<number>(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { data: tags, isLoading: tagsLoading } = useGetTagsQuery();
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        variant: "destructive",
      });
      return;
    }

    try {
      await createReview({
        userId,
        rating,
        tagNames: selectedTags,
      }).unwrap();

      toast({
        title: "Review Submitted",
        description: "Your review has been successfully submitted!",
        variant: "success",
      });

      // Reset form
      setRating(0);
      setSelectedTags([]);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      // Check if the error message contains information about reviewing oneself
      const errorMessage = error?.data || "";
      
      if (errorMessage.includes("cannot review themselves") || 
          errorMessage.includes("Users cannot review themselves")) {
        toast({
          title: "Cannot Submit Review",
          description: "You cannot submit a review for yourself.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Submission Failed",
          description:
            "There was a problem submitting your review. Please try again.",
          variant: "destructive",
        });
      }
      console.error("Failed to submit review:", error);
    }
  };

  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };

  return (
    <Card className="p-6 border-border/30">
      <h3 className="text-lg font-semibold mb-6 pb-2 border-b border-border/20 flex items-center">
        <Star className="w-4 h-4 mr-2 text-primary" />
        Leave a Review
      </h3>

      <div className="space-y-6">
        {/* Star Rating */}
        <div className="bg-accent/30 p-4 rounded-lg border border-primary/10">
          <p className="text-sm font-medium mb-3">How was your experience?</p>
          <div className="flex items-center gap-4">
            <StarRating
              value={rating}
              editable
              size="lg"
              onChange={setRating}
            />
            {rating > 0 && (
              <span className="text-sm font-medium text-primary">
                {rating} {rating === 1 ? "star" : "stars"}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <p className="text-sm font-medium mb-3 flex items-center">
            <span className="inline-block w-2 h-2 bg-primary rounded-full mr-2"></span>
            What describes your experience? (optional)
          </p>
          <div className="flex flex-wrap gap-2">
            {tagsLoading ? (
              <div className="flex justify-center w-full py-2">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : (
              tags?.map((tag) => (
                <Badge
                  key={tag.tagId}
                  variant={
                    selectedTags.includes(tag.name) ? "default" : "outline"
                  }
                  className={`cursor-pointer text-sm py-1 px-3 transition-all ${
                    selectedTags.includes(tag.name)
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "hover:border-primary/50 hover:text-primary"
                  }`}
                  onClick={() => toggleTag(tag.name)}
                >
                  {tag.name}
                </Badge>
              ))
            )}
          </div>
        </div>

        {/* Submit Button */}
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-4"
          onClick={handleSubmit}
          disabled={rating === 0 || isLoading}
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting Review...
            </>
          ) : (
            "Submit Review"
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ReviewForm;
