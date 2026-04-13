import { z } from "zod";
import { DialerOptions, Network, ServerOptions } from "@/schema/shared";

export const ShadowsocksROutboundOptions = z
  .object({
    type: z.literal("shadowsocksr"),
    tag: z.string().optional(),
    method: z.string(),
    password: z.string(),
    obfs: z.string().optional(),
    obfs_param: z.string().optional(),
    protocol: z.string().optional(),
    protocol_param: z.string().optional(),
    network: Network.optional(),

    ...ServerOptions.shape,
    ...DialerOptions.shape,
  })
  .meta({
    id: "ShadowsocksROutboundOptions",
    title: "ShadowsocksR Outbound",
    title_zh: "ShadowsocksR 出站",
    description:
      "ShadowsocksR is deprecated and removed in sing-box 1.6.0. The protocol is obsolete.",
    description_zh:
      "ShadowsocksR 已废弃并在 sing-box 1.6.0 中移除。该协议已过时。",
    deprecated: true,
  });

export type ShadowsocksROutboundOptions = z.infer<
  typeof ShadowsocksROutboundOptions
>;
