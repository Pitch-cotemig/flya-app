-- Migration: Create bags table for Supabase
-- This migration creates the bags table to store user packing lists for trips
-- Run this SQL in Supabase SQL Editor

-- Criação da tabela bags
CREATE TABLE IF NOT EXISTS public.bags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trip_id UUID NOT NULL,
  user_id UUID NOT NULL,
  items JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraint para garantir uma mala por usuário por viagem
  CONSTRAINT unique_bag_per_trip_user UNIQUE(trip_id, user_id)
);

-- Comentários nas colunas para documentação
COMMENT ON TABLE public.bags IS 'Stores packing lists (bags) for user trips';
COMMENT ON COLUMN public.bags.id IS 'Unique identifier for the bag';
COMMENT ON COLUMN public.bags.trip_id IS 'Reference to the trip this bag belongs to';
COMMENT ON COLUMN public.bags.user_id IS 'Reference to the user who owns this bag';
COMMENT ON COLUMN public.bags.items IS 'Array of bag items in JSON format';
COMMENT ON COLUMN public.bags.created_at IS 'Timestamp when the bag was created';
COMMENT ON COLUMN public.bags.updated_at IS 'Timestamp when the bag was last updated';

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_bags_trip_id ON public.bags(trip_id);
CREATE INDEX IF NOT EXISTS idx_bags_user_id ON public.bags(user_id);
CREATE INDEX IF NOT EXISTS idx_bags_trip_user ON public.bags(trip_id, user_id);

-- Índice GIN para consultas JSONB (caso precise buscar dentro dos items)
CREATE INDEX IF NOT EXISTS idx_bags_items ON public.bags USING GIN (items);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_bags_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_bags_updated_at
    BEFORE UPDATE ON public.bags
    FOR EACH ROW
    EXECUTE FUNCTION public.update_bags_updated_at();

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.bags ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para segurança
-- Nota: Certifique-se de que auth.uid() está disponível (Supabase Auth habilitado)

-- Política para visualização: usuários só veem suas próprias malas
CREATE POLICY "Users can view their own bags"
  ON public.bags
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política para inserção: usuários só podem criar malas para si mesmos
CREATE POLICY "Users can insert their own bags"
  ON public.bags
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Política para atualização: usuários só podem atualizar suas próprias malas
CREATE POLICY "Users can update their own bags"
  ON public.bags
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Política para exclusão: usuários só podem deletar suas próprias malas
CREATE POLICY "Users can delete their own bags"
  ON public.bags
  FOR DELETE
  USING (auth.uid() = user_id);