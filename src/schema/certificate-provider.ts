import { z } from "zod";
import { listableString } from "@/utils";

const DNS01Challenge = z
  .object({
    provider: z.string().meta({
      description: "ACME CA provider.",
      description_zh: "ACME CA 供应商。",
    }),
    access_key_id: z.string().optional().meta({
      description: "The access key ID.",
      description_zh: "访问密钥 ID。",
    }),
    access_key_secret: z.string().optional().meta({
      description: "The access key secret.",
      description_zh: "访问密钥 secret。",
    }),
    region_id: z.string().optional().meta({
      description: "The region ID.",
      description_zh: "区域 ID。",
    }),
    api_token: z.string().optional().meta({
      description: "The API token.",
      description_zh: "API 令牌。",
    }),
  })
  .meta({
    id: "CertProviderDNS01Challenge",
    title: "DNS01 Challenge",
    title_zh: "DNS01 质询",
  });

const ACMECertificateProvider = z
  .object({
    type: z.literal("acme"),
    tag: z.string(),
    domain: listableString.meta({
      description: "List of domains. Required.",
      description_zh: "域名列表。必填。",
    }),
    data_directory: z.string().optional().meta({
      description:
        "The directory to store ACME data. Defaults to `$XDG_DATA_HOME/certmagic`.",
      description_zh:
        "存储 ACME 数据的目录。默认为 `$XDG_DATA_HOME/certmagic`。",
    }),
    default_server_name: z.string().optional().meta({
      description:
        "Server name to use when choosing a certificate if the ClientHello's ServerName field is empty.",
      description_zh:
        "如果 ClientHello 的 ServerName 字段为空，则选择证书时要使用的服务器名称。",
    }),
    email: z.string().optional().meta({
      description:
        "The email address to use when creating or selecting an existing ACME server account.",
      description_zh: "创建或选择现有 ACME 服务器帐户时使用的电子邮件地址。",
    }),
    provider: z.string().optional().meta({
      description:
        "The ACME CA provider to use. `letsencrypt` is used by default.",
      description_zh: "要使用的 ACME CA 供应商。默认使用 `letsencrypt`。",
    }),
    account_key: z.string().optional().meta({
      description: "PEM-encoded ACME account key.",
      description_zh: "PEM 编码的 ACME 帐户密钥。",
    }),
    disable_http_challenge: z.boolean().optional().meta({
      description: "Disable all HTTP challenges.",
      description_zh: "禁用所有 HTTP 质询。",
    }),
    disable_tls_alpn_challenge: z.boolean().optional().meta({
      description: "Disable all TLS-ALPN challenges.",
      description_zh: "禁用所有 TLS-ALPN 质询。",
    }),
    alternative_http_port: z.number().int().min(0).max(65535).optional().meta({
      description: "The alternate port to use for the ACME HTTP challenge.",
      description_zh: "用于 ACME HTTP 质询的备用端口。",
    }),
    alternative_tls_port: z.number().int().min(0).max(65535).optional().meta({
      description: "The alternate port to use for the ACME TLS-ALPN challenge.",
      description_zh: "用于 ACME TLS-ALPN 质询的备用端口。",
    }),
    external_account: z
      .object({
        key_id: z.string().meta({
          description: "The key identifier.",
          description_zh: "密钥标识符。",
        }),
        mac_key: z.string().meta({
          description: "The MAC key.",
          description_zh: "MAC 密钥。",
        }),
      })
      .optional()
      .meta({
        description:
          "EAB (External Account Binding) contains information necessary to bind or map an ACME account to some other account known by the CA.",
        description_zh:
          "EAB（外部帐户绑定）包含将 ACME 帐户绑定或映射到其他已知帐户所需的信息。",
      }),
    dns01_challenge: DNS01Challenge.optional().meta({
      description: "ACME DNS01 challenge field.",
      description_zh: "ACME DNS01 验证字段。",
    }),
    key_type: z
      .enum(["ed25519", "p256", "p384", "rsa2048", "rsa4096"])
      .optional()
      .meta({
        description: "Key type for the certificate.",
        description_zh: "证书的密钥类型。",
      }),
    detour: z.string().optional().meta({
      description: "Tag of an outbound for ACME HTTP requests.",
      description_zh: "用于 ACME HTTP 请求的出站标签。",
    }),
  })
  .meta({
    id: "ACMECertificateProvider",
    title: "ACME Certificate Provider",
    title_zh: "ACME 证书提供者",
  });

const TailscaleCertificateProvider = z
  .object({
    type: z.literal("tailscale"),
    tag: z.string(),
    endpoint: z.string().meta({
      description: "The tag of the Tailscale Endpoint. Required.",
      description_zh: "Tailscale 端点的标签。必填。",
    }),
  })
  .meta({
    id: "TailscaleCertificateProvider",
    title: "Tailscale Certificate Provider",
    title_zh: "Tailscale 证书提供者",
  });

const CloudflareOriginCACertificateProvider = z
  .object({
    type: z.literal("cloudflare-origin-ca"),
    tag: z.string(),
    domain: listableString.meta({
      description: "List of domains. Required.",
      description_zh: "域名列表。必填。",
    }),
    data_directory: z.string().optional().meta({
      description: "The directory to store certificate data.",
      description_zh: "存储证书数据的目录。",
    }),
    api_token: z.string().optional().meta({
      description: "Cloudflare API token. Conflicts with `origin_ca_key`.",
      description_zh: "Cloudflare API 令牌。与 `origin_ca_key` 冲突。",
    }),
    origin_ca_key: z.string().optional().meta({
      description: "Cloudflare Origin CA key. Conflicts with `api_token`.",
      description_zh: "Cloudflare Origin CA 密钥。与 `api_token` 冲突。",
    }),
    request_type: z.enum(["origin-rsa", "origin-ecc"]).optional().meta({
      description: "Certificate request type.",
      description_zh: "证书请求类型。",
    }),
    requested_validity: z.number().int().optional().meta({
      description:
        "Requested validity period in days. Valid values: 7, 30, 90, 365, 730, 1095, 5475.",
      description_zh:
        "请求的有效期（天）。有效值：7、30、90、365、730、1095、5475。",
    }),
    detour: z.string().optional().meta({
      description: "Tag of an outbound for Cloudflare API requests.",
      description_zh: "用于 Cloudflare API 请求的出站标签。",
    }),
  })
  .meta({
    id: "CloudflareOriginCACertificateProvider",
    title: "Cloudflare Origin CA Certificate Provider",
    title_zh: "Cloudflare Origin CA 证书提供者",
  });

export const CertificateProvider = z
  .discriminatedUnion("type", [
    ACMECertificateProvider,
    TailscaleCertificateProvider,
    CloudflareOriginCACertificateProvider,
  ])
  .meta({
    id: "CertificateProvider",
    title: "Certificate Provider",
    title_zh: "证书提供者",
    description: "Certificate provider configuration. Since sing-box 1.14.0.",
    description_zh: "证书提供者配置。自 sing-box 1.14.0 起可用。",
  });
export type CertificateProvider = z.infer<typeof CertificateProvider>;
