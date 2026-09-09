package com.lms.algolearn.config;

import com.lms.algolearn.model.Algorithm;
import com.lms.algolearn.model.LearningLevel;
import com.lms.algolearn.model.LevelContent;
import com.lms.algolearn.repository.AlgorithmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.EnumMap;
import java.util.List;
import java.util.Map;

/**
 * Seeds a handful of algorithms across categories, each with all three
 * levels authored, so the "every student gets every algorithm, only the
 * depth changes" behavior is demonstrable end-to-end out of the box.
 *
 * Add more algorithms by following the same pattern: build one
 * Map<LearningLevel, LevelContent> per algorithm and save it.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final AlgorithmRepository algorithmRepository;

    @Override
    public void run(String... args) {
        if (algorithmRepository.count() > 0) {
            return; // already seeded
        }
        algorithmRepository.saveAll(List.of(
                bubbleSort(),
                binarySearch(),
                dijkstra()
        ));
    }

    private Algorithm bubbleSort() {
        Map<LearningLevel, LevelContent> content = new EnumMap<>(LearningLevel.class);

        content.put(LearningLevel.EASY, LevelContent.builder()
                .explanation("Bubble Sort arranges a list in order by repeatedly comparing two neighboring items and swapping them if they are in the wrong order. After each full pass through the list, the largest remaining item 'bubbles up' to its correct place at the end.")
                .example("List: [5, 1, 4, 2, 8]. First pass compares (5,1) -> swap -> [1,5,4,2,8], then (5,4) -> swap -> [1,4,5,2,8], then (5,2) -> swap -> [1,4,2,5,8], then (5,8) -> no swap. After one pass, 8 is in its final spot.")
                .steps(List.of(
                        "Start at the beginning of the list.",
                        "Compare each pair of neighboring items.",
                        "If the left item is bigger than the right item, swap them.",
                        "Repeat until you reach the end of the list - that completes one pass.",
                        "Repeat the passes until a full pass happens with no swaps."
                ))
                .build());

        content.put(LearningLevel.MEDIUM, LevelContent.builder()
                .explanation("Bubble Sort is a comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they're out of order. Each pass guarantees the next-largest unsorted element reaches its final position.")
                .example("Sorting [5, 1, 4, 2, 8]: Pass 1 -> [1,4,2,5,8] (8 fixed). Pass 2 -> [1,2,4,5,8] (5 fixed). Pass 3 -> [1,2,4,5,8], no swaps needed - sorted.")
                .steps(List.of(
                        "Outer loop runs n-1 times (n = list length).",
                        "Inner loop compares arr[j] and arr[j+1], swapping if arr[j] > arr[j+1].",
                        "Track whether any swap happened in a pass; if not, the list is already sorted and you can stop early."
                ))
                .workingPrinciple("Each pass 'bubbles' the largest unsorted value to its correct position at the end of the unsorted region, so the unsorted region shrinks by one element per pass.")
                .pseudocode("function bubbleSort(arr):\n  n = length(arr)\n  for i from 0 to n-2:\n    swapped = false\n    for j from 0 to n-2-i:\n      if arr[j] > arr[j+1]:\n        swap(arr[j], arr[j+1])\n        swapped = true\n    if not swapped:\n      break\n  return arr")
                .complexity("Time: O(n^2) average/worst, O(n) best (already sorted, with early-exit flag). Space: O(1) - sorts in place.")
                .build());

        content.put(LearningLevel.HARD, LevelContent.builder()
                .explanation("Bubble Sort is a stable, in-place comparison sort of largely pedagogical value; it is rarely used in production due to its quadratic time complexity, but it is a useful baseline for understanding pass-based sorting and early-exit optimizations.")
                .example("Worst case (descending input) [5,4,3,2,1] takes the full n-1 passes with a swap on every comparison. Best case (already sorted) [1,2,3,4,5] terminates after a single pass when the early-exit flag detects zero swaps.")
                .steps(List.of(
                        "Same pass/compare/swap structure as the standard version, with the early-exit optimization applied.",
                        "Optionally track the last swap index per pass to shrink the inner loop bound further (a common micro-optimization)."
                ))
                .workingPrinciple("Bubble Sort maintains the invariant that after pass i, the last i elements are in their final sorted position. It is stable because equal elements are never swapped (swap condition is strictly '>').")
                .pseudocode("function bubbleSort(arr):\n  n = length(arr)\n  newN = n\n  do:\n    lastSwap = 0\n    for j from 0 to newN-2:\n      if arr[j] > arr[j+1]:\n        swap(arr[j], arr[j+1])\n        lastSwap = j + 1\n    newN = lastSwap\n  while newN > 1\n  return arr")
                .complexity("Time: O(n^2) average/worst; O(n) best case with early exit. Space: O(1) auxiliary. Comparisons: n(n-1)/2 worst case. Swaps: up to n(n-1)/2 worst case, 0 best case.")
                .edgeCases(List.of(
                        "Empty list or single element: loop bounds mean zero passes occur, list is trivially sorted.",
                        "All elements equal: zero swaps ever happen; algorithm still runs one full pass without the early-exit flag, or exits immediately with it.",
                        "Already sorted list: early-exit flag makes this O(n) instead of O(n^2)."
                ))
                .optimizations(List.of(
                        "Early-exit flag: stop as soon as a pass makes zero swaps.",
                        "Shrinking bound: track the index of the last swap in a pass and use it as the new upper bound for the next pass (elements after it are already sorted).",
                        "Bidirectional variant (Cocktail Shaker Sort): alternates forward and backward passes to move both large and small out-of-place elements faster."
                ))
                .build());

        return Algorithm.builder()
                .slug("bubble-sort")
                .name("Bubble Sort")
                .category("Sorting")
                .summary("Simple comparison sort that repeatedly swaps adjacent out-of-order elements.")
                .contentByLevel(content)
                .build();
    }

    private Algorithm binarySearch() {
        Map<LearningLevel, LevelContent> content = new EnumMap<>(LearningLevel.class);

        content.put(LearningLevel.EASY, LevelContent.builder()
                .explanation("Binary Search finds an item in a SORTED list quickly by repeatedly checking the middle item and throwing away the half of the list that can't contain the answer.")
                .example("Find 7 in [1,3,5,7,9,11]. Middle is 7 (index 3) -> found immediately! If searching for 9 instead: middle is 7, 9 is bigger, so search only the right half [9,11], new middle is 9 -> found.")
                .steps(List.of(
                        "Look at the middle item of the list.",
                        "If it's the item you want, you're done.",
                        "If your item is smaller, repeat the search on the left half.",
                        "If your item is bigger, repeat the search on the right half.",
                        "Keep going until you find it or the list section becomes empty."
                ))
                .build());

        content.put(LearningLevel.MEDIUM, LevelContent.builder()
                .explanation("Binary Search is a divide-and-conquer algorithm that finds a target value's position in a sorted array by repeatedly halving the search interval.")
                .example("Searching for 9 in [1,3,5,7,9,11,13]: low=0, high=6, mid=3 (value 7). 9>7 so low=4. New mid=5 (value 11). 9<11 so high=4. New mid=4 (value 9) -> found at index 4.")
                .steps(List.of(
                        "Set low = 0 and high = length-1.",
                        "While low <= high: compute mid = (low+high)/2.",
                        "Compare arr[mid] to target; adjust low or high, or return mid if equal."
                ))
                .workingPrinciple("Because the array is sorted, comparing against the midpoint lets you discard half the remaining elements each step, giving logarithmic search time instead of linear.")
                .pseudocode("function binarySearch(arr, target):\n  low = 0\n  high = length(arr) - 1\n  while low <= high:\n    mid = floor((low + high) / 2)\n    if arr[mid] == target:\n      return mid\n    else if arr[mid] < target:\n      low = mid + 1\n    else:\n      high = mid - 1\n  return -1  // not found")
                .complexity("Time: O(log n) all cases. Space: O(1) iterative, O(log n) if implemented recursively (call stack). Requires the input to be sorted.")
                .build());

        content.put(LearningLevel.HARD, LevelContent.builder()
                .explanation("Binary Search is the canonical O(log n) search on sorted, random-access data. Its correctness depends on a loop invariant: the target, if present, always lies within [low, high]. Implementation details around overflow and boundary conditions are common sources of subtle bugs.")
                .example("Overflow pitfall: computing mid = (low + high) / 2 can overflow in fixed-width integer languages when low+high exceeds the max int value. Safer: mid = low + (high - low) / 2.")
                .steps(List.of(
                        "Iterative and recursive implementations are both O(log n) time; iterative avoids O(log n) call-stack space.",
                        "Variants: lower_bound (first index >= target) and upper_bound (first index > target) generalize binary search to ranges and duplicates."
                ))
                .workingPrinciple("Each comparison partitions the remaining search space in half, so after k steps at most n/2^k elements remain; the loop terminates once that count reaches zero, bounding total steps at O(log2 n).")
                .pseudocode("function binarySearch(arr, target):\n  low = 0\n  high = length(arr) - 1\n  while low <= high:\n    mid = low + (high - low) / 2   // overflow-safe\n    if arr[mid] == target:\n      return mid\n    else if arr[mid] < target:\n      low = mid + 1\n    else:\n      high = mid - 1\n  return -1")
                .complexity("Time: O(log n) in all cases (best, average, worst) since the search space always halves. Space: O(1) iterative. Comparisons: ceil(log2(n+1)) worst case.")
                .edgeCases(List.of(
                        "Empty array: high = -1 immediately, loop never runs, returns -1.",
                        "Target smaller than every element or larger than every element: converges to low > high without ever matching.",
                        "Duplicate values: standard binary search returns SOME matching index, not necessarily the first or last - use lower_bound/upper_bound variants if a specific occurrence is needed.",
                        "Unsorted input: algorithm silently returns incorrect results with no error - correctness precondition must be enforced by the caller."
                ))
                .optimizations(List.of(
                        "Use low + (high - low) / 2 instead of (low + high) / 2 to avoid integer overflow on very large arrays.",
                        "For repeated searches on the same static dataset, consider a hash-based structure instead if only exact-match lookups (not ranges) are needed.",
                        "Exponential/galloping search first, then binary search, when searching in an unbounded or very large sorted stream."
                ))
                .build());

        return Algorithm.builder()
                .slug("binary-search")
                .name("Binary Search")
                .category("Searching")
                .summary("Finds a target in a sorted array in logarithmic time by repeatedly halving the search range.")
                .contentByLevel(content)
                .build();
    }

    private Algorithm dijkstra() {
        Map<LearningLevel, LevelContent> content = new EnumMap<>(LearningLevel.class);

        content.put(LearningLevel.EASY, LevelContent.builder()
                .explanation("Dijkstra's Algorithm finds the shortest path from a starting point to every other point in a map of connected locations, when all the connecting distances are positive numbers.")
                .example("Think of a map of cities connected by roads with distances. Starting from City A, Dijkstra's algorithm figures out the shortest total distance to reach every other city, always exploring the closest unvisited city next.")
                .steps(List.of(
                        "Mark the starting point's distance as 0, and every other point's distance as 'infinity' (unknown).",
                        "Visit the closest unvisited point.",
                        "Update the distances of its neighbors if going through this point is shorter.",
                        "Mark this point as visited and repeat with the next closest unvisited point.",
                        "Stop when every point has been visited."
                ))
                .build());

        content.put(LearningLevel.MEDIUM, LevelContent.builder()
                .explanation("Dijkstra's Algorithm computes single-source shortest paths in a weighted graph with non-negative edge weights, using a greedy strategy: always expand the closest unvisited vertex next.")
                .example("Graph: A-B (4), A-C (1), C-B (2), B-D (1). Starting at A: dist[A]=0. Visit C first (dist 1), which updates dist[B] to 3 (1+2, better than the direct 4). Visit B (dist 3), updates dist[D] to 4. Final: A=0, C=1, B=3, D=4.")
                .steps(List.of(
                        "Initialize dist[source] = 0, all others = infinity, and a priority queue with the source.",
                        "Pop the vertex with the smallest known distance.",
                        "For each neighbor, calculate new distance = dist[current] + edge weight; if smaller than the neighbor's known distance, update it and push to the queue.",
                        "Repeat until the queue is empty."
                ))
                .workingPrinciple("A priority queue (min-heap) always gives the next-closest unvisited vertex, which is guaranteed to already have its final shortest distance once popped, because all edge weights are non-negative.")
                .pseudocode("function dijkstra(graph, source):\n  dist = map with all values = infinity\n  dist[source] = 0\n  pq = priority queue, ordered by distance, containing (0, source)\n  while pq is not empty:\n    (d, u) = pq.popMin()\n    if d > dist[u]: continue  // stale entry\n    for each (v, weight) in graph.neighbors(u):\n      newDist = dist[u] + weight\n      if newDist < dist[v]:\n        dist[v] = newDist\n        pq.push((newDist, v))\n  return dist")
                .complexity("Time: O((V + E) log V) with a binary heap priority queue, where V = vertices, E = edges. Space: O(V) for the distance map plus O(E) for the graph.")
                .build());

        content.put(LearningLevel.HARD, LevelContent.builder()
                .explanation("Dijkstra's Algorithm is a greedy, label-setting shortest-path algorithm correct only for graphs with non-negative edge weights; it fails silently (produces wrong answers) on negative weights, where Bellman-Ford must be used instead.")
                .example("Counter-example with negative weights: A->B (weight 5), A->C (weight 2), C->B (weight -4). True shortest A->B is 2+(-4)=-2 via C, but Dijkstra greedily finalizes B at distance 5 the first time it's popped, before ever discovering the cheaper path through C, and never revisits it.")
                .steps(List.of(
                        "Correctness proof relies on the fact that once a vertex is popped with its minimal distance, no later relaxation through a not-yet-visited (and therefore >= its distance) vertex can improve it - this breaks under negative edges.",
                        "Stale priority-queue entries (a vertex pushed multiple times at different distances) must be skipped when popped if a better distance was already finalized - implemented via the `if d > dist[u]: continue` check."
                ))
                .workingPrinciple("The algorithm maintains a 'settled' set S where every vertex's distance is finalized. The invariant is: for any vertex in the priority queue's frontier, its tentative distance is an upper bound on true distance, and the vertex with the smallest tentative distance among the frontier has that distance be exact - this only holds when edges are non-negative.")
                .pseudocode("function dijkstra(graph, source):\n  dist = map with all values = infinity\n  dist[source] = 0\n  visited = empty set\n  pq = priority queue with (0, source)\n  while pq is not empty:\n    (d, u) = pq.popMin()\n    if u in visited: continue\n    visited.add(u)\n    for each (v, weight) in graph.neighbors(u):\n      if weight < 0: raise Error('Dijkstra requires non-negative weights')\n      newDist = d + weight\n      if newDist < dist[v]:\n        dist[v] = newDist\n        pq.push((newDist, v))\n  return dist")
                .complexity("Time: O((V + E) log V) with a binary heap; O(V^2) with a simple array-based min extraction (better for dense graphs); O(E + V log V) with a Fibonacci heap (theoretical improvement, rarely used in practice due to constant-factor overhead). Space: O(V + E).")
                .edgeCases(List.of(
                        "Negative edge weights: algorithm produces incorrect distances without any error signal unless explicitly checked for.",
                        "Disconnected graph: unreachable vertices retain distance infinity - callers must check for this.",
                        "Multiple edges between the same pair of vertices: only the minimum-weight edge ever matters; duplicates are effectively ignored by the relaxation step.",
                        "Self-loops: never improve any distance since dist[u] + weight >= dist[u] for non-negative weight, so they're harmless but wasted work.",
                        "Source with no outgoing edges: only dist[source] = 0 is finalized; everything else stays infinity."
                ))
                .optimizations(List.of(
                        "Use a binary heap for sparse graphs (E ~ V); use a simple array scan for dense graphs (E ~ V^2), since the log V factor stops paying off.",
                        "Bidirectional Dijkstra: run simultaneously from source and target, meeting in the middle, roughly halving the effective search radius for point-to-point queries.",
                        "A* Search: same core structure as Dijkstra but adds a heuristic to bias the priority queue toward the target, useful when a good heuristic (e.g. straight-line distance) exists.",
                        "Skip stale queue entries (lazy deletion) instead of implementing decrease-key, which most standard library heaps don't support efficiently."
                ))
                .build());

        return Algorithm.builder()
                .slug("dijkstra")
                .name("Dijkstra's Algorithm")
                .category("Graph")
                .summary("Finds shortest paths from a source vertex to all other vertices in a graph with non-negative edge weights.")
                .contentByLevel(content)
                .build();
    }
}
