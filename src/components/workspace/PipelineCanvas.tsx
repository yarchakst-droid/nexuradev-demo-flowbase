"use client";

import { useEffect, useRef, useState } from "react";
import AutomationCard from "@/components/workspace/AutomationCard";
import ConnectorLines from "@/components/workspace/ConnectorLines";
import RunBar from "@/components/workspace/RunBar";
import { useLang } from "@/i18n/LangContext";
import type { AutomationConnection, AutomationNode, RunStep } from "@/lib/types";

const STEP_DELAY_MS = 420;

export default function PipelineCanvas() {
  const { t, lang } = useLang();
  const [nodes, setNodes] = useState<AutomationNode[] | null>(null);
  const [connections, setConnections] = useState<AutomationConnection[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [running, setRunning] = useState(false);
  const [runningNodeId, setRunningNodeId] = useState<string | null>(null);
  const [completed, setCompleted] = useState<Record<string, RunStep>>({});
  const [summary, setSummary] = useState<{ steps: RunStep[] } | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/pipeline")
      .then((res) => {
        if (!res.ok) throw new Error(t.workspace.loadError);
        return res.json();
      })
      .then((data: { nodes: AutomationNode[]; connections: AutomationConnection[] }) => {
        if (cancelled) return;
        setNodes(data.nodes);
        setConnections(data.connections);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
    };
  }, [t.workspace.loadError]);

  async function handleToggle(nodeId: string) {
    if (!nodes) return;
    try {
      const res = await fetch("/api/pipeline/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodeId, lang }),
      });
      const data = await res.json();
      if (!res.ok) return;
      setNodes((prev) => prev!.map((n) => (n.id === nodeId ? data.node : n)));
    } catch (err) {
      console.error("Failed to toggle automation:", err);
    }
  }

  async function handleRun() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setCompleted({});
    setSummary(null);
    setRunning(true);

    let data: { steps: RunStep[] };
    try {
      const res = await fetch("/api/pipeline/run", { method: "POST" });
      data = await res.json();
    } catch (err) {
      console.error("Failed to run pipeline:", err);
      setRunning(false);
      return;
    }

    data.steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setRunningNodeId(step.nodeId);
        setCompleted((prev) => ({ ...prev, [step.nodeId]: step }));
        if (i === data.steps.length - 1) {
          const done = setTimeout(() => {
            setRunning(false);
            setRunningNodeId(null);
            setSummary(data);
          }, STEP_DELAY_MS);
          timers.current.push(done);
        }
      }, i * STEP_DELAY_MS);
      timers.current.push(t);
    });
  }

  if (error) {
    return (
      <p className="m-6 rounded-lg border border-node-action/30 bg-node-action/5 px-4 py-3 text-sm text-node-action">
        {error}
      </p>
    );
  }

  if (!nodes) {
    return <div className="m-6 h-[32rem] animate-pulse rounded-xl border border-border bg-surface" />;
  }

  const activeIds = new Set(Object.keys(completed));
  if (runningNodeId) activeIds.add(runningNodeId);

  return (
    <div className="flex flex-col">
      <RunBar running={running} summary={summary} onRun={handleRun} />
      <div className="relative m-4 h-[38rem] overflow-hidden rounded-xl border border-border bg-ink-elevated">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-border-soft) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <ConnectorLines nodes={nodes} connections={connections} activeIds={activeIds} />
        {nodes.map((node) => (
          <AutomationCard
            key={node.id}
            node={node}
            runStep={completed[node.id]}
            isRunning={runningNodeId === node.id}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
}
