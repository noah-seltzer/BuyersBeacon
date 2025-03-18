"use client";
import { useGetDraftsQuery, useDeleteDraftMutation } from "@/redux/api";
import { Card } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Edit2, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DraftsPage() {
  const { data: drafts, isLoading } = useGetDraftsQuery();
  const [deleteDraft] = useDeleteDraftMutation();

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    try {
      await deleteDraft(id).unwrap();
    } catch (error) {
      console.error("Failed to delete draft:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Drafts</h1>
      <div className="grid gap-4">
        {drafts?.map((draft) => (
          <Link 
            key={draft.BeaconId} 
            href={`/beacons/edit/${draft.BeaconId}`}
            className="block"
          >
            <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">
                    {draft.ItemName || "Untitled Draft"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Last saved:{" "}
                    {draft.LastDraftSave
                      ? new Date(draft.LastDraftSave).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={(e) => draft.BeaconId && handleDelete(e, draft.BeaconId)}
                    className="text-destructive hover:text-destructive/90"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {(!drafts || drafts.length === 0) && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No drafts found</p>
            <Button className="mt-4" asChild>
              <Link href="/beacons/create">Create a Beacon</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
