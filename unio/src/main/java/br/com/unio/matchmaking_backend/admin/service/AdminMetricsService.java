package br.com.unio.matchmaking_backend.admin.service;

import br.com.unio.matchmaking_backend.admin.dto.AdminMetricsResponse;
import br.com.unio.matchmaking_backend.auth.repository.UserRepository;
import br.com.unio.matchmaking_backend.profile.repository.InvestorRepository;
import br.com.unio.matchmaking_backend.profile.repository.StartupRepository;
import br.com.unio.matchmaking_backend.scorecard.calculation.MatchScoreRepository;
import br.com.unio.matchmaking_backend.scorecard.feedback.FeedbackEventRepository;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminMetricsService {

    private final UserRepository userRepository;
    private final StartupRepository startupRepository;
    private final InvestorRepository investorRepository;
    private final MatchScoreRepository matchScoreRepository;
    private final FeedbackEventRepository feedbackEventRepository;

    public AdminMetricsResponse getMetrics() {
        Map<String, Long> distributionByClassification = matchScoreRepository.findAll()
            .stream()
            .collect(Collectors.groupingBy(
                matchScore -> matchScore.getClassification().name(),
                Collectors.counting()
            ));

        return AdminMetricsResponse.builder()
            .totalStartups(startupRepository.count())
            .totalInvestors(investorRepository.count())
            .totalMatches(matchScoreRepository.count())
            .totalFeedbacks(feedbackEventRepository.count())
            .distributionByClassification(distributionByClassification)
            .build();
    }
}
