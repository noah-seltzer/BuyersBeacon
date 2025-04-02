<<<<<<< HEAD
'use client'
import {
    useDeleteBeaconMutation,
    useGetBeaconsQuery
} from '@/redux/api'
import { Card } from '@/components/atoms/card'
import { Button } from '@/components/atoms/button'
import { Edit2, Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
<<<<<<< HEAD
import {  useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { skipToken } from '@reduxjs/toolkit/query'
export default function DraftsPage() {

    // const user = useSelector((state: RootState) => state.auth.user)
    // const auth = useSelector((state: RootState) => state.auth)


=======
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/redux/store'
import { skipToken } from '@reduxjs/toolkit/query'
import { useAuth } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
export default function DraftsPage() {

    // const user = useSelector((state: RootState) => state.auth.user)
    const auth = useSelector((state: RootState) => state.auth)

    console.log('user', user)
    console.log('auth', auth)
>>>>>>> e1c31bd1765714fb6740621360b90d8487ff98d1
    const { data: drafts, isLoading } = useGetBeaconsQuery(!!user ? { drafts: true, userId: user.id } : skipToken)
    const [deleteDraft] = useDeleteBeaconMutation()

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation()
        try {
            await deleteDraft(id).unwrap()
        } catch (error) {
            console.error('Failed to delete draft:', error)
        }
    }

    if (isLoading) {
        return (
            <div className='container mx-auto px-4 py-8'>
                <div className='flex items-center justify-center'>
                    <Loader2 className='h-8 w-8 animate-spin' />
                </div>
            </div>
        )
    }

    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-bold mb-6'>My Drafts</h1>
            <div className='grid gap-4'>
                {drafts?.map((draft) => (
                    <Link
                        key={draft.BeaconId}
                        href={`/beacons/edit/${draft.BeaconId}`}
                        className='block'
                    >
                        <Card className='p-4 hover:bg-muted/50 transition-colors cursor-pointer'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h2 className='text-xl font-semibold'>
                                        {draft.ItemName || 'Untitled Draft'}
                                    </h2>
                                    <p className='text-sm text-muted-foreground'>
                                        Last saved:{' '}
                                        {draft.LastDraftSave
                                            ? new Date(
                                                  draft.LastDraftSave
                                              ).toLocaleDateString()
                                            : 'Never'}
                                    </p>
                                </div>
                                <div className='flex gap-2'>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        onClick={(e) =>
                                            draft.BeaconId &&
                                            handleDelete(e, draft.BeaconId)
                                        }
                                        className='text-destructive hover:text-destructive/90'
                                    >
                                        <Trash2 className='h-4 w-4' />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </Link>
                ))}
                {(!drafts || drafts.length === 0) && (
                    <div className='text-center py-8'>
                        <p className='text-muted-foreground'>No drafts found</p>
                        <Button className='mt-4' asChild>
                            <Link href='/beacons/create'>Create a Beacon</Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}
=======
"use client";
import { useDeleteBeaconMutation, useGetBeaconsQuery } from "@/redux/api";
import { Card } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import { Loader2, Trash2, FileEdit } from "lucide-react";
import Link from "next/link";
import { skipToken } from "@reduxjs/toolkit/query";
import { User } from "@/types/user";
import { FC } from "react";
import PageHeading from "@/components/atoms/text/page-heading";
import SectionHeading from "@/components/atoms/text/section-heading";

const DraftsPage: FC<{ user: User }> = ({ user }) => {
  const {
    data: drafts,
    isLoading,
    error,
  } = useGetBeaconsQuery(user ? { drafts: true, userId: user.UserId } : skipToken);
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
        <PageHeading title="My Drafts" />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeading
        title="My Drafts"
        subtitle="Beacons you've started but haven't published yet"
      />
      <div className="grid gap-4">
        {drafts?.map((draft) => (
          <div key={draft.BeaconId} className="relative group">
            <Link href={`/beacons/edit/${draft.BeaconId}`} className="block">
              <Card className="p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <div>
                      <h2 className="text-xl font-semibold text-primary">
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
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive/90 hover:bg-transparent"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {(!drafts || drafts.length === 0) && (
          <div className="text-center py-12 bg-accent/10 rounded-xl border border-border/40">
            <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
              <FileEdit className="h-8 w-8 text-primary/60" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Drafts Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              You don't have any saved drafts yet. Start creating a new beacon
              to draft your listing.
            </p>
            <Button
              className="bg-primary hover:bg-primary/90 rounded-full px-6"
              asChild
            >
              <Link href="/beacons/create">Create a Beacon</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
<<<<<<< HEAD
export default DraftsPage;
>>>>>>> main
=======

export default DraftsPage;
>>>>>>> main
