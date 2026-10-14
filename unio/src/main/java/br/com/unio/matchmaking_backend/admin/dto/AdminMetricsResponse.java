package br.com.unio.matchmaking_backend.admin.dto;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AdminMetricsResponse {

    private long totalStartups;
    private long totalInvestors;
    private long totalMatches;
    private long totalFeedbacks;
    private Map<String, Long> distributionByClassification;
}
