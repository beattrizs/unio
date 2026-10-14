package br.com.unio.matchmaking_backend.auth.repository;

import br.com.unio.matchmaking_backend.auth.entity.PasswordResetToken;
import br.com.unio.matchmaking_backend.auth.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByTokenHash(String tokenHash);

    void deleteByUser(User user);
}
