const repositoryList = document.querySelector("#starred");

function renderRepositories(repositories) {
  repositoryList.replaceChildren();

  for (const repository of repositories) {
    const item = document.createElement("li");
    const card = document.createElement("article");
    const link = document.createElement("a");
    const description = document.createElement("p");
    const date = document.createElement("time");

    card.className = "repository-card";
    link.className = "repository-link";
    link.href = repository.url;
    link.textContent = repository.repository;
    description.className = "repository-description";
    description.textContent = repository.description;
    date.className = "starred-date";
    date.dateTime = repository.starred_at;
    date.textContent = `Starred ${new Date(`${repository.starred_at}T00:00:00`).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric"
    })}`;

    card.append(link, description, date);
    item.append(card);
    repositoryList.append(item);
  }
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    renderRepositories(repositories);
  } catch (error) {
    console.error("Failed to load starred repositories:", error);
  }
}

loadRepositories();
