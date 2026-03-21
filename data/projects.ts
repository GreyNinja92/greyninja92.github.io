export interface Project {
  title: string;
  description: string;
  gradient: string;
  illustration: string;
  link?: string;
  github?: string;
  tech: string[];
  video?: boolean;
}

export const projects: Project[] = [
  {
    title: "SLAM",
    description:
      "Real-time area mapping from video using SLAM. Feature extraction with OpenCV, RANSAC for camera pose estimation.",
    gradient: "linear-gradient(160deg, #FF7373 0%, #491EB8 100%)",
    illustration: "",
    github: "https://github.com/GreyNinja92/slam",
    tech: ["Python", "OpenCV", "Pygame"],
    video: false,
  },
  {
    title: "TweetBot",
    description:
      "Full-stack social media app with GraphQL API, Apollo Server, MikroORM migrations, and PostgreSQL.",
    gradient: "linear-gradient(160deg, #5E17FF 0%, #37B4E9 100%)",
    illustration: "",
    github: "https://github.com/GreyNinja92/tweetbot",
    tech: ["TypeScript", "React", "GraphQL", "PostgreSQL"],
    video: false,
  },
  {
    title: "Distributed Graph Computation",
    description:
      "MapReduce graph comparison using Scala/Guava, computes node & edge similarity scores. 80% accuracy.",
    gradient: "linear-gradient(160deg, #FF8570 0%, #F9504A 100%)",
    illustration: "",
    link: "https://www.youtube.com/watch?v=kz_yhDAN71Y",
    tech: ["Scala", "Hadoop", "AWS EMR"],
    video: true,
  },
  {
    title: "MitM Attack Simulation",
    description:
      "Parallelized Random Walks via Apache Spark analyzing graph traceability. 86% accuracy, 100% attack success.",
    gradient: "linear-gradient(160deg, #DC5F93 0%, #9356D0 100%)",
    illustration: "",
    link: "https://www.youtube.com/watch?v=aFvPYwzhfKQ",
    github: "https://github.com/GreyNinja92/MitMAttackerDistributedComputation",
    tech: ["Scala", "Apache Spark", "AWS EMR"],
    video: true,
  },
  {
    title: "Police Thief Game",
    description:
      "Graph-based game with Akka HTTP RESTful APIs, two auto-play strategies with performance analytics.",
    gradient: "linear-gradient(160deg, #007AFF 0%, #50A4FF 100%)",
    illustration: "",
    link: "https://youtu.be/kcqYeBlO86k",
    github: "https://github.com/GreyNinja92/PoliceThiefGame",
    tech: ["Scala", "Akka HTTP", "AWS EC2"],
    video: true,
  },
  {
    title: "Name Generator",
    description:
      "LSTM model trained on names corpus to generate plausible names from a starting letter, with probabilistic filtering.",
    gradient: "linear-gradient(160deg, #2FB8FF 0%, #9EECD9 100%)",
    illustration: "",
    tech: ["Python", "PyTorch", "NumPy"],
    video: false,
  },
];
