import { z } from "zod";
import { DialerOptions, ListenOptions, Network } from "@/schema/shared";

// #region Inbound
export const DirectInboundOptions = z
  .object({
    type: z.literal("direct"),
    tag: z.string().optional(),
    network: Network.optional().meta({
      description:
        "Listen network, one of `tcp` `udp`. Both networks are enabled when empty.",
      description_zh: "监听的网络协议，`tcp` `udp` 之一。默认所有。",
    }),
    override_address: z.string().optional().meta({
      description: "Override the connection destination address.",
      description_zh: "覆盖连接目标地址。",
    }),
    override_port: z.number().int().optional().meta({
      description: "Override the connection destination port.",
      description_zh: "覆盖连接目标端口。",
    }),

    ...ListenOptions.shape,
  })
  .meta({
    id: "DirectInboundOptions",
    title: "Direct Inbound",
    title_zh: "Direct 入站",
    description: "Direct inbound is a tunnel server.",
    description_zh: "Direct 入站是一个隧道服务器。",
  });
export type DirectInboundOptions = z.infer<typeof DirectInboundOptions>;
// #endregion

// #region Outbound
export const DirectOutboundOptions = z
  .object({
    type: z.literal("direct"),
    tag: z.string().optional(),
    override_address: z.string().optional().meta({
      description:
        "Override the connection destination address. Deprecated in sing-box 1.11.0 and removed in 1.13.0. Use route rule action `route-options` instead; see [Migration](/migration/#migrate-destination-override-fields-to-route-options).",
      description_zh:
        "覆盖连接目标地址。已在 sing-box 1.11.0 废弃并在 1.13.0 中移除。请改用路由规则动作 `route-options`；请参阅 [迁移指南](/zh/migration/#migrate-destination-override-fields-to-route-options)。",
      deprecated: true,
    }),
    override_port: z.number().int().optional().meta({
      description:
        "Override the connection destination port. Deprecated in sing-box 1.11.0 and removed in 1.13.0. Use route rule action `route-options` instead; see [Migration](/migration/#migrate-destination-override-fields-to-route-options).",
      description_zh:
        "覆盖连接目标端口。已在 sing-box 1.11.0 废弃并在 1.13.0 中移除。请改用路由规则动作 `route-options`；请参阅 [迁移指南](/zh/migration/#migrate-destination-override-fields-to-route-options)。",
      deprecated: true,
    }),

    ...DialerOptions.shape,
  })
  .meta({
    id: "DirectOutboundOptions",
    title: "Direct Outbound",
    title_zh: "Direct 出站",
    description: "Direct outbound send requests directly.",
    description_zh: "Direct 出站直接发送请求。",
  });
export type DirectOutboundOptions = z.infer<typeof DirectOutboundOptions>;
// #endregion
