import { z } from "zod";
import { DialerOptions } from "@/schema/shared";

export const CloudflaredInboundOptions = z
  .object({
    type: z.literal("cloudflared"),
    tag: z.string().optional(),
    token: z.string().meta({
      description:
        "Base64 tunnel token from Cloudflare Zero Trust dashboard. Required.",
      description_zh:
        "来自 Cloudflare Zero Trust 控制台的 Base64 隧道令牌。必填。",
    }),
    ha_connections: z.number().int().optional().meta({
      description: "Number of high-availability connections.",
      description_zh: "高可用连接数。",
    }),
    protocol: z.enum(["quic", "http2"]).optional().meta({
      description: "Tunnel protocol.",
      description_zh: "隧道协议。",
    }),
    post_quantum: z.boolean().optional().meta({
      description: "Enable post-quantum cryptography.",
      description_zh: "启用后量子加密。",
    }),
    edge_ip_version: z
      .union([z.literal(0), z.literal(4), z.literal(6)])
      .optional()
      .meta({
        description: "Edge IP version. 0 for auto, 4 for IPv4, 6 for IPv6.",
        description_zh: "边缘 IP 版本。0 为自动，4 为 IPv4，6 为 IPv6。",
      }),
    datagram_version: z.enum(["v2", "v3"]).optional().meta({
      description: "Datagram protocol version.",
      description_zh: "数据报协议版本。",
    }),
    grace_period: z.string().optional().meta({
      description: "Grace period before closing connections.",
      description_zh: "关闭连接前的宽限期。",
    }),
    region: z.string().optional().meta({
      description: "Cloudflare region.",
      description_zh: "Cloudflare 区域。",
    }),
    control_dialer: DialerOptions.optional().meta({
      description: "Dialer options for the control connection.",
      description_zh: "控制连接的拨号选项。",
    }),
    tunnel_dialer: DialerOptions.optional().meta({
      description: "Dialer options for the tunnel connection.",
      description_zh: "隧道连接的拨号选项。",
    }),
  })
  .meta({
    id: "CloudflaredInboundOptions",
    title: "Cloudflared Inbound",
    title_zh: "Cloudflared 入站",
    description: "Cloudflared tunnel inbound. Since sing-box 1.14.0.",
    description_zh: "Cloudflared 隧道入站。自 sing-box 1.14.0 起可用。",
  });

export type CloudflaredInboundOptions = z.infer<
  typeof CloudflaredInboundOptions
>;
