"use client";
import { useGetBeaconsQuery } from "@/redux/api";
import { FC, useState, useEffect, useMemo } from "react";
import { Beacon } from "@/types/beacon";
import { MapPin, Search, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; 
import ImagePreview from "@/components/molecules/image-preview";
import { BeaconThumbnail } from "@/components/molecules/beacon-thumbnail";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import PageHeading from "@/components/atoms/text/page-heading";

const BrowseBeaconsPage: FC = () => {
  const { data: beacons } = useGetBeaconsQuery();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const query = searchParams.get('query') || "";
  const [inputValue, setInputValue] = useState(query);
  
  const publishedBeacons = beacons?.filter((beacon) => !beacon.IsDraft) || [];
  
  useEffect(() => {
    setInputValue(query);
  }, [query]);
  
  const filteredBeacons = useMemo(() => {
    if (!query) return publishedBeacons;
    
    const lowercaseQuery = query.toLowerCase();
    return publishedBeacons.filter(beacon => 
      beacon.ItemName.toLowerCase().includes(lowercaseQuery) || 
      beacon.ItemDescription.toLowerCase().includes(lowercaseQuery) ||
      beacon.Category?.CategoryName.toLowerCase().includes(lowercaseQuery) ||
      beacon.LocCity?.toLowerCase().includes(lowercaseQuery) ||
      beacon.LocRegion?.toLowerCase().includes(lowercaseQuery)
    );
  }, [publishedBeacons, query]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/beacons/browse?query=${encodeURIComponent(inputValue.trim())}`);
    } else {
      router.push('/beacons/browse');
    }
  };
  
  const clearSearch = () => {
    setInputValue("");
    router.push('/beacons/browse');
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <PageHeading 
          title="Browse Beacons"
          subtitle={`${filteredBeacons.length} Beacons ${query ? 'found' : 'available'}`}
        />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search by name, description, category, or location..."
                className="pl-10 py-6 rounded-xl border-border/50"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90 text-white rounded-xl"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Search Results */}
        {query && (
          <div className="mb-6 flex items-center">
            <div className="flex-1">
              <div className="px-4 py-2 bg-primary/10 text-primary rounded-full inline-flex items-center">
                <span className="font-medium mr-2">Search results for:</span> 
                {query}
                <button
                  onClick={clearSearch}
                  className="ml-2 p-1 rounded-full hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredBeacons.length === 0 && query && (
          <div className="text-center py-16 bg-accent/10 rounded-xl border border-border/40 mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-primary/60" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Beacons Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              We couldn't find any beacons matching "{query}". Try using different keywords or browse all beacons.
            </p>
            <Button onClick={clearSearch} variant="outline" className="rounded-full">
              View All Beacons
            </Button>
          </div>
        )}

        {/* Beacons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBeacons.map((beacon) => (
            <BeaconThumbnail key={beacon.BeaconId} beacon={beacon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseBeaconsPage;
