package br.com.unio.matchmaking_backend.auth.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Implementação para desenvolvimento: escreve o link de redefinição no log da aplicação
 * em vez de enviar e-mail. Não use em produção, pois quem lê o log consegue redefinir a senha.
 */
@Component
public class LoggingPasswordResetNotifier implements PasswordResetNotifier {

    private static final Logger log = LoggerFactory.getLogger(LoggingPasswordResetNotifier.class);

    @Value("${app.password-reset.frontend-url:http://localhost:5173/redefinir-senha}")
    private String frontendUrl;

    @Override
    public void sendResetLink(String email, String token) {
        log.info("Link de redefinição de senha para {}: {}?token={}", email, frontendUrl, token);
    }
}
