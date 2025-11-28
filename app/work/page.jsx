import WorkClient from "@/components/work/WorkClient";
import { featuredProjects } from "@/lib/featuredProjects";

const REVALIDATE_SECONDS = 3600;
const FALLBACK_IMAGE = "/assets/work/thumb1.png";

export const revalidate = REVALIDATE_SECONDS;

const capitalize = (value = "") =>
  value
    .split(" ")
    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
    .join(" ");

const normalizeStack = (stack = []) =>
  stack.filter(Boolean).map((tech) => {
    if (typeof tech === "string") {
      const normalized = tech.replace(/-/g, " ");
      return { name: capitalize(normalized) };
    }

    return tech;
  });

const buildGitHubHeaders = () => {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

const fetchRepoData = async (owner, repo) => {
  console.log(`[DEBUG] Fetching GitHub data for: ${owner}/${repo}`);
  const url = `https://api.github.com/repos/${owner}/${repo}`;
  console.log(`[DEBUG] Fetch URL: ${url}`);

  const response = await fetch(url, {
    headers: buildGitHubHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  console.log(
    `[DEBUG] Response status: ${response.status} ${response.statusText}`
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`[DEBUG] GitHub API Error:`, errorText);
    throw new Error(
      `GitHub request failed for ${owner}/${repo}: ${response.status}`
    );
  }

  const data = await response.json();
  console.log(`[DEBUG] GitHub API Response for ${owner}/${repo}:`, {
    name: data.name,
    description: data.description,
    html_url: data.html_url,
    homepage: data.homepage,
    topics: data.topics,
  });

  return data;
};

const buildProjectPayload = async (projectConfig, index) => {
  const { owner, repo } = projectConfig;
  console.log(`[DEBUG] Building project payload for index ${index}:`, {
    owner,
    repo,
    projectConfig,
  });

  try {
    const repoData = await fetchRepoData(owner, repo);
    const topics = repoData.topics ?? [];
    const stackSource = projectConfig.stack ?? topics;

    const payload = {
      num: String(index + 1).padStart(2, "0"),
      category:
        projectConfig.category ??
        (topics.includes("fullstack") ? "fullstack" : "frontend"),
      title: projectConfig.title ?? repoData.name ?? repo,
      description:
        projectConfig.description ??
        repoData.description ??
        "Descrição em breve.",
      stack: normalizeStack(stackSource),
      image: projectConfig.image ?? FALLBACK_IMAGE,
      live: projectConfig.live ?? repoData.homepage ?? repoData.html_url ?? "#",
      github: repoData.html_url ?? `https://github.com/${owner}/${repo}`,
    };

    console.log(`[DEBUG] Built project payload for ${owner}/${repo}:`, payload);
    return payload;
  } catch (error) {
    console.error(`[DEBUG] Erro ao carregar ${owner}/${repo}:`, error);

    const fallbackPayload = {
      num: String(index + 1).padStart(2, "0"),
      category: projectConfig.category ?? "frontend",
      title: projectConfig.title ?? repo,
      description:
        projectConfig.description ??
        "Não foi possível carregar os detalhes deste projeto no momento.",
      stack: normalizeStack(projectConfig.stack),
      image: projectConfig.image ?? FALLBACK_IMAGE,
      live: projectConfig.live ?? "#",
      github: `https://github.com/${owner}/${repo}`,
    };

    console.log(
      `[DEBUG] Using fallback payload for ${owner}/${repo}:`,
      fallbackPayload
    );
    return fallbackPayload;
  }
};

const WorkPage = async () => {
  console.log(
    `[DEBUG] WorkPage: Starting fetch for ${featuredProjects.length} projects`
  );
  console.log(`[DEBUG] Featured projects config:`, featuredProjects);

  const projects = await Promise.all(
    featuredProjects.map((projectConfig, index) =>
      buildProjectPayload(projectConfig, index)
    )
  );

  console.log(`[DEBUG] WorkPage: All projects processed:`, projects);
  console.log(`[DEBUG] WorkPage: Projects count: ${projects.length}`);
  console.log(
    `[DEBUG] WorkPage: Projects data:`,
    JSON.stringify(projects, null, 2)
  );

  return <WorkClient projects={projects} />;
};

export default WorkPage;
