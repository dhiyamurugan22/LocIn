package com.learning.coursemodule.config;

import com.learning.coursemodule.model.*;
import com.learning.coursemodule.repository.CourseModuleRepository;
import com.learning.coursemodule.repository.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * Seeds one demo course ("Data Structures Fundamentals") with three modules so the
 * full flow - level selection, content-by-level, fill-in assessment, 80% mastery
 * gating, module locking - can be exercised end to end without any manual setup.
 * Runs only if the courses collection is empty, so it's safe on every restart.
 */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final CourseRepository courseRepository;
    private final CourseModuleRepository moduleRepository;

    @Override
    public void run(String... args) {
        if (courseRepository.count() > 0) {
            return;
        }

        Course course = courseRepository.save(new Course(null, "Data Structures Fundamentals",
                "Core data structures every programmer should know cold.", 1));

        moduleRepository.save(arraysModule(course.getId()));
        moduleRepository.save(linkedListModule(course.getId()));
        moduleRepository.save(stacksModule(course.getId()));
    }

    private CourseModule arraysModule(String courseId) {
        CourseModule m = new CourseModule();
        m.setCourseId(courseId);
        m.setTitle("Arrays");
        m.setOrder(1);
        m.getContentByLevel().put(TeachingLevel.EASY, new LevelContent(
                "An array is a row of labelled boxes that all hold the same kind of item.",
                "Picture an egg carton: 12 slots in a row, each one numbered starting from 0. "
                        + "An array works the same way - it's a fixed row of storage slots, and you use "
                        + "the slot's number (its 'index') to put something in or take something out. "
                        + "Because every slot is the same size, the computer can jump straight to slot "
                        + "number 7 without checking slots 0 through 6 first - that's what makes arrays fast."));
        m.getContentByLevel().put(TeachingLevel.MEDIUM, new LevelContent(
                "Arrays store elements in contiguous memory, giving O(1) indexed access.",
                "An array is a fixed-size, contiguous block of memory holding elements of a single type. "
                        + "Because elements are the same size and laid out back-to-back, the address of "
                        + "element i is computed directly as base_address + i * element_size, so reading or "
                        + "writing by index is O(1). Insertion or deletion in the middle is O(n), since every "
                        + "following element has to shift to keep the block contiguous. Most languages expose "
                        + "a resizable wrapper (e.g. ArrayList, Python list) that reallocates a larger block "
                        + "and copies over when it runs out of room."));
        m.getContentByLevel().put(TeachingLevel.HARD, new LevelContent(
                "Contiguous fixed-stride storage: O(1) random access, O(n) shifting, amortized O(1) dynamic growth.",
                "An array's defining property is a constant stride between elements, which lets the address "
                        + "of index i be computed in O(1) via base + i * stride - no pointer chasing, and it's "
                        + "extremely cache-friendly since sequential access hits contiguous cache lines. "
                        + "Insertion/deletion at an arbitrary index costs O(n) due to the memmove of trailing "
                        + "elements. Dynamic arrays (Java ArrayList, C++ vector, Python list) grow by a "
                        + "geometric factor (commonly 1.5x-2x) on overflow, which gives amortized O(1) append: "
                        + "the cost of the occasional O(n) reallocation is spread across the n cheap appends "
                        + "since the last one. Edge cases worth knowing: fixed-size arrays can't grow at all; "
                        + "resizing invalidates existing pointers/iterators in languages like C++; and "
                        + "multi-dimensional arrays are typically stored row-major, which is why iterating "
                        + "row-by-row beats column-by-column for cache performance."));
        m.setAssessmentQuestions(List.of(
                new AssessmentQuestion("q1", "Reading an element by index in an array takes ___ time.",
                        List.of("O(1)", "constant", "constant time")),
                new AssessmentQuestion("q2", "Elements in an array are stored in ___ memory.",
                        List.of("contiguous", "adjacent", "contiguous memory")),
                new AssessmentQuestion("q3", "Inserting an element in the middle of an array is ___ time in the worst case.",
                        List.of("O(n)", "linear", "linear time")),
                new AssessmentQuestion("q4", "A dynamic array's append is described as amortized ___.",
                        List.of("O(1)", "constant", "constant time"))
        ));
        return m;
    }

    private CourseModule linkedListModule(String courseId) {
        CourseModule m = new CourseModule();
        m.setCourseId(courseId);
        m.setTitle("Linked Lists");
        m.setOrder(2);
        m.getContentByLevel().put(TeachingLevel.EASY, new LevelContent(
                "A linked list is a chain of items where each item points to the next one.",
                "Think of a treasure hunt where each clue tells you where to find the next clue - you never "
                        + "see the whole map at once, just 'here's this item, and here's where the next one is.' "
                        + "That's a linked list: each 'node' holds a value plus a pointer to the next node. "
                        + "Unlike an array, the nodes don't have to sit next to each other in memory, so adding "
                        + "a new clue in the middle of the hunt is easy - you just re-point a couple of arrows."));
        m.getContentByLevel().put(TeachingLevel.MEDIUM, new LevelContent(
                "Nodes hold a value and a pointer to the next node, giving O(1) insertion but O(n) access.",
                "A singly linked list is a sequence of nodes, each storing a value and a reference to the next "
                        + "node (a doubly linked list also keeps a reference to the previous node). There's no "
                        + "requirement that nodes be contiguous in memory, so insertion or deletion at a known "
                        + "position is O(1) once you're there - you just relink pointers, no shifting required. "
                        + "The trade-off is that there's no direct indexing: reaching the k-th element means "
                        + "walking k pointers from the head, so random access is O(n). Linked lists also carry "
                        + "per-node pointer overhead and are less cache-friendly than arrays since nodes can be "
                        + "scattered across memory."));
        m.getContentByLevel().put(TeachingLevel.HARD, new LevelContent(
                "Pointer-based node chain: O(1) splice given a reference, O(n) traversal, weak cache locality.",
                "Linked lists trade contiguity for splice efficiency: given a reference to the node before an "
                        + "insertion point, inserting or removing is O(1) pointer rewiring with no shifting - the "
                        + "opposite trade-off profile from arrays. The cost is that every access requires "
                        + "pointer-chasing, which is O(n) for arbitrary access and, more subtly, poor for cache "
                        + "locality: each node may be a cache miss since nodes aren't laid out sequentially. "
                        + "Singly linked lists support only forward traversal and O(1) removal requires a "
                        + "predecessor reference; doubly linked lists add a 'prev' pointer per node to allow "
                        + "O(1) removal given just the node itself, at the cost of extra memory and more "
                        + "pointer bookkeeping on every mutation. Circular variants (tail points back to head) "
                        + "are common in ring buffers and round-robin schedulers. A classic edge case is "
                        + "off-by-one handling at the head/tail: production bugs in linked list code cluster "
                        + "around updating head/tail pointers correctly during insert/delete at the boundaries."));
        m.setAssessmentQuestions(List.of(
                new AssessmentQuestion("q1", "Each node in a singly linked list stores a value and a pointer to the ___ node.",
                        List.of("next", "next node")),
                new AssessmentQuestion("q2", "Inserting a node once you have a reference to its position is ___ time.",
                        List.of("O(1)", "constant", "constant time")),
                new AssessmentQuestion("q3", "Accessing the k-th element of a linked list is ___ time in the worst case.",
                        List.of("O(n)", "linear", "linear time")),
                new AssessmentQuestion("q4", "A doubly linked list adds a pointer to the ___ node for O(1) removal.",
                        List.of("previous", "prev", "previous node"))
        ));
        return m;
    }

    private CourseModule stacksModule(String courseId) {
        CourseModule m = new CourseModule();
        m.setCourseId(courseId);
        m.setTitle("Stacks");
        m.setOrder(3);
        m.getContentByLevel().put(TeachingLevel.EASY, new LevelContent(
                "A stack is like a pile of plates - you only ever add or remove from the top.",
                "Imagine a stack of plates in a cupboard. You always put a new plate on top, and you always "
                        + "take the top plate off first - you can't grab one from the middle without moving "
                        + "everything above it. That's exactly how a stack data structure behaves: the last "
                        + "thing you added is the first thing you take out. This is called 'Last In, First Out', "
                        + "or LIFO."));
        m.getContentByLevel().put(TeachingLevel.MEDIUM, new LevelContent(
                "A LIFO structure supporting O(1) push and pop, usually backed by an array or linked list.",
                "A stack exposes two core operations - push (add to the top) and pop (remove from the top) - "
                        + "both O(1), plus usually a peek to view the top without removing it. It follows Last "
                        + "In, First Out (LIFO) ordering. Stacks are commonly implemented on top of a dynamic "
                        + "array (fast, cache-friendly, occasional resize) or a singly linked list (no resize "
                        + "needed, slight pointer overhead). They show up constantly in real systems: the call "
                        + "stack for function calls, undo/redo history, and parsing balanced brackets or "
                        + "expressions."));
        m.getContentByLevel().put(TeachingLevel.HARD, new LevelContent(
                "LIFO abstract data type: O(1) push/pop/peek; array-backed vs. linked-backed trade-offs and real uses.",
                "A stack is an abstract data type (not a specific implementation) defined purely by its LIFO "
                        + "contract: push, pop, and peek, all O(1). Array-backed stacks get amortized O(1) push "
                        + "via geometric growth (same mechanism as a dynamic array) and excellent cache locality, "
                        + "but a resize is an O(n) worst-case spike. Linked-list-backed stacks (pushing/popping "
                        + "at the head) avoid resize spikes entirely and give strict O(1) worst-case push/pop, "
                        + "at the cost of per-node pointer overhead and weaker locality. Beyond the textbook "
                        + "call-stack example, stacks underpin depth-first traversal (either via recursion, "
                        + "which implicitly uses the call stack, or an explicit stack for an iterative version), "
                        + "backtracking algorithms, expression evaluation with operator-precedence via "
                        + "shunting-yard, and undo/redo. A subtle edge case: an explicit stack used to simulate "
                        + "recursion must be sized (or made dynamic) to avoid the same stack-overflow failure "
                        + "mode as deep native recursion, just moved from the call stack to the heap."));
        m.setAssessmentQuestions(List.of(
                new AssessmentQuestion("q1", "A stack follows ___ order.",
                        List.of("LIFO", "Last In First Out", "last in, first out")),
                new AssessmentQuestion("q2", "Adding an item to the top of a stack is called ___.",
                        List.of("push")),
                new AssessmentQuestion("q3", "Removing the top item from a stack is called ___.",
                        List.of("pop")),
                new AssessmentQuestion("q4", "Viewing the top item without removing it is called ___.",
                        List.of("peek", "top"))
        ));
        return m;
    }
}
