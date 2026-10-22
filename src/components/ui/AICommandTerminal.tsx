"use client";

import React, { useEffect, useState } from "react";
import {
  Terminal,
  Bot,
  X,
  Send,
  Sparkles,
  ShieldCheck,
  Cpu,
  Command,
} from "lucide-react";

interface AICommandTerminalProps {
  locale: string;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export function AICommandTerminal({
  locale,
  isOpenExternal,
  onCloseExternal,
}: AICommandTerminalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<"ai" | "cli">("ai");
  const [input, setInput] = useState("");
  const [cliHistory, setCliHistory] = useState<
    { cmd: string; output: string }[]
  >([
    {
      cmd: "system --status",
      output:
        "🟢 ZERO-TRUST KERNEL ACTIVE | eBPF Cilium Mesh: ONLINE | AI RAG Engine: READY\nType 'help' to list available cyber-commands.",
    },
  ]);

  const [aiMessages, setAiMessages] = useState<
    { role: "assistant" | "user"; text: string }[]
  >([
    {
      role: "assistant",
      text:
        locale === "en"
          ? "Hello! I am Erjigitov Mirhamid's Neural Portfolio Agent (RAG). Ask me about his AI/LLM architectures, Cybersecurity audits (OSCP/eBPF), or Kubernetes/DevOps clusters."
          : "Salom! Men Erjigitov Mirhamidning shaxsiy AI-Assistentiman (RAG). Uning AI/LLM loyihalari, Kiberxavfsizlik (OSCP/Pentest/eBPF) yoki Kubernetes/DevOps tajribasi haqida istalgan savolni bering!",
    },
  ]);

  useEffect(() => {
    if (typeof isOpenExternal === "boolean") {
      setIsOpen(isOpenExternal);
    }
  }, [isOpenExternal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (!next && onCloseExternal) onCloseExternal();
          return next;
        });
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        if (onCloseExternal) onCloseExternal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCloseExternal]);

  const closeModal = () => {
    setIsOpen(false);
    if (onCloseExternal) onCloseExternal();
  };

  const runCliCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (cmd === "clear") {
      setCliHistory([]);
      return;
    }

    let output = "";
    switch (cmd) {
      case "help":
        output = [
          "Available Commands:",
          "  whoami       — Display engineer profile & clearance",
          "  skills       — List AI, Cybersecurity & DevOps stack",
          "  projects     — Show flagship production architectures",
          "  certs        — Verify CKS, OSCP, AWS & CKA credentials",
          "  security     — Inspect current Zero-Trust & PGP posture",
          "  contact      — Open encrypted communication channel",
          "  clear        — Clear terminal buffer",
        ].join("\n");
        break;
      case "whoami":
        output =
          "Erjigitov Mirhamid // AI Engineer • Cybersecurity Architect • Senior DevSecOps\nExperience: 6+ Years | Security Audits: 88+ | Production Systems: 44+";
        break;
      case "skills":
        output = [
          "[AI / MLOps]    PyTorch, LangGraph, Multi-Agent RAG, vLLM, Triton, ONNX, DeBERTa",
          "[CYBERSECURITY] OSCP Pentesting, Linux eBPF, Cilium, Falco, HashiCorp Vault, OWASP LLM",
          "[DEVOPS / K8S]  Kubernetes (CKS/CKA), Terraform, ArgoCD GitOps, Prometheus, AWS/GCP",
        ].join("\n");
        break;
      case "projects":
        output = [
          "1. Sentinel-AI    — Autonomous SOC & eBPF Threat Hunting Agent (68% faster MTTD)",
          "2. AegisKube      — Multi-Region Zero-Trust Kubernetes & GPU MLOps Platform",
          "3. NeuralShield   — Enterprise LLM Firewall & Prompt Injection Defense (<12ms)",
          "4. FraudGraph     — Real-Time GNN FinTech Anti-Fraud Engine (15,000+ TPS)",
        ].join("\n");
        break;
      case "certs":
        output =
          "✔ CKS (Kubernetes Security Specialist) | ✔ OSCP (Offensive Security)\n✔ AWS Security & ML Specialty          | ✔ CKA & HashiCorp Vault Associate";
        break;
      case "security":
        output =
          "TLS 1.3 Strict | CSP Enforced | PGP Fingerprint: 4F9A 82C1 E77B 091D 33A4 98C2 B110 77E5 MIRH A260";
        break;
      case "contact":
        output =
          "Email: mirhamid@cyberai.dev | Telegram: @mirhamid_erjigitov | Navigate to /contact for PGP form.";
        break;
      default:
        output = `Command not recognized: '${rawCmd}'. Type 'help' for available commands.`;
    }

    setCliHistory((prev) => [...prev, { cmd: rawCmd, output }]);
  };

  const runAiQuery = (question: string) => {
    const q = question.toLowerCase();
    let answer = "";

    if (q.includes("ai") || q.includes("llm") || q.includes("rag") || q.includes("ml")) {
      answer =
        locale === "en"
          ? "In AI & MLOps, Erjigitov Mirhamid builds Multi-Agent RAG systems (LangGraph, Qdrant, pgvector), serves quantized models on vLLM & NVIDIA Triton (cutting GPU costs by 42%), and secures LLMs with his custom Rust/ONNX firewall 'NeuralShield'."
          : "AI va MLOps yo'nalishida Erjigitov Mirhamid korporativ Multi-Agent RAG tizimlari (LangGraph, Qdrant), vLLM va NVIDIA Triton GPU klasterlari (xarajatlarni 42% ga kamaytirgan) hamda 'NeuralShield' nomli Prompt Injection himoya proksisini yaratgan.";
    } else if (
      q.includes("cyber") ||
      q.includes("xavfsiz") ||
      q.includes("pentest") ||
      q.includes("security") ||
      q.includes("oscp")
    ) {
      answer =
        locale === "en"
          ? "In Cybersecurity, Erjigitov Mirhamid holds OSCP and CKS certifications with 88+ enterprise security audits. He specializes in Zero-Trust architecture, Linux kernel eBPF threat detection (Falco/Cilium), and Autonomous AI SOC agents ('Sentinel-AI')."
          : "Kiberxavfsizlik bo'yicha Erjigitov Mirhamid OSCP va CKS xalqaro sertifikatlariga hamda 88+ muvaffaqiyatli pentest/audit tajribasiga ega. Asosiy ixtisosligi: Linux eBPF (Cilium/Falco), Zero-Trust tarmoqlar va Avtonom AI SOC agentlari ('Sentinel-AI').";
    } else if (
      q.includes("devops") ||
      q.includes("k8s") ||
      q.includes("kubernetes") ||
      q.includes("cloud") ||
      q.includes("terraform")
    ) {
      answer =
        locale === "en"
          ? "In DevOps & Cloud, he manages 120+ microservice Kubernetes clusters using 100% GitOps (ArgoCD, Terraform, Helm), strict mTLS service mesh, HashiCorp Vault dynamic secrets, and full Prometheus/Grafana/Loki observability with 99.99% uptime."
          : "DevOps va Cloud sohasida u 120+ mikroservisli Kubernetes klasterlarni Terraform, ArgoCD GitOps, Cilium mTLS va HashiCorp Vault orqali 99.99% uptime bilan boshqaradi.";
    } else {
      answer =
        locale === "en"
          ? "Erjigitov Mirhamid is a Senior AI, Cybersecurity & DevSecOps Architect with 6+ years of experience, 44+ production systems, and 12 global certifications (CKS, OSCP, AWS). Would you like details on his AI projects, Security audits, or Kubernetes architecture?"
          : "Erjigitov Mirhamid — 6+ yillik tajribaga ega AI muhandisi, Kiberxavfsizlik arxitektori va Senior DevSecOps mutaxassisi (44+ production loyiha, CKS, OSCP, AWS sertifikatlari sohibi). Uning AI loyihalari, Xavfsizlik auditlari yoki Kubernetes infratuzilmasi haqida so'rashingiz mumkin!";
    }

    setAiMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "assistant", text: answer },
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    if (mode === "cli") {
      runCliCommand(input);
    } else {
      runAiQuery(input);
    }
    setInput("");
  };

  return (
    <>
      {/* Floating bottom-right trigger button (sits above mobile bottom dock on <lg screens) */}
      <button
        onClick={() => setIsOpen(true)}
        className="spatial-ornament liquid-card-sheen fixed bottom-24 right-4 z-40 flex items-center gap-2.5 rounded-pill px-4 py-2.5 text-xs font-mono text-[var(--ink)] shadow-[0_16px_36px_-6px_rgba(61,190,116,0.32)] backdrop-blur-2xl transition-all duration-300 hover:scale-105 hover:border-[var(--accent)] active:scale-95 lg:bottom-6 lg:right-6"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)]/20 text-[var(--accent-text)]">
          <Sparkles className="h-3 w-3 animate-pulse" />
        </span>
        <span className="hidden xs:inline sm:inline font-semibold">AI Agent & CLI</span>
        <kbd className="hidden sm:inline-block rounded-full bg-[var(--ink)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--ink)]">
          ⌘K
        </kbd>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="spatial-glass liquid-card-sheen relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/30 shadow-[0_36px_80px_rgba(0,0,0,0.6)] backdrop-blur-3xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMode("ai")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono transition ${
                    mode === "ai"
                      ? "bg-violet-500/25 text-violet-200 border border-violet-400/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Bot className="h-3.5 w-3.5" />
                  Neural AI Agent (RAG)
                </button>
                <button
                  onClick={() => setMode("cli")}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono transition ${
                    mode === "cli"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  Cyber CLI Shell
                </button>
              </div>
              <button
                onClick={closeModal}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-white/[0.02] px-5 py-2.5 text-xs font-mono">
              {mode === "ai" ? (
                <>
                  <span className="text-slate-400">Prompts:</span>
                  {[
                    "AI & RAG architectures?",
                    "Cybersecurity & OSCP audits?",
                    "Kubernetes & DevOps stack?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => runAiQuery(q)}
                      className="rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-0.5 text-violet-300 hover:bg-violet-500/20"
                    >
                      {q}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <span className="text-slate-400">Commands:</span>
                  {["help", "whoami", "skills", "projects", "certs", "security", "clear"].map(
                    (c) => (
                      <button
                        key={c}
                        onClick={() => runCliCommand(c)}
                        className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300 hover:bg-emerald-500/20"
                      >
                        {c}
                      </button>
                    )
                  )}
                </>
              )}
            </div>

            {/* Body */}
            <div className="h-80 overflow-y-auto p-5 font-mono text-xs space-y-3">
              {mode === "ai" ? (
                aiMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-xl px-4 py-3 leading-relaxed ${
                        m.role === "user"
                          ? "bg-emerald-500/20 border border-emerald-400/30 text-emerald-100"
                          : "bg-white/[0.05] border border-white/10 text-slate-200"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))
              ) : (
                cliHistory.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>root@cyberai-node:~#</span>
                      <span className="text-white">{item.cmd}</span>
                    </div>
                    <pre className="whitespace-pre-wrap text-slate-300 pl-3 border-l border-emerald-500/30">
                      {item.output}
                    </pre>
                  </div>
                ))
              )}
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-white/10 bg-slate-950/80 px-4 py-3"
            >
              <Command className="h-4 w-4 text-emerald-400 shrink-0" />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  mode === "ai"
                    ? locale === "en"
                      ? "Ask the Neural Agent about AI, Security, or DevOps..."
                      : "AI, Kiberxavfsizlik yoki DevOps tajribam haqida so'rang..."
                    : "Type a command (help, skills, projects, certs, security)..."
                }
                className="w-full bg-transparent font-mono text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-emerald-400/20 border border-emerald-400/40 p-2 text-emerald-300 hover:bg-emerald-400/30"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
