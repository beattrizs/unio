package br.com.unio.matchmaking_backend.auth.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import br.com.unio.matchmaking_backend.auth.entity.PasswordResetToken;
import br.com.unio.matchmaking_backend.auth.entity.Role;
import br.com.unio.matchmaking_backend.auth.entity.User;
import br.com.unio.matchmaking_backend.auth.repository.PasswordResetTokenRepository;
import br.com.unio.matchmaking_backend.auth.repository.UserRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.server.ResponseStatusException;

@ExtendWith(MockitoExtension.class)
class PasswordResetServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordResetTokenRepository tokenRepository;

    @Mock
    private PasswordResetNotifier notifier;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private PasswordResetService service;
    private User user;

    @BeforeEach
    void setUp() {
        service = new PasswordResetService(userRepository, tokenRepository, passwordEncoder, notifier);
        ReflectionTestUtils.setField(service, "expirationMinutes", 60L);
        user = User.builder()
                .email("ana@exemplo.com")
                .passwordHash(passwordEncoder.encode("senhaAntiga1"))
                .role(Role.STARTUP)
                .build();
    }

    @Test
    void emailDesconhecidoNaoGeraTokenNemEnvia() {
        when(userRepository.findByEmail("naoexiste@exemplo.com")).thenReturn(Optional.empty());

        service.requestReset("naoexiste@exemplo.com");

        verify(tokenRepository, never()).save(any());
        verify(notifier, never()).sendResetLink(anyString(), anyString());
    }

    @Test
    void emailCadastradoGeraTokenComHashEValidadeDeUmaHora() {
        when(userRepository.findByEmail("ana@exemplo.com")).thenReturn(Optional.of(user));

        service.requestReset("  ANA@exemplo.com ");

        ArgumentCaptor<PasswordResetToken> saved = ArgumentCaptor.forClass(PasswordResetToken.class);
        ArgumentCaptor<String> rawToken = ArgumentCaptor.forClass(String.class);
        verify(tokenRepository).deleteByUser(user);
        verify(tokenRepository).save(saved.capture());
        verify(notifier).sendResetLink(org.mockito.ArgumentMatchers.eq("ana@exemplo.com"), rawToken.capture());

        assertThat(saved.getValue().getTokenHash()).isNotEqualTo(rawToken.getValue()).hasSize(64);
        assertThat(saved.getValue().getExpiresAt())
                .isBetween(Instant.now().plus(59, ChronoUnit.MINUTES), Instant.now().plus(61, ChronoUnit.MINUTES));
    }

    @Test
    void tokenValidoTrocaASenhaEApagaOsTokensDoUsuario() {
        PasswordResetToken stored = issueTokenFor(user);

        service.resetPassword(lastRawToken, "novaSenha123");

        assertThat(passwordEncoder.matches("novaSenha123", user.getPasswordHash())).isTrue();
        verify(userRepository).save(user);
        verify(tokenRepository, org.mockito.Mockito.times(2)).deleteByUser(user);
        assertThat(stored.getUser()).isSameAs(user);
    }

    @Test
    void tokenInexistenteEhRejeitado() {
        when(tokenRepository.findByTokenHash(anyString())).thenReturn(Optional.empty());

        assertThatThrownBy(() -> service.resetPassword("qualquer", "novaSenha123"))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Token inválido ou expirado");
        verify(userRepository, never()).save(any());
    }

    @Test
    void tokenExpiradoEhRejeitadoENaoTrocaASenha() {
        PasswordResetToken stored = issueTokenFor(user);
        stored.setExpiresAt(Instant.now().minus(1, ChronoUnit.MINUTES));
        String senhaAntes = user.getPasswordHash();

        assertThatThrownBy(() -> service.resetPassword(lastRawToken, "novaSenha123"))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Token inválido ou expirado");

        assertThat(user.getPasswordHash()).isEqualTo(senhaAntes);
        verify(userRepository, never()).save(any());
    }

    private String lastRawToken;

    /** Simula o fluxo real: pede o reset, captura o token gerado e o devolve como "armazenado". */
    private PasswordResetToken issueTokenFor(User target) {
        when(userRepository.findByEmail(target.getEmail())).thenReturn(Optional.of(target));

        service.requestReset(target.getEmail());

        ArgumentCaptor<PasswordResetToken> saved = ArgumentCaptor.forClass(PasswordResetToken.class);
        ArgumentCaptor<String> raw = ArgumentCaptor.forClass(String.class);
        verify(tokenRepository).save(saved.capture());
        verify(notifier).sendResetLink(anyString(), raw.capture());

        lastRawToken = raw.getValue();
        PasswordResetToken stored = saved.getValue();
        when(tokenRepository.findByTokenHash(stored.getTokenHash())).thenReturn(Optional.of(stored));
        return stored;
    }
}
