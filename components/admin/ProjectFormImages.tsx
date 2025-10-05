'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { StorageService } from '@/lib/firebase/storage';

interface ProjectFormImagesProps {
  images: string[];
  updateField: (field: string, value: any) => void;
  imageUploading: boolean;
  setImageUploading: (loading: boolean) => void;
}

export function ProjectFormImages({ 
  images, 
  updateField, 
  imageUploading, 
  setImageUploading 
}: ProjectFormImagesProps) {
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setImageUploading(true);
    try {
      const fileArray = Array.from(files);
      const downloadURLs = await StorageService.uploadProjectImages(fileArray);
      updateField('images', [...images, ...downloadURLs]);
    } catch (error) {
      console.error('Failed to upload images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  const removeImage = async (index: number) => {
    try {
      const imageUrl = images[index];
      // Extract file path from URL for deletion
      const fileName = StorageService.extractFileNameFromUrl(imageUrl);
      await StorageService.deleteFile(`projects/${fileName}`);
      
      const newImages = images.filter((_, i) => i !== index);
      updateField('images', newImages);
    } catch (error) {
      console.error('Failed to delete image:', error);
      // Still remove from UI even if deletion fails
      const newImages = images.filter((_, i) => i !== index);
      updateField('images', newImages);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Project Images</h3>
      <div className="space-y-4">
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Project ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2"
                >
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}
        <div>
          <Label htmlFor="imageUpload">Upload Images</Label>
          <input
            id="imageUpload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            disabled={imageUploading}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          />
          {imageUploading && (
            <p className="text-sm text-muted-foreground mt-1">Uploading...</p>
          )}
        </div>
      </div>
    </Card>
  );
}