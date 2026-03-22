export interface Logo {
  name: string;
  file: string;
  ext?: string;
}

export const logos: Logo[] = [
  { name: "Python", file: "python" },
  { name: "Next.js", file: "nextdotjs", ext: "svg" },
  { name: "TypeScript", file: "typescript", ext: "svg" },
  { name: "GraphQL", file: "graphql", ext: "svg" },
  { name: "Redux", file: "redux", ext: "svg" },
  { name: "PostgreSQL", file: "postgresql", ext: "svg" },
  { name: "MongoDB", file: "mongodb", ext: "svg" },
  { name: "Docker", file: "docker", ext: "svg" },
  { name: "Kubernetes", file: "kubernetes", ext: "svg" },
  { name: "AWS", file: "amazonaws", ext: "svg" },
  { name: "Redis", file: "redis", ext: "svg" },
  { name: "Scala", file: "scala", ext: "svg" },
  { name: "Swift", file: "logo-swift" },
  { name: "Flutter", file: "flutter" },
  { name: "Figma", file: "logo-figma" },
  { name: "PyTorch", file: "pytorch" },
];
