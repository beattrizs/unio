package br.com.unio.matchmaking_backend.onboarding.repository;

import br.com.unio.matchmaking_backend.onboarding.entity.UserOnboarding;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserOnboardingRepository extends JpaRepository<UserOnboarding, Long> {
}
