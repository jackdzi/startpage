/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input");
const searchButton = document.querySelector("#searchbar > button");

const lookup = {
  "/": "/",
  deepl: "https://deepl.com/",
  reddit: "https://reddit.com/",
  maps: "https://maps.google.com/",
};
const engine = "google";
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
};

const isWebUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const getTargetUrl = (value) => {
  if (isWebUrl(value)) return value;
  if (lookup[value]) return lookup[value];
  const url = engineUrls[engine] ?? engine;
  return url.replace("{query}", value);
};

const search = () => {
  const value = searchInput.value;
  const targetUrl = getTargetUrl(value);
  window.open(targetUrl, "_self");
};

searchInput.onkeyup = (event) => event.key === "Enter" && search();
searchButton.onclick = search;

/**
 * inject bookmarks into html
 */

const bookmarks = [
  {
    id: "aac",
    label: "class pages",
    bookmarks: [
      {
        id: "354",
        label: "Math 354",
        url: "https://canvas.rice.edu/courses/70782/files",
      },

      {
        id: "410",
        label: "Stat 405",
        url: "https://canvas.rice.edu/courses/68029/modules",
      },
      {
        id: "333",
        label: "Reli 333",
        url: "https://canvas.rice.edu/courses/68691/files",
      },
      {
        id: "182",
        label: "Comp 182",
        url: "https://canvas.rice.edu/courses/69686/assignments",
      },
      {
        id: "405",
        label: "Stat 405",
        url: "https://canvas.rice.edu/courses/68029/modules",
      },
    ],
  },
  {
    id: "aab",
    label: "readings",
    bookmarks: [
      {
        id: "axler",
        label: "Axler",
        url: "file:///home/jdzialo/Documents/School/Comp_182/Axler_4th_Edition.pdf",
        download: true,
      },
    ],
  },
  {
    id: "aaa",
    label: "other",
    bookmarks: [
      {
        id: "gmail",
        label: "Gmail",
        url: "https://mail.google.com/mail/u/0/",
      },
      {
        id: "chat",
        label: "ChatGPT",
        url: "https://chatgpt.com/",
      },
    ],
  },
];

const createGroupContainer = () => {
  const container = document.createElement("div");
  container.className = "bookmark-group";
  return container;
};

const createGroupTitle = (title) => {
  const h2 = document.createElement("h2");
  h2.innerHTML = title;
  return h2;
};

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = url;
  if (a.download == true) {
    a.download = true;
  }
  a.innerHTML = label;
  li.append(a);
  return li;
};

const createBookmarkList = (bookmarks) => {
  const ul = document.createElement("ul");
  bookmarks.map(createBookmark).forEach((li) => ul.append(li));
  return ul;
};

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer();
  const title = createGroupTitle(label);
  const bookmarkList = createBookmarkList(bookmarks);
  container.append(title);
  container.append(bookmarkList);
  return container;
};

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarksContainer.append();
  bookmarks
    .map(createGroup)
    .forEach((group) => bookmarksContainer.append(group));
};

injectBookmarks();
