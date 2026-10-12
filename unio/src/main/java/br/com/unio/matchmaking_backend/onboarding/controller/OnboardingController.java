package br.com.unio.matchmaking_backend.onboarding.controller;

import br.com.unio.matchmaking_backend.auth.service.AuthUser;
import br.com.unio.matchmaking_backend.onboarding.dto.OnboardingUpdateRequest;
import br.com.unio.matchmaking_backend.onboarding.service.OnboardingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/profile/onboarding")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('STARTUP','INVESTOR')")
@Tag(name = "Onboarding", description = "Status e respostas do onboarding de primeiro acesso do usuário logado")
public class OnboardingController {

    private final OnboardingService onboardingService;

    @GetMapping
    @Operation(summary = "Consulta o onboarding do usuário logado",
            description = "Sem registro salvo, devolve status PENDENTE e respostas vazias.")
    @ApiResponse(responseCode = "200", description = "Status e respostas atuais")
    @ApiResponse(responseCode = "401", description = "Sem token ou token inválido")
    @ApiResponse(responseCode = "403", description = "Usuário ADMIN (não tem onboarding)")
    public ResponseEntity<Map<String, Object>> get(@AuthenticationPrincipal AuthUser authUser) {
        return ResponseEntity.ok(onboardingService.get(authUser));
    }

    @PutMapping
    @Operation(summary = "Salva o onboarding do usuário logado (upsert)",
            description = "status e respostas são opcionais. Enviar só respostas (autosave) não altera o status; "
                    + "respostas, quando enviadas, substituem o conteúdo salvo.")
    @ApiResponse(responseCode = "200", description = "Onboarding salvo")
    @ApiResponse(responseCode = "400", description = "Status inválido, JSON malformado ou respostas acima de 20 KB")
    @ApiResponse(responseCode = "401", description = "Sem token ou token inválido")
    @ApiResponse(responseCode = "403", description = "Usuário ADMIN (não tem onboarding)")
    public ResponseEntity<Map<String, Object>> update(
            @AuthenticationPrincipal AuthUser authUser,
            @RequestBody OnboardingUpdateRequest request
    ) {
        return ResponseEntity.ok(onboardingService.update(authUser, request));
    }
}
