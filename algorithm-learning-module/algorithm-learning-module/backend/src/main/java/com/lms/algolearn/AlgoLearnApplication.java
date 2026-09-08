package com.lms.algolearn;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Algorithm Learning Module.
 *
 * Design principle: every student is taught the FULL set of algorithms.
 * Content is never gated or hidden based on difficulty level. Instead,
 * each algorithm carries three parallel explanations (EASY / MEDIUM / HARD)
 * and the student's preferred level only changes which explanation is
 * shown - never which algorithms are available.
 */
@SpringBootApplication
public class AlgoLearnApplication {
    public static void main(String[] args) {
        SpringApplication.run(AlgoLearnApplication.class, args);
    }
}
