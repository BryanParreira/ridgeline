// Re-mounts on every navigation; a pure-CSS fade (no JS gate, so first paint is never hidden waiting for hydration).
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
