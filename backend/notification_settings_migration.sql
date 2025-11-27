-- Migration: Rename notification_settings columns from Portuguese to English
-- Run this in your Supabase SQL editor

-- Rename columns from Portuguese to English
ALTER TABLE notification_settings 
RENAME COLUMN email_atualizacoes_viagem TO email_trip_updates;

ALTER TABLE notification_settings 
RENAME COLUMN email_atualizacoes_viagem_freq TO email_trip_updates_freq;

ALTER TABLE notification_settings 
RENAME COLUMN email_confirmacoes_reserva TO email_booking_confirmations;

ALTER TABLE notification_settings 
RENAME COLUMN email_dicas_destino TO email_destination_tips;

ALTER TABLE notification_settings 
RENAME COLUMN email_dicas_destino_freq TO email_destination_tips_freq;

ALTER TABLE notification_settings 
RENAME COLUMN email_ofertas_promocionais TO email_promotional_offers;

ALTER TABLE notification_settings 
RENAME COLUMN email_ofertas_promocionais_freq TO email_promotional_offers_freq;

ALTER TABLE notification_settings 
RENAME COLUMN push_atualizacoes_tempo_real TO push_realtime_updates;

ALTER TABLE notification_settings 
RENAME COLUMN push_lembretes_checkin TO push_checkin_reminders;

ALTER TABLE notification_settings 
RENAME COLUMN push_alertas_clima TO push_weather_alerts;