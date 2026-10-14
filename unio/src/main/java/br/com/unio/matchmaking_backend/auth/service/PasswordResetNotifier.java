package br.com.unio.matchmaking_backend.auth.service;

/**
 * Responsável por entregar o link de redefinição de senha ao usuário.
 * A implementação atual apenas registra o link no log; para produção, troque por
 * uma implementação que envie e-mail de verdade.
 */
public interface PasswordResetNotifier {

    void sendResetLink(String email, String token);
}
