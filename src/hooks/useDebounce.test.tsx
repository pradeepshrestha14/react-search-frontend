import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";
import { describe, it, expect, vi } from 'vitest';

vi.useFakeTimers(); // Vitest fake timers

describe("useDebounce", () => {
    it("should return initial value immediately", () => {
        const { result } = renderHook(() => useDebounce("test", 500));
        expect(result.current).toBe("test");
    });

    it("should update value after delay", () => {
        let value = "initial";
        const { result, rerender } = renderHook(() => useDebounce(value, 500));

        // Initially should be initial
        expect(result.current).toBe("initial");

        // Update value
        value = "updated";
        rerender();

        // Should still be initial before delay
        expect(result.current).toBe("initial");

        // Fast-forward time
        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current).toBe("updated");
    });

    it("should reset timer if value changes before delay", () => {
        let value = "first";
        const { result, rerender } = renderHook(() => useDebounce(value, 500));

        // Change value quickly
        value = "second";
        rerender();

        act(() => {
            vi.advanceTimersByTime(250);
        });

        // Timer not finished, should still be "first"
        expect(result.current).toBe("first");

        // Change value again before first timer finishes
        value = "third";
        rerender();

        act(() => {
            vi.advanceTimersByTime(500); // Advance past new timer
        });

        expect(result.current).toBe("third");
    });
});
