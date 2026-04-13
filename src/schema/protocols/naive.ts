import { z } from "zod";
import { InboundTLSOptions, ListenOptions, Network } from "../shared";

const NaiveUser = z.object({
  username: z.string(),
  password: z.string(),
});

// #region Inbound
export const NaiveInboundOptions = z
  .object({
    type: z.literal("naive"),
    tag: z.string().optional(),
    /**
     * Listen network.
     */
    network: Network.optional().meta({
      description:
        "Listen network, one of `tcp` `udp`. Both networks are enabled when empty.",
      description_zh: "监听的网络协议，`tcp` `udp` 之一。默认所有。",
    }),
    /**
     * Naive users.
     */
    users: z.array(NaiveUser).optional().meta({
      description: "Naive users. Required.",
      description_zh: "Naive 用户。必填。",
    }),
    quic_congestion_control: z
      .enum(["bbr", "bbr_standard", "bbr2", "bbr2_variant", "cubic", "reno"])
      .optional()
      .meta({
        description:
          "QUIC congestion control algorithm. Available values: `bbr` (default), `bbr_standard`, `bbr2`, `bbr2_variant`, `cubic`, `reno`. Since sing-box 1.13.0.",
        description_zh:
          "QUIC 拥塞控制算法。可选值：`bbr`（默认）、`bbr_standard`、`bbr2`、`bbr2_variant`、`cubic`、`reno`。自 sing-box 1.13.0 起可用。",
      }),
    /**
     * TLS configuration.
     */
    tls: InboundTLSOptions.optional().meta({
      description:
        "TLS configuration, see [TLS](/configuration/shared/tls/#inbound).",
      description_zh:
        "TLS 配置，参阅 [TLS](/zh/configuration/shared/tls/#inbound)。",
    }),

    /**
     * Listen options fields.
     */
    ...ListenOptions.shape,
  })
  .meta({
    id: "NaiveInboundOptions",
    title: "Naive Inbound",
    title_zh: "Naive 入站",
  });
// #endregion

export type NaiveInboundOptions = z.infer<typeof NaiveInboundOptions>;
