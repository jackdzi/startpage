/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */


/**
 * inject bookmarks into html
 */

const bookmarks = [
  {
    id: "aac",
    label: "class pages",
    bookmarks: [
      {
        id: "432",
        label: "COMP 432",
        url: "https://canvas.rice.edu/courses/90104"
      },
      {
        id: "429",
        label: "COMP 429",
        url: "https://www.clear.rice.edu/comp429/sched.html"
      },
      {
        id: "480",
        label: "COMP 480",
        url: "https://cs.rice.edu/~as143/COMP480_580_Fall26/index.html"
      },
      {
        id: "387",
        label: "ENGL 387",
        url: "https://canvas.rice.edu/courses/92306"
      },
      {
        id: "263",
        label: "FREN 263",
        url: "https://canvas.rice.edu/courses/92537",
      },
    ],
  },
  {
    id: "aab",
    label: "websites",
    bookmarks: [
      {
        id: "fren_textbook",
        label: "French Textbook",
        url: "https://laits.utexas.edu/fi/",
      }
    ]
  }
  // {
  //   id: "aab",
  //   label: "readings",
  //   bookmarks: [
  //     {
  //       id: "axler",
  //       label: "Axler",
  //       url: "readings/Axler_4th_Edition.pdf",
  //       download: true,
  //     },
  //     {
  //       id: "comp",
  //       label: "Discrete",
  //       url: "readings/Kenneth Rosen - Discrete Mathematics and Its Applications, seventh edition-McGraw-Hill Science_Engineering_Math (2011).pdf",
  //       download: true,
  //     },
  //   ],
  // },
  // {
  //   id: "aaa",
  //   label: "other",
  //   bookmarks: [
  //     {
  //       id: "gmail",
  //       label: "Gmail",
  //       url: "https://mail.google.com/mail/u/0/",
  //     },
  //     {
  //       id: "chat",
  //       label: "ChatGPT",
  //       url: "https://chatgpt.com/",
  //     },
  //     {
  //       id: "github",
  //       label: "Github",
  //       url: "https://github.com/",
  //     },
  //     {
  //       id: "drive",
  //       label: "Drive",
  //       url: "https://drive.google.com/drive/u/0/home",
  //     },
  //     {
  //       id: "youtube",
  //       label: "Youtube",
  //       url: "https://youtube.com/",
  //     },
  //   ],
  // },
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

$(document).ready(async function () {
  var quote;
  var author;

  async function getQuote() {
    var forismaticAPI =
      "https://quotes-api-self.vercel.app/quote";

    // Fetch data using a promise-based approach
    return new Promise((resolve, reject) => {
      $.getJSON(forismaticAPI, function (data) {
        if (data) {
          resolve(data);
        } else {
          reject("Error fetching data");
        }
      });
    });
  }

  try {
    // Wait for the API response
    let data = await getQuote();
    while (data.quote.length >= 200) {
      data = await getQuote();
    }
    quote = data.quote;
    author = data.author;

    // Update the DOM with the fetched quote and author
    $(".quote").text(quote);
    $(".author").text("-" + author);

    // Log the quote to the console
    console.log(quote);
  } catch (error) {
    console.error(error);
  }
});
