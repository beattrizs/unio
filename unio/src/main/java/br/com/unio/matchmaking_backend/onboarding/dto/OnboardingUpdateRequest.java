package br.com.unio.matchmaking_backend.onboarding.dto;

import br.com.unio.matchmaking_backend.onboarding.entity.OnboardingStatus;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OnboardingUpdateRequest {

    /** Opcional. Ausente = mantém o status atual (ex.: autosave). */
    private OnboardingStatus status;

    /** Opcional. Quando presente, substitui por completo as respostas salvas. */
    private Map<String, Object> respostas;
}
