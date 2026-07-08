import { useMemo, useRef } from "react";

type CacheEntry<V> = {
	value: V;
	expiresAt: number;
};

export function useTtlCache<V>(ttlMs: number) {
	const cacheRef = useRef(new Map<string, CacheEntry<V>>());

	const ttlCache = useMemo(
		() => ({
			get: (key: string) => {
				const entry = cacheRef.current.get(key);
				const isCacheHit = entry && entry.expiresAt > Date.now();
				return isCacheHit ? entry.value : undefined;
			},
			set: (key: string, value: V) => {
				cacheRef.current.set(key, {
					value,
					expiresAt: Date.now() + ttlMs
				});
			}
		}),
		[ttlMs]
	);

	return ttlCache;
}
