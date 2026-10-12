package br.com.unio.matchmaking_backend.onboarding.service;

import br.com.unio.matchmaking_backend.auth.entity.Role;
import br.com.unio.matchmaking_backend.auth.repository.UserRepository;
import br.com.unio.matchmaking_backend.auth.service.AuthUser;
import br.com.unio.matchmaking_backend.onboarding.dto.OnboardingUpdateRequest;
import br.com.unio.matchmaking_backend.onboarding.entity.OnboardingStatus;
import br.com.unio.matchmaking_backend.onboarding.entity.UserOnboarding;
import br.com.unio.matchmaking_backend.onboarding.repository.UserOnboardingRepository;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.LinkedHashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

/**
 * Onboarding de primeiro acesso (STARTUP e INVESTOR).
 *
 * <p>As respostas são um JSON livre cujo formato pertence ao front: o back só guarda e devolve,
 * sem validar o conteúdo. ATENÇÃO: esses dados serão lidos pelo motor de matchmaking/IA
 * (ex.: segmentosInteresse, estagiosInteresse, ticketMedio, regioesInteresse para INVESTOR;
 * segmento, estagio, necessidades, capitalProcurado, tracao, pitch para STARTUP). Se o front
 * renomear um campo, o consumidor no matchmaking precisa ser ajustado junto.
 */
@Service
@RequiredArgsConstructor
public class OnboardingService {

    static final int MAX_RESPOSTAS_BYTES = 20 * 1024;

    private static final TypeReference<Map<String, Object>> MAP_TYPE = new TypeReference<>() {
    };

    private final UserOnboardingRepository onboardingRepository;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    @Transactional(readOnly = true)
    public Map<String, Object> get(AuthUser authUser) {
        requireOnboardingRole(authUser);

        return onboardingRepository.findById(authUser.getId())
                .map(this::buildResponse)
                .orElseGet(() -> buildResponse(OnboardingStatus.PENDENTE, Map.of(), null));
    }

    @Transactional
    public Map<String, Object> update(AuthUser authUser, OnboardingUpdateRequest request) {
        requireOnboardingRole(authUser);

        UserOnboarding onboarding = onboardingRepository.findById(authUser.getId())
                .orElseGet(() -> UserOnboarding.builder()
                        .user(userRepository.getReferenceById(authUser.getId()))
                        .status(OnboardingStatus.PENDENTE)
                        .build());

        if (request.getRespostas() != null) {
            onboarding.setRespostas(serializeRespostas(request.getRespostas()));
        }
        if (request.getStatus() != null) {
            onboarding.setStatus(request.getStatus());
        }
        // Precisão do TIMESTAMP do Postgres, para o PUT devolver o mesmo valor que o GET lerá depois
        onboarding.setAtualizadoEm(Instant.now().truncatedTo(ChronoUnit.MICROS));

        return buildResponse(onboardingRepository.save(onboarding));
    }

    // ============================================================
    // Utilitários
    // ============================================================

    /**
     * Garantia explícita de papel: o projeto não habilita method security,
     * então o @PreAuthorize do controller sozinho não barra o ADMIN.
     */
    private void requireOnboardingRole(AuthUser authUser) {
        if (authUser.getRole() != Role.STARTUP && authUser.getRole() != Role.INVESTOR) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Onboarding disponível apenas para STARTUP e INVESTOR");
        }
    }

    private String serializeRespostas(Map<String, Object> respostas) {
        String json = objectMapper.writeValueAsString(respostas);
        if (json.getBytes(StandardCharsets.UTF_8).length > MAX_RESPOSTAS_BYTES) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Respostas excedem o limite de 20 KB");
        }
        return json;
    }

    private Map<String, Object> parseRespostas(String json) {
        if (json == null || json.isBlank()) {
            return Map.of();
        }
        return objectMapper.readValue(json, MAP_TYPE);
    }

    private Map<String, Object> buildResponse(UserOnboarding onboarding) {
        return buildResponse(onboarding.getStatus(), parseRespostas(onboarding.getRespostas()),
                onboarding.getAtualizadoEm());
    }

    private Map<String, Object> buildResponse(OnboardingStatus status, Map<String, Object> respostas,
                                              Instant atualizadoEm) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", status.name());
        response.put("respostas", respostas);
        response.put("atualizadoEm", atualizadoEm);
        return response;
    }
}
