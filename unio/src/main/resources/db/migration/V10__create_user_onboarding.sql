CREATE TABLE user_onboarding (
    user_id BIGINT PRIMARY KEY,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
    respostas TEXT,
    atualizado_em TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT fk_user_onboarding_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
);
