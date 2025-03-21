"use client";
import { useDeleteBeaconMutation, useGetBeaconsQuery } from "@/redux/api";
import { Card } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { skipToken } from "@reduxjs/toolkit/query";
import { User } from "@/types/user";
import { FC } from "react";
const DraftsPage: FC<{ user: User }> = ({ user }) => {
  const { data: drafts, isLoading, error } = useGetBeaconsQuery(
    user ? { drafts: true, userId: user.id } : skipToken
  );
  const [deleteDraft] = useDeleteBeaconMutation();

  const handleDelete = async (id: string) => {
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
          <div key={draft.BeaconId} className="relative group">
            <Link
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
                </div>
              </Card>
            </Link>
            <div 
              className="absolute top-0 right-0 bottom-0 w-12 flex items-center justify-center 
                       hover:bg-red-500/10 rounded-r-lg"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (draft.BeaconId) {
                  handleDelete(draft.BeaconId);
                }
              }}
            >
              <Button
                variant='ghost'
                size='icon'
                className='text-destructive hover:text-destructive/90 hover:bg-transparent'
              >
                <Trash2 className='h-4 w-4' />
              </Button>
            </div>
          </div>
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
};
export default DraftsPage;
