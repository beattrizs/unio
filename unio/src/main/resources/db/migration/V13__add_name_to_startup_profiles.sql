ALTER TABLE startup_profiles ADD COLUMN nome VARCHAR(255);

UPDATE startup_profiles SET nome = segmento WHERE nome IS NULL;

ALTER TABLE startup_profiles ALTER COLUMN nome SET NOT NULL;
