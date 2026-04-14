import { z } from "zod";

/**
 * Cache file settings.
 */
export const CacheFileOptions = z
  .object({
    /**
     * Enable cache file.
     */
    enabled: z.boolean().optional().meta({
      description: "Enable cache file.",
      description_zh: "启用缓存文件。",
    }),
    /**
     * Path to the cache file.
     * @default 'cache.db'
     */
    path: z.string().optional().meta({
      description: "Path to the cache file. `cache.db` will be used if empty.",
      description_zh: "缓存文件路径，默认使用 `cache.db`。",
    }),
    /**
     * Identifier in the cache file.
     */
    cache_id: z.string().optional().meta({
      description:
        "Identifier in the cache file. If not empty, configuration specified data will use a separate store keyed by it.",
      description_zh:
        "缓存文件中的标识符。如果不为空，配置特定的数据将使用由其键控的单独存储。",
    }),
    /**
     * Store fakeip in the cache file.
     */
    store_fakeip: z.boolean().optional().meta({
      description: "Store fakeip in the cache file.",
      description_zh: "将 fakeip 存储在缓存文件中。",
    }),
    /**
     * Store rejected DNS response cache in the cache file.
     */
    store_rdrc: z.boolean().optional().meta({
      description:
        "Store rejected DNS response cache in the cache file. Deprecated in sing-box 1.14.0 and will be removed in 1.16.0. Use `store_dns` instead.",
      description_zh:
        "将拒绝的 DNS 响应缓存存储在缓存文件中。已在 sing-box 1.14.0 废弃，将在 1.16.0 中移除。请改用 `store_dns`。",
      deprecated: true,
    }),
    store_dns: z.boolean().optional().meta({
      description:
        "Store full DNS cache in the cache file. Since sing-box 1.14.0.",
      description_zh:
        "将完整的 DNS 缓存存储在缓存文件中。自 sing-box 1.14.0 起可用。",
    }),
    /**
     * Timeout of rejected DNS response cache.
     * @default '7d'
     */
    rdrc_timeout: z.string().optional().meta({
      description:
        "Timeout of rejected DNS response cache. `7d` is used by default.",
      description_zh: "拒绝的 DNS 响应缓存超时。默认使用 `7d`。",
    }),
  })
  .meta({
    id: "CacheFileOptions",
    title: "Cache File",
    title_zh: "缓存文件",
    description:
      "Cache file settings control enabling the cache, file path, cache id, fakeip storage, rejected DNS response cache, and rdrc timeout.",
    description_zh:
      "缓存文件设置控制启用、文件路径、缓存 ID、fakeip 存储、拒绝的 DNS 响应缓存以及 rdrc 超时。",
  });

export type CacheFileOptions = z.infer<typeof CacheFileOptions>;
