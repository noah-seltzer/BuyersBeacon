import { FC, useState } from 'react';
import { StarRating } from './star-rating';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Card } from '@/components/atoms/card';
import { useCreateReviewMutation, useGetTagsQuery } from '@/redux/api';
import { useToast } from "@/components/atoms/use-toast";
import { Loader2 } from 'lucide-react';

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
        title: 'Please select a rating',
        variant: 'destructive',
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
        title: 'Review Submitted',
        description: 'Your review has been successfully submitted!',
        variant: 'success',
      });
      
      // Reset form
      setRating(0);
      setSelectedTags([]);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: 'There was a problem submitting your review. Please try again.',
        variant: 'destructive',
      });
      console.error('Failed to submit review:', error);
    }
  };
  
  const toggleTag = (tagName: string) => {
    if (selectedTags.includes(tagName)) {
      setSelectedTags(selectedTags.filter(tag => tag !== tagName));
    } else {
      setSelectedTags([...selectedTags, tagName]);
    }
  };
  
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Leave a Review</h3>
      
      <div className="space-y-6">
        {/* Star Rating */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">Rating</p>
          <div className="flex items-center gap-4">
            <StarRating 
              value={rating} 
              editable 
              size="lg" 
              onChange={setRating} 
            />
            {rating > 0 && (
              <span className="text-sm text-muted-foreground">
                {rating} {rating === 1 ? 'star' : 'stars'}
              </span>
            )}
          </div>
        </div>
        
        {/* Tags */}
        <div>
          <p className="text-sm text-muted-foreground mb-2">
            Select tags that describe your experience (optional)
          </p>
          <div className="flex flex-wrap gap-2">
            {tagsLoading ? (
              <div className="flex justify-center w-full py-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              tags?.map((tag) => (
                <Badge 
                  key={tag.tagId}
                  variant={selectedTags.includes(tag.name) ? 'default' : 'outline'}
                  className="cursor-pointer"
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
          className="w-full"
          onClick={handleSubmit}
          disabled={rating === 0 || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Review'
          )}
        </Button>
      </div>
    </Card>
  );
};

export default ReviewForm;