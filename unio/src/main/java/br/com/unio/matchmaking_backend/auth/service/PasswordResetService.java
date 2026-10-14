package br.com.unio.matchmaking_backend.auth.service;

import br.com.unio.matchmaking_backend.auth.entity.PasswordResetToken;
import br.com.unio.matchmaking_backend.auth.entity.User;
import br.com.unio.matchmaking_backend.auth.repository.PasswordResetTokenRepository;
import br.com.unio.matchmaking_backend.auth.repository.UserRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Locale;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class PasswordResetService {

    private static final SecureRandom RANDOM = new SecureRandom();

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final PasswordResetNotifier notifier;

    @Value("${app.password-reset.expiration-minutes:60}")
    private long expirationMinutes;

    /**
     * Gera um token de redefinição e o entrega via {@link PasswordResetNotifier}.
     * Não revela se o e-mail existe: o resultado é o mesmo para e-mails cadastrados ou não.
     */
    @Transactional
    public void requestReset(String email) {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);

        userRepository.findByEmail(normalizedEmail).ifPresent(user -> {
            tokenRepository.deleteByUser(user);

            String rawToken = generateRawToken();
            tokenRepository.save(PasswordResetToken.builder()
                    .user(user)
                    .tokenHash(hash(rawToken))
                    .expiresAt(Instant.now().plus(expirationMinutes, ChronoUnit.MINUTES))
                    .build());

            notifier.sendResetLink(user.getEmail(), rawToken);
        });
    }

    /**
     * Troca a senha usando o token recebido. O token só vale uma vez e dentro do prazo.
     */
    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByTokenHash(hash(token.trim()))
                .orElseThrow(PasswordResetService::invalidToken);

        if (resetToken.getExpiresAt().isBefore(Instant.now())) {
            tokenRepository.delete(resetToken);
            throw invalidToken();
        }

        User user = resetToken.getUser();
        user.setPasswordHash(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        tokenRepository.deleteByUser(user);
    }

    private static ResponseStatusException invalidToken() {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, "Token inválido ou expirado");
    }

    private static String generateRawToken() {
        byte[] bytes = new byte[32];
        RANDOM.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

    private static String hash(String value) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(digest.digest(value.getBytes(StandardCharsets.UTF_8)));
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 indisponível", e);
        }
    }
}
