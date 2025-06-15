
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MessageSquare, Lightbulb, Bug } from 'lucide-react';
import { LoadingButton } from '@/components/ui/loading-button';
import { useToast } from '@/hooks/use-toast';

interface FeedbackData {
  type: 'bug' | 'feature' | 'improvement' | 'general';
  rating: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

const FeedbackSystem = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData>({
    type: 'general',
    rating: 0,
    title: '',
    description: '',
    priority: 'medium'
  });
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!feedback.description.trim()) {
      toast({
        title: "Description Required",
        description: "Please provide a description for your feedback.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your feedback. We'll review it and get back to you.",
      });
      
      // Reset form
      setFeedback({
        type: 'general',
        rating: 0,
        title: '',
        description: '',
        priority: 'medium'
      });
      setIsOpen(false);
      
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
            className={`${
              star <= feedback.rating ? 'text-yellow-400' : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            <Star className="h-5 w-5 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'bug':
        return <Bug className="h-4 w-4" />;
      case 'feature':
        return <Lightbulb className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <>
      {/* Feedback Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg"
          size="sm"
        >
          <MessageSquare className="h-4 w-4 mr-2" />
          Feedback
        </Button>
      </div>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Share Your Feedback
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <Label>Feedback Type</Label>
                <Select
                  value={feedback.type}
                  onValueChange={(value: any) => setFeedback(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        General Feedback
                      </div>
                    </SelectItem>
                    <SelectItem value="bug">
                      <div className="flex items-center gap-2">
                        <Bug className="h-4 w-4" />
                        Bug Report
                      </div>
                    </SelectItem>
                    <SelectItem value="feature">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Feature Request
                      </div>
                    </SelectItem>
                    <SelectItem value="improvement">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Improvement
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Overall Rating</Label>
                <div className="flex items-center gap-2 mt-1">
                  {renderStars()}
                  <span className="text-sm text-gray-600 ml-2">
                    {feedback.rating > 0 ? `${feedback.rating}/5` : 'Rate your experience'}
                  </span>
                </div>
              </div>

              <div>
                <Label>Priority</Label>
                <Select
                  value={feedback.priority}
                  onValueChange={(value: any) => setFeedback(prev => ({ ...prev, priority: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="title">Title (Optional)</Label>
                <input
                  id="title"
                  type="text"
                  value={feedback.title}
                  onChange={(e) => setFeedback(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Brief summary of your feedback"
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={feedback.description}
                  onChange={(e) => setFeedback(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please describe your feedback in detail..."
                  rows={4}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <LoadingButton
                  onClick={handleSubmit}
                  loading={isSubmitting}
                  loadingText="Submitting..."
                  className="flex-1"
                >
                  Submit Feedback
                </LoadingButton>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default FeedbackSystem;
