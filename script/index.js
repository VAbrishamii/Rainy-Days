const url = "https://api.noroff.dev/api/v1/rainy-days";
function displayPosts(post) {
  for (let i = 0; i < post.length; i++) {
    const title = post[i].title;
    const gender = post[i].gender;
    // Call a function to generate HTML
    console.log("Title:", title, "Gender:", gender);
  }
}
async function doFetch(url) {
  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (error) {
    console.log("Error", error);
  }
}

async function main() {
  const posts = await doFetch(url);
  displayPosts(posts);
}
main();
