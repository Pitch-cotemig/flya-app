-- Migration: Add is_favorite column to trips table
-- Run this in your Supabase SQL editor

ALTER TABLE trips 
ADD COLUMN is_favorite BOOLEAN DEFAULT FALSE;

-- Update existing trips to have is_favorite = false
UPDATE trips 
SET is_favorite = FALSE 
WHERE is_favorite IS NULL;

-- Make sure the column is not null
ALTER TABLE trips 
ALTER COLUMN is_favorite SET NOT NULL; 